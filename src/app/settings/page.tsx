"use client";

import { useState } from 'react';
import { useSettings } from "@/contexts/SettingsContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { generateCustomWordSet, GenerateCustomWordSetInput } from "@/ai/flows/generate-custom-word-set";
import { Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const { isBackspaceEnabled, toggleBackspace, isAudioEnabled, toggleAudio, setCustomText } = useSettings();
  const { toast } = useToast();

  const [genAiType, setGenAiType] = useState<"words" | "quote">("words");
  const [genAiTopic, setGenAiTopic] = useState("");
  const [genAiLength, setGenAiLength] = useState(50);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateText = async () => {
    setIsLoading(true);
    try {
      const input: GenerateCustomWordSetInput = {
        type: genAiType,
        topic: genAiTopic || (genAiType === "words" ? "common" : "inspiration"),
        length: genAiLength
      };
      const result = await generateCustomWordSet(input);
      if (result && result.content) {
        setCustomText(result.content);
        toast({
          title: "Success!",
          description: `Generated a new set of ${genAiType}. Go to the Test page to start.`,
        });
      } else {
        throw new Error("Failed to generate content.");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not generate custom text. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-headline text-center mb-8">Settings</h1>
      <div className="w-full max-w-2xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Typing Behavior</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="backspace-toggle">Enable Backspace</Label>
              <Switch
                id="backspace-toggle"
                checked={isBackspaceEnabled}
                onCheckedChange={toggleBackspace}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="audio-toggle">Audio Feedback on Keystroke</Label>
              <Switch
                id="audio-toggle"
                checked={isAudioEnabled}
                onCheckedChange={toggleAudio}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Generate Custom Text</CardTitle>
            <CardDescription>
              Use AI to generate a custom set of words or a quote for your typing test.
              The generated text will be used for your next test.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="genai-type">Content Type</Label>
                <Select value={genAiType} onValueChange={(v: "words" | "quote") => setGenAiType(v)}>
                  <SelectTrigger id="genai-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="words">Words</SelectItem>
                    <SelectItem value="quote">Quote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="genai-topic">Topic</Label>
                <Input
                  id="genai-topic"
                  placeholder="e.g., programming, space, nature"
                  value={genAiTopic}
                  onChange={(e) => setGenAiTopic(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="genai-length">Approx. Length (words)</Label>
              <Input
                id="genai-length"
                type="number"
                value={genAiLength}
                onChange={(e) => setGenAiLength(Number(e.target.value))}
                min="10"
                max="200"
              />
            </div>
            <Button onClick={handleGenerateText} disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
