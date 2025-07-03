"use client";

import { useState } from 'react';
import { Lesson, lessons } from '@/lib/lessons';
import LessonTypingUI from '@/components/pages/LessonTypingUI';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckCircle, Lock } from 'lucide-react';

export default function LearnPage() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const handleSelectLesson = (lesson: Lesson, isLocked: boolean) => {
    if (!isLocked) {
        setSelectedLesson(lesson);
    }
  };

  const handleBackToLessons = () => {
    setSelectedLesson(null);
  };

  const handleMarkAsComplete = (lessonId: string) => {
    setCompletedLessons(prev => new Set(prev).add(lessonId));
    setSelectedLesson(null);
  };

  if (selectedLesson) {
    return (
      <LessonTypingUI 
        lesson={selectedLesson} 
        onBack={handleBackToLessons} 
        onComplete={handleMarkAsComplete}
      />
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-headline text-center mb-8">Learn Touch Typing</h1>
      <div className="w-full max-w-2xl space-y-4">
        {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.has(lesson.id);
            const isLocked = index > 0 && !completedLessons.has(lessons[index - 1].id);
            
            return (
                <Card 
                    key={lesson.id} 
                    className={cn(
                        "transition-all",
                        isLocked ? "bg-secondary/50 text-muted-foreground" : "hover:border-accent cursor-pointer",
                    )}
                    onClick={() => handleSelectLesson(lesson, isLocked)}
                >
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="font-headline text-xl">{lesson.title}</CardTitle>
                            <CardDescription>{lesson.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            {isCompleted && <CheckCircle className="w-6 h-6 text-green-500" />}
                            {isLocked && <Lock className="w-6 h-6 text-muted-foreground" />}
                        </div>
                    </CardHeader>
                </Card>
            )
        })}
      </div>
    </div>
  );
}
