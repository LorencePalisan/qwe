import { ScrollText } from "@/icons";

// ── NDA content ───────────────────────────────────────────────────────────────

type Block =
  | { t: "title"; text: string }
  | { t: "p"; text: string }
  | { t: "sh"; n: string; h: string }
  | { t: "sub"; l: string; h: string; text: string }
  | { t: "addr"; label: string; lines: string[] }
  | { t: "end"; text: string };

const NDA: Block[] = [
  { t: "title", text: "CONFIDENTIALITY AND NONDISCLOSURE AGREEMENT" },
  {
    t: "p",
    text: 'This Confidentiality and Nondisclosure Agreement (the "Agreement") is entered into as of the ____ day of ___________, 2026 (the "Effective Date"), by and between WHODINI APP LTD., a Delaware corporation, with its principal place of business in New York State ("Company"), and ______________________ (individually or collectively with its affiliates, the "Recipient"). Company and Recipient may each be referred to herein as a "Party" and collectively as the "Parties."',
  },
  {
    t: "p",
    text: "WHEREAS, Company is engaged in the business of developing a proprietary technology platform and related services; and",
  },
  {
    t: "p",
    text: "WHEREAS, the Parties wish to evaluate, discuss, or engage in a potential business relationship including, but not limited to, the development and provision of services, technologies, tools and resources; and",
  },
  {
    t: "p",
    text: 'WHEREAS, in the course of discussions or a potential engagement, Company may disclose to Recipient certain confidential, proprietary, and trade secret information for the limited purpose of evaluating a business relationship or performing services related to Company\'s business (the "Purpose"); and',
  },
  {
    t: "p",
    text: "WHEREAS, Company desires to ensure that its confidential information, intellectual property, and business ideas are protected from unauthorized use or disclosure; and Recipient is willing to receive such information under strict confidentiality obligations; and",
  },
  {
    t: "p",
    text: "WHEREAS, Company requires that the disclosure of any such Confidential Information, as defined below, is made on the terms and conditions set forth herein;",
  },
  {
    t: "p",
    text: "NOW, THEREFORE, in consideration of the mutual promises and covenants contained herein and other good and valuable consideration, the sufficiency of which is acknowledged, the Parties agree as follows:",
  },

  { t: "sh", n: "1.", h: "Confidential Information." },
  {
    t: "p",
    text: '"Confidential Information" shall mean all trade secrets and other non-public information provided by or on behalf of Company to Recipient, whether disclosed in writing, orally, visually, electronically, or otherwise, and whether before or after the Effective Date. Confidential Information includes, without limitation, any data, documents, notes, recordings, presentations, prototypes, samples, or other materials, and any discussions or communications, that contain or reflect technical, financial, business, or strategic information of Company. This includes but is not limited to: product designs, software source code and object code, algorithms, trade secrets, system architectures, formulas, models, prototypes, inventions, research and development plans, roadmaps, business plans, marketing strategies, customer or client lists, supplier or partner information, pricing, cost data, patent disclosures, procedures, processes, projections, forecasts, protocols, financial statements or projections, investment or fundraising plans, employee or contractor names and information, specifications, strategies and techniques, customer lists and contact details, reports or advice from professional advisers or other experts, marketing, sales and pricing information, financial information and records, supplier information, and any ideas, concepts, or know-how related to Company\'s products, services, and operations. It also encompasses information revealed during any demonstrations, meetings, interviews (including recorded audio/video conversations), or other collaborative sessions between the Parties. In addition, any analyses, compilations, notes, or other documents prepared by Recipient or its representatives that contain or are based on Company\'s confidential information shall be deemed Confidential Information. Confidential Information shall also include the fact that the Parties are in discussions or any terms, conditions, or existence of this Agreement or any potential business arrangement, if such fact itself is not public. Notwithstanding the foregoing, except as to trade secrets, Confidential Information shall not include information which the Recipient can establish (i) to have been publicly known prior to disclosure of such information by Company to Recipient, (ii) to have become publicly known, without fault on the part of Recipient, subsequent to disclosure of such information by Company to Recipient, (iii) to have been received by Recipient at any time from a source, other than Company, rightfully having possession of and the right to disclose such information, or (iv) to have been otherwise known by Recipient as evidenced by its own written records prior to disclosure of such information by Company to Recipient.',
  },

  { t: "sh", n: "2.", h: "Obligations." },
  {
    t: "p",
    text: "Recipient agrees to maintain the confidentiality of all Confidential Information and use it solely for business purposes strictly related to this Agreement, and further agrees to hold and maintain all Confidential Information in strict confidence, using at least the same degree of care to protect it as Recipient uses to protect its own confidential and trade secret information of a similar nature (and in no event less than a reasonable standard of care). Recipient shall not, directly or indirectly, disclose any of Company's Confidential Information to any person or entity except to its own employees or professional advisors who (i) have a legitimate \"need to know\" such information for the expressly authorized Purpose, and (ii) are bound by confidentiality obligations at least as protective as those in this Agreement. Recipient will be responsible and liable for any breach of this Agreement by any person to whom it discloses Confidential Information. Recipient shall not use the Confidential Information for any purpose other than to evaluate, advise on, or carry out the defined Purpose with Company. Any use or exploitation of Confidential Information for Recipient's own benefit or the benefit of any third party (outside the scope of Company-authorized Purpose) is strictly prohibited. In no event shall Recipient use the Confidential Information to reverse-engineer, disassemble, or decompile any product, service, or code, nor to derive or ascertain the composition or underlying ideas of any Confidential Information by any means. The obligations in this Section apply both during the term of any business relationship between the Parties and after its conclusion, for so long as the information remains confidential (subject to the specific survival period in Section 6 below). Recipient shall implement appropriate safeguards to prevent unauthorized access, disclosure, or use of Confidential Information, including compliance with all applicable laws and regulations, including, but not limited to, all applicable data protection laws. If Recipient becomes aware of any unauthorized disclosure or use of Confidential Information, it shall promptly notify Company and take all reasonable steps to prevent further unauthorized disclosure or use.",
  },

  { t: "sh", n: "3.", h: "Intellectual Property Rights." },
  {
    t: "p",
    text: "Recipient acknowledges and agrees that all rights, title, and interest in and to the Confidential Information, including but not limited to patents, trademarks, copyrights, trade secrets, proprietary methodologies, data, protocols, reports, software, algorithms, and any other intellectual property, shall remain the sole and exclusive property of Company, and nothing in this Agreement shall be construed as granting Recipient any rights therein, whether by implication, estoppel, or otherwise. Recipient shall not use, reproduce, modify, adapt, create derivative works from, reverse engineer, decompile, disassemble, or otherwise attempt to derive the composition, source code, formulas, structures, or underlying ideas of any Confidential Information, nor apply for, claim, or register any intellectual property rights based on or incorporating such Confidential Information. Any third-party receiving access to the Disclosing Party's Confidential Information must be bound by confidentiality and intellectual property protections at least as restrictive as those in this Agreement, and the Receiving Party shall remain liable for any unauthorized use or disclosure by such third parties. Any modifications, improvements, enhancements, inventions, discoveries, or derivative works based upon or incorporating the Confidential Information shall be deemed the sole property of Company, and Recipient hereby irrevocably assigns all rights, title, and interest in such developments to Company, agreeing to take all necessary steps to perfect such assignment at Company's request and expense. Upon termination or expiration of this Agreement, or at Company's written request, Recipient shall immediately cease all use of the Confidential Information, return or destroy all copies, notes, summaries, and materials containing or derived from the Confidential Information, and provide written certification of such return or destruction. Recipient acknowledges that any breach of this clause may cause irreparable harm to Company for which monetary damages may be inadequate, and Company shall be entitled to seek immediate injunctive relief, in addition to any other remedies available at law or in equity.",
  },
  {
    t: "p",
    text: "All Confidential Information, and all related materials (including copies) disclosed by Company, are and shall remain the sole property of Company. Nothing in this Agreement is intended to grant or shall be construed as granting Recipient any license, ownership, or other rights in or to the Confidential Information or any patents, copyrights, trademarks, or other intellectual property of Company, except for the limited right to use such information for the authorized Purpose. Company retains all right, title, and interest in and to its Confidential Information and any intellectual property therein.",
  },
  {
    t: "p",
    text: 'Furthermore, if Recipient (or anyone on Recipient\'s behalf) creates, develops, or conceives any work product, derivative works, inventions, discoveries, ideas, improvements, or other intellectual property (collectively, "Developments") that arise from, are based upon, or incorporate any part of the Confidential Information, or that are created in the course of any collaboration or engagement with Company, such Developments shall be the sole and exclusive property of Company. Recipient agrees that any and all of those Developments (including any associated intellectual property rights) are hereby assigned to Company. Recipient will promptly disclose to Company any such Developments and take all necessary steps (at Company\'s expense) to formally effectuate and record Company\'s ownership of them, including signing further documents of assignment or cooperating in patent or copyright applications if requested.',
  },

  { t: "sh", n: "4.", h: "Non-Competition; Non-Circumvention." },
  {
    t: "p",
    text: "In addition to the restrictions set forth in this Agreement, Recipient expressly covenants that it will not, at any time, use the Confidential Information or any knowledge gained through its engagement with Company to directly or indirectly: (a) develop, produce, or assist in the creation of any platform, product, service, or business that is competitive with or derivative of Company's platform or business concepts; (b) circumvent Company's business opportunities by using information obtained from Company to engage in or facilitate a similar venture, or by diverting actual or potential customers, partners, or experts away from Company; or (c) otherwise exploit Company's Confidential Information or trade secrets to the detriment of Company's interests. This means that Recipient cannot take the ideas, strategies, designs, or any other proprietary elements learned from Company and attempt to create a competing platform or undertake a competing initiative, either on Recipient's own behalf or in collaboration with others. Recipient acknowledges that Company's business model and intellectual property are unique and valuable, and Recipient agrees not to act in any manner that would deprive Company of the benefit of its confidential ideas or lead to unauthorized competition, whether during the term of any engagement or at any time thereafter. (For clarity, nothing in this Section shall prevent Recipient from using general skills and experience acquired over time, as long as Recipient does not use Company's protected information. But any doubt as to whether something would violate this clause should be resolved in favor of protecting Company's rights.)",
  },

  { t: "sh", n: "5.", h: "Exclusions from Confidential Information." },
  {
    t: "p",
    text: "Confidential Information does not include information that: (i) is or becomes publicly available without breach of this Agreement by Recipient; (ii) information that is publicly known as of the Effective Date or becomes public thereafter through no wrongful act of Recipient is not protected by this Agreement; (iii) was already known to Recipient on a non-confidential basis prior to disclosure by Company, as evidenced by Recipient's written records; (iv) is lawfully obtained by Recipient from a third party who has the right to disclose it, and who did not obtain it from Company under obligation of confidentiality; and (v) is independently developed by Recipient without use of or reference to any Confidential Information of Company, as demonstrated by competent evidence.",
  },

  { t: "sh", n: "6.", h: "Legal Disclosure." },
  {
    t: "p",
    text: "If Recipient is required by applicable law, regulation, or court order to disclose any Confidential Information, it shall notify the Disclosing Party (to the extent legally permissible) prior to disclosure and shall disclose only that portion of the Confidential Information which is legally required, while seeking confidential treatment to the greatest extent possible.",
  },

  { t: "sh", n: "7.", h: "Feedback." },
  {
    t: "p",
    text: 'If Recipient provides any feedback, suggestions, recommendations, or other input regarding Company\'s products, services, or business ("Feedback"), Company shall be free to use and incorporate that Feedback in its business at its sole discretion, without obligation or compensation to Recipient. Recipient acknowledges that any Feedback it provides is given voluntarily and shall be deemed non-confidential to Recipient and fully owned by Company once provided. Recipient hereby assigns to Company all rights, title, and interest in and to any such Feedback as part of the Developments mentioned above.',
  },

  { t: "sh", n: "8.", h: "Term; Survival." },
  {
    t: "p",
    text: "This Agreement is effective as of the Effective Date and shall remain in effect for a period of five (5) years following disclosure of the Confidential Information. The confidentiality, nondisclosure, non-use, and non-circumvention obligations contained in this Agreement shall survive indefinitely, until such time as all Confidential Information becomes publicly known and made generally available through no action or inaction of Recipient (and without breaching this Agreement). The Parties acknowledge that certain Confidential Information provided may constitute trade secrets under applicable law, and any trade secret information shall remain subject to these confidentiality obligations for so long as it remains a trade secret under law. In no event shall the confidentiality obligations expire in less than a minimum of five (5) years from the date of disclosure, regardless of whether this Agreement is earlier terminated. Section 4 (\"Non-Competition; Non-Circumvention\") and Section 3 (\"Intellectual Property Rights\") of this Agreement shall likewise survive indefinitely in order to protect Company's rights in its intellectual property and proprietary information. Notwithstanding the foregoing, any regulatory-sensitive or investigational product-related information shall remain confidential indefinitely, until such information becomes publicly available through no breach of this Agreement, or until terminated by mutual written agreement of the Parties, or superseded by a subsequent written agreement. All provisions protecting Confidential Information shall survive any termination or expiration of this Agreement.",
  },

  { t: "sh", n: "9.", h: "Return or Destruction of Information." },
  {
    t: "p",
    text: "Upon the completion of the Parties' business discussions or any engagement, or upon earlier request by Company, Recipient shall immediately cease use of all Confidential Information and, at Company's option, either return to Company or destroy all tangible materials (including documents, files, notebooks, electronic media, and storage devices) in Recipient's possession or control that contain Confidential Information. If requested by Company, Recipient shall provide a written certification, signed by an authorized person, verifying that all such materials have been returned or completely destroyed and that no copies have been retained. As an exception, Recipient may retain one archival copy of the Confidential Information solely for the purpose of complying with legal or regulatory requirements or documenting its obligations under this Agreement; however, any retained copy shall remain subject to all confidentiality and non-use obligations set forth herein for as long as it is retained.",
  },

  { t: "sh", n: "10.", h: "Injunctive Relief; Remedies." },
  {
    t: "p",
    text: "Recipient acknowledges that a breach or threatened breach of this Agreement by Recipient may cause irreparable harm to Company for which monetary damages may be difficult to ascertain or an inadequate remedy. In the event of any actual or threatened breach of this Agreement, Recipient agrees that Company is entitled to seek immediate injunctive relief and other equitable relief, without necessity of posting a bond or proving actual damages, to restrain such breach. Such relief shall be in addition to any other legal or equitable remedies available to Company, including, but not limited to, an award of damages. Recipient further agrees that if it breaches any obligations under this Agreement, it shall indemnify Company for any losses or harm resulting from such breach, including all reasonable attorneys' fees and costs incurred by Company in enforcing its rights.",
  },

  { t: "sh", n: "11.", h: "Governing Law; Venue." },
  {
    t: "p",
    text: "This Agreement shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of laws principles. Venue for any dispute arising out of or relating to this Agreement shall be exclusively in the state or federal courts located within city and county of New York, state of New York, and the Parties hereby consent to the personal jurisdiction of such courts. The Parties agree that the Prevailing Party in any legal action to enforce this Agreement shall be entitled to recover its reasonable attorneys' fees and costs from the other Party, in addition to any other relief granted.",
  },

  { t: "sh", n: "12.", h: "Notices." },
  {
    t: "p",
    text: "Any notice required or permitted to be given under or relating to this Agreement shall be in writing and shall be sent by email to the addresses below, as well as personally delivered by either: (i) certified mail, return receipt requested, postage prepaid, or (ii) by overnight courier to the other Party.",
  },
  {
    t: "addr",
    label: "If to Company:",
    lines: [
      "Marks DiPalermo Wilson PLLC",
      "Counsel to Whodini App Ltd.",
      "485 Madison Avenue, Floor 16th",
      "New York, NY 10022",
      "Attn: Cabot Marks, Esq.",
      "Email: cjmarks@mdw.law",
      "With a copy to: agnes@whodini.io",
    ],
  },
  {
    t: "addr",
    label: "If to Recipient:",
    lines: [
      "Agnes Jamora",
      "c/o MDW Law",
      "485 Madison Avenue, Floor 16th",
      "New York, NY 10022",
      "Email: agnes@whodini.io",
    ],
  },
  {
    t: "p",
    text: "Notices shall be deemed effective as of three (3) business days after the date of mailing (in the case of notice given by mail) or on the date of delivery if hand delivered, including delivery by overnight courier. Either Party may at any time change its address for notification purposes by mailing or delivering a notice as required hereinabove stating the change and setting forth the new address.",
  },

  { t: "sh", n: "13.", h: "Miscellaneous." },
  {
    t: "sub",
    l: "A.",
    h: "No Publicity.",
    text: "Recipient shall not make any public announcements or disclosures about the existence of discussions or any potential business relationship with Company, nor use Company's name, logo, or trademarks, without prior written consent from Company.",
  },
  {
    t: "sub",
    l: "B.",
    h: "No Waiver.",
    text: "No failure or delay by Company in exercising any right, power, or privilege under this Agreement shall operate as a waiver thereof, nor shall any single or partial exercise of any right or remedy preclude any other or further exercise of that or any other right or remedy. Any waiver of any provision of this Agreement will be effective only if in writing and signed by an authorized representative of Company.",
  },
  {
    t: "sub",
    l: "C.",
    h: "No Obligation to Proceed.",
    text: "This Agreement imposes no obligation on either Party to proceed with any transaction or relationship, and each Party reserves the right to discontinue discussions at any time. If the Parties decide to pursue a business relationship, the terms of that relationship will be set forth in a separate definitive agreement. In the absence of such a definitive agreement, no Party shall be bound to any business arrangement by virtue of this Agreement, except for the obligations of confidentiality and related provisions contained herein.",
  },
  {
    t: "sub",
    l: "D.",
    h: "Entire Agreement; Amendments.",
    text: "This Agreement constitutes the entire agreement between the Parties with respect to the subject matter (confidential information and related obligations) and supersedes all prior or contemporaneous understandings regarding that subject matter. Any amendments or modifications to this Agreement must be made in writing and signed by both Parties.",
  },
  {
    t: "sub",
    l: "E.",
    h: "Severability.",
    text: "If any provision of this Agreement is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions of this Agreement will remain in full force and effect. The Parties agree to substitute any invalid provision with a valid provision that most closely approximates the intent and economic effect of the invalid provision.",
  },
  {
    t: "sub",
    l: "F.",
    h: "Assignment.",
    text: "Recipient may not assign or transfer any rights or obligations under this Agreement to any third party (whether by assignment, merger, operation of law, or otherwise) without the prior written consent of Company. Any attempt to do so without consent is void. This Agreement shall be binding upon and inure to the benefit of the Parties and their respective permitted successors and assigns.",
  },
  {
    t: "sub",
    l: "G.",
    h: "Signatures; Counterparts.",
    text: "This Agreement may be executed in counterparts (including by facsimile or electronic PDF signature), each of which will be deemed an original and all of which together shall constitute one and the same instrument. The Parties agree that electronic signatures shall be legally valid and enforceable.",
  },

  { t: "end", text: "— End of Agreement —" },
];

// ── Renderer ──────────────────────────────────────────────────────────────────

function renderBlock(block: Block, i: number) {
  switch (block.t) {
    case "title":
      return (
        <p key={i} className="mb-4 text-center text-[13px] font-bold uppercase leading-snug text-white">
          {block.text}
        </p>
      );
    case "p":
      return (
        <p key={i} className="mb-3 text-[12.5px] leading-relaxed text-[#999] text-justify">
          {block.text}
        </p>
      );
    case "sh":
      return (
        <p key={i} className="mb-2 mt-4 text-[12.5px] font-bold text-white">
          {block.n} {block.h}
        </p>
      );
    case "sub":
      return (
        <p key={i} className="mb-3 pl-3 text-[12.5px] leading-relaxed text-justify">
          <span className="font-semibold text-white/90">{block.l} {block.h} </span>
          <span className="text-[#999]">{block.text}</span>
        </p>
      );
    case "addr":
      return (
        <div key={i} className="my-3 rounded-[8px] border border-white/10 bg-white/6 p-3">
          <p className="mb-1.5 text-[12px] font-semibold text-white/80">{block.label}</p>
          {block.lines.map((line, j) => (
            <p key={j} className="text-[12px] leading-relaxed text-[#999]">{line}</p>
          ))}
        </div>
      );
    case "end":
      return (
        <p key={i} className="mt-4 text-center text-[12px] text-white/40">
          {block.text}
        </p>
      );
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

type Props = {
  open: boolean;
  onAccept: () => void;
  onClose: () => void;
};

export default function NdaModal({ open, onAccept, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex w-full max-w-[680px] flex-col rounded-[16px] border border-white/12 bg-[#1A001D] p-8" style={{ maxHeight: "90vh" }}>

        {/* Header */}
        <div className="mb-5 flex shrink-0 items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#F62C7D]/20">
            <ScrollText className="size-5 text-[#F62C7D]" />
          </div>
          <h2 className="text-[18px] font-bold text-white">Non-Disclosure Agreement</h2>
        </div>

        {/* Scrollable NDA content */}
        <div className="scrollbar-styled mb-5 min-h-0 flex-1 overflow-y-auto rounded-[10px] border border-white/10 bg-white/6 p-5 pr-4">
          {NDA.map((block, i) => renderBlock(block, i))}
        </div>

        {/* Footer */}
        <div className="shrink-0">
          <p className="mb-4 text-[13px] text-[#999]">
            You must accept this agreement before creating your account.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onAccept}
              className="h-[48px] flex-1 rounded-full bg-[#F62C7D] text-[14.4px] font-semibold text-white shadow-[rgba(246,44,125,0.35)_0px_4px_20px_0px] transition-opacity hover:opacity-90"
            >
              I Accept
            </button>
            <button
              onClick={onClose}
              className="h-[48px] rounded-full border border-white/20 px-6 text-[14.4px] font-semibold text-white/70 transition-all hover:border-white/40 hover:text-white"
            >
              Decline
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
