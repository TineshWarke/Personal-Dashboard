'use client';

import React from 'react';

const quotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts. — Winston Churchill",
    "Believe you can and you're halfway there. — Theodore Roosevelt",
    "Opportunities don't happen. You create them. — Chris Grosser",
    "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
    "It always seems impossible until it's done. — Nelson Mandela",
    "The future depends on what you do today. — Mahatma Gandhi",
    "Your time is limited, so don’t waste it living someone else’s life. — Steve Jobs",
    "The only way to do great work is to love what you do. — Steve Jobs",
    "What we achieve inwardly will change outer reality. — Plutarch",
    "The best time to plant a tree was 20 years ago. The second best time is now. — Chinese Proverb",
    "Don't wait for opportunity. Create it. — Anonymous",
    "Do one thing every day that scares you. — Eleanor Roosevelt",
    "Your limitation—it’s only your imagination. — Anonymous",
    "Push yourself, because no one else is going to do it for you. — Anonymous",
    "Great things never come from comfort zones. — Anonymous",
    "Dream it. Wish it. Do it. — Anonymous",
    "Success doesn’t just find you. You have to go out and get it. — Anonymous",
    "The harder you work for something, the greater you’ll feel when you achieve it. — Anonymous",
    "Dream bigger. Do bigger. — Anonymous",
    "Don’t stop when you’re tired. Stop when you’re done. — Anonymous",
    "Wake up with determination. Go to bed with satisfaction. — Anonymous",
    "If you want to achieve greatness stop asking for permission. — Anonymous",
    "Success is the sum of small efforts, repeated day in and day out. — Robert Collier",
    "The only place where success comes before work is in the dictionary. — Vidal Sassoon",
    "The way to get started is to quit talking and begin doing. — Walt Disney",
    "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
    "If you can dream it, you can do it. — Walt Disney",
    "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart. — Roy T. Bennett",
    "Everything you’ve ever wanted is on the other side of fear. — George Addair",
    "Success is not the key to happiness. Happiness is the key to success. — Albert Schweitzer",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. — Christian D. Larson",
    "Everything you can imagine is real. — Pablo Picasso",
    "Act as if what you do makes a difference. It does. — William James",
    "Success is liking yourself, liking what you do, and liking how you do it. — Maya Angelou",
    "It’s not whether you get knocked down, it’s whether you get up. — Vince Lombardi",
    "The secret of getting ahead is getting started. — Mark Twain",
    "I find that the harder I work, the more luck I seem to have. — Thomas Jefferson",
    "You miss 100% of the shots you don’t take. — Wayne Gretzky",
    "I am not a product of my circumstances. I am a product of my decisions. — Stephen Covey",
    "Go the extra mile. It’s never crowded. — Wayne Dyer",
    "You don't have to be great to start, but you have to start to be great. — Zig Ziglar",
    "The only limit to our realization of tomorrow is our doubts of today. — Franklin D. Roosevelt",
    "It’s not about perfect. It’s about effort. — Jillian Michaels",
    "Your passion is waiting for your courage to catch up. — Isabelle Lafleche",
    "Believe in yourself and all that you are. — Christian D. Larson",
    "Doubt kills more dreams than failure ever will. — Suzy Kassem",
    "We may encounter many defeats but we must not be defeated. — Maya Angelou",
    "The only way to achieve the impossible is to believe it is possible. — Charles Kingsleigh",
    "There are no limits to what you can accomplish, except the limits you place on your own thinking. — Brian Tracy",
    "It does not matter how slowly you go as long as you do not stop. — Confucius",
    "You don’t have to be perfect to be amazing. — Anonymous",
    "I never dreamed about success. I worked for it. — Estée Lauder",
    "The key to success is to focus on goals, not obstacles. — Anonymous",
    "Don't limit your challenges. Challenge your limits. — Anonymous",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us. — Ralph Waldo Emerson",
    "Life is 10% what happens to us and 90% how we react to it. — Charles R. Swindoll",
    "The only person you are destined to become is the person you decide to be. — Ralph Waldo Emerson",
    "The road to success and the road to failure are almost exactly the same. — Colin R. Davis",
    "Success is a journey, not a destination. — Ben Sweetland",
    "Opportunities are never lost; someone will take the ones you miss. — Andy Rooney",
    "To live a creative life, we must lose our fear of being wrong. — Joseph Chilton Pearce",
    "Success is how high you bounce when you hit bottom. — George S. Patton",
    "Hardships often prepare ordinary people for an extraordinary destiny. — C.S. Lewis",
    "Success usually comes to those who are too busy to be looking for it. — Henry David Thoreau",
    "The harder you work, the luckier you get. — Gary Player",
    "What seems to us as bitter trials are often blessings in disguise. — Oscar Wilde",
    "I would rather die on my feet than live on my knees. — Emiliano Zapata",
    "It’s never too late to be what you might have been. — George Eliot",
    "Be the change that you wish to see in the world. — Mahatma Gandhi",
    "If you don’t value your time, neither will others. — Unknown",
    "To be the best, you must be able to handle the worst. — Wilson Kanadi",
    "Your greatest enemy is yourself. — Anonymous",
    "Don’t wait for opportunities, create them. — Anonymous",
    "Victory is always possible for the person who refuses to stop fighting. — Napoleon Hill",
    "In the middle of every difficulty lies opportunity. — Albert Einstein",
    "Power comes in response to a need, not a desire. You have to create that need. — Goku, Dragon Ball Z",
    "A lesson without pain is meaningless. That’s because no one can gain without sacrificing something. But by enduring that pain and overcoming it, he shall obtain a powerful, unmatched heart. — Edward Elric, Fullmetal Alchemist",
    "When you give up, that's when the game is over. — Naruto Uzumaki, Naruto",
    "The world isn’t perfect, but it’s there for us, doing the best it can… that’s what makes it so damn beautiful. — Roy Mustang, Fullmetal Alchemist",
    "A person grows up when he's able to overcome hardships. — Jiraiya, Naruto",
    "It’s not about how many times you fall, it’s about how many times you get back up. — Kenshin Himura, Rurouni Kenshin",
    "Power comes in response to a need, not a desire. — Goku, Dragon Ball Z",
    "If you don’t take risks, you can’t create a future. — Monkey D. Luffy, One Piece",
    "No matter how deep the night, it always turns to day, eventually. — Brook, One Piece",
    "Life is not measured by the number of breaths we take, but by the moments that take our breath away. — Zoro, One Piece",
    "Strength is not about how much you can lift; it’s about how much you can endure. — Natsu Dragneel, Fairy Tail",
    "We are all different in some way. What you should do is accept your differences and live in harmony with others. — Sakura Haruno, Naruto",
    "If you don’t believe in yourself, no one will. — Mugen, Samurai Champloo",
    "I have to protect my friends. That’s my job. — Natsu Dragneel, Fairy Tail",
    "You can’t sit around envying other people’s worlds. You have to go out and change your own. — Naruto Uzumaki, Naruto",
    "The only thing we're allowed to do is believe that we won't regret the choice we made. — Levi Ackerman, Attack on Titan",
    "A lesson without pain is meaningless. — Edward Elric, Fullmetal Alchemist"
]

const getTodayQuote = () => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);  // Calculate the day of the year

    // Use modulo to pick a quote based on the day of the year
    const dayIndex = dayOfYear % quotes.length;

    return quotes[dayIndex];
};


const MotivationBox = () => {
    const quote = getTodayQuote();

    return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded shadow mb-6">
            <h3 className="font-semibold text-lg mb-2">🌟 Daily Motivation</h3>
            <p className="italic">“{quote}”</p>
        </div>
    );
};

export default MotivationBox;
