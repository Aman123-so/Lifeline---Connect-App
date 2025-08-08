"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Droplet, Calendar, Award, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    
    // Mock user data
    const [userData, setUserData] = useState({
        name: 'Alex Doe',
        bloodType: 'O+',
        lastDonation: '2024-03-15',
        donations: 5,
        avatarUrl: 'https://placehold.co/100x100'
    });
    
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        setFormattedDate(new Date(userData.lastDonation).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }));
    }, [userData.lastDonation]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserData(prev => ({...prev, [id]: value}));
    };

    const handleSelectChange = (value: string) => {
         setUserData(prev => ({...prev, bloodType: value}));
    };

    const toggleEdit = () => setIsEditing(!isEditing);

    return (
        <div className="container mx-auto py-8 px-4">
            <section className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">Your Donor Profile</h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    Keep your information up-to-date to help us connect you with those in need effectively.
                </p>
            </section>

            <Card className="max-w-2xl mx-auto shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={userData.avatarUrl} alt={userData.name} data-ai-hint="person portrait" />
                            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="font-headline text-2xl">{isEditing ? <Input id="name" value={userData.name} onChange={handleInputChange} className="text-2xl font-bold" /> : userData.name}</CardTitle>
                            <CardDescription>Reliable Donor</CardDescription>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={toggleEdit}>
                        <Edit className="h-5 w-5"/>
                        <span className="sr-only">Edit Profile</span>
                    </Button>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                    {isEditing ? (
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); toggleEdit(); }}>
                            <div>
                                <Label htmlFor="bloodType">Blood Type</Label>
                                <Select onValueChange={handleSelectChange} defaultValue={userData.bloodType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select blood type..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {bloodTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                             <div>
                                <Label htmlFor="lastDonation">Last Donation Date</Label>
                                <Input id="lastDonation" type="date" value={userData.lastDonation} onChange={handleInputChange}/>
                            </div>
                            <Button type="submit" className="w-full">Save Changes</Button>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center text-lg">
                                <Droplet className="mr-3 h-5 w-5 text-primary" />
                                <span className="font-semibold mr-2">Blood Type:</span>
                                <Badge variant="secondary">{userData.bloodType}</Badge>
                            </div>
                            <div className="flex items-center text-lg">
                                <Calendar className="mr-3 h-5 w-5 text-primary" />
                                <span className="font-semibold mr-2">Last Donation:</span>
                                <span>{formattedDate}</span>
                            </div>
                             <div className="flex items-center text-lg">
                                <Award className="mr-3 h-5 w-5 text-primary" />
                                <span className="font-semibold mr-2">Total Donations:</span>
                                <span>{userData.donations}</span>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
