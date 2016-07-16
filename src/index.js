/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Warren Buffet Quote for a fact"
 *  Alexa: "Here's your Warren Buffet fact: ..."
 *
 *  User: "Alexa, ask Warren Buffet Quote for a quote"
 *  Alexa: "Here's your Warren Buffet quote: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[arn:aws:lambda:us-east-1:865873523851:function:mySecondFactSkill]";

/**
 * Array containing Warren Buffet quotes.
 */

var QUOTES = [
    "I never attempt to make money on the stock market. I buy on the assumption that they could close the market the next day and not reopen it for five years.",
    "Only buy something that you'd be perfectly happy to hold if the market shut down for 10 years.",
    "If you aren't willing to own a stock for ten years, don't even think about owning it for ten minutes",
    "When we own portions of outstanding businesses with outstanding managements, our favorite holding period is forever.",
    "Time is the friend of the wonderful company, the enemy of the mediocre.",
    "Over the long term, the stock market news will be good. In the 20th century, the United States endured tow world wars and other traumatic and expensive military conflicts; the Depression; a dozen or so recessions and financial panics; oil shocks; a fly epidemic; and the resignation of a disgraced president. Yet the Dow rose from 66 to 11,497.",
    "Charlie and I would follow a buy-and-hold policy even if we ran a tax-exempt institution.",
    "Someone's sitting in the shade today because someone planted a tree a long time ago.",
    "Calling someone who trades actively in the market an investor is like calling someone who repeatedly engages in one-night stands a romantic.",
    "Successful Investing takes time, discipline and patience. No matter how great the talent or effort, some things just take time: You can't produce a baby in one month by getting nine women pregnant.",
    "Buy a stock the way you would buy a house. Understand and like it such that you'd be content to own it in the absence of any market.",
    "I call investing the greatest business in the world … because you never have to swing. You stand at the plate, the pitcher throws you General Motors at 47! U.S. Steel at 39! and nobody calls a strike on you. There's no penalty except opportunity lost. All day you wait for the pitch you like; then when the fielders are asleep, you step up and hit it.",
    "You do things when the opportunities come along. I've had periods in my life when I've had a bundle of ideas come along, and I've had long dry spells. If I get an idea next week, I'll do something. If not, I won't do a damn thing.",
    "Opportunities come infrequently. When it rains gold, put out the bucket, not the thimble",
    "An investor should act as though he had a lifetime decision card with just twenty punches on it.",
    "You only have to do a very few things right in your life so long as you don't do too many things wrong.",
    "It is not necessary to do extraordinary things to get extraordinary results.",
    "What an investor needs is the ability to correctly evaluate selected businesses. Note that word ‘selected': You don't have to be an expert on every company, or even many. You only have to be able to evaluate companies within your circle of competence. The size of that circle is not very important; knowing its boundaries, however, is vital.",
    "What counts for most people in investing is not how much they know, but rather how realistically they define what they don't know.",
    "There is nothing wrong with a ‘know nothing' investor who realizes it. The problem is when you are a ‘know nothing' investor but you think you know something.",
    "You don't need to be a rocket scientist. Investing is not a game where the guy with the 160 IQ beats the guy with 130 IQ.",
    "We make no attempt to pick the few winners that will emerge from an ocean of unproven enterprises. We're not smart enough to do that, and we know it. Instead, we try to apply Aesop's 2,600-year-old equation to opportunities in which we have reasonable confidence as to how many birds are in the bush and when they will emerge.",
    "The key to investing is not assessing how much an industry is going to affect society, or how much it will grow, but rather determining the competitive advantage of any given company and, above all, the durability of that advantage.",
    "Stocks of companies selling commodity-like products should come with a warning label: ‘Competition may prove hazardous to human wealth.'",
    "A horse that can count to ten is a remarkable horse—not a remarkable mathematician.",
    "Our approach is very much profiting from lack of change rather than from change. With Wrigley chewing gum, it's the lack of change that appeals to me.",
    "Long ago, Ben Graham taught me that ‘Price is what you pay; value is what you get.' Whether we're talking about socks or stocks, I like buying quality merchandise when it is marked down.",
    "It's far better to buy a wonderful company at a fair price than a fair company at a wonderful price",
    "For the investor, a too-high purchase price for the stock of an excellent company can undo the effects of a subsequent decade of favorable business developments.",
    "Most people get interested in stocks when everyone else is. The time to get interested is when no one else is. You can't buy what is popular and do well.",
    "The best thing that happens to us is when a great company gets into temporary trouble…We want to buy them when they're on the operating table.",
    "Be fearful when others are greedy and greedy only when others are fearful.",
    "So smile when you read a headline that says ‘Investors lose as market falls.' Edit it in your mind to ‘Disinvestors lose as market falls—but investors gain.' Though writers often forget this truism, there is a buyer for every seller and what hurts one necessarily helps the other.",
    "The most common cause of low prices is pessimism—some times pervasive, some times specific to a company or industry. We want to do business in such an environment, not because we like pessimism but because we like the prices it produces. It's optimism that is the enemy of the rational buyer.",
    "Should you find yourself in a chronically leaking boat, energy devoted to changing vessels is likely to be more productive than energy devoted to patching leaks.",
    "The most important thing to do if you find yourself in a hole is to stop digging.",
    "Risk comes from not knowing what you're doing.",
    "Rule No. 1: never lose money; rule No. 2: don't forget rule No. 1",
    "When forced to choose, I will not trade even a night's sleep for the chance of extra profits.",
    "Keep all your eggs in one basket, but watch that basket closely.",
    "Diversification is a protection against ignorance. It makes very little sense for those who know what they're doing.",
    "We believe that a policy of portfolio concentration may well decrease risk if it raises, as it should, both the intensity with which an investor thinks about a business and the comfort-level he must feel with its economic characteristics before buying into it. In stating this opinion, we define risk, using dictionary terms, as 'the possibility of loss or injury'.",
    "It's only when the tide goes out that you learn who has been swimming naked.",
    "When you combine ignorance and leverage, you get some pretty interesting results.",
    "I've seen more people fail because of liquor and leverage – leverage being borrowed money. You really don't need leverage in this world much. If you're smart, you're going to make a lot of money without borrowing.",
    "I always knew I was going to be rich. I don't think I ever doubted it for a minute.",
    "People always ask me where they should go to work, and I always tell them to go to work for whom they admire the most.",
    "Never give up searching for the job that you are passionate about",
    "…not doing what we love in the name of greed is very poor management of our lives.",
    "I learned to go into business only with people whom I like, trust, and admire.",
    "In the world of business, the people who are most successful are those who are doing what they love.",
    "There comes a time when you ought to start doing what you want. Take a job that you love. You will jump out of bed in the morning. I think you are out of your mind if you keep taking jobs that you don't like because you think it will look good on your resume. Isn't that a little like saving up sex for your old age?",
    "I'm not interested in cars and my goal is not to make people envious. Don't confuse the cost of living with the standard of living.",
    "Do not save what is left after spending; instead spend what is left after saving.",
    "If you buy things you do not need, soon you will have to sell things you need.",
    "Chains of habit are too light to be felt until they are too heavy to be broken.",
    "By the age of 10, I'd read every book in the Omaha public library about investing, some twice. You need to fill your mind with various competing thoughts and decide which make sense. Then you have to jump in the water – take a small amount of money and do it yourself. Investing on paper is like reading a romance novel vs. doing something else. You'll soon find out whether you like it. The earlier you start, the better.",
    "The most important investment you can make is in yourself.",
    "Imagine that you had a car and that was the only car you'd have for your entire lifetime. Of course, you'd care for it well, changing the oil more frequently than necessary, driving carefully, etc. Now, consider that you only have one mind and one body. Prepare them for life, care for them. You can enhance your mind over time. A person's main asset is themselves, so preserve and enhance yourself.",
    "Life is like a snowball. The important thing is finding wet snow and a really long hill.",
    "You've gotta keep control of your time, and you can't unless you say no. You can't let people set your agenda in life.",
    "The difference between successful people and really successful people is that really successful people say no to almost everything.",
    "It's better to hang out with people better than you. Pick out associates whose behavior is better than yours and you'll drift in that direction.",
    "Writing a check separates a commitment from a conversation.",
    "Tell me who your heroes are and I'll tell you how you'll turn out to be.",
    "It takes 20 years to build a reputation and five minutes to ruin it. If you think about that, you'll do things differently.",
    "Honesty is a very expensive gift, don't expect it from cheap people.",
    "I won't close down a business of subnormal profitability merely to add a fraction of a point to our corporate returns. I also feel it inappropriate for even an exceptionally profitable company to fund an operation once it appears to have unending losses in prospect. Adam Smith would disagree with my first proposition and Karl Marx would disagree with my second; the middle ground is the only position that leaves me comfortable.",
    "I don't have a problem with guilt about money. The way I see it is that my money represents an enormous number of claim checks on society. It's like I have these little pieces of paper that I can turn into consumption. If I wanted to, I could hire 10,000 people to do nothing but paint my picture every day for the rest of my life. And the GDP would go up. But the utility of the product would be zilch, and I would be keeping those 10,000 people from doing AIDS research, or teaching, or nursing. I don't do that though. I don't use very many of those claim checks. There's nothing material I want very much. And I'm going to give virtually all of those claim checks to charity when my wife and I die.",
    "If your employees, including your CEO, wish to give to their alma maters or other institutions to which they feel a personal attachment, we believe they should use their own money, not yours.",
    "I believe in giving my kids enough so they can do anything, but not so much that they can do nothing.",
    "We've long felt that the only value of stock forecasters is to make fortune tellers look good. Even now, Charlie and I continue to believe that short-term market forecasts are poison and should be kept locked up in a safe place, away from children and also from grown-ups who behave in the market like children.",
    "In the 54 years (Charlie Munger and I) have worked together, we have never forgone an attractive purchase because of the macro or political environment, or the views of other people. In fact, these subjects never come up when we make decisions.",
    "Forecasts may tell you a great deal about the forecaster; they tell you nothing about the future.",
    "The best thing is to learn from other guy's mistakes. [General George S.] Patton used to say, 'It's an honor to die for your country; make sure the other guy gets the honor.', There are a lot of mistakes that I've repeated. The biggest one, the biggest category over time, is being reluctant to pay up a little for a business that I knew was really outstanding.",
    "In the business world, the rearview mirror is always clearer than the windshield.",
    "What we learn from history is that people don't learn from history.",
    "If past history was all that is needed to play the game of money, the richest people would be librarians.",
    "Investors should be skeptical of history-based models. Constructed by a nerdy-sounding priesthood using esoteric terms such as beta, gamma, sigma and the like, these models tend to look impressive. Too often, though, investors forget to examine the assumptions behind the models. Beware of geeks bearing formulas.",
    "You need to divorce your mind from the crowd. The herd mentality causes all these IQ's to become paralyzed. I don't think investors are now acting more intelligently, despite the intelligence. Smart doesn't always equal rational. To be a successful investor you must divorce yourself from the fears and greed of the people around you, although it is almost impossible.",
    "Nothing sedates rationality like large doses of effortless money.",
    "In a bull market, one must avoid the error of the preening duck that quacks boastfully after a torrential rainstorm, thinking that its paddling skills have caused it to rise in the world. A right-thinking duck would instead compare its position after the downpour to that of the other ducks on the pond.",
    "Failing conventionally is the route to go; as a group, lemmings may have a rotten image, but no individual lemming has ever received bad press",
    "What the wise do in the beginning, fools do in the end.",
    "But a pin lies in wait for every bubble. And when the two eventually meet, a new wave of investors learns some very old lessons: First, many in Wall Street — a community in which quality control is not prized — will sell investors anything they will buy. Second, speculation is most dangerous when it looks easiest.",
    "The most important quality for an investor is temperament, not intellect. You need a temperament that neither derives great pleasure from being with the crowd or against the crowd.",
    "You're dealing with a lot of silly people in the marketplace; it's like a great big casino and everyone else is boozing. If you can stick with Pepsi, you should be O.K.",
    "In some corner of the world they are probably still holding regular meetings of the Flat Earth Society. We derive no comfort because important people, vocal people, or great numbers of people agree with us. Nor do we derive comfort if they don't.",
    "Intensity is the price of excellence.",
    "I don't look to jump over 7-foot bars: I look around for 1-foot bars that I can step over.",
    "There seems to be some perverse human characteristic that likes to make easy things difficult",
    "If you've been playing poker for half an hour and you still don't know who the patsy is, you're the patsy.",
    "Games are won by players who focus on the playing field –- not by those whose eyes are glued to the scoreboard.",
    "You shouldn't own common stocks if a 50% decrease in their value in a short period of time would cause you acute distress.",
    "I had a great teacher in life in my father. But I had another great teacher in terms of profession in terms of Ben Graham. I was lucky enough to get the right foundation very early on. And then basically I didn't listen to anybody else. I just look in the mirror every morning and the mirror always agrees with me. And I go out and do what I believe I should be doing. And I'm not influenced by what other people think.",
    "I try to buy stock in businesses that are so wonderful that an idiot can run them because sooner or later, one will.",
    "When a management with a reputation for brilliance tackles a business with a reputation for bad economics, it is the reputation of the business that remains intact.",
    "Loss of focus is what most worries Charlie and me when we contemplate investing in businesses that in general look outstanding. All too often, we've seen value stagnate in the presence of hubris or of boredom that caused the attention of managers to wander.",
    "Talking to Time Magazine a few years back, Peter Drucker got to the heart of things: ‘I will tell you a secret: Dealmaking beats working. Dealmaking is exciting and fun, and working is grubby. Running anything is primarily an enormous amount of grubby detail work . . . dealmaking is romantic, sexy. That's why you have deals that make no sense.'",
    "In the long run managements stressing accounting appearance over economic substance usually achieve little of either.",
    "Rationality frequently wilts when the institutional imperative comes into play. For example: (1) As if governed by Newton's First Law of Motion, an institution will resist any change in its current direction;(2) Just as work expands to fill available time, corporate projects or acquisitions will materialize to soak up available funds; (3) Any business craving of the leader, however foolish, will be quickly supported by detailed rate-of-return and strategic studies prepared by his troops; and (4) The behavior of peer companies, whether they are expanding, acquiring, setting executive compensation or whatever, will be mindlessly imitated.",
    "Culture, more than rule books, determines how an organization behaves.",
    "Having first-rate people on the team is more important than designing hierarchies and clarifying who reports to whom.",
    "Somebody once said that in looking for people to hire, you look for three qualities: integrity, intelligence, and energy. And if you don't have the first, the other two will kill you. You think about it; it's true. If you hire somebody without [integrity], you really want them to be dumb and lazy.",
    "If each of us hires people who are smaller than we are, we shall become a company of dwarfs. But, if each of us hires people who are bigger than we are, we shall become a company of giants."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');



var Quote = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Quote.prototype = Object.create(AlexaSkill.prototype);
Quote.prototype.constructor = Quote;

Quote.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Quote.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewQuoteRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Quote.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Quote.prototype.intentHandlers = {
    "GetNewQuoteIntent": function (intent, session, response) {
        handleNewQuoteRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a warren buffett quote, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new quote from the list and returns to the user.
 */
function handleNewQuoteRequest(response) {
    // Get a random space quote from the space quotes list
    var quoteIndex = Math.floor(Math.random() * QUOTES.length);
    var randomQuote = QUOTES[quoteIndex];

    // Create speech output
    var speechOutput = "Here's your quote: " + randomQuote;
    var cardTitle = "Your Quote";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var quote = new Quote();
    quote.execute(event, context);
};
