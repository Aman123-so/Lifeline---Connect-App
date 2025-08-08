"use client";

import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { intelligentAlertRouting, type IntelligentAlertRoutingOutput } from '@/ai/flows/intelligent-alert-routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, MapPin, Heart, Droplet, Phone } from 'lucide-react';

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const urgencies = ['Critical', 'High', 'Medium', 'Low'];

const formSchema = z.object({
  bloodType: z.string().min(1, 'Please select a blood type.'),
  hospital: z.string().min(1, 'Please enter a hospital name.'),
  urgency: z.string().min(1, 'Please select an urgency level.'),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<IntelligentAlertRoutingOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bloodType: '',
      hospital: '',
      urgency: '',
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setResults(null);
    try {
      // Mock hospital location for the demo. In a real app, this would come from a geocoding API.
      const response = await intelligentAlertRouting({
        bloodType: data.bloodType,
        hospitalLocation: { latitude: 34.0522, longitude: -118.2437 }, // Downtown LA
        urgency: data.urgency,
        radiusKm: 10,
      });
      setResults(response);
    } catch (error) {
      console.error('Error routing alert:', error);
      toast({
        title: 'Error',
        description: 'Failed to route the alert. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">Save a Life Today</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          In an emergency, every second counts. Instantly connect with nearby blood donors and resources when it matters most.
        </p>
      </section>

      <Card id="request-form" className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Droplet className="text-primary" />
            Request Blood
          </CardTitle>
          <CardDescription>Fill out the details below to find compatible donors near you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="bloodType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bloodTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hospital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital Name & City</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., City General Hospital, Los Angeles" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Urgency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency level..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {urgencies.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching for Donors...
                  </>
                ) : (
                  'Find Donors Now'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="text-center mt-8 flex items-center justify-center text-lg animate-in fade-in-50">
            <Loader2 className="mr-3 h-6 w-6 animate-spin text-primary" />
            <p>Contacting donors... Please wait.</p>
        </div>
      )}
      
      {results && (
        <div className="mt-12 animate-in fade-in-50 duration-500">
          <h2 className="text-3xl font-bold text-center mb-6 font-headline">Matching Donors Found</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.donorMatches.length > 0 ? (
              results.donorMatches.map((donor, index) => (
                <Card key={donor.donorId} className="shadow-md hover:shadow-xl transition-shadow animate-in fade-in-50 slide-in-from-bottom-5" style={{animationDelay: `${index * 100}ms`}}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="text-primary"/>
                        Donor {donor.donorId}
                      </div>
                      <span className="text-lg font-bold text-primary">{donor.bloodType}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{donor.distanceKm.toFixed(1)} km away</span>
                      </div>
                      {donor.isCompatible && (
                          <div className="mt-2 flex items-center gap-2 text-green-600 font-semibold">
                              <Heart className="h-4 w-4" />
                              <span>Compatible Match</span>
                          </div>
                      )}
                  </CardContent>
                  <CardFooter>
                      <Button className="w-full" variant="outline">
                          <Phone className="mr-2 h-4 w-4" />
                          Contact
                      </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground">
                No donors found matching your criteria. Please try expanding your search.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
