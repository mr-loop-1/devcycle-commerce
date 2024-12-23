import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <div className="fixed bottom-4 right-4 z-10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="border-purple-700 border-4 text-white p-3 rounded-full shadow-lg cursor-pointer"
        >
          <img src="/chat.svg" />
        </button>
      </div>
      {isOpen && (
        <div className="fixed bottom-16 right-16 z-20 bg-pink-50 shadow-lg p-1 rounded-lg w-64">
          <Card className="bg-white ">
            <CardHeader>
              <CardTitle>Have a Query?</CardTitle>
              <CardDescription>
                Chat with our sales agent in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <input className="w-full h-20 border-pink-500 border-2" />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsOpen(() => false)}>
                Cancel
              </Button>
              <Button
                className="bg-blue-700"
                onClick={() => setIsOpen(() => false)}
              >
                Chat
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
