import { GoogleGenAI } from '@google/genai';
import { CLINIC_CONFIG, CLINIC_SERVICES, DR_STANISLAV_GOLYAND } from '../data/clinicData';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

const SYSTEM_INSTRUCTION = `You are "Ask Island Family Dental", the intelligent digital concierge for Island Family Dental located at 4032 Richmond Avenue, Staten Island, NY 10312.

PRACTICE FACTS:
- Lead Dentist: Dr. Stanislav Golyand, DDS ("Dr. Stan"). He received his initial dental training in Moscow, his DDS from NYU College of Dentistry, completed his general practice residency at Downstate Medical Center (Brooklyn), and has owned/operated Island Family Dental since 2006.
- Phone: +1 (718) 948-6500 | Fax: +1 (718) 948-0255
- Operating Hours:
  * Monday: 9:00 AM – 5:00 PM
  * Tuesday: 12:30 PM – 8:00 PM
  * Wednesday: 9:00 AM – 5:00 PM
  * Thursday: 12:30 PM – 8:00 PM
  * Friday: 9:00 AM – 3:00 PM
  * Saturday & Sunday: Closed
- Modern Clinic Technologies: Digital low-dose X-rays, laser dentistry, 3D intraoral digital scanners, and 3D Cone Beam CT scans.
- Services: Dental exams & cleanings, tooth-colored fillings, porcelain crowns & bridges, periodontal/gum therapy, Invisalign clear aligners, dental implants, emergency dental care, sealants & fluoride, oral cancer screenings, root canal therapy, gentle extractions, custom nightguards/mouthguards, porcelain veneers & teeth whitening.
- Real Appointments: Can be booked by calling (718) 948-6500 or via Dr. Stanislav Golyand's official Zocdoc profile: https://www.zocdoc.com/dentist/stanislav-golyand-dds-461783.
- Demo Booking: This website provides a synthetic booking engine where visitors can test the appointment request flow with simulated availability. Explain that demo requests do not create real appointments.

CRITICAL HEALTHCARE SAFETY RULES:
1. NEVER diagnose dental conditions or interpret symptoms as a clinical diagnosis.
2. NEVER prescribe medications or give individual medical treatment plans.
3. For dental emergencies (severe pain, bleeding, swelling), urge calling +1 (718) 948-6500. For immediate life-threatening emergencies or severe facial trauma, instruct calling 911 immediately.
4. Keep answers friendly, professional, concise, reassuring, and articulate (1-3 brief paragraphs).
5. Always clarify that insurance and fees should be confirmed directly with the office at (718) 948-6500.`;

export async function handleReceptionistChat(userMessage: string, history: Array<{ role: string; content: string }> = []) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return getFallbackResponse(userMessage);
    }

    const conversationContents = [
      ...history.map(h => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }]
      })),
      {
        role: 'user',
        parts: [{ text: userMessage }]
      }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: conversationContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7
      }
    });

    const reply = response.text || "I'm here to help with information about Island Family Dental. How may I assist you today?";
    return { reply };
  } catch (err) {
    console.warn("Gemini call fallback triggered:", err);
    return getFallbackResponse(userMessage);
  }
}

function getFallbackResponse(query: string) {
  const q = query.toLowerCase();
  if (q.includes('hour') || q.includes('open') || q.includes('time') || q.includes('when')) {
    return {
      reply: "Island Family Dental is open Monday & Wednesday (9:00 AM – 5:00 PM), Tuesday & Thursday (12:30 PM – 8:00 PM), and Friday (9:00 AM – 3:00 PM). We are closed on weekends. For scheduling, call us at (718) 948-6500."
    };
  }
  if (q.includes('doctor') || q.includes('stan') || q.includes('who') || q.includes('dentist') || q.includes('golyand')) {
    return {
      reply: "Island Family Dental is led by Dr. Stanislav Golyand, DDS ('Dr. Stan'). He trained in Moscow, graduated from NYU College of Dentistry, completed his residency at Downstate Medical Center in Brooklyn, and has owned and directed the practice since 2006."
    };
  }
  if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('directions')) {
    return {
      reply: "We are located at 4032 Richmond Avenue, Staten Island, NY 10312. You can reach our front desk at (718) 948-6500."
    };
  }
  if (q.includes('zocdoc') || q.includes('real appointment') || q.includes('book real')) {
    return {
      reply: "To book an official real appointment, you can schedule directly through Dr. Stanislav Golyand's verified Zocdoc profile or call our office at (718) 948-6500. You can also try our simulated demo booking right on this website!"
    };
  }
  if (q.includes('emergency') || q.includes('pain') || q.includes('ache') || q.includes('broken')) {
    return {
      reply: "If you are experiencing severe dental pain or a dental emergency, please call our Staten Island office right away at (718) 948-6500 during office hours. For life-threatening emergencies, call 911 immediately."
    };
  }
  return {
    reply: "Welcome to Island Family Dental's concept demo! I can help you learn about Dr. Stanislav Golyand, our Richmond Avenue office hours, preventive & restorative dental services, or guide you through our simulated booking engine. How can I help you today?"
  };
}
