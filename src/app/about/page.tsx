import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-headline text-center mb-8">About Typecraft</h1>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="font-headline">Welcome to Typecraft</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Typecraft is a modern, minimalist typing test application inspired by the sleek design and user experience of Monkeytype.
            It's built to be fast, responsive, and a pleasure to use, whether you're on a desktop or a mobile device.
          </p>
          <p>
            Our goal is to provide a clean and focused environment to help you practice and improve your typing skills.
            Track your Words Per Minute (WPM), accuracy, and see your progress over time with our real-time performance graph.
          </p>
          <p>
            This app is built with Next.js, Tailwind CSS, and leverages GenAI for custom word set and quote generation.
          </p>
          <p>Happy typing!</p>
        </CardContent>
      </Card>
    </div>
  );
}
