import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, MapPin, Phone, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const bloodBanks = [
  { name: "LifeSource Blood Center", address: "123 Vital Ave, Los Angeles", phone: "(555) 123-4567", map: "https://maps.google.com" },
  { name: "Community Blood Bank", address: "456 Hope St, Los Angeles", phone: "(555) 765-4321", map: "https://maps.google.com" },
  { name: "Red River Donations", address: "789 Grace Ln, Los Angeles", phone: "(555) 888-9999", map: "https://maps.google.com" },
];

const hospitals = [
  { name: "City General Hospital", address: "101 Health Blvd, Los Angeles", phone: "(555) 222-3333", map: "https://maps.google.com" },
  { name: "St. Jude Medical Center", address: "202 Mercy Way, Los Angeles", phone: "(555) 444-5555", map: "https://maps.google.com" },
  { name: "LA County+USC Medical Center", address: "303 Wellness Rd, Los Angeles", phone: "(555) 666-7777", map: "https://maps.google.com" },
];


export default function NearbyPage() {
    return (
        <div className="container mx-auto py-8 px-4">
            <section className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">Find Help Nearby</h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    Locate blood banks and hospitals near you. Get contact information and directions instantly.
                </p>
            </section>
            
            <div className="relative w-full h-96 rounded-lg overflow-hidden mb-12 shadow-lg">
                <Image
                    src="https://placehold.co/1200x400"
                    alt="Map of nearby resources"
                    fill
                    className="object-cover"
                    data-ai-hint="city map"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h2 className="text-4xl font-bold text-white font-headline">Map View Coming Soon</h2>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4 font-headline flex items-center gap-2"><Pin className="text-primary"/> Blood Banks</h2>
                    <div className="space-y-4">
                        {bloodBanks.map(bank => (
                            <Card key={bank.name} className="shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-lg">{bank.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-muted-foreground">
                                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4"/>{bank.address}</p>
                                    <p className="flex items-center gap-2"><Phone className="h-4 w-4"/>{bank.phone}</p>
                                </CardContent>
                                <CardContent>
                                    <Button asChild variant="outline" className="w-full">
                                        <Link href={bank.map} target="_blank">View on Map</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4 font-headline flex items-center gap-2"><Building className="text-primary"/> Hospitals</h2>
                    <div className="space-y-4">
                        {hospitals.map(hospital => (
                            <Card key={hospital.name} className="shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-lg">{hospital.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-muted-foreground">
                                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4"/>{hospital.address}</p>
                                    <p className="flex items-center gap-2"><Phone className="h-4 w-4"/>{hospital.phone}</p>
                                </CardContent>
                                <CardContent>
                                     <Button asChild variant="outline" className="w-full">
                                        <Link href={hospital.map} target="_blank">View on Map</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
