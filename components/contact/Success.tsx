import { CheckCircle2 } from "lucide-react";

const Success = () => {
  return (
    <div className="mb-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />

      <div>
        <h3 className="text-emerald-400 font-medium mb-1">
          Message sent successfully
        </h3>

        <p className="text-sm text-emerald-200/70">
          Thanks for reaching out! We will get back to you shortly.
        </p>
      </div>
    </div>
  );
};

export default Success;
