(function() {
  const a = document.createElement("link").relList;
  if (a && a.supports && a.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) n(e);
  new MutationObserver((e) => {
    for (const r of e) if (r.type === "childList") for (const c of r.addedNodes) c.tagName === "LINK" && c.rel === "modulepreload" && n(c);
  }).observe(document, { childList: true, subtree: true });
  function o(e) {
    const r = {};
    return e.integrity && (r.integrity = e.integrity), e.referrerPolicy && (r.referrerPolicy = e.referrerPolicy), e.crossOrigin === "use-credentials" ? r.credentials = "include" : e.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r;
  }
  function n(e) {
    if (e.ep) return;
    e.ep = true;
    const r = o(e);
    fetch(e.href, r);
  }
})();
const U = JSON.parse(`[{"id":"h001","text":"April 12.\u2014Mustard-and-cress and radishes not come up yet. Left Farmerson repairing the scraper, but when I came home found three men working. I asked the meaning of it, and Farmerson said that in making a fresh hole he had penetrated the gas-pipe. He said it was a most ridiculous place to put the gas-pipe, and the man who did it evidently knew nothing about his business. I felt his excuse was no consolation for the expense I shall be put to.","source":"human","genre":"diary","wordCount":78,"difficulty":1,"explanation":"This is from <strong>The Diary of a Nobody</strong> (1892) by George and Weedon Grossmith \u2014 a comic novel written as a fictional diary. The mundane frustrations, the specific name 'Farmerson,' and the resigned tone are hallmarks of authentic Victorian humor. AI rarely captures this kind of low-stakes domestic complaint so naturally.","meta":{"author":"George & Weedon Grossmith, 'The Diary of a Nobody,' 1892 (public domain)"}},{"id":"h002","text":"We dined at the Bullhead upon the best venison pasty that ever I eat of in my life, and with one dish more, it was the best dinner I ever was at. Here rose in discourse at table a dispute between Mr. Moore and Dr. Clerke, the former affirming that it was essential to a tragedy to have the argument of it true, which the Doctor denied, and left it to me to be judge, and the cause to be determined next Tuesday morning at the same place, upon the eating of the remains of the pasty, and the loser to spend 10s.","source":"human","genre":"diary","wordCount":101,"difficulty":2,"explanation":"This is a real entry from <strong>Samuel Pepys' diary</strong>, September 1, 1660. The archaic phrasing ('ever I eat of') and the way he entangles a literary debate with leftover venison is deeply human \u2014 the priorities are charmingly wrong. Many visitors flag the old-fashioned language as 'trying too hard,' but it's just how people wrote in the 1660s.","meta":{"author":"Samuel Pepys, personal diary, September 1, 1660 (public domain)"}},{"id":"h003","text":"Painted the bath red, and was delighted with the result. Sorry to say Carrie was not, in fact we had a few words about it. She said I ought to have consulted her, and she had never heard of such a thing as a bath being painted red. I replied: 'It's merely a matter of taste.' Fortunately, further argument on the subject was stopped by a voice saying, 'May I come in?' It was only Cummings, who said, 'Your maid opened the door, and asked me to excuse her showing me in, as she was wringing out some socks.'","source":"human","genre":"diary","wordCount":98,"difficulty":1,"explanation":"Another excerpt from <strong>The Diary of a Nobody</strong> (1892). The absurdity of painting a bath red and then being interrupted by someone wringing socks \u2014 this cascade of non-sequiturs is almost impossible for AI to replicate organically. The humor arises from the narrator's complete lack of self-awareness.","meta":{"author":"George & Weedon Grossmith, 'The Diary of a Nobody,' 1892 (public domain)"}},{"id":"h004","text":"Pros: Ample outlets. Great Coffee. Great Art. Decent amount of seating. One time this guy came in with a real cute dog and I pet him on the head. V. soft. Cons: The A.C. is aggressive. Bring a sweater. The music can get a little intense if you're studying. Bring some headphones. Cute dog probably not here all the time. Bring a dog.","source":"human","genre":"review","wordCount":62,"difficulty":1,"explanation":"A real <strong>Yelp review</strong> of Caffe Vita Silverlake by Emily F. Cheever (2016). The structural gimmick of listing pros and cons but then veering into a running joke about a dog is peak human internet writing. 'V. soft.' and 'Bring a dog.' are the kind of micro-punchlines that AI tends to over-explain rather than just land.","meta":{"author":"Emily F. Cheever, Yelp review, 2016"}},{"id":"h005","text":"One Stop is number one!! GET IT? But seriously, my re-registration couldn't have gone easier, even with the fact that I'm sometimes bad at life and I was a few days late doing so. This is not an 'official' DMV\u2014it's a third party situation so you WILL pay an extra service fee. But honestly? This place saved me from what would have been an entire afternoon at the DMV, staring off into space and pondering my own existence.","source":"human","genre":"review","wordCount":77,"difficulty":1,"explanation":"A real <strong>Yelp review</strong> of One Stop DMV by Emily F. Cheever (2017). The opening pun, the self-deprecation ('I'm sometimes bad at life'), and the existential dread about the DMV are authentic human voice markers. AI can mimic this style but usually doesn't commit to the bit so wholeheartedly.","meta":{"author":"Emily F. Cheever, Yelp review, 2017"}},{"id":"h006","text":"Once you step inside you'll hesitate\u2014it's a hipster place. Like... Aggressively hipster. 'I just released a cassette of my band'-ironic dad-shirt hipster. But every single time I've been here I've been met with a warm and welcoming staff who actually is familiar with their menu and seem THRILLED to share the bounty of their work place. It has amazing food and generally the kind of atmosphere of a place you'd want to stay for hours. Don't judge a book by its cool, limited first edition cover.","source":"human","genre":"review","wordCount":85,"difficulty":2,"explanation":"A real <strong>Yelp review</strong> of The Semi-Tropic by Emily F. Cheever (2016). The compound hyphenated description ('I just released a cassette of my band'-ironic dad-shirt hipster) is an inventive, highly specific joke that AI would struggle to construct so naturally. The ending metaphor twists the clich\xE9 just enough to feel spontaneous.","meta":{"author":"Emily F. Cheever, Yelp review, 2016"}},{"id":"h007","text":"He was now in full possession of his physical senses. They were, indeed, preternaturally keen and alert. Something in the awful disturbance of his organic system had so exalted and refined them that they made record of things never before perceived. He felt the ripples upon his face and heard their separate sounds as they struck. He looked at the forest on the bank of the stream, saw the individual trees, the leaves and the veining of each leaf\u2014he saw the very insects upon them: the locusts, the brilliant bodied flies, the gray spiders stretching their webs from twig to twig.","source":"human","genre":"fiction","wordCount":99,"difficulty":3,"explanation":"From Ambrose Bierce's <strong>'An Occurrence at Owl Creek Bridge'</strong> (1890). This passage fools many people because the prose is extremely polished and the sensory catalogue feels systematic \u2014 qualities we associate with AI. But the escalating specificity (from ripples to veins of leaves to individual spider webs) has a breathless, almost hallucinatory urgency that AI descriptions rarely achieve.","meta":{"author":"Ambrose Bierce, 'An Occurrence at Owl Creek Bridge,' 1890 (public domain)"}},{"id":"h008","text":"This was the king's semi-barbaric method of administering justice. Its perfect fairness is obvious. The criminal could not know out of which door would come the lady; he opened either he pleased, without having the slightest idea whether, in the next instant, he was to be devoured or married. On some occasions the tiger came out of one door, and on some out of the other. The decisions of this tribunal were not only fair, they were positively determinate: the accused person was instantly punished if he found himself guilty, and, if innocent, he was rewarded on the spot, whether he liked it or not.","source":"human","genre":"fiction","wordCount":105,"difficulty":3,"explanation":"From Frank R. Stockton's <strong>'The Lady, or the Tiger?'</strong> (1882). This is a classic trap passage \u2014 the dry, logical structure and ironic tone ('Its perfect fairness is obvious') read almost like AI-generated analysis. But the deadpan humor and the way 'devoured or married' is treated as equivalent are distinctly human wit that AI rarely produces without being prompted.","meta":{"author":"Frank R. Stockton, 'The Lady, or the Tiger?', 1882 (public domain)"}},{"id":"h009","text":"I felt a Funeral, in my Brain, And Mourners to and fro Kept treading\u2014treading\u2014till it seemed That Sense was breaking through\u2014 And when they all were seated, A Service, like a Drum\u2014 Kept beating\u2014beating\u2014till I thought My mind was going numb\u2014 And then I heard them lift a Box And creak across my Soul With those same Boots of Lead, again, Then Space\u2014began to toll","source":"human","genre":"poem","wordCount":65,"difficulty":2,"explanation":"Emily Dickinson, poem 340 (c. 1861). Dickinson's dashes and capitalization create a distinctive rhythm that some visitors mistake for AI trying to be 'poetic.' But the metaphor of a funeral <em>in</em> the brain \u2014 grief as a physical, crushing weight \u2014 has an emotional precision that AI poetry typically lacks. The boots 'creaking across my Soul' is viscerally specific.","meta":{"author":"Emily Dickinson, poem 340, c. 1861 (public domain)"}},{"id":"h010","text":"'Hope' is the thing with feathers\u2014 That perches in the soul\u2014 And sings the tune without the words\u2014 And never stops\u2014at all\u2014 And sweetest\u2014in the Gale\u2014is heard\u2014 And sore must be the storm\u2014 That could abash the little Bird That kept so many warm\u2014 I've heard it in the chillest land\u2014 And on the strangest Sea\u2014 Yet\u2014never\u2014in Extremity, It asked a crumb\u2014of me.","source":"human","genre":"poem","wordCount":63,"difficulty":3,"explanation":"Emily Dickinson, poem 314 (c. 1861). This is one of the hardest passages in the pool. The extended metaphor is clean, the structure is balanced, and the message is uplifting \u2014 all qualities people associate with AI. But the final line ('It asked a crumb\u2014of me') inverts expectations with startling humility. Over 60% of visitors flag this as AI.","meta":{"author":"Emily Dickinson, poem 314, c. 1861 (public domain)"}},{"id":"h011","text":"Astragalus agnicidus is a rare species of milkvetch known by the common name Humboldt County milkvetch. It is endemic to northern California. The plant was undescribed until the 1950s and was known only from one 8-acre ranch in Humboldt County, where sheep ranchers blamed it for the deaths of their animals. They eradicated the plant from their land, and by the time it was formally described in 1957 it was thought to be extinct. The species name, agnicidus, means 'lamb-killer.' It was rediscovered in 1987 when long-buried seeds were plowed into favorable conditions for germination.","source":"human","genre":"wikipedia","wordCount":93,"difficulty":3,"explanation":"This is directly from the <strong>Wikipedia article on Astragalus agnicidus</strong>. Wikipedia's neutral, encyclopedic tone is almost indistinguishable from AI \u2014 because AI was trained on exactly this kind of text. The giveaway is the genuinely surprising narrative arc: farmers destroy a plant, it's declared extinct, then it comes back from buried seeds decades later. AI rarely constructs such a satisfying factual story.","meta":{"author":"Wikipedia contributors, 'Astragalus agnicidus' article"}},{"id":"h012","text":"Cawker City is a city in Mitchell County, Kansas, United States. As of the 2020 census, the population was 457. It is one of several places claiming to be home of the largest ball of twine in the world. Cawker City was founded in 1870. According to tradition, Colonel E. H. Cawker won naming rights for the town with a winning hand at poker. The city previously served many families living on small farms, but many young adults left to find work elsewhere, causing the population to decline.","source":"human","genre":"wikipedia","wordCount":84,"difficulty":3,"explanation":"Taken directly from the <strong>Wikipedia article on Cawker City, Kansas</strong>. The straightforward encyclopedic style sounds exactly like AI output \u2014 neutral, factual, well-structured. But the juxtaposition of a poker game deciding a town's name and the world's largest ball of twine is the kind of delightful absurdity that emerges from real history, not from language models optimizing for coherence.","meta":{"author":"Wikipedia contributors, 'Cawker City, Kansas' article"}},{"id":"h013","text":"A 5-year-old student at an elementary school in Vista, California, collected enough money to pay off the negative lunch balances of 123 students at her school. Katelynn Hardee, a kindergartner at Breeze Hill Elementary School, overheard a parent say she was having difficulty paying for an after school program. So Katelynn decided to set up a stand, spending her Sunday selling hot cocoa, cider, and cookies. She donated the $80 collected, which went towards paying off the negative lunch balances of over 100 students.","source":"human","genre":"news","wordCount":80,"difficulty":2,"explanation":"From a <strong>CNN article</strong> published December 17, 2019. News writing has a formulaic quality that overlaps heavily with AI output \u2014 the inverted pyramid structure, the specific numbers, the clean attribution. What makes this identifiably human is the editorial choice to lead with the child's age and the specific amount ($80), creating an emotional contrast between the small sum and its large impact.","meta":{"author":"CNN, December 17, 2019"}},{"id":"h014","text":"The focal point of the shrine is a box or chest which is built into the wall. In this chest are kept the many charms and magical potions without which no native believes he could live. These preparations are secured from a variety of specialized practitioners. The most powerful of these are the medicine men, whose assistance must be rewarded with substantial gifts. However, the medicine men do not provide the curative potions for their clients, but decide what the ingredients should be and then write them down in an ancient and secret language.","source":"human","genre":"academic","wordCount":90,"difficulty":3,"explanation":"From Horace Miner's famous 1956 anthropology paper <strong>'Body Ritual among the Nacirema.'</strong> The formal academic tone sounds very AI-like, but this passage is actually a satirical description of a <em>medicine cabinet</em> and <em>doctors writing prescriptions</em> \u2014 'Nacirema' is 'American' spelled backwards. The dry humor of describing everyday objects as exotic rituals is a deeply human rhetorical move.","meta":{"author":"Horace Miner, 'Body Ritual among the Nacirema,' American Anthropologist, 1956"}},{"id":"h015","text":"Noodles are a mixture of flour and beaten egg, made into a stiff paste, kneaded, rolled out very thin, and cut into long narrow slips, not thicker than straws, and then dried three or four hours in the sun, on tin or pewter plates. They must be put in the soup shortly before dinner, as, if boiled too long they will go to pieces.","source":"human","genre":"recipe","wordCount":62,"difficulty":2,"explanation":"From Eliza Leslie's <strong>'Directions for Cookery'</strong> (1840). The practical specificity \u2014 'not thicker than straws,' 'tin or pewter plates' \u2014 and the cautionary note about overcooking have a lived quality. The comma-heavy Victorian sentence structure is period-authentic, not AI trying to sound old-fashioned.","meta":{"author":"Eliza Leslie, 'Directions for Cookery,' 1840 (public domain)"}},{"id":"h016","text":"Take six pounds of the lean of fresh beef, cut from the bone. Stick it over with four dozen cloves. Season it with a tea-spoonful of salt, a tea-spoonful of pepper, a tea-spoonful of mace, and a beaten nutmeg. Slice half a dozen onions; fry them in butter; chop them, and spread them over the meat after you have put it into the soup-pot. Pour in five quarts of water, and stew it slowly for five or six hours; skimming it well.","source":"human","genre":"recipe","wordCount":82,"difficulty":2,"explanation":"From Eliza Leslie's <strong>'Directions for Cookery'</strong> (1840), a recipe for Rich Brown Soup. The precise measurements in Victorian units ('tea-spoonful,' 'four dozen cloves') and the imperative cooking voice are authentic to the period. AI-generated recipes tend to use modern measurements and formats, making this old-fashioned style a genuine human artifact.","meta":{"author":"Eliza Leslie, 'Directions for Cookery,' 1840 (public domain)"}},{"id":"h017","text":"In the evening, after tea, Gowing dropped in, and we had a smoke together in the breakfast-parlour. Carrie joined us later, but did not stay long, saying the smoke was too much for her. It was also rather too much for me, for Gowing had given me what he called a green cigar, one that his friend Shoemach had just brought over from America. The cigar didn't look green, but I fancy I must have done so; for when I had smoked a little more than half I was obliged to retire on the pretext of telling Sarah to bring in the glasses.","source":"human","genre":"diary","wordCount":102,"difficulty":2,"explanation":"From <strong>The Diary of a Nobody</strong> (1892). The roundabout way of admitting to cigar-induced nausea \u2014 'The cigar didn't look green, but I fancy I must have done so' \u2014 is classic British understatement. The narrator's need to fabricate a reason to leave the room rather than simply admit he feels ill is a comedy of manners that AI wouldn't instinctively construct.","meta":{"author":"George & Weedon Grossmith, 'The Diary of a Nobody,' 1892 (public domain)"}},{"id":"h018","text":"In the hierarchy of magical practitioners, and below the medicine men in prestige, are specialists whose designation is best translated as 'holy-mouth-men.' The Nacirema have an almost pathological horror of and fascination with the mouth, the condition of which is believed to have a supernatural influence on all social relationships. Were it not for the rituals of the mouth, they believe that their teeth would fall out, their gums bleed, their jaws shrink, their friends desert them, and their lovers reject them.","source":"human","genre":"academic","wordCount":79,"difficulty":3,"explanation":"From Horace Miner's <strong>'Body Ritual among the Nacirema'</strong> (1956). This is describing <em>dentists</em> \u2014 'holy-mouth-men' \u2014 and the passage reads like serious anthropological observation of an exotic culture. The formal academic register is nearly indistinguishable from AI, but the satirical intent (making the familiar seem alien) is a uniquely human intellectual move.","meta":{"author":"Horace Miner, 'Body Ritual among the Nacirema,' American Anthropologist, 1956"}},{"id":"h019","text":"Now, the point of the story is this: Did the tiger come out of that door, or did the lady? The more we reflect upon this question, the harder it is to answer. It involves a study of the human heart which leads us through devious mazes of passion, out of which it is difficult to find our way. Think of it, fair reader, not as if the decision of the question depended upon yourself, but upon that hot-blooded, semi-barbaric princess, her soul at a white heat beneath the combined fires of despair and jealousy.","source":"human","genre":"fiction","wordCount":93,"difficulty":2,"explanation":"The famous ending of Frank R. Stockton's <strong>'The Lady, or the Tiger?'</strong> (1882). The direct address to the reader ('Think of it, fair reader') and the refusal to provide an answer are bold authorial choices. AI models are trained to be helpful and complete \u2014 leaving a question permanently unanswered goes against their fundamental nature.","meta":{"author":"Frank R. Stockton, 'The Lady, or the Tiger?', 1882 (public domain)"}},{"id":"h020","text":"The medicine men have an imposing temple, or latipso, in every community of any size. The more elaborate ceremonies required to treat very sick patients can only be performed at this temple. These ceremonies involve not only the thaumaturge but a permanent group of vestal maidens who move sedately about the temple chambers in distinctive costume and headdress. The latipso ceremonies are so harsh that it is phenomenal that a fair proportion of the really sick natives who enter the temple ever recover.","source":"human","genre":"academic","wordCount":79,"difficulty":3,"explanation":"From Miner's <strong>'Body Ritual among the Nacirema'</strong> (1956). This is describing a <em>hospital</em> \u2014 'latipso' is 'hospital' scrambled, 'vestal maidens' are nurses. The passage perfectly mimics serious anthropological observation while satirizing American healthcare. Its formal, structured prose is exactly the register AI excels at, making it one of the hardest passages to classify correctly.","meta":{"author":"Horace Miner, 'Body Ritual among the Nacirema,' American Anthropologist, 1956"}},{"id":"a001","text":"Tried the new ramen place on Divisadero tonight. I don't know, maybe I was just in a weird mood, but the tonkotsu broth tasted almost sweet? Like someone accidentally put a teaspoon of sugar in it. The noodles were fine, I guess. My friend Sarah loved it and she's usually pickier than me so maybe I'm the problem. Left a decent tip anyway because the waiter was really nice about splitting the check four ways.","source":"ai","genre":"review","wordCount":76,"difficulty":3,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to mimic a casual restaurant review. The planted street name ('Divisadero'), the hedging ('I don't know, maybe'), and the self-deprecating aside ('maybe I'm the problem') are deliberate tricks to sound human. The mention of 'Sarah' and splitting the check adds fake social texture. But the complaint is oddly lukewarm \u2014 real dissatisfied reviewers commit harder.","meta":{"model":"Claude 4.6 Opus","prompt":"Write a casual, slightly ambivalent restaurant review with specific details and a friend's name"}},{"id":"a002","text":"The alarm went off at 5:30 again and I just lay there listening to the rain. There's something about February mornings that makes everything feel provisional, like the day hasn't fully committed to happening yet. Made coffee. Fed the cat. Read three paragraphs of a book I've been 'reading' for six weeks. I think I'm becoming the kind of person who only starts things. My therapist would probably have something to say about that.","source":"ai","genre":"diary","wordCount":73,"difficulty":3,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to sound like an introspective journal entry. The planted details (5:30 alarm, February, the cat, the unfinished book) create an illusion of lived experience. The self-aware joke about therapy is calibrated to feel casually confessional. But the metaphor ('the day hasn't fully committed to happening') is a bit too polished for a real morning journal entry.","meta":{"model":"Claude 4.6 Opus","prompt":"Write a reflective diary entry about a mundane morning with self-deprecating humor"}},{"id":"a003","text":"The history of origami is deeply intertwined with the cultural and spiritual traditions of Japan, where paper folding has been practiced since at least the 6th century. The art form evolved from ceremonial applications, such as the folding of noshi for gift-giving, to a broader creative pursuit. In the 20th century, Akira Yoshizawa pioneered a systematic notation for folds, transforming origami from a folk craft into a recognized art form with mathematical underpinnings that continue to influence fields from engineering to medicine.","source":"ai","genre":"wikipedia","wordCount":80,"difficulty":1,"explanation":"Written by <strong>Claude 4.6 Opus</strong> in encyclopedic style. The clean structure, balanced phrasing, and smooth narrative arc from ancient history to modern applications are classic AI hallmarks. The progression 'ceremonial \u2192 creative \u2192 mathematical \u2192 engineering' is a bit too tidy. Real Wikipedia articles tend to be more fragmentary, with abrupt transitions and citation-needed gaps.","meta":{"model":"Claude 4.6 Opus","prompt":"Write a Wikipedia-style paragraph about origami history"}},{"id":"a004","text":"Honestly? This blender changed my life. I know that sounds dramatic for a kitchen appliance but hear me out. I've been making smoothies every morning for three years and my old Ninja couldn't handle frozen mango without sounding like a jet engine. This thing pulverizes everything in like 8 seconds. EIGHT. SECONDS. Only complaint is the lid is weirdly hard to get off after blending, like it creates some kind of vacuum seal situation. Minor gripe tho. 10/10 would blend again.","source":"ai","genre":"review","wordCount":82,"difficulty":2,"explanation":"Written by <strong>Claude 4.6 Opus</strong> mimicking an enthusiastic product review. The capitalized emphasis ('EIGHT. SECONDS.'), the 'hear me out' preamble, and the '10/10 would blend again' sign-off are internet-speak conventions that AI has learned to reproduce well. The minor complaint about the lid is a planted imperfection \u2014 real reviews include these naturally, AI adds them strategically.","meta":{"model":"Claude 4.6 Opus","prompt":"Write an enthusiastic Amazon-style product review with one small complaint"}},{"id":"a005","text":"She found the letter in the pocket of his winter coat, the one he only wore in December. It wasn't addressed to anyone. The handwriting was small and careful, the kind of writing that comes from someone trying very hard not to make mistakes. She read it twice, folded it back along its original creases, and returned it to the pocket. At dinner that night, she passed him the salt before he asked for it, and he looked at her with something close to gratitude.","source":"ai","genre":"fiction","wordCount":85,"difficulty":2,"explanation":"Written by <strong>Claude 4.6 Opus</strong>. This micro-fiction has the restrained, literary quality of a workshop piece. The details are carefully chosen (winter coat, December, original creases, passing the salt). But the emotional arc is almost too clean \u2014 setup, discovery, quiet resolution \u2014 without the messiness or ambiguity that real literary fiction often embraces.","meta":{"model":"Claude 4.6 Opus","prompt":"Write a short literary fiction paragraph about an unspoken secret between partners"}},{"id":"a006","text":"Quantum entanglement, often described as 'spooky action at a distance,' occurs when two particles become correlated in such a way that the quantum state of one instantaneously influences the other, regardless of the physical distance separating them. While this phenomenon has been experimentally verified numerous times since Bell's theorem was first tested in the 1970s, it does not allow for faster-than-light communication, as the measurement outcomes appear random without access to both particles' data.","source":"ai","genre":"wikipedia","wordCount":72,"difficulty":1,"explanation":"Written by <strong>Claude 4.6 Opus</strong> in encyclopedic style. This is textbook AI output \u2014 a complex topic explained clearly with a qualifier ('does not allow for faster-than-light communication') that pre-empts a common misconception. The phrase 'often described as' is an AI verbal tic. Real Wikipedia articles are usually more fragmented and citationheavy.","meta":{"model":"Claude 4.6 Opus","prompt":"Write a Wikipedia-style explanation of quantum entanglement"}},{"id":"a007","text":"The thing about grief is that it doesn't really go away, it just gets quieter. Like a radio station you can't fully tune out. Some days it's barely static, and you go about your life and buy groceries and laugh at things and feel almost normal. Other days it's so loud you can't hear anything else. Today was a static day. I ate a sandwich. I watched a bird outside. That was enough.","source":"ai","genre":"diary","wordCount":72,"difficulty":3,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to sound like an intimate grief journal. The radio metaphor is effective but <em>too</em> effective \u2014 it's a polished analogy for what should be raw emotion. The final three short sentences ('I ate a sandwich. I watched a bird. That was enough.') are a deliberate literary technique. Real grief journals are usually less composed.","meta":{"model":"Claude 4.6 Opus","prompt":"Write a diary entry about grief that uses a specific metaphor and ends with mundane details"}},{"id":"a008","text":"Regional transportation officials announced Thursday that the Elm Street bridge reconstruction project, originally scheduled for completion in November, will be delayed until at least March due to unexpected soil contamination discovered during foundation work. The delay is expected to add approximately $2.3 million to the project's $18 million budget. Commuters using the Route 9 corridor are advised to continue using the detour through Maple Avenue, which has experienced increased congestion during peak hours.","source":"ai","genre":"news","wordCount":70,"difficulty":2,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to mimic local news reporting. The invented-but-plausible details (Elm Street, Route 9, $2.3M / $18M, Maple Avenue) are designed to feel real. The inverted pyramid structure and passive voice ('are advised') are genre-appropriate. But the passage lacks a named source or direct quote \u2014 real news articles almost always attribute claims to a specific person.","meta":{"model":"Claude 4.6 Opus","prompt":"Write a local news excerpt about a construction delay with specific numbers and street names"}},{"id":"a009","text":"To make a proper risotto, the most important thing is patience. Begin by warming your broth in a separate pot \u2014 never add cold liquid to the rice. Saut\xE9 a finely diced onion in butter until translucent, then add the arborio rice and stir until each grain is coated and slightly toasted. From there, add broth one ladle at a time, stirring constantly and waiting until each addition is mostly absorbed before adding the next. This process takes roughly 18 to 20 minutes and cannot be rushed.","source":"ai","genre":"recipe","wordCount":87,"difficulty":2,"explanation":"Written by <strong>Claude 4.6 Opus</strong>. This reads like a clean, competent recipe introduction \u2014 and that's exactly why it feels like AI. The instructional voice is steady and authoritative without being personal. There's no 'my grandmother taught me' or 'I once ruined this by...' \u2014 no human fingerprint. Real home cooks usually inject at least one aside or personal tip.","meta":{"model":"Claude 4.6 Opus","prompt":"Write clear risotto instructions emphasizing patience and technique"}},{"id":"a010","text":"Last Tuesday I locked myself out of my apartment and had to wait for my landlord for two hours in the hallway. I sat on the floor next to my neighbor's door and could hear her watching some kind of cooking competition through the wall. Someone was getting eliminated and she gasped. I don't know why but that made me feel less alone. When my landlord finally showed up, he didn't even apologize, just shook his head like I was a problem he'd already solved in his mind.","source":"ai","genre":"diary","wordCount":90,"difficulty":3,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to sound like a casual personal anecdote. Every detail is designed to feel specific and lived-in: the neighbor's cooking show, the gasp through the wall, the landlord's dismissive head shake. These are <em>planted</em> details \u2014 they mimic the randomness of real memory. The emotional beat ('that made me feel less alone') is the kind of observation AI has learned to deploy for authenticity.","meta":{"model":"Claude 4.6 Opus","prompt":"Write a diary entry about being locked out with overheard details from a neighbor"}},{"id":"a011","text":"the sky tonight is doing that thing where it cant decide if its purple or grey and honestly same. been staring out the window for twenty minutes instead of finishing my essay thats due tomorrow. my roommate just made popcorn and the whole apartment smells like butter and bad decisions. i should probably start writing. or i could keep looking at the sky. the sky doesnt have a word count requirement.","source":"ai","genre":"tweet","wordCount":68,"difficulty":3,"explanation":"Written by <strong>Claude 4.6 Opus</strong> mimicking a stream-of-consciousness social media post. The deliberate lack of punctuation, the lowercase 'i,' the 'honestly same,' and the procrastination humor are all calibrated to read as authentic Gen Z internet voice. The final line ('the sky doesnt have a word count requirement') is a planted punchline \u2014 it's a <em>bit</em> too good for a real procrastination tweet.","meta":{"model":"Claude 4.6 Opus","prompt":"Write a casual social media post about procrastination with no punctuation and Gen Z voice"}},{"id":"a012","text":"What strikes me about this collection is how deliberately it resists chronology. The poems don't build toward revelation \u2014 they circle it, approaching the same themes of displacement and inheritance from shifting angles. There is a preoccupation with doorways, both literal and figurative, that runs through nearly every piece. The strongest work here lives in the tension between formal constraint and emotional excess, particularly in the villanelle on page forty-three, which manages to make repetition feel not like structure but like compulsion.","source":"ai","genre":"academic","wordCount":80,"difficulty":2,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to sound like a literary review or academic essay. The vocabulary ('displacement,' 'inheritance,' 'formal constraint,' 'emotional excess') and the reference to a specific page number are designed to signal expertise. But the analysis is impressionistic rather than specific \u2014 it could describe almost any poetry collection. Real critics anchor their claims in quoted lines.","meta":{"model":"Claude 4.6 Opus","prompt":"Write a literary criticism paragraph about a poetry collection with specific analytical language"}},{"id":"a013","text":"Hi everyone, just a heads up that the conference room on the 3rd floor will be unavailable next Monday and Tuesday for maintenance. If you have meetings scheduled during that time, please rebook to either the 2nd floor room or the large meeting space near reception. I know it's short notice \u2014 sorry about that. The HVAC unit has been making some concerning sounds and facilities wants to address it before it becomes a bigger issue. Thanks for your patience!","source":"ai","genre":"email","wordCount":77,"difficulty":2,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to sound like a standard office email. The casual-professional tone ('heads up,' 'concerning sounds,' 'sorry about that') is pitch-perfect workplace communication. But it's <em>too</em> considerate \u2014 real office emails about room closures tend to be more terse and less apologetic. The 'HVAC making concerning sounds' detail is a planted humanizing touch.","meta":{"model":"Claude 4.6 Opus","prompt":"Write a workplace email about a conference room closure that sounds natural and slightly apologetic"}},{"id":"a014","text":"The kitchen window frames a square of light that changes every hour. Morning: the table holds its breath in amber. Noon: white, merciless, revealing every scratch in the wood. Evening: the shadows of the elm branches write cursive across the walls, a language I almost understand. I have lived in this house for eleven years and I am still learning what the light does here. It is the most patient teacher I have ever had.","source":"ai","genre":"poem","wordCount":74,"difficulty":2,"explanation":"Written by <strong>Claude 4.6 Opus</strong> as a prose poem. The extended personification of light and the colon-separated time structure are aesthetically pleasing but <em>organized</em> in a way real poems rarely are. The final metaphor ('the most patient teacher') ties everything up too neatly. Real poetry tends to resist such clean conclusions \u2014 it prefers to leave the reader unsettled.","meta":{"model":"Claude 4.6 Opus","prompt":"Write a prose poem about light in a kitchen across different times of day"}},{"id":"a015","text":"The concept of 'emotional labor,' first introduced by sociologist Arlie Russell Hochschild in her 1983 work The Managed Heart, refers to the process by which employees regulate their emotional expressions to fulfill the requirements of their jobs. Hochschild's research focused primarily on flight attendants and bill collectors, demonstrating how organizations effectively commodify human feeling. The term has since expanded well beyond its original academic context, entering popular discourse to describe the often-invisible emotional work performed in personal relationships.","source":"ai","genre":"academic","wordCount":76,"difficulty":1,"explanation":"Written by <strong>Claude 4.6 Opus</strong>. This is classic AI academic writing \u2014 a concept is introduced, attributed, explained, and then its broader significance is noted, all in one smooth paragraph. The structure is impeccable but <em>too</em> impeccable. Real academic writing tends to be more argumentative and less expository, with the author's own position woven into the summary.","meta":{"model":"Claude 4.6 Opus","prompt":"Write an academic paragraph explaining emotional labor and its origin"}},{"id":"a016","text":"My grandmother's pie crust recipe calls for lard, and I know that's not what people want to hear in 2024, but I'm telling you \u2014 butter cannot do what lard does to a pie crust. You want flaky? You want layers? Use cold lard, cut it into the flour with a pastry cutter until it looks like wet sand, and do NOT overwork it. Add ice water a tablespoon at a time. The whole thing should come together like it barely wants to. That reluctance is what makes it perfect.","source":"ai","genre":"recipe","wordCount":91,"difficulty":3,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to mimic a personal food blog. The 'grandmother's recipe' framing, the defensive tone about lard, and the personification of dough ('barely wants to,' 'that reluctance') are all designed to feel authentically opinionated and personal. This is one of the trickiest AI passages \u2014 the voice is confident and specific. The tell is that it's <em>performatively</em> authentic rather than casually so.","meta":{"model":"Claude 4.6 Opus","prompt":"Write a recipe post defending an unpopular ingredient with a strong personal voice and grandmother reference"}},{"id":"a017","text":"The renovation of urban waterfronts has emerged as a significant trend in contemporary city planning, with municipalities increasingly recognizing the economic, ecological, and social benefits of reclaiming industrial harbor zones for public use. Cities such as Copenhagen, Melbourne, and Baltimore have transformed formerly polluted docklands into vibrant mixed-use districts featuring parks, cultural institutions, and residential developments. These projects typically involve complex negotiations between public agencies, private developers, and community stakeholders.","source":"ai","genre":"news","wordCount":68,"difficulty":1,"explanation":"Written by <strong>Claude 4.6 Opus</strong>. This reads like a generic overview paragraph from a magazine or textbook \u2014 balanced, informative, and completely impersonal. The list of three cities, the three-part benefit structure ('economic, ecological, and social'), and the 'complex negotiations' conclusion are structural patterns AI defaults to. Real journalism would focus on one city with specific people and conflicts.","meta":{"model":"Claude 4.6 Opus","prompt":"Write a news-style paragraph about waterfront urban development trends"}},{"id":"a018","text":"Hey, sorry for the late reply \u2014 things have been kind of hectic. I talked to the vet and she said Biscuit's blood work came back mostly fine but his thyroid levels are a little high, so we might need to start him on medication. She didn't seem too worried though. Also I forgot to mention, mom called and wants to do Thanksgiving at her place this year instead of aunt Carol's. Let me know if that works. Hope your week's going ok.","source":"ai","genre":"email","wordCount":82,"difficulty":3,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to mimic a casual text message or email between siblings. The pet name ('Biscuit'), the thyroid detail, and the pivot from vet news to Thanksgiving plans create an illusion of real domestic life. The 'sorry for the late reply' opener and 'hope your week's going ok' closer are natural bookends. The giveaway is subtle: this message has <em>exactly</em> the right emotional temperature throughout \u2014 real messages tend to be more uneven.","meta":{"model":"Claude 4.6 Opus","prompt":"Write a casual sibling text message about a pet's vet visit and holiday plans"}},{"id":"a019","text":"do not tell me the moon is shining; show me the glint of light on broken glass \u2014 I keep thinking about this quote, which people attribute to Chekhov though I can never find the original source. maybe it's apocryphal. the point stands either way. I've been revising the same paragraph for three days now and every version tells when it should show. the problem might be that I don't actually know what the character is feeling. how do you show something you haven't figured out yet.","source":"ai","genre":"diary","wordCount":86,"difficulty":3,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to sound like a writer's journal. The Chekhov quote (which <em>is</em> commonly misattributed), the meta-commentary about 'telling vs. showing,' and the frustrated self-awareness are designed to feel like genuine creative struggle. The lowercase style and the final rhetorical question mimic informal journaling. But the passage is itself a perfectly executed example of 'showing' \u2014 which is a little too self-aware.","meta":{"model":"Claude 4.6 Opus","prompt":"Write a writer's journal entry about struggling with a Chekhov writing principle, lowercase and informal"}},{"id":"a020","text":"When I consider the extraordinary capacity of the human mind to construct meaning from fragmentary evidence \u2014 to see faces in clouds, narratives in coincidences, and intention in randomness \u2014 I am struck not by our irrationality but by our profound, almost desperate need for coherence. We are, at our core, pattern-seeking creatures, and this tendency serves us well in most contexts. It is only when we apply it too broadly that it becomes a liability, transforming noise into signal and correlation into cause.","source":"ai","genre":"academic","wordCount":80,"difficulty":1,"explanation":"Written by <strong>Claude 4.6 Opus</strong>. This is quintessential AI prose \u2014 eloquent, balanced, and making a point that sounds profound but is essentially a well-known observation about cognitive bias restated in elevated language. The three-part parallel structure ('faces in clouds, narratives in coincidences, intention in randomness') and the tidy reversal in the final sentence are hallmark AI rhetorical moves.","meta":{"model":"Claude 4.6 Opus","prompt":"Write an essayistic reflection on human pattern-seeking behavior in formal academic style"}}]`);
function Z(t) {
  const a = [...t];
  for (let o = a.length - 1; o > 0; o--) {
    const n = Math.floor(Math.random() * (o + 1));
    [a[o], a[n]] = [a[n], a[o]];
  }
  return a;
}
function x(t) {
  return t[Math.floor(Math.random() * t.length)];
}
function Q(t, a) {
  const o = new Set(a);
  let n = t.filter((s) => s.source === "human" && !o.has(s.id)), e = t.filter((s) => s.source === "ai" && !o.has(s.id));
  n.length < 5 && (n = t.filter((s) => s.source === "human")), e.length < 5 && (e = t.filter((s) => s.source === "ai"));
  const r = [], c = /* @__PURE__ */ new Set();
  function p(s) {
    const f = s.filter((v) => !c.has(v.id)), h = x(f);
    return c.add(h.id), h;
  }
  const m = n.filter((s) => s.difficulty === 3), d = e.filter((s) => s.difficulty === 3);
  if (m.length > 0) {
    const s = x(m);
    r.push(s), c.add(s.id);
  }
  if (d.length > 0) {
    const s = x(d);
    r.push(s), c.add(s.id);
  }
  const l = 5 - r.filter((s) => s.source === "human").length;
  for (let s = 0; s < l; s++) r.push(p(n));
  const y = 5 - r.filter((s) => s.source === "ai").length;
  for (let s = 0; s < y; s++) r.push(p(e));
  if (new Set(r.map((s) => s.genre)).size < 3) {
    const s = /* @__PURE__ */ new Map();
    for (const h of r) s.set(h.genre, (s.get(h.genre) || 0) + 1);
    const f = [...s.entries()].filter(([, h]) => h > 1).sort((h, v) => v[1] - h[1]);
    if (f.length > 0) {
      const [h] = f[0], v = r.findIndex((b) => b.genre === h), u = t.filter((b) => !c.has(b.id) && b.genre !== h);
      if (u.length > 0 && v >= 0) {
        const b = x(u);
        r[v] = b, c.add(b.id);
      }
    }
  }
  return Z(r);
}
function X(t, a) {
  let o = 0, n = 0;
  const e = /* @__PURE__ */ new Map();
  let r = 0, c = 0, p = 0, m = 0, d = 0;
  const l = /* @__PURE__ */ new Set(["poem", "fiction", "diary", "tweet"]), y = /* @__PURE__ */ new Set(["review", "recipe", "news", "wikipedia", "email", "instruction", "academic"]);
  for (let s = 0; s < a.length; s++) {
    const f = a[s], h = t[s];
    f.guess === "human" ? o++ : n++, f.correct || (e.set(h.genre, (e.get(h.genre) || 0) + 1), h.source === "human" && f.guess === "ai" && h.difficulty >= 2 && r++, h.source === "ai" && f.guess === "human" && (h.text.match(/street|avenue|road|plaza|1[0-9]{3}|200[0-9]|201[0-9]/i) && c++, h.difficulty >= 2 && p++, l.has(h.genre) && m++, y.has(h.genre) && d++));
  }
  const g = a.filter((s) => s.correct).length;
  return r >= 2 ? { primary: "You consistently flagged polished writing as AI. But some humans are just\u2026 good writers.", detail: 'Clean prose and well-structured sentences feel "too perfect" \u2014 but professional writers, editors, and journalists produce text like this daily. AI has made us suspicious of quality.' } : c >= 2 ? { primary: "You trusted specificity. When a passage mentioned a real place or date, you assumed human. AI has learned to exploit this.", detail: "Planted details \u2014 street names, years, sensory descriptions \u2014 are the most effective trick in AI's arsenal. Real specificity comes from memory; fake specificity comes from training data." } : p >= 2 ? { primary: 'You were fooled by imperfection. AI passages had deliberate "mistakes" \u2014 and you marked them as human.', detail: `Typos, run-on sentences, and hedging language ("I think", "maybe") were once reliable human signals. Now they're easily mimicked. The question is whether the imperfection feels organic or performed.` } : m > d && m >= 2 ? { primary: "You caught AI in functional text but missed it in creative writing. AI poetry and fiction slipped past you.", detail: "Many people assume AI is worse at creative text than functional text. But modern models can produce convincing poems and diary entries \u2014 especially when prompted with emotional specificity." } : d > m && d >= 2 ? { primary: "You caught every AI poem but missed the AI reviews. AI is better at functional text than creative text \u2014 and you knew it intuitively.", detail: "Reviews, instructions, and news excerpts are AI's comfort zone. The structured format and objective tone make it harder to spot the lack of genuine experience behind the words." } : o >= 7 ? { primary: 'You leaned heavily toward "Human." You trust writers \u2014 but that trust was exploited.', detail: `You guessed "Human" ${o} out of 10 times. In a world where AI text is increasingly common, a generous reading might be a liability.` } : n >= 7 ? { primary: `You leaned heavily toward "AI." You're suspicious of text \u2014 and sometimes that suspicion backfired.`, detail: `You guessed "AI" ${n} out of 10 times. Healthy skepticism is good, but over-suspicion can make you dismiss authentic human expression.` } : g >= 9 ? { primary: "You have a remarkably calibrated sense for AI text. Very few visitors score this high.", detail: "Whether through intuition or analysis, you can distinguish the subtle patterns that separate human expression from machine generation. The question is: how long will that edge last?" } : g <= 3 ? { primary: "This is a humbling result \u2014 but that's the point. The line between human and AI writing is thinner than most people think.", detail: "Don't worry: most visitors struggle with these passages. They were specifically chosen to challenge assumptions. The real takeaway is what you learned about your own biases." } : { primary: "Your accuracy was middle-of-the-road \u2014 which means you're experiencing the same uncertainty as most visitors.", detail: 'You got some right on instinct and some wrong despite confidence. The passages that fooled you reveal where your mental model of "AI writing" diverges from reality.' };
}
function S(t) {
  const a = { 10: { title: "Turing Complete", subtitle: "You see through the machine." }, 9: { title: "Pattern Anomaly", subtitle: "Almost nobody scores this high." }, 8: { title: "Signal Decoder", subtitle: "You read between the lines." }, 7: { title: "Binary Literate", subtitle: "You know which bits are real." }, 6: { title: "Above the Noise", subtitle: "You're starting to hear the difference." }, 5: { title: "Coin Flip Oracle", subtitle: "Exactly what random chance predicts." }, 4: { title: "Static Noise", subtitle: "The signal is getting lost." }, 3: { title: "Blurred Lines", subtitle: "The boundary deceived you." }, 2: { title: "Ghost in the Machine", subtitle: "You see humans where there are none." }, 1: { title: "AI Sympathizer", subtitle: "You trust the machine too much." }, 0: { title: "Perfectly Wrong", subtitle: "Statistically impressive, actually." } };
  return a[t] ?? a[5];
}
function ee(t) {
  const a = t.filter((l) => l.confidence >= 80), o = t.filter((l) => l.confidence < 70), n = a.filter((l) => l.correct).length, e = o.filter((l) => l.correct).length, r = t.filter((l) => l.confidence >= 85 && !l.correct).length, c = t.filter((l) => l.confidence < 65 && l.correct).length, p = a.length >= 2 ? n / a.length : null, m = o.length >= 2 ? e / o.length : null;
  let d;
  return r >= 3 ? d = "You were frequently certain \u2014 and frequently wrong. Overconfidence is the most common trap in this game." : p !== null && p >= 0.8 ? d = "Your confidence was well-calibrated. When you felt sure, you usually were." : c >= 3 ? d = "You doubted yourself more than you should have. Your instincts were better than you thought." : p !== null && m !== null && m > p ? d = "Counterintuitively, you did better when you were less sure. Doubt might be your superpower." : d = "Your confidence didn't strongly predict your accuracy \u2014 which is typical. Our certainty about AI detection is often misplaced.", { highConfAccuracy: p, lowConfAccuracy: m, overconfidentCount: r, underconfidentCount: c, summary: d };
}
function te(t) {
  const a = t.map((l) => l.timeTaken), o = a.reduce((l, y) => l + y, 0) / a.length;
  let n = 0, e = 0;
  for (let l = 1; l < a.length; l++) a[l] < a[n] && (n = l), a[l] > a[e] && (e = l);
  const r = t.filter((l) => l.timeTaken < 5e3), c = t.filter((l) => l.timeTaken > 15e3), p = r.length >= 2 ? r.filter((l) => l.correct).length / r.length : null, m = c.length >= 2 ? c.filter((l) => l.correct).length / c.length : null;
  let d;
  return p !== null && m !== null && p > m + 0.15 ? d = "Your gut instinct outperformed your deliberation. Sometimes the first impression is the honest one." : p !== null && m !== null && m > p + 0.15 ? d = "Taking your time paid off. Careful reading caught what snap judgments missed." : o < 8e3 ? d = "You moved quickly through the passages. Speed suggests confidence \u2014 whether justified or not." : o > 2e4 ? d = "You took your time with each passage. Careful analysis is a valid strategy \u2014 but it doesn't always help." : d = "Your pace was steady throughout. Neither rushing nor overthinking \u2014 a balanced approach.", { avgTime: o, fastestIdx: n, slowestIdx: e, gutAccuracy: p, deliberateAccuracy: m, summary: d };
}
const q = "turing_shuffle_history", G = "turing_shuffle_last_ids";
function E() {
  return { totalGames: 0, totalCorrect: 0, totalAnswered: 0, bestScore: 0, bestStreak: 0, results: [], passageMisses: {} };
}
function A() {
  try {
    const t = localStorage.getItem(q);
    return t ? JSON.parse(t) : E();
  } catch {
    return E();
  }
}
function ae(t, a, o, n) {
  const e = A(), r = { date: Date.now(), score: o, total: a.length, passageIds: t.map((c) => c.id), answers: a, bestStreak: n };
  e.totalGames++, e.totalCorrect += o, e.totalAnswered += a.length, o > e.bestScore && (e.bestScore = o), n > (e.bestStreak || 0) && (e.bestStreak = n), e.results.push(r);
  for (const c of a) c.correct || (e.passageMisses[c.passageId] = (e.passageMisses[c.passageId] || 0) + 1);
  e.results.length > 50 && (e.results = e.results.slice(-50)), localStorage.setItem(q, JSON.stringify(e)), localStorage.setItem(G, JSON.stringify(t.map((c) => c.id)));
}
function ie() {
  try {
    const t = localStorage.getItem(G);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
const Y = "/.netlify/functions/turing-stats";
async function ne(t) {
  const a = t.map((n) => ({ passageId: n.passageId, userGuess: n.guess, confidence: n.confidence, correct: n.correct })), o = await fetch(Y, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ answers: a }) });
  if (!o.ok) throw new Error(`API error: ${o.status}`);
}
async function D() {
  try {
    const t = await fetch(Y, { method: "GET" });
    return t.ok ? await t.json() : null;
  } catch {
    return null;
  }
}
function oe(t, a, o) {
  const n = document.createElement("canvas");
  n.width = 600, n.height = 370;
  const e = n.getContext("2d"), r = e.createLinearGradient(0, 0, 600, 370);
  r.addColorStop(0, "#0a0c10"), r.addColorStop(1, "#131620"), e.fillStyle = r, e.fillRect(0, 0, 600, 370), e.strokeStyle = "rgba(100, 120, 180, 0.3)", e.lineWidth = 2, e.strokeRect(1, 1, 598, 368), e.fillStyle = "#eef0f6", e.font = 'bold 28px "Playfair Display", Georgia, serif', e.textAlign = "center", e.fillText("The Turing Shuffle", 300, 48), e.font = 'bold 52px "Inter", sans-serif';
  const c = e.createLinearGradient(200, 60, 400, 120);
  t >= 7 ? (c.addColorStop(0, "#2dd4bf"), c.addColorStop(1, "#38bdf8")) : t >= 4 ? (c.addColorStop(0, "#fbbf24"), c.addColorStop(1, "#f97316")) : (c.addColorStop(0, "#f87171"), c.addColorStop(1, "#fb923c")), e.fillStyle = c, e.fillText(`${t} / ${a}`, 300, 118);
  const { title: p } = S(t);
  e.fillStyle = "#fbbf24", e.font = 'bold 20px "Inter", sans-serif', e.fillText(p, 300, 150), e.fillStyle = "#8892b0", e.font = '16px "Inter", sans-serif', e.fillText("Can you tell human writing from AI?", 300, 178);
  const m = 36, d = 8, y = (600 - (a * m + (a - 1) * d)) / 2, g = 200;
  for (let s = 0; s < o.length; s++) {
    const f = y + s * (m + d), h = o[s].correct;
    e.fillStyle = h ? "rgba(45, 212, 191, 0.2)" : "rgba(248, 113, 113, 0.2)", e.beginPath(), e.roundRect(f, g, m, m, 6), e.fill(), e.strokeStyle = h ? "rgba(45, 212, 191, 0.6)" : "rgba(248, 113, 113, 0.6)", e.lineWidth = 2, e.beginPath(), e.roundRect(f, g, m, m, 6), e.stroke(), h ? (e.strokeStyle = "#2dd4bf", e.lineWidth = 3, e.beginPath(), e.moveTo(f + 10, g + 18), e.lineTo(f + 16, g + 25), e.lineTo(f + 27, g + 12), e.stroke()) : (e.strokeStyle = "#f87171", e.lineWidth = 3, e.beginPath(), e.moveTo(f + 10, g + 10), e.lineTo(f + 26, g + 26), e.moveTo(f + 26, g + 10), e.lineTo(f + 10, g + 26), e.stroke());
  }
  return e.fillStyle = "#eef0f6", e.font = '500 18px "Inter", sans-serif', e.fillText("Can you beat me?", 300, 290), e.fillStyle = "#4a5568", e.font = '13px "Inter", sans-serif', e.fillText("williamcfrancis.netlify.app", 300, 345), n.toDataURL("image/png");
}
async function se(t, a, o) {
  const n = oe(t, a, o), { title: e } = S(t), r = `I scored ${t}/${a} on The Turing Shuffle \u2014 "${e}" \u{1F916}\u270D\uFE0F

https://williamcfrancis.netlify.app/games/turing_shuffle/`;
  if (navigator.share) try {
    const c = await (await fetch(n)).blob(), p = new File([c], "turing-shuffle-score.png", { type: "image/png" });
    await navigator.share({ text: r, files: [p] });
    return;
  } catch {
  }
  try {
    await navigator.clipboard.writeText(r), re();
  } catch {
    const c = window.open("", "_blank");
    c && c.document.write(`<html><body style="background:#0a0c10;display:flex;flex-direction:column;align-items:center;padding:40px;font-family:sans-serif;color:#eef0f6"><img src="${n}" style="max-width:100%"/><p style="margin-top:20px">${r}</p></body></html>`);
  }
}
function re() {
  const t = document.createElement("div");
  t.className = "toast", t.textContent = "Score copied to clipboard!", document.body.appendChild(t), requestAnimationFrame(() => t.classList.add("show")), setTimeout(() => {
    t.classList.remove("show"), setTimeout(() => t.remove(), 300);
  }, 2e3);
}
const _ = document.getElementById("app");
let i = { screen: "landing", passages: [], currentIndex: 0, answers: [], confidence: 75, aggregateStats: null, history: A(), insight: null, passageStartTime: 0, currentStreak: 0, bestStreak: 0 };
function le() {
  D().then((t) => {
    i.aggregateStats = t, i.screen === "landing" && H(), i.screen === "reveal" && C();
  }).catch(() => {
  }), H();
}
function F() {
  const t = ie();
  i.passages = Q(U, t), i.currentIndex = 0, i.answers = [], i.confidence = 75, i.screen = "game", i.insight = null, i.currentStreak = 0, i.bestStreak = 0, N();
}
function L(t) {
  document.querySelectorAll(".btn-guess").forEach((r) => {
    r.disabled = true;
  });
  const a = i.passages[i.currentIndex], o = Date.now() - i.passageStartTime, n = t === a.source, e = { passageId: a.id, guess: t, confidence: i.confidence, correct: n, timeTaken: o };
  i.answers.push(e), n ? (i.currentStreak++, i.currentStreak > i.bestStreak && (i.bestStreak = i.currentStreak)) : i.currentStreak = 0, ce(n, a.source), setTimeout(() => {
    i.currentIndex++, i.confidence = 75, i.currentIndex >= 10 ? de() : N();
  }, 900);
}
function ce(t, a) {
  const o = document.getElementById("passage-card");
  if (!o) return;
  const n = document.createElement("div");
  n.className = `feedback-overlay ${t ? "feedback-correct" : "feedback-incorrect"}`, n.innerHTML = `
    <div class="feedback-icon">${t ? "&#10003;" : "&#10007;"}</div>
    <div class="feedback-label">${t ? "Correct" : "Wrong"}</div>
    <div class="feedback-source">It was <strong>${a === "human" ? "Human" : "AI"}</strong></div>
  `, o.appendChild(n), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.classList.add("show");
    });
  });
  const e = document.getElementById("streak");
  t && i.currentStreak >= 2 && e ? (e.textContent = `\u{1F525} ${i.currentStreak} in a row`, e.classList.remove("streak-hidden"), e.classList.add("streak-pop")) : !t && e && i.currentStreak === 0 && (e.classList.contains("streak-hidden") || (e.classList.add("streak-break"), setTimeout(() => e.classList.add("streak-hidden"), 300)));
}
async function de() {
  const t = i.answers.filter((a) => a.correct).length;
  i.insight = X(i.passages, i.answers), ae(i.passages, i.answers, t, i.bestStreak), i.history = A(), i.screen = "reveal", C();
  try {
    await ne(i.answers);
    const a = await D();
    a && (i.aggregateStats = a, C());
  } catch {
  }
}
function H() {
  var _a;
  const t = i.history, a = ((_a = i.aggregateStats) == null ? void 0 : _a.global) ? `Average score across all visitors: ${i.aggregateStats.global.averageScore.toFixed(1)} / 10` : "Be the first to play.";
  let o = "";
  if (t.totalGames > 0) {
    const n = (t.totalCorrect / t.totalAnswered * 100).toFixed(0), e = (t.bestStreak || 0) >= 2 ? ` Best streak: <strong>${t.bestStreak}</strong> \u{1F525}` : "";
    o = `
      <div class="landing__history">
        You've played <strong>${t.totalGames}</strong> time${t.totalGames === 1 ? "" : "s"}.
        Lifetime accuracy: <strong>${n}%</strong>.
        Best: <strong>${t.bestScore}/10</strong>.${e}
      </div>
    `;
  }
  _.innerHTML = `
    <div class="landing">
      <h1 class="landing__title">The Turing Shuffle</h1>
      <div class="shuffle-animation">
        ${Array.from({ length: 10 }, () => '<div class="shuffle-card"></div>').join("")}
      </div>
      <p class="landing__subtitle">
        10 passages. Some are human. Some are AI.<br />
        Can you tell the difference?
      </p>
      <button class="btn-begin" id="btn-begin">Begin</button>
      <p class="landing__stat">${a}</p>
      ${o}
    </div>
  `, document.getElementById("btn-begin").addEventListener("click", F);
}
function N() {
  const t = i.passages[i.currentIndex], a = i.currentIndex / 10 * 100, o = i.currentStreak >= 2;
  _.innerHTML = `
    <div class="game">
      <div class="progress-bar">
        <div class="progress-bar__fill" style="width:${a}%"></div>
      </div>
      <div class="progress-label">${i.currentIndex + 1} of 10</div>

      <div class="streak-counter ${o ? "" : "streak-hidden"}" id="streak">
        \u{1F525} ${i.currentStreak} in a row
      </div>

      <div class="passage-card" id="passage-card">
        <span class="genre-pill">${t.genre}</span>
        <p class="passage-text">${w(t.text)}</p>
      </div>

      <div class="controls">
        <div class="confidence-row">
          <span class="confidence-label">Guessing</span>
          <input
            type="range"
            class="confidence-slider"
            id="confidence"
            min="50"
            max="100"
            value="${i.confidence}"
            step="1"
          />
          <span class="confidence-label">Certain</span>
        </div>

        <div class="buttons-row">
          <button class="btn-guess btn-human" id="btn-human">
            <span class="btn-icon">&#9998;</span>
            Human
          </button>
          <button class="btn-guess btn-ai" id="btn-ai">
            <span class="btn-icon">&#9881;</span>
            AI
          </button>
        </div>
      </div>
    </div>
  `, document.getElementById("confidence").addEventListener("input", (n) => {
    i.confidence = parseInt(n.target.value, 10);
  }), document.getElementById("btn-human").addEventListener("click", () => L("human")), document.getElementById("btn-ai").addEventListener("click", () => L("ai")), i.passageStartTime = Date.now();
}
function C() {
  var _a;
  const t = i.answers.filter((u) => u.correct).length, a = t / 10 * 100, o = 2 * Math.PI * 66, n = o - a / 100 * o, e = t >= 7 ? "url(#grad-correct)" : t >= 4 ? "url(#grad-warn)" : "url(#grad-incorrect)", { title: r, subtitle: c } = S(t);
  let p = "";
  if (((_a = i.aggregateStats) == null ? void 0 : _a.global) && i.aggregateStats.global.totalGames > 0) {
    const u = i.aggregateStats.global.averageScore;
    p = `<p class="percentile">Better than ${Math.min(99, Math.max(1, Math.round(50 + (t - u) * 15)))}% of visitors</p>`;
  }
  const m = i.bestStreak >= 2 ? `<div class="best-streak">\u{1F525} Best streak: ${i.bestStreak} in a row</div>` : "", d = ee(i.answers), l = te(i.answers);
  let y = "";
  d.highConfAccuracy !== null && (y += `
      <div class="analysis-stat">
        <span class="analysis-stat__label">When certain (80%+)</span>
        <span class="analysis-stat__value">${Math.round(d.highConfAccuracy * 100)}% right</span>
      </div>`), d.lowConfAccuracy !== null && (y += `
      <div class="analysis-stat">
        <span class="analysis-stat__label">When guessing (&lt;70%)</span>
        <span class="analysis-stat__value">${Math.round(d.lowConfAccuracy * 100)}% right</span>
      </div>`), d.overconfidentCount > 0 && (y += `
      <div class="analysis-stat">
        <span class="analysis-stat__label">Overconfident</span>
        <span class="analysis-stat__value">${d.overconfidentCount} time${d.overconfidentCount > 1 ? "s" : ""}</span>
      </div>`), d.underconfidentCount > 0 && (y += `
      <div class="analysis-stat">
        <span class="analysis-stat__label">Underconfident</span>
        <span class="analysis-stat__value">${d.underconfidentCount} time${d.underconfidentCount > 1 ? "s" : ""}</span>
      </div>`);
  let g = `
    <div class="analysis-stat">
      <span class="analysis-stat__label">Average per passage</span>
      <span class="analysis-stat__value">${j(l.avgTime)}</span>
    </div>`;
  l.gutAccuracy !== null && (g += `
      <div class="analysis-stat">
        <span class="analysis-stat__label">Gut instinct (&lt;5s)</span>
        <span class="analysis-stat__value">${Math.round(l.gutAccuracy * 100)}% right</span>
      </div>`), l.deliberateAccuracy !== null && (g += `
      <div class="analysis-stat">
        <span class="analysis-stat__label">Deliberated (&gt;15s)</span>
        <span class="analysis-stat__value">${Math.round(l.deliberateAccuracy * 100)}% right</span>
      </div>`);
  const s = `
    <div class="analysis-grid">
      <div class="analysis-card">
        <div class="analysis-card__title">Confidence Calibration</div>
        ${y}
        <p class="analysis-card__summary">${w(d.summary)}</p>
      </div>
      <div class="analysis-card">
        <div class="analysis-card__title">Timing Patterns</div>
        ${g}
        <p class="analysis-card__summary">${w(l.summary)}</p>
      </div>
    </div>
  `, f = i.passages.map((u, b) => {
    var _a2, _b;
    const k = i.answers[b], $ = k.correct, R = $ ? "&#10003;" : "&#10007;", z = u.source === "human" ? "Human" : "AI", P = u.source === "human" ? u.meta.author ? `<div class="reveal-card__meta">${w(u.meta.author)}</div>` : "" : u.meta.model ? `<div class="reveal-card__meta">${w(u.meta.model)}${u.meta.prompt ? " \u2014 Prompt: \u201C" + w(u.meta.prompt) + "\u201D" : ""}</div>` : "", V = "\u2605".repeat(u.difficulty) + "\u2606".repeat(3 - u.difficulty), K = j(k.timeTaken), J = k.timeTaken < 5e3 ? "gut" : k.timeTaken > 15e3 ? "deliberate" : "", W = k.timeTaken < 5e3 ? "Gut instinct" : k.timeTaken > 15e3 ? "Deliberated" : "";
    let O = "";
    const T = (_b = (_a2 = i.aggregateStats) == null ? void 0 : _a2.passages) == null ? void 0 : _b[u.id];
    if (T) {
      const B = T.humanVotes + T.aiVotes;
      if (B > 0) {
        const I = Math.round(T.humanVotes / B * 100), M = 100 - I;
        O = `
          <div class="community-bar">
            <div class="community-bar__human" style="width:${I}%"></div>
            <div class="community-bar__ai" style="width:${M}%"></div>
          </div>
          <div class="community-labels">
            <span>${I}% said Human</span>
            <span>${M}% said AI</span>
          </div>
        `;
      }
    }
    return `
      <div class="reveal-card ${$ ? "correct" : "incorrect"}" data-idx="${b}">
        <div class="reveal-card__header">
          <div class="reveal-card__icon">${R}</div>
          <div>
            <span class="genre-pill">${u.genre}</span>
            <div class="reveal-card__verdict">
              You said <strong>${k.guess === "human" ? "Human" : "AI"}</strong>
              \u2014 Actually <span class="source-label" style="color:${u.source === "human" ? "var(--human-start)" : "var(--ai-start)"}">${z}</span>
            </div>
          </div>
        </div>
        <p class="reveal-card__text">${w(u.text)}</p>
        <p class="reveal-card__explanation">${u.explanation}</p>
        ${P}
        <div class="reveal-card__badges">
          <span class="difficulty-badge" title="Difficulty">${V}</span>
          <span class="time-badge">${K}</span>
          ${W ? `<span class="reaction-badge ${J}">${W}</span>` : ""}
        </div>
        ${O}
      </div>
    `;
  }).join(""), h = i.insight, v = h ? `
    <div class="insight-section">
      <div class="insight-section__title">Your Pattern</div>
      <p class="insight-section__primary">${w(h.primary)}</p>
      <p class="insight-section__detail">${w(h.detail)}</p>
    </div>
  ` : "";
  _.innerHTML = `
    <div class="reveal">
      <div class="score-header">
        <div class="score-circle">
          <svg viewBox="0 0 140 140">
            <defs>
              <linearGradient id="grad-correct" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="var(--ai-start)" />
                <stop offset="100%" stop-color="var(--ai-end)" />
              </linearGradient>
              <linearGradient id="grad-warn" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fbbf24" />
                <stop offset="100%" stop-color="#f97316" />
              </linearGradient>
              <linearGradient id="grad-incorrect" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f87171" />
                <stop offset="100%" stop-color="#fb923c" />
              </linearGradient>
            </defs>
            <circle class="score-circle__bg" cx="70" cy="70" r="66" />
            <circle
              class="score-circle__fill"
              cx="70" cy="70" r="66"
              stroke="${e}"
              stroke-dasharray="${o}"
              stroke-dashoffset="${o}"
              id="score-arc"
            />
          </svg>
          <div class="score-circle__text">
            <div class="score-number">${t}</div>
            <div class="score-label">out of 10</div>
          </div>
        </div>
        <div class="score-rank">
          <div class="score-rank__title">${w(r)}</div>
          <div class="score-rank__subtitle">${w(c)}</div>
        </div>
        <h2 class="score-title">You got ${t} out of 10 correct</h2>
        ${p}
        ${m}
      </div>

      ${v}

      ${s}

      <div class="breakdown">
        <h3 class="breakdown__title">Passage Breakdown</h3>
        ${f}
      </div>

      <div class="actions">
        <button class="btn-action btn-play-again" id="btn-again">Play Again</button>
        <button class="btn-action btn-share" id="btn-share">Share Score</button>
      </div>
    </div>
  `, requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const u = document.getElementById("score-arc");
      u && u.setAttribute("stroke-dashoffset", String(n));
    });
  }), document.querySelectorAll(".reveal-card").forEach((u) => {
    u.addEventListener("click", () => u.classList.toggle("expanded"));
  }), document.getElementById("btn-again").addEventListener("click", F), document.getElementById("btn-share").addEventListener("click", () => {
    se(t, 10, i.answers);
  });
}
function w(t) {
  const a = document.createElement("div");
  return a.textContent = t, a.innerHTML;
}
function j(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const o = Math.floor(a / 60), n = Math.round(a % 60);
  return `${o}m ${n}s`;
}
le();
