import { Button } from "@/components/deploy-card/ui/button";
import { Card, CardContent } from "@/components/deploy-card/ui/card";

export const DeployCard: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="rounded-xl bg-white">
        <div className="flex flex-col md:flex-row gap-6 p-8">
          {/* Traditional Team Section */}
          <div className="flex flex-col gap-3">
            <div className="font-normal text-[#292929] text-xs leading-normal">A Traditional Team</div>

            <div>
              <div className="font-medium text-[#292929] text-sm leading-normal line-through">8 Hours Daily</div>

              <div className="mt-1.5 font-medium text-sm leading-normal">
                <span className="text-[#292929] line-through">$25,000 </span>
                <span className="text-[#2929294a] line-through">/ month</span>
              </div>
            </div>
          </div>

          {/* Oneshot AI Card */}
          <Card className="flex-1 border-[#00000008] shadow-[inset_0px_0px_14px_#ffffff1c] [background:radial-gradient(circle_at_bottom_right,rgba(227,146,227,0.15)_0%,rgba(187,144,242,0.15)_30%,transparent_70%)]">
            <CardContent className="px-4 py-2">
              <div className="flex flex-col md:flex-row md:items-center md:gap-0 justify-between">
                <div className="space-y-1">
                  <div className="font-light text-[#292929] text-lg tracking-tight leading-normal">Oneshot AI</div>

                  <div className="text-sm leading-normal">
                    <span className="text-[#c073ca] font-medium">24/7 </span>
                    <span className="text-[#292929] font-light">Operation</span>
                  </div>

                  <div className="text-sm leading-normal">
                    <span className="text-[#c073ca] font-medium">$3,000</span>
                    <span className="text-[#292929] font-light"> / month</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-medium text-[#c072ca] text-xs leading-normal">
                    // Unleash Elite AI &amp; Human Agents
                  </div>

                  <Button className="w-full md:w-64 h-8 rounded-lg border-none shadow-[inset_0px_4px_8.9px_#ffffff40] [background:linear-gradient(173deg,rgba(187,144,242,1)_0%,rgba(227,146,227,1)_100%)] text-white font-medium text-sm">
                    DEPLOY NOW
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
