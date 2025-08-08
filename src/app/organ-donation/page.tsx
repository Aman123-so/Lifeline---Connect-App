import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HandHeart, LifeBuoy, BookOpen } from "lucide-react";

export default function OrganDonationPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">Become a Hero</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Pledge to donate your organs and give someone the ultimate gift of life. Your decision can save up to eight lives.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <HandHeart className="text-primary" />
              Pledge Your Organs
            </CardTitle>
            <CardDescription>
              Join the registry of life-savers. Fill in your details to make your pledge.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Your full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Your email address" />
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox id="confirmPledge" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="confirmPledge"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I confirm my wish to be an organ donor.
                  </label>
                  <p className="text-sm text-muted-foreground">
                    You understand this is a pledge and should be discussed with your family.
                  </p>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Make My Pledge
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><LifeBuoy className="text-primary" /> Why It Matters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>Organ donation is a generous act that can save lives. One donor can save up to 8 lives through organ donation and enhance more than 75 lives through tissue donation.</p>
                    <p>There is a critical shortage of organs, and the gap between the number of organs donated and the number of people waiting for a transplant is growing.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><BookOpen className="text-primary" /> The Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground">
                    <h3 className="font-semibold text-foreground">1. Pledge</h3>
                    <p>Register your intent to be a donor. It's a simple, yet powerful step.</p>
                    <h3 className="font-semibold text-foreground">2. Inform Family</h3>
                    <p>Discuss your decision with your family. Their consent is crucial at the time of donation.</p>
                    <h3 className="font-semibold text-foreground">3. Verification</h3>
                    <p>In the event of brain death, doctors will confirm your pledge and consult your family for consent.</p>
                     <h3 className="font-semibold text-foreground">4. Giving Life</h3>
                    <p>If consent is given, organs are retrieved and transplanted to patients in need, giving them a new lease on life.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
