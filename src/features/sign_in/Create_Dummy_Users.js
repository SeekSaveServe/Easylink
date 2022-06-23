import { supabase } from "../../supabaseClient";

function RNGemail() {
  var chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  var string = "12@";
  for (var ii = 0; ii < 6; ii++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  console.log(string);
  return string;
}

function RNGtags() {
  const interests = [
    "Sports",
    "Service",
    "Learning",
    "Social and Cultural",
    "Arts and Music",
    "Academic",
    "Environment",
    "Others",
  ];
  const communities = ["USP", "GUI", "Interest Groups", "House", "Others"];
  const skills = [
    "Finance",
    "Programming",
    "Writing",
    "Public Speaking",
    "First Aid",
    "Photography",
    "Athletics",
    "Event Planning",
    "Others",
  ];
  // skills users communities
  const allTags = [skills, interests, communities];
  const tags = [[], [], []];
  for (var i = 0; i < 3; i++) {
    for (var ii = 0; ii < (Math.floor(Math.random() * 100) % 4) + 1; ii++) {
      tags[i].push(allTags[i][Math.floor(Math.random() * allTags[i].length)]);
    }
  }
  return tags;
}

function bio(i) {
  return [
    "Much of Giuliani Land is appalled.",

    "Where did they train, in what methods, in which lab, under what mentor?",

    "In one revealing sequence, the  paper became involved in the Wikileaks episode, in which vast amounts of  confidential military and State Department material was made available via the  erratic Julian Assange, the organization's founder.",

    "“Given that women’s employers, their health insurers, and the economy as a whole share in considerable savings from the use of contraceptives, you would think we would want to go out of our way to support everyone in having the number of children they want and to avoid unintended pregnancies,” says Dr.",

    "His job approval numbers, despite troubles passing his agenda through Congress, have been decent, hovering around the 50 percent mark.",

    'Vidal will be remembered as a stylistic demigod, incisive above all else, but the supposed conflict between wit and warmth is nonsense: Narcissist though he may have been, this was a man who saw immortality in an "act of love." \nIf anything, the memory of Gore Vidal should make society question its suspicion of the articulate in its midst.',

    "Many of them are developing their own sophisticated online education capabilities.",

    "Mary prayed that her mother would forgive her.",

    'U.S.A.!" also seems like a sign of extreme melody atrophy.',

    "It is clear that whatever the size, and however the city is defined, Lagos is the center of one of the largest urban areas in the world.",

    "This metaphor doesn’t perfectly hold, of course.",

    "But bringing it to other schools will take a lot of hard work. \n\nGrading papers at a café with my husband in my second year at a high-poverty urban charter school, I came upon a sentence in a student essay about Death of a Salesman that pointed out how two characters seemed alike but turned out to have a crucial difference.",

    "But since 2007 it has sent Jones to India, Iran, and Russia;",

    "Its unemployment rate remains very low because its employment polices insure a job for almost all citizens.",

    "This week's panelists: Ashley Fetters, Chris Heller, and Spencer Kornhaber\nKornhaber: I laughed a lot at the dialogue on this episode of Girls, but my favorite parts may have been the facial expressions.",

    "The Feds\nIn the face of these allegations, in the face of a complaint filed with examples of systemic abuse and mistreatment, the Obama Administration through its lawyers has recited a litany of legal and factual reasons why the case should be dismissed now, before any prison officials are deposed.",

    "By a 233-198 vote, lawmakers cut $450 million in Pentagon spending, the largest defense cut approved on the floor and one that shocked and disappointed second-engine backers besides Boehner--among them Cantor and the chairman of the House Armed Services Committee, Buck McKeon of California.",

    "It's not A/B testing.",

    "It just happens that besides contraception, none of them has raised the same ire as maternity care.",

    "Brown's stunning defeat in 2014 shut Democrats out of the governor's mansion for only the second time in over four decades and left many in the state party disillusioned even now, months later, as Brown attempts a comeback in Rep.",

    "Democrats have not been immune, either.",

    "I think that the cultural aspects of the South are unique.",

    '"It gives you resources, money, and the push you need to do it," says Mina Marsow, another SEAP graduate and owner of Prospect Gymnastics in Brooklyn.',

    "But now, Shaich will be able to operate away from the constant watch of anxious shareholders, and with German billionaires backing his business.",

    "A couple of the world's biggest and most powerful corporations are tracking our every move and sharing it with whomever wants it.",

    "From the post-moral peevishness of Seinfeld (which he co-created) to the flying yarmulkes of Curb Your Enthusiasm (which he created and stars in), Larry has been in a class of his own, spinning a kind of hilarious materialist fairy tale that depends for many of its effects upon the vacuum left by a just-departed divinity—a God who has bolted from the room like Groucho Marx, cigar smell and a hanging one-liner the tokens of His absence.",

    "The difficulty Latinos face in converting their increased numbers and economic importance into political power means that ultimately, the responsibility lies with leaders of the receiving community to represent everyone.",

    "Angela Gulner’s webseries, Binge, includes graphic, uncomfortable dramatizations of Gulner’s experiences with bulimia, which Gulner has said is her intent—she wanted others who’ve experienced it to know they’re not alone.",

    "No links to tornadoes\n\tBelievability: 330 ppm. Shepherd, who is also a scientist with NASA and climate science professor, is definitely in a position to have an informed opinion.",

    'They are "losers" now because they were "winners" under the old system, in which insurers set premiums for each individual plan based on the health of the individual buying it.',

    "If that's true, Calderon's strategy is also the right prescription: The high casualty rate is a sign that the cartels are under pressure and they're fighting tooth and nail to cling on as the government cracks down.",

    "Maybe this fawning over Girls will have the same crossover effect.",

    "Then, months after being declared Ebola-free, Crozier developed severe pain and inflammation in his left eye, a condition called uveitis.",

    "I have to make some calls.",

    "But it's fun to watch, so I won't criticize the liberties that they take, and I hope the show keeps going.",

    "She later spent almost ten years at the Wall Street Journal's Washington bureau.",

    "Nazaryan and I had a long talk this afternoon.",

    "Temporary Assistance for Needy Families would be cut by $21 billion.",

    "There's different ways of understanding mental and physical health that either relate to what's happening in the brain or what's happening in the heart.",

    "Just as all hope was lost for flyers in the crusade to use gadgets during take-off and landing, American Airlines pilots just got the Federal Aviation Association go-ahead to use iPads during all phases of flight.",

    "Otherwise, all the world's electric cars and mobile phones will be Indian or Chinese, and all its solar cell units and wind turbines European -- including in America.",

    "now we’re going to try to roll it out in some of our other chapters.",

    "“We are not celebrating.",

    '"That may well be true, but guess what, ISIS has a lot of American weapons," said Paul.',

    "We do know that some level of            ambient noise can increase creativity.",

    "We want to see if we can detect functional polymers among the trillions of random-sequence polymers we generate.",

    "She got the ball rolling on Wednesday, lampooning Clinton, as well as Trump, for being part of a corrupt political system.",

    "For younger patrons who lack first-hand experience of the Mao era, the restaurants present a novel and entertaining window into the previous generation’s history, which their textbooks gloss over.",

    "one traditional story of the shape is that it represents arms folded in prayer.",

    "Yes, many of them might have befallen great personal and financial calamities.",

    "It's just too gross.",

    "Dzhokhar became a permanent resident in 2007, when he was 14.",

    "Dee finds filth instead of fame in this raunchy new series.",

    "On that same side: Peter Thiel, the Silicon Valley billionaire and connoisseur of litigation who’s also known for his offshore water cities and his “immortality projects.” Facing off against these two is Nick Denton, the Machiavellian Brit and ex-financial journalist who co-founded Gawker in 2002 with the goal of reporting the news journalists gossiped about amongst themselves but couldn’t print.",

    "However, as impartial as ski-jump judges may be, they’re still far more biased than a cold, hard, laser calculation of distance.",

    "On the premiere (pronounced prem-yare) of This Week with Christiane Amanpour, Defense Secretary Robert Gates and House Speaker Nancy Pelosi offered different visions of the war in Afghanistan after next July.",

    '"Barbara Lee, more than any other human being in the United States, has created this atmosphere," said.',

    "Give me some water, please.",

    '"Morales should push to implement some of the changes, such as moving from an inquisitorial system--in which prosecutors build paper files that are presented to judges--to a system that relies on oral arguments in open court," they suggest.',

    "If you'd like to be notified by email the next time an installment in this series on U.S.",

    "Bachmann's staffers thought they could kill Tim Pawlenty's campaign and steal his place as the Not Mitt Romney Candidate by winning big in the August poll.",

    "Bill Richardson as a  means to reduce the high number of uninsured drivers, but analysis shows  that uninsured drivers are more closely linked to poverty and  unemployment rates rather than immigration status.",

    "I can't call the cops on Tom.",

    "You just have to be a friend of the agency and you can come in and walk around?",

    "I went twice.",

    "Should there be any question about the government's willingness to investigate participants in such groups, you don't have to look very far back in history to see examples.",

    "It doesn't seem like a good idea and we're worried they're going to ruin the play, etc.",

    'Note: Because of the industrial growing process, not all "edible" flowers are actually edible.',

    "Plus you may wake dehydrated and needing the loo ...",

    "Inventor Dean Kamen, creator of such products as the Segway, was at his lab in New Hampshire when he received a visit from Colonel Geoffrey Ling with the Defense Advanced Research Projects Agency, or DARPA.",

    "All my heart, all my soul belong to you.",

    "High-stakes decisions are a key element of dramatic storytelling;",

    "Shellenbarger writes, \"She is still immersed in clients' cases and often works long hours.",

    "Many are actually impressions of feathers in fossils, the real thing decomposed long ago.",

    "In order to ensure that the interim government uses the money for humanitarian purposes, the United States' exemption divides the $1.5 million into three tranches.",

    "For that story Liebling had gone down to Louisiana in midsummer of 1959 to cover the re-election campaign of Governor Earl Long, the younger brother of the former governor Huey Long, and a figure of equally exaggerated appetites and idiosyncrasies.",

    "Mexico    wasn't Colombia in the 1990s, Sarukhan insisted.",

    "It’s as if a biblical story has come alive again from the scriptures.",

    '"Without that information they\'re far less valuable to advertisers."\nJoshua Benton at Nieman Lab says Apple\'s thirty percent cut could be unsustainable for its partners, particularly "for publishers who had been counting on a new rush of tablet revenue to support a lagging print model." Ryan Carson at Think Vitamin calls Apple\'s offer "extortionate." \n"Does Apple deserve a large cut for the massive audience they bring to mass-market apps?',

    "Progressive activists had jammed town-hall meetings much as Tea Party conservatives had done to Democratic lawmakers eight years ago.",

    "Trump’s path to victory mostly ran through the non-urban areas that had already moved toward the GOP in lower-ballot races under Obama.",

    "As though Pinochet never happened.",

    "I know it's a surprise.",

    'If President Obama or congressional Democrats stand in the GOP\'s way by filibustering or vetoing everything Republicans pass, Cruz wrote, "we will have transparency and accountability for the very next election." In other words, the GOP is ready to paint its opponents as unwilling to compromise or get things done.',

    "No serious injuries have been reported.",

    "The comparisons to Viagra, and the bumpy road to approval, have raised complicated questions about the nature of female desire, sexism in drug research, and what ought to qualify as a disorder.",

    "Boxer opposed the original bill from Vitter and Lautenberg when it was introduced in 2013, and while the measure has since moved farther to the left based on feedback, and was the backbone for the new legislation, it still lacks support from key public health groups.",

    'And this is why love is such an existential threat to the techno-consumerist order: it exposes the lie." It is "tempting to avoid love and stay safely in the world of liking," but "when you consider the alternative — an anesthetized dream of self-sufficiency, abetted by technology — pain emerges as the natural product and natural indicator of being alive in a resistant world.',

    "Society Research Institute.",

    "Francesco Guerrera reports on his comments for the Financial Times.",

    "Committee Republicans on Tuesday discussed past deficit-reduction proposals, Hensarling said in a statement.",

    "In The New York Times Juliet Macur makes the argument:\nOne can argue the differences between an N.F.L.",

    "It is the state of Putin's Russia.",

    "So what exactly is everyone saying?",

    "Tom knows he's being watched.",

    "Bryan Walsh analyzes Obama's new energy speech:\nIt's notable that perhaps the most ambitious part of the President's  speechhis pledge, repeated from the State of the Union, to call for a  Clean Energy Standard (CES) that would ensure 80% of our electricity  would come from clean sources by 2035still includes fossil fuels.",

    "Selling Trump materiel, as Sear’s and Amazon do, earns a call for outright boycott.",

    "Residents hoping for more just treatment when they get their day in court are often disappointed.",

    "Obama cruised to victory with the highest popular vote total in U.S.",

    "The caption read: “I love Hispanics!”\nThe assessment betrayed an awareness that Trump, who boasts sky-high unfavorable poll numbers, has an incredible capacity for polarizing voters.",
  ][i];
}
function title(i) {
  return [
    " Patron Of Suffering",
    " Butcher With Sins",
    " Boy Of The Plague",
    " Baker With Silver Hair",
    " Enemy With Wings",
    " Wife With Silver Hair",
    " Boy Of Ice",
    " Invader Of Eternity",
    " Girl With Money",
    " Traitor With Guns",
    " Cat Of Damnation",
    " Planner Of Hope",
    " Courier Dressed In White",
    " Guardian Without A Goal",
    " Opponent Of Power",
    " Agent Of Hope",
    " Servant Of Fire",
    " Bearer Without Honor",
    " Soldier Of Fortune",
    " Scientist Of Fire",
    " Assassins Of Time",
    " Angels Of Fortune",
    " Agents Of The Nation",
    " Founders Of The Eclipse",
    " Farmers Of Ice",
    " Creators Of The Nether",
    " Followers Without Shame",
    " Thieves Of The South",
    " Women Of Nightmares",
    " Invaders Of The Prison",
    " Rats Of The Gods",
    " Widows Of The Forest",
    " Saviors Of Anguish",
    " Guardians Of The Nation",
    " Creators Of Freedom",
    " Secretaries Of Limbo",
    " Wives With Hoods",
    " Lords Without Fear",
    " Enemies Without Hope",
    " Founders Of Tomorrow",
    " Creators And Peons",
    " Deputies And Peasants",
    " Patrons And Bringers",
    " Deputies And Opponents",
    " People And Spies",
    " Couriers And Collectors",
    " Enemies And Bringers",
    " Rebels And Bakers",
    " Children And Builders",
    " Peasants And Heirs",
    " Foreigners And Founders",
    " Slaves And Doctors",
    " Collectors And Emissaries",
    " Cullers And Men",
    " Deputies And Pirates",
    " Defenders And Men",
    " Enemies And Messengers",
    " Collectors And Agents",
    " Scientists And Inventors",
    " Opponents And Creators",
    " Death Without A Head",
    " Edge Of The World",
    " Annihilation Of Evil",
    " Rise Of Gold",
    " Decisions Of The Blues",
    " Perfection With Gold",
    " Source Of The Forsaken",
    " Birth Of Crime",
    " Scourge Of Reality",
    " Love Of Dusk",
    " Ascension Without Honor",
    " Planet Of Suffering",
    " Execution Without Hope",
    " Dishonor Of Ice",
    " Edge Of Breaking Hearts",
    " Failure With Silver Hair",
    " Vengeance Of Agony",
    " End Without Sin",
    " Chase Of Last Rites",
    " Chase Of The Plague",
    " Preparing For The Void",
    " Destroying The Moon",
    " Fade Into The Future",
    " Memory Of The Commander",
    " Separated By The Curse",
    " Force Of The Traitors",
    " Clinging To Secrets",
    " Death At The Soldier",
    " Blinded By The Shadows",
    " Begging In The Night",
    " Separated At The Ocean",
    " Force Of The Sea",
    " Never Trust A Storm",
    " Remember The West",
    " Cruelty Of ",
    " Hurting My Enemies",
    " Trust The Void",
    " Memory Of The Depths",
    " Escaping The Dungeons",
    " Mending The Champions",
  ][i];
}
function telegram(i) {
  return [
    "@guide865",
    "@guide66",
    "@guide355",
    "@guide742",
    "@guide461",
    "@guide274",
    "@guide18",
    "@guide88",
    "@guide506",
    "@guide158",
    "@safari865",
    "@safari66",
    "@safari355",
    "@safari742",
    "@safari461",
    "@safari274",
    "@safari18",
    "@safari88",
    "@safari506",
    "@safari158",
    "@nuance865",
    "@nuance66",
    "@nuance355",
    "@nuance742",
    "@nuance461",
    "@nuance274",
    "@nuance18",
    "@nuance88",
    "@nuance506",
    "@nuance158",
    "@satellite865",
    "@satellite66",
    "@satellite355",
    "@satellite742",
    "@satellite461",
    "@satellite274",
    "@satellite18",
    "@satellite88",
    "@satellite506",
    "@satellite158",
    "@digital865",
    "@digital66",
    "@digital355",
    "@digital742",
    "@digital461",
    "@digital274",
    "@digital18",
    "@digital88",
    "@digital506",
    "@digital158",
    "@presence865",
    "@presence66",
    "@presence355",
    "@presence742",
    "@presence461",
    "@presence274",
    "@presence18",
    "@presence88",
    "@presence506",
    "@presence158",
    "@royal865",
    "@royal66",
    "@royal355",
    "@royal742",
    "@royal461",
    "@royal274",
    "@royal18",
    "@royal88",
    "@royal506",
    "@royal158",
    "@emplane865",
    "@emplane66",
    "@emplane355",
    "@emplane742",
    "@emplane461",
    "@emplane274",
    "@emplane18",
    "@emplane88",
    "@emplane506",
    "@emplane158",
    "@shipless865",
    "@shipless66",
    "@shipless355",
    "@shipless742",
    "@shipless461",
    "@shipless274",
    "@shipless18",
    "@shipless88",
    "@shipless506",
    "@shipless158",
    "@classic865",
    "@classic66",
    "@classic355",
    "@classic742",
    "@classic461",
    "@classic274",
    "@classic18",
    "@classic88",
    "@classic506",
    "@classic158",
  ][i];
}
function name(i) {
  const names = [
    "Adrian Tan",
    "Adrian Lee",
    "Adrian Wong",
    "Adrian Mohamed",
    "Adrian Rahman",
    "Adrian Goh",
    "Adrian Chua",
    "Adrian Yeo",
    "Adrian Khoo",
    "Adrian Singh",
    "Benjamin Tan",
    "Benjamin Lee",
    "Benjamin Wong",
    "Benjamin Mohamed",
    "Benjamin Rahman",
    "Benjamin Goh",
    "Benjamin Chua",
    "Benjamin Yeo",
    "Benjamin Khoo",
    "Benjamin Singh",
    "Cheng Tan",
    "Cheng Lee",
    "Cheng Wong",
    "Cheng Mohamed",
    "Cheng Rahman",
    "Cheng Goh",
    "Cheng Chua",
    "Cheng Yeo",
    "Cheng Khoo",
    "Cheng Singh",
    "Joel Tan",
    "Joel Lee",
    "Joel Wong",
    "Joel Mohamed",
    "Joel Rahman",
    "Joel Goh",
    "Joel Chua",
    "Joel Yeo",
    "Joel Khoo",
    "Joel Singh",
    "Reza Tan",
    "Reza Lee",
    "Reza Wong",
    "Reza Mohamed",
    "Reza Rahman",
    "Reza Goh",
    "Reza Chua",
    "Reza Yeo",
    "Reza Khoo",
    "Reza Singh",
    "Adeline Tan",
    "Adeline Lee",
    "Adeline Wong",
    "Adeline Mohamed",
    "Adeline Rahman",
    "Adeline Goh",
    "Adeline Chua",
    "Adeline Yeo",
    "Adeline Khoo",
    "Adeline Singh",
    "Claire Tan",
    "Claire Lee",
    "Claire Wong",
    "Claire Mohamed",
    "Claire Rahman",
    "Claire Goh",
    "Claire Chua",
    "Claire Yeo",
    "Claire Khoo",
    "Claire Singh",
    "Ellie Tan",
    "Ellie Lee",
    "Ellie Wong",
    "Ellie Mohamed",
    "Ellie Rahman",
    "Ellie Goh",
    "Ellie Chua",
    "Ellie Yeo",
    "Ellie Khoo",
    "Ellie Singh",
    "Hasim Tan",
    "Hasim Lee",
    "Hasim Wong",
    "Hasim Mohamed",
    "Hasim Rahman",
    "Hasim Goh",
    "Hasim Chua",
    "Hasim Yeo",
    "Hasim Khoo",
    "Hasim Singh",
    "Nora Tan",
    "Nora Lee",
    "Nora Wong",
    "Nora Mohamed",
    "Nora Rahman",
    "Nora Goh",
    "Nora Chua",
    "Nora Yeo",
    "Nora Khoo",
    "Nora Singh",
  ];
  return names[i];
}
export default async function CreateDummyUsers(e) {
  e.preventDefault();
  for (let i = 85; i < 100; i++) {
    // signing up
    try {
      // 1. Creates account
      const { user, error } = await supabase.auth.signUp({
        email: RNGemail(),
        password: "abcdefg",
      });
      if (error) throw error;
    } catch (error) {
      console.log(error);
      return;
    }
    const user = supabase.auth.user();

    // 2. Update user information
    try {
      const { error } = await supabase.from("users").insert([
        {
          id: user.id,
          username: name(i),
          avatar_url: "",
          email: user.email,
          telegram: telegram(i),
          telegram_visibility: ["afterlink", "Only after linking"][
            Math.random() % 1
          ],
          email_visibility: ["afterlink", "Only after linking"][
            Math.random() % 1
          ],
          title: title(i),
          bio: bio(i),
        },
      ]);

      if (error) throw error;
    } catch (error) {
      console.log(error);
      return;
    }
    // 3. Update interest, skills, and communities table
    const arr = ["user_skills", "user_interests", "user_communities"];
    const tags = RNGtags();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < tags[i].length; j++) {
        try {
          const { error } = await supabase.from(arr[i]).insert([
            {
              uid: user.id,
              name: tags[i][j],
            },
          ]);
          if (error) throw error;
        } catch (error) {
          console.log(error);
          return;
        }
      }
    }
  }
}
