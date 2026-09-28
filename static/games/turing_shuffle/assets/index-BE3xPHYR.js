(function() {
  const a = document.createElement("link").relList;
  if (a && a.supports && a.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) n(r);
  new MutationObserver((r) => {
    for (const t of r) if (t.type === "childList") for (const l of t.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && n(l);
  }).observe(document, { childList: true, subtree: true });
  function s(r) {
    const t = {};
    return r.integrity && (t.integrity = r.integrity), r.referrerPolicy && (t.referrerPolicy = r.referrerPolicy), r.crossOrigin === "use-credentials" ? t.credentials = "include" : r.crossOrigin === "anonymous" ? t.credentials = "omit" : t.credentials = "same-origin", t;
  }
  function n(r) {
    if (r.ep) return;
    r.ep = true;
    const t = s(r);
    fetch(r.href, t);
  }
})();
const Ke = JSON.parse(`[{"id":"h001","text":"April 12.\u2014Mustard-and-cress and radishes not come up yet. Left Farmerson repairing the scraper, but when I came home found three men working. I asked the meaning of it, and Farmerson said that in making a fresh hole he had penetrated the gas-pipe. He said it was a most ridiculous place to put the gas-pipe, and the man who did it evidently knew nothing about his business. I felt his excuse was no consolation for the expense I shall be put to.","source":"human","genre":"diary","wordCount":78,"difficulty":1,"explanation":"This is from <strong>The Diary of a Nobody</strong> (1892) by George and Weedon Grossmith \u2014 a comic novel written as a fictional diary. The mundane frustrations, the specific name 'Farmerson,' and the resigned tone are hallmarks of authentic Victorian humor. AI rarely captures this kind of low-stakes domestic complaint so naturally.","twinText":"April 12 \u2014 A frustrating start to the week. The garden seedlings have yet to make an appearance, despite being planted some time ago. To compound matters, the workman engaged for a small repair inadvertently damaged the gas line, requiring two additional laborers to remedy the issue. He offered no apology, only complaints about the original installation. It is the sort of small domestic setback one learns to expect from such projects.","twinSource":"ai","tells":[{"phrase":"Farmerson","type":"human","note":"Real diaries name names. AI tends to keep workmen anonymous."},{"phrase":"Mustard-and-cress","type":"human","note":"A period-specific produce reference no model would invent."},{"phrase":"I shall be put to","type":"human","note":"Victorian construction \u2014 naturally archaic, not stylized."}],"meta":{"author":"George & Weedon Grossmith, 'The Diary of a Nobody,' 1892 (public domain)"}},{"id":"h002","text":"We dined at the Bullhead upon the best venison pasty that ever I eat of in my life, and with one dish more, it was the best dinner I ever was at. Here rose in discourse at table a dispute between Mr. Moore and Dr. Clerke, the former affirming that it was essential to a tragedy to have the argument of it true, which the Doctor denied, and left it to me to be judge, and the cause to be determined next Tuesday morning at the same place, upon the eating of the remains of the pasty, and the loser to spend 10s.","source":"human","genre":"diary","wordCount":101,"difficulty":2,"explanation":"This is a real entry from <strong>Samuel Pepys' diary</strong>, September 1, 1660. The archaic phrasing ('ever I eat of') and the way he entangles a literary debate with leftover venison is deeply human \u2014 the priorities are charmingly wrong. Many visitors flag the old-fashioned language as 'trying too hard,' but it's just how people wrote in the 1660s.","twinText":"We had dinner at the Bullhead, where the venison pasty was exceptional \u2014 quite possibly the finest I have ever had. Conversation at the table turned philosophical when Mr. Moore and Dr. Clerke fell into a debate about whether tragedy requires its underlying argument to be true. Each made his case, but the matter remained unresolved. We agreed to revisit it the following week at the same establishment, with the loser obliged to pay for the next meal.","twinSource":"ai","tells":[{"phrase":"ever I eat of","type":"human","note":"Genuine 17th-century syntax \u2014 too clumsy to be stylized."},{"phrase":"the loser to spend 10s","type":"human","note":"Period currency casually entangled with a literary bet."},{"phrase":"the eating of the remains of the pasty","type":"human","note":"Pepys-style entanglement of food and intellectual stakes."}],"meta":{"author":"Samuel Pepys, personal diary, September 1, 1660 (public domain)"}},{"id":"h003","text":"Painted the bath red, and was delighted with the result. Sorry to say Carrie was not, in fact we had a few words about it. She said I ought to have consulted her, and she had never heard of such a thing as a bath being painted red. I replied: 'It's merely a matter of taste.' Fortunately, further argument on the subject was stopped by a voice saying, 'May I come in?' It was only Cummings, who said, 'Your maid opened the door, and asked me to excuse her showing me in, as she was wringing out some socks.'","source":"human","genre":"diary","wordCount":98,"difficulty":1,"explanation":"Another excerpt from <strong>The Diary of a Nobody</strong> (1892). The absurdity of painting a bath red and then being interrupted by someone wringing socks \u2014 this cascade of non-sequiturs is almost impossible for AI to replicate organically. The humor arises from the narrator's complete lack of self-awareness.","twinText":"Carrie disapproved of the new red bath this morning. She felt I ought to have consulted her before making such a decision, which is, in fairness, perhaps reasonable. We had a brief disagreement about it, which was thankfully interrupted by the unexpected arrival of Cummings. He explained, somewhat awkwardly, that the maid had let him in herself. The day's small absurdities have a way of resolving themselves, even if not always in the manner one might hope.","twinSource":"ai","tells":[{"phrase":"Painted the bath red","type":"human","note":"Random absurd action with no setup \u2014 pure life, not narrative."},{"phrase":"wringing out some socks","type":"human","note":"Non-sequitur domestic detail no AI would surface."},{"phrase":"It's merely a matter of taste","type":"human","note":"Smug self-justification, in character."}],"meta":{"author":"George & Weedon Grossmith, 'The Diary of a Nobody,' 1892 (public domain)"}},{"id":"h004","text":"Pros: Ample outlets. Great Coffee. Great Art. Decent amount of seating. One time this guy came in with a real cute dog and I pet him on the head. V. soft. Cons: The A.C. is aggressive. Bring a sweater. The music can get a little intense if you're studying. Bring some headphones. Cute dog probably not here all the time. Bring a dog.","source":"human","genre":"review","wordCount":62,"difficulty":1,"explanation":"A real <strong>Yelp review</strong> of Caffe Vita Silverlake by Emily F. Cheever (2016). The structural gimmick of listing pros and cons but then veering into a running joke about a dog is peak human internet writing. 'V. soft.' and 'Bring a dog.' are the kind of micro-punchlines that AI tends to over-explain rather than just land.","twinText":"Pros: Plenty of outlets and a cozy atmosphere. The coffee is excellent and the artwork on the walls adds character to the space. Cons: The air conditioning runs a bit cold \u2014 a sweater is recommended. The music can be a little distracting if you are trying to concentrate, so headphones may help. Overall, a solid choice for working remotely or meeting a friend for a casual catch-up.","twinSource":"ai","tells":[{"phrase":"V. soft.","type":"human","note":"Abbreviated punchline. AI explains; humans abbreviate."},{"phrase":"Bring a dog.","type":"human","note":"The closing callback joke \u2014 committed, not hedged."},{"phrase":"this guy came in with a real cute dog and I pet him on the head","type":"human","note":"Specific, off-topic, but real."}],"meta":{"author":"Emily F. Cheever, Yelp review, 2016"}},{"id":"h005","text":"One Stop is number one!! GET IT? But seriously, my re-registration couldn't have gone easier, even with the fact that I'm sometimes bad at life and I was a few days late doing so. This is not an 'official' DMV\u2014it's a third party situation so you WILL pay an extra service fee. But honestly? This place saved me from what would have been an entire afternoon at the DMV, staring off into space and pondering my own existence.","source":"human","genre":"review","wordCount":77,"difficulty":1,"explanation":"A real <strong>Yelp review</strong> of One Stop DMV by Emily F. Cheever (2017). The opening pun, the self-deprecation ('I'm sometimes bad at life'), and the existential dread about the DMV are authentic human voice markers. AI can mimic this style but usually doesn't commit to the bit so wholeheartedly.","twinText":"One Stop made my registration renewal much easier than I expected. While they do charge an additional service fee \u2014 they are not an official DMV office \u2014 the convenience is well worth the cost, especially compared to the long lines at the actual DMV. The staff was efficient and friendly, and I was in and out in less than fifteen minutes. Highly recommended for anyone short on time.","twinSource":"ai","tells":[{"phrase":"I'm sometimes bad at life","type":"human","note":"Specific, weird self-deprecation no model would land naturally."},{"phrase":"GET IT?","type":"human","note":"Caps with a pun \u2014 AI usually plays it safer."},{"phrase":"pondering my own existence","type":"human","note":"Overcommits to the bit. AI hedges."}],"meta":{"author":"Emily F. Cheever, Yelp review, 2017"}},{"id":"h006","text":"Once you step inside you'll hesitate\u2014it's a hipster place. Like... Aggressively hipster. 'I just released a cassette of my band'-ironic dad-shirt hipster. But every single time I've been here I've been met with a warm and welcoming staff who actually is familiar with their menu and seem THRILLED to share the bounty of their work place. It has amazing food and generally the kind of atmosphere of a place you'd want to stay for hours. Don't judge a book by its cool, limited first edition cover.","source":"human","genre":"review","wordCount":85,"difficulty":2,"explanation":"A real <strong>Yelp review</strong> of The Semi-Tropic by Emily F. Cheever (2016). The compound hyphenated description ('I just released a cassette of my band'-ironic dad-shirt hipster) is an inventive, highly specific joke that AI would struggle to construct so naturally. The ending metaphor twists the clich\xE9 just enough to feel spontaneous.","twinText":"This restaurant has a distinctly hipster aesthetic, which may or may not appeal depending on your taste. Despite the somewhat self-conscious atmosphere, however, the service has consistently been warm and attentive. The staff is genuinely knowledgeable about the menu, and the food itself is excellent. The space encourages lingering, and most visitors will find that the experience comfortably exceeds first impressions.","twinSource":"ai","tells":[{"phrase":"'I just released a cassette of my band'-ironic dad-shirt hipster","type":"human","note":"A compound modifier so specific it can only be lived."},{"phrase":"limited first edition cover","type":"human","note":"Clich\xE9 twisted in a way AI usually leaves intact."},{"phrase":"THRILLED","type":"human","note":"Caps for emphasis \u2014 internet voice, not corporate."}],"meta":{"author":"Emily F. Cheever, Yelp review, 2016"}},{"id":"h007","text":"He was now in full possession of his physical senses. They were, indeed, preternaturally keen and alert. Something in the awful disturbance of his organic system had so exalted and refined them that they made record of things never before perceived. He felt the ripples upon his face and heard their separate sounds as they struck. He looked at the forest on the bank of the stream, saw the individual trees, the leaves and the veining of each leaf\u2014he saw the very insects upon them: the locusts, the brilliant bodied flies, the gray spiders stretching their webs from twig to twig.","source":"human","genre":"fiction","wordCount":99,"difficulty":3,"explanation":"From Ambrose Bierce's <strong>'An Occurrence at Owl Creek Bridge'</strong> (1890). This passage fools many people because the prose is extremely polished and the sensory catalogue feels systematic \u2014 qualities we associate with AI. But the escalating specificity (from ripples to veins of leaves to individual spider webs) has a breathless, almost hallucinatory urgency that AI descriptions rarely achieve.","twinText":"His senses, in that moment, were unusually sharp. The world around him seemed amplified \u2014 the sound of running water, the texture of leaves on the trees by the riverbank, even the small movements of insects he might otherwise have overlooked entirely. There was a clarity to it all that bordered on the surreal, as though his consciousness had momentarily expanded beyond its usual limits, taking in everything at once.","twinSource":"ai","tells":[{"phrase":"preternaturally","type":"human","note":"A 19th-century vocabulary choice modern AI tends to avoid."},{"phrase":"the locusts, the brilliant bodied flies, the gray spiders stretching their webs from twig to twig","type":"human","note":"Cataloguing that escalates rather than balances."},{"phrase":"the veining of each leaf","type":"human","note":"Hallucinatory specificity \u2014 Bierce's signature urgency."}],"meta":{"author":"Ambrose Bierce, 'An Occurrence at Owl Creek Bridge,' 1890 (public domain)"}},{"id":"h008","text":"This was the king's semi-barbaric method of administering justice. Its perfect fairness is obvious. The criminal could not know out of which door would come the lady; he opened either he pleased, without having the slightest idea whether, in the next instant, he was to be devoured or married. On some occasions the tiger came out of one door, and on some out of the other. The decisions of this tribunal were not only fair, they were positively determinate: the accused person was instantly punished if he found himself guilty, and, if innocent, he was rewarded on the spot, whether he liked it or not.","source":"human","genre":"fiction","wordCount":105,"difficulty":3,"explanation":"From Frank R. Stockton's <strong>'The Lady, or the Tiger?'</strong> (1882). This is a classic trap passage \u2014 the dry, logical structure and ironic tone ('Its perfect fairness is obvious') read almost like AI-generated analysis. But the deadpan humor and the way 'devoured or married' is treated as equivalent are distinctly human wit that AI rarely produces without being prompted.","twinText":"The king had devised a unique method for adjudicating matters of guilt. The accused was placed in a public arena and presented with two doors. Behind one waited a young woman selected by the court; behind the other, a tiger. The accused had no way of knowing which fate lay behind each door. The system was, in its way, perfectly fair: each man chose his own outcome, and the verdict was rendered with mathematical impartiality, free from human bias.","twinSource":"ai","tells":[{"phrase":"devoured or married","type":"human","note":"Treated as equivalent outcomes \u2014 human deadpan, not AI calibration."},{"phrase":"Its perfect fairness is obvious","type":"human","note":"Ironic flatness AI doesn't reach for unprompted."},{"phrase":"whether he liked it or not","type":"human","note":"Sardonic close \u2014 committed to the bit."}],"meta":{"author":"Frank R. Stockton, 'The Lady, or the Tiger?', 1882 (public domain)"}},{"id":"h009","text":"I felt a Funeral, in my Brain, And Mourners to and fro Kept treading\u2014treading\u2014till it seemed That Sense was breaking through\u2014 And when they all were seated, A Service, like a Drum\u2014 Kept beating\u2014beating\u2014till I thought My mind was going numb\u2014 And then I heard them lift a Box And creak across my Soul With those same Boots of Lead, again, Then Space\u2014began to toll","source":"human","genre":"poem","wordCount":65,"difficulty":2,"explanation":"Emily Dickinson, poem 340 (c. 1861). Dickinson's dashes and capitalization create a distinctive rhythm that some visitors mistake for AI trying to be 'poetic.' But the metaphor of a funeral <em>in</em> the brain \u2014 grief as a physical, crushing weight \u2014 has an emotional precision that AI poetry typically lacks. The boots 'creaking across my Soul' is viscerally specific.","twinText":"There is a heaviness in mourning that settles softly in the mind, A slow procession of dark footsteps that crosses through the bone. Each silence becomes a hymn, each sound a final word, And in the dark cathedral of the lonely self, the listener stands alone. Then space itself begins to ring \u2014 and no one, no one calls. The echo of the leaving stays with us. The echo holds the all.","twinSource":"ai","tells":[{"phrase":"Funeral, in my Brain","type":"human","note":"The unsettling preposition is Dickinson's, not AI's smoothing instinct."},{"phrase":"Boots of Lead","type":"human","note":"Idiosyncratic capitalization at unexpected places."},{"phrase":"treading\u2014treading","type":"human","note":"Em-dash repetition \u2014 Dickinson's rhythmic signature."}],"meta":{"author":"Emily Dickinson, poem 340, c. 1861 (public domain)"}},{"id":"h010","text":"'Hope' is the thing with feathers\u2014 That perches in the soul\u2014 And sings the tune without the words\u2014 And never stops\u2014at all\u2014 And sweetest\u2014in the Gale\u2014is heard\u2014 And sore must be the storm\u2014 That could abash the little Bird That kept so many warm\u2014 I've heard it in the chillest land\u2014 And on the strangest Sea\u2014 Yet\u2014never\u2014in Extremity, It asked a crumb\u2014of me.","source":"human","genre":"poem","wordCount":63,"difficulty":3,"explanation":"Emily Dickinson, poem 314 (c. 1861). This is one of the hardest passages in the pool. The extended metaphor is clean, the structure is balanced, and the message is uplifting \u2014 all qualities people associate with AI. But the final line ('It asked a crumb\u2014of me') inverts expectations with startling humility. Over 60% of visitors flag this as AI.","twinText":"Hope is the soft thing in the dark, the music with no name, A small persistent voice that does not falter, does not change. It carries through the loudest storms, the longest, coldest nights, And asks of those who listen nothing \u2014 neither food nor flame nor home. It is the lantern we did not know we carried, until we light it again.","twinSource":"ai","tells":[{"phrase":"thing with feathers","type":"human","note":"Dickinson's signature image \u2014 the model would write 'bird.'"},{"phrase":"It asked a crumb\u2014of me","type":"human","note":"An inversion that humbles, not concludes."},{"phrase":"Extremity","type":"human","note":"Capitalized abstraction at an odd moment."}],"meta":{"author":"Emily Dickinson, poem 314, c. 1861 (public domain)"}},{"id":"h011","text":"Astragalus agnicidus is a rare species of milkvetch known by the common name Humboldt County milkvetch. It is endemic to northern California. The plant was undescribed until the 1950s and was known only from one 8-acre ranch in Humboldt County, where sheep ranchers blamed it for the deaths of their animals. They eradicated the plant from their land, and by the time it was formally described in 1957 it was thought to be extinct. The species name, agnicidus, means 'lamb-killer.' It was rediscovered in 1987 when long-buried seeds were plowed into favorable conditions for germination.","source":"human","genre":"wikipedia","wordCount":93,"difficulty":3,"explanation":"This is directly from the <strong>Wikipedia article on Astragalus agnicidus</strong>. Wikipedia's neutral, encyclopedic tone is almost indistinguishable from AI \u2014 because AI was trained on exactly this kind of text. The giveaway is the genuinely surprising narrative arc: farmers destroy a plant, it's declared extinct, then it comes back from buried seeds decades later. AI rarely constructs such a satisfying factual story.","twinText":"Astragalus agnicidus is a rare plant species native to Humboldt County in northern California. It is part of the milkvetch family and is notable for its highly limited geographical range. The plant was once thought extinct due to extensive habitat loss but has since been rediscovered in restoration projects. It typically grows in disturbed soils and forms part of the broader ecology of the region's coastal forest understory communities.","twinSource":"ai","tells":[{"phrase":"rediscovered in 1987 when long-buried seeds were plowed into favorable conditions","type":"human","note":"A surprising true narrative arc \u2014 too specific to invent."},{"phrase":"means 'lamb-killer.'","type":"human","note":"An etymology that's also a story."},{"phrase":"8-acre ranch","type":"human","note":"The kind of precise number you only get from real records."}],"meta":{"author":"Wikipedia contributors, 'Astragalus agnicidus' article"}},{"id":"h012","text":"Cawker City is a city in Mitchell County, Kansas, United States. As of the 2020 census, the population was 457. It is one of several places claiming to be home of the largest ball of twine in the world. Cawker City was founded in 1870. According to tradition, Colonel E. H. Cawker won naming rights for the town with a winning hand at poker. The city previously served many families living on small farms, but many young adults left to find work elsewhere, causing the population to decline.","source":"human","genre":"wikipedia","wordCount":84,"difficulty":3,"explanation":"Taken directly from the <strong>Wikipedia article on Cawker City, Kansas</strong>. The straightforward encyclopedic style sounds exactly like AI output \u2014 neutral, factual, well-structured. But the juxtaposition of a poker game deciding a town's name and the world's largest ball of twine is the kind of delightful absurdity that emerges from real history, not from language models optimizing for coherence.","twinText":"Cawker City is a small community in Mitchell County, Kansas, with a population of approximately 450 according to recent census figures. The town is known regionally for hosting one of the largest collections of folk art landmarks in the area, and serves as a stop for travelers along the historic highway. Founded in the late nineteenth century, Cawker City has experienced a gradual decline in population as younger residents have relocated to larger metropolitan areas.","twinSource":"ai","tells":[{"phrase":"won naming rights for the town with a winning hand at poker","type":"human","note":"True absurdity from real history \u2014 not a generated detail."},{"phrase":"the largest ball of twine in the world","type":"human","note":"Specific, unverifiable claim \u2014 AI hedges these into oblivion."},{"phrase":"457","type":"human","note":"Real census figures are oddly specific."}],"meta":{"author":"Wikipedia contributors, 'Cawker City, Kansas' article"}},{"id":"h013","text":"A 5-year-old student at an elementary school in Vista, California, collected enough money to pay off the negative lunch balances of 123 students at her school. Katelynn Hardee, a kindergartner at Breeze Hill Elementary School, overheard a parent say she was having difficulty paying for an after school program. So Katelynn decided to set up a stand, spending her Sunday selling hot cocoa, cider, and cookies. She donated the $80 collected, which went towards paying off the negative lunch balances of over 100 students.","source":"human","genre":"news","wordCount":80,"difficulty":2,"explanation":"From a <strong>CNN article</strong> published December 17, 2019. News writing has a formulaic quality that overlaps heavily with AI output \u2014 the inverted pyramid structure, the specific numbers, the clean attribution. What makes this identifiably human is the editorial choice to lead with the child's age and the specific amount ($80), creating an emotional contrast between the small sum and its large impact.","twinText":"In southern California this week, a young student gained recognition for an unusual act of generosity. The kindergartener, after learning that some families at her local elementary school faced financial difficulties, organized a small fundraising event over the weekend with the help of her parents. The funds raised were directed toward assisting with school-related expenses for over a hundred students. The story has been widely celebrated as an example of community-mindedness and youthful initiative.","twinSource":"ai","tells":[{"phrase":"$80","type":"human","note":"The small specific sum that creates the emotional contrast."},{"phrase":"Katelynn Hardee","type":"human","note":"A real name, not a placeholder."},{"phrase":"Breeze Hill Elementary School","type":"human","note":"Real institutional name."}],"meta":{"author":"CNN, December 17, 2019"}},{"id":"h014","text":"The focal point of the shrine is a box or chest which is built into the wall. In this chest are kept the many charms and magical potions without which no native believes he could live. These preparations are secured from a variety of specialized practitioners. The most powerful of these are the medicine men, whose assistance must be rewarded with substantial gifts. However, the medicine men do not provide the curative potions for their clients, but decide what the ingredients should be and then write them down in an ancient and secret language.","source":"human","genre":"academic","wordCount":90,"difficulty":3,"explanation":"From Horace Miner's famous 1956 anthropology paper <strong>'Body Ritual among the Nacirema.'</strong> The formal academic tone sounds very AI-like, but this passage is actually a satirical description of a <em>medicine cabinet</em> and <em>doctors writing prescriptions</em> \u2014 'Nacirema' is 'American' spelled backwards. The dry humor of describing everyday objects as exotic rituals is a deeply human rhetorical move.","twinText":"Within the cultural framework of this group, healing practices are organized around a class of revered specialists. Adherents place considerable trust in these figures, who diagnose conditions and prescribe specific preparations to address physical and spiritual ailments. The relationship between practitioner and patient is mediated through ritual exchange, and the prescriptions themselves are typically written in a formal script not generally accessible to most members of the community.","twinSource":"ai","tells":[{"phrase":"ancient and secret language","type":"human","note":"Sly satirical jab at doctor handwriting."},{"phrase":"no native believes he could live","type":"human","note":"Anthropological deadpan that's also a joke."},{"phrase":"must be rewarded with substantial gifts","type":"human","note":"Sardonic bite at medical fees."}],"meta":{"author":"Horace Miner, 'Body Ritual among the Nacirema,' American Anthropologist, 1956"}},{"id":"h015","text":"Noodles are a mixture of flour and beaten egg, made into a stiff paste, kneaded, rolled out very thin, and cut into long narrow slips, not thicker than straws, and then dried three or four hours in the sun, on tin or pewter plates. They must be put in the soup shortly before dinner, as, if boiled too long they will go to pieces.","source":"human","genre":"recipe","wordCount":62,"difficulty":2,"explanation":"From Eliza Leslie's <strong>'Directions for Cookery'</strong> (1840). The practical specificity \u2014 'not thicker than straws,' 'tin or pewter plates' \u2014 and the cautionary note about overcooking have a lived quality. The comma-heavy Victorian sentence structure is period-authentic, not AI trying to sound old-fashioned.","twinText":"To make homemade noodles, combine flour and beaten egg into a firm dough. Knead well, then roll out very thinly on a lightly floured surface and slice into long, narrow strips of uniform width. Allow the strips to dry for several hours before use. When ready to serve, add the noodles to hot soup just before serving \u2014 they cook quickly and will fall apart if left in the broth too long.","twinSource":"ai","tells":[{"phrase":"not thicker than straws","type":"human","note":"A visual reference using whatever is at hand \u2014 period authentic."},{"phrase":"tin or pewter plates","type":"human","note":"Period materials no AI would default to."},{"phrase":"go to pieces","type":"human","note":"Period idiom for 'fall apart.'"}],"meta":{"author":"Eliza Leslie, 'Directions for Cookery,' 1840 (public domain)"}},{"id":"h016","text":"Take six pounds of the lean of fresh beef, cut from the bone. Stick it over with four dozen cloves. Season it with a tea-spoonful of salt, a tea-spoonful of pepper, a tea-spoonful of mace, and a beaten nutmeg. Slice half a dozen onions; fry them in butter; chop them, and spread them over the meat after you have put it into the soup-pot. Pour in five quarts of water, and stew it slowly for five or six hours; skimming it well.","source":"human","genre":"recipe","wordCount":82,"difficulty":2,"explanation":"From Eliza Leslie's <strong>'Directions for Cookery'</strong> (1840), a recipe for Rich Brown Soup. The precise measurements in Victorian units ('tea-spoonful,' 'four dozen cloves') and the imperative cooking voice are authentic to the period. AI-generated recipes tend to use modern measurements and formats, making this old-fashioned style a genuine human artifact.","twinText":"For a hearty beef soup, take roughly six pounds of lean beef and stud it with whole cloves. Season the meat generously with salt, pepper, mace, and freshly grated nutmeg. Brown a few sliced onions in butter and chop them, then add them to a heavy pot along with the seasoned meat. Cover with water and bring to a gentle simmer, cooking slowly for several hours, skimming occasionally to keep the broth clear and clean.","twinSource":"ai","tells":[{"phrase":"tea-spoonful","type":"human","note":"Period unit. AI normalizes to 'teaspoon.'"},{"phrase":"four dozen cloves","type":"human","note":"An aggressive quantity in period style."},{"phrase":"five quarts of water","type":"human","note":"Period quantity in imperial measure."}],"meta":{"author":"Eliza Leslie, 'Directions for Cookery,' 1840 (public domain)"}},{"id":"h017","text":"In the evening, after tea, Gowing dropped in, and we had a smoke together in the breakfast-parlour. Carrie joined us later, but did not stay long, saying the smoke was too much for her. It was also rather too much for me, for Gowing had given me what he called a green cigar, one that his friend Shoemach had just brought over from America. The cigar didn't look green, but I fancy I must have done so; for when I had smoked a little more than half I was obliged to retire on the pretext of telling Sarah to bring in the glasses.","source":"human","genre":"diary","wordCount":102,"difficulty":2,"explanation":"From <strong>The Diary of a Nobody</strong> (1892). The roundabout way of admitting to cigar-induced nausea \u2014 'The cigar didn't look green, but I fancy I must have done so' \u2014 is classic British understatement. The narrator's need to fabricate a reason to leave the room rather than simply admit he feels ill is a comedy of manners that AI wouldn't instinctively construct.","twinText":"Gowing visited in the evening and brought along an unusual cigar a friend had recently given him. After tea, the three of us sat together in the parlour for a quiet smoke. Carrie excused herself early, citing the heaviness of the smoke. The cigar proved stronger than I had anticipated \u2014 markedly so \u2014 and after a short while I found myself searching for a polite reason to leave the room before I had finished it entirely.","twinSource":"ai","tells":[{"phrase":"what he called a green cigar","type":"human","note":"Period euphemism \u2014 quoted with bemusement."},{"phrase":"Shoemach","type":"human","note":"A specific name that no model would invent."},{"phrase":"I was obliged to retire on the pretext of telling Sarah to bring in the glasses","type":"human","note":"Victorian indirection \u2014 fabricating an errand to flee nausea."}],"meta":{"author":"George & Weedon Grossmith, 'The Diary of a Nobody,' 1892 (public domain)"}},{"id":"h018","text":"In the hierarchy of magical practitioners, and below the medicine men in prestige, are specialists whose designation is best translated as 'holy-mouth-men.' The Nacirema have an almost pathological horror of and fascination with the mouth, the condition of which is believed to have a supernatural influence on all social relationships. Were it not for the rituals of the mouth, they believe that their teeth would fall out, their gums bleed, their jaws shrink, their friends desert them, and their lovers reject them.","source":"human","genre":"academic","wordCount":79,"difficulty":3,"explanation":"From Horace Miner's <strong>'Body Ritual among the Nacirema'</strong> (1956). This is describing <em>dentists</em> \u2014 'holy-mouth-men' \u2014 and the passage reads like serious anthropological observation of an exotic culture. The formal academic register is nearly indistinguishable from AI, but the satirical intent (making the familiar seem alien) is a uniquely human intellectual move.","twinText":"In the daily routines of this community, particular attention is given to oral hygiene practices. Specialists trained in the care of the teeth are consulted on a regular basis, and members of the group view the maintenance of the mouth as a matter of considerable cultural importance. Failure to attend to this practice is widely understood to lead to a range of negative outcomes, both physical and social, within the community framework.","twinSource":"ai","tells":[{"phrase":"holy-mouth-men","type":"human","note":"Satirical anthropological coinage \u2014 not a generated phrase."},{"phrase":"their friends desert them, and their lovers reject them","type":"human","note":"Cascading consequences played for absurd effect."},{"phrase":"almost pathological horror of and fascination with","type":"human","note":"Clinical-yet-witty register that AI smooths away."}],"meta":{"author":"Horace Miner, 'Body Ritual among the Nacirema,' American Anthropologist, 1956"}},{"id":"h019","text":"Now, the point of the story is this: Did the tiger come out of that door, or did the lady? The more we reflect upon this question, the harder it is to answer. It involves a study of the human heart which leads us through devious mazes of passion, out of which it is difficult to find our way. Think of it, fair reader, not as if the decision of the question depended upon yourself, but upon that hot-blooded, semi-barbaric princess, her soul at a white heat beneath the combined fires of despair and jealousy.","source":"human","genre":"fiction","wordCount":93,"difficulty":2,"explanation":"The famous ending of Frank R. Stockton's <strong>'The Lady, or the Tiger?'</strong> (1882). The direct address to the reader ('Think of it, fair reader') and the refusal to provide an answer are bold authorial choices. AI models are trained to be helpful and complete \u2014 leaving a question permanently unanswered goes against their fundamental nature.","twinText":"The conclusion of the matter is, in a meaningful sense, a question that the story leaves to the reader. The princess, faced with an impossible choice between love and pride, made a decision \u2014 but what decision did she make? The text does not provide a definitive answer. Instead, it invites contemplation, asking us to consider the nature of love, jealousy, and the limits of human reason. There is no single correct interpretation here.","twinSource":"ai","tells":[{"phrase":"fair reader","type":"human","note":"Victorian direct address \u2014 too florid for a model's default voice."},{"phrase":"her soul at a white heat beneath the combined fires of despair and jealousy","type":"human","note":"Period metaphor stacking \u2014 gloriously overcooked."},{"phrase":"devious mazes of passion","type":"human","note":"Period phrasing AI would simplify."}],"meta":{"author":"Frank R. Stockton, 'The Lady, or the Tiger?', 1882 (public domain)"}},{"id":"h020","text":"The medicine men have an imposing temple, or latipso, in every community of any size. The more elaborate ceremonies required to treat very sick patients can only be performed at this temple. These ceremonies involve not only the thaumaturge but a permanent group of vestal maidens who move sedately about the temple chambers in distinctive costume and headdress. The latipso ceremonies are so harsh that it is phenomenal that a fair proportion of the really sick natives who enter the temple ever recover.","source":"human","genre":"academic","wordCount":79,"difficulty":3,"explanation":"From Miner's <strong>'Body Ritual among the Nacirema'</strong> (1956). This is describing a <em>hospital</em> \u2014 'latipso' is 'hospital' scrambled, 'vestal maidens' are nurses. The passage perfectly mimics serious anthropological observation while satirizing American healthcare. Its formal, structured prose is exactly the register AI excels at, making it one of the hardest passages to classify correctly.","twinText":"The community maintains a central institution dedicated to the most intensive forms of medical treatment. These facilities serve those whose conditions exceed what can reasonably be addressed in routine consultations. They are staffed by a hierarchy of specialists, including supporting personnel who maintain the daily operations of the institution and assist with patient care. Outcomes vary considerably, and the experience of admission is widely regarded as significant within the cultural worldview.","twinSource":"ai","tells":[{"phrase":"vestal maidens","type":"human","note":"Satirical for nurses \u2014 a specific anthropological joke."},{"phrase":"latipso","type":"human","note":"Hospital backwards \u2014 a constructed term that's also a punchline."},{"phrase":"phenomenal that a fair proportion of the really sick natives who enter the temple ever recover","type":"human","note":"Dark academic humor \u2014 too pointed for AI."}],"meta":{"author":"Horace Miner, 'Body Ritual among the Nacirema,' American Anthropologist, 1956"}},{"id":"a001","text":"Tried the new ramen place on Divisadero tonight. I don't know, maybe I was just in a weird mood, but the tonkotsu broth tasted almost sweet? Like someone accidentally put a teaspoon of sugar in it. The noodles were fine, I guess. My friend Sarah loved it and she's usually pickier than me so maybe I'm the problem. Left a decent tip anyway because the waiter was really nice about splitting the check four ways.","source":"ai","genre":"review","wordCount":76,"difficulty":3,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to mimic a casual restaurant review. The planted street name ('Divisadero'), the hedging ('I don't know, maybe'), and the self-deprecating aside ('maybe I'm the problem') are deliberate tricks to sound human. The mention of 'Sarah' and splitting the check adds fake social texture. But the complaint is oddly lukewarm \u2014 real dissatisfied reviewers commit harder.","twinText":"Ok, the new ramen place on Divisadero. Went with Sarah and her work people last Tuesday. The broth was sweet?? Like, genuinely sweet. I kept asking the waiter if it was supposed to taste like that and he just sort of nodded which was unhelpful. Sarah loved it. Her coworker Daniel loved it. I felt like I was missing the joke. Tipped 22% out of guilt. Going to try again on a weekday after a normal lunch.","twinSource":"human","tells":[{"phrase":"I don't know, maybe I was just in a weird mood","type":"ai","note":"Calibrated hedge \u2014 the model softens before complaining."},{"phrase":"maybe I'm the problem","type":"ai","note":"A self-aware aside that's been workshopped, not lived."},{"phrase":"really nice about splitting the check four ways","type":"ai","note":"Planted social texture \u2014 the kind of detail real reviews skip."}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write a casual, slightly ambivalent restaurant review with specific details and a friend's name"}},{"id":"a002","text":"The alarm went off at 5:30 again and I just lay there listening to the rain. There's something about February mornings that makes everything feel provisional, like the day hasn't fully committed to happening yet. Made coffee. Fed the cat. Read three paragraphs of a book I've been 'reading' for six weeks. I think I'm becoming the kind of person who only starts things. My therapist would probably have something to say about that.","source":"ai","genre":"diary","wordCount":73,"difficulty":3,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to sound like an introspective journal entry. The planted details (5:30 alarm, February, the cat, the unfinished book) create an illusion of lived experience. The self-aware joke about therapy is calibrated to feel casually confessional. But the metaphor ('the day hasn't fully committed to happening') is a bit too polished for a real morning journal entry.","twinText":"5:30 alarm again. Lay there. Rain on the bedroom window for what felt like a long time. Made coffee, fed Pickle, read maybe two paragraphs of the Krakauer book before my brain wandered off to think about whether to email Beth about the thing or just leave it. Today is Wednesday I'm pretty sure. Dr. Mertens at 4 \u2014 need to leave by 3:15 for parking. Bagel for breakfast. Going.","twinSource":"human","tells":[{"phrase":"the day hasn't fully committed to happening yet","type":"ai","note":"A polished metaphor \u2014 too writerly for a 5:30am note."},{"phrase":"I think I'm becoming the kind of person who only starts things","type":"ai","note":"A literary self-observation set up to land."},{"phrase":"My therapist would probably have something to say about that","type":"ai","note":"Calibrated reflective close \u2014 the model's signature."}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write a reflective diary entry about a mundane morning with self-deprecating humor"}},{"id":"a003","text":"The history of origami is deeply intertwined with the cultural and spiritual traditions of Japan, where paper folding has been practiced since at least the 6th century. The art form evolved from ceremonial applications, such as the folding of noshi for gift-giving, to a broader creative pursuit. In the 20th century, Akira Yoshizawa pioneered a systematic notation for folds, transforming origami from a folk craft into a recognized art form with mathematical underpinnings that continue to influence fields from engineering to medicine.","source":"ai","genre":"wikipedia","wordCount":80,"difficulty":1,"explanation":"Written by <strong>Claude 4.6 Opus</strong> in encyclopedic style. The clean structure, balanced phrasing, and smooth narrative arc from ancient history to modern applications are classic AI hallmarks. The progression 'ceremonial \u2192 creative \u2192 mathematical \u2192 engineering' is a bit too tidy. Real Wikipedia articles tend to be more fragmentary, with abrupt transitions and citation-needed gaps.","twinText":"Origami is the Japanese art of paper folding. The word combines 'oru' (to fold) and 'kami' (paper). Although the precise origins are uncertain \u2014 paper was costly in early Japan and most early folded works have not survived \u2014 the practice is documented from at least the Heian period (794\u20131185) onward, where ceremonial folds such as 'noshi' were attached to gifts. Akira Yoshizawa (1911\u20132005) developed the notation system most modern folders use; his diagrams were popularized in the West by Robert Harbin and Samuel Randlett.[citation needed]","twinSource":"human","tells":[{"phrase":"deeply intertwined with the cultural and spiritual traditions","type":"ai","note":"An overstuffed opener \u2014 the model's signature warm-up."},{"phrase":"transforming origami from a folk craft into a recognized art form","type":"ai","note":"A tidy narrative arc real Wikipedia rarely commits to."},{"phrase":"continue to influence fields from engineering to medicine","type":"ai","note":"Sweeping coda \u2014 a model gesture, not an editor's."}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write a Wikipedia-style paragraph about origami history"}},{"id":"a004","text":"Honestly? This blender changed my life. I know that sounds dramatic for a kitchen appliance but hear me out. I've been making smoothies every morning for three years and my old Ninja couldn't handle frozen mango without sounding like a jet engine. This thing pulverizes everything in like 8 seconds. EIGHT. SECONDS. Only complaint is the lid is weirdly hard to get off after blending, like it creates some kind of vacuum seal situation. Minor gripe tho. 10/10 would blend again.","source":"ai","genre":"review","wordCount":82,"difficulty":2,"explanation":"Written by <strong>Claude 4.6 Opus</strong> mimicking an enthusiastic product review. The capitalized emphasis ('EIGHT. SECONDS.'), the 'hear me out' preamble, and the '10/10 would blend again' sign-off are internet-speak conventions that AI has learned to reproduce well. The minor complaint about the lid is a planted imperfection \u2014 real reviews include these naturally, AI adds them strategically.","twinText":"this thing is a beast lol. used my old ninja for like 4 years and it would basically have a meltdown over a frozen banana, this one just doesn't care. one annoying thing is the lid is tight as hell after you blend something \u2014 like you have to brace the base with one hand and unscrew with the other, kind of awkward when your hands are wet. but whatever, it works fine. five stars","twinSource":"human","tells":[{"phrase":"EIGHT. SECONDS.","type":"ai","note":"Calibrated emphasis. A real reviewer would just type '8 seconds.'"},{"phrase":"10/10 would blend again","type":"ai","note":"Memey sign-off \u2014 performed, not native."},{"phrase":"I know that sounds dramatic for a kitchen appliance but hear me out","type":"ai","note":"The 'hear me out' preamble is an AI tell."}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write an enthusiastic Amazon-style product review with one small complaint"}},{"id":"a005","text":"She found the letter in the pocket of his winter coat, the one he only wore in December. It wasn't addressed to anyone. The handwriting was small and careful, the kind of writing that comes from someone trying very hard not to make mistakes. She read it twice, folded it back along its original creases, and returned it to the pocket. At dinner that night, she passed him the salt before he asked for it, and he looked at her with something close to gratitude.","source":"ai","genre":"fiction","wordCount":85,"difficulty":2,"explanation":"Written by <strong>Claude 4.6 Opus</strong>. This micro-fiction has the restrained, literary quality of a workshop piece. The details are carefully chosen (winter coat, December, original creases, passing the salt). But the emotional arc is almost too clean \u2014 setup, discovery, quiet resolution \u2014 without the messiness or ambiguity that real literary fiction often embraces.","twinText":"Marian found the letter in the gray coat \u2014 the one her mother had given him three Christmases back. She read it once. She read it again. The handwriting was not his. That came at her sideways. She didn't put it back exactly. She put it back close enough. At dinner he asked if she had moved his coat and she said yes, she had hung it in the front closet. That was a lie. There would be more, she could feel them coming.","twinSource":"human","tells":[{"phrase":"the kind of writing that comes from someone trying very hard not to make mistakes","type":"ai","note":"Over-described \u2014 a workshop note dressed as observation."},{"phrase":"with something close to gratitude","type":"ai","note":"The literary close. AI loves a quiet, neat ending."},{"phrase":"passed him the salt before he asked for it","type":"ai","note":"A calibrated tender beat."}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write a short literary fiction paragraph about an unspoken secret between partners"}},{"id":"a006","text":"Quantum entanglement, often described as 'spooky action at a distance,' occurs when two particles become correlated in such a way that the quantum state of one instantaneously influences the other, regardless of the physical distance separating them. While this phenomenon has been experimentally verified numerous times since Bell's theorem was first tested in the 1970s, it does not allow for faster-than-light communication, as the measurement outcomes appear random without access to both particles' data.","source":"ai","genre":"wikipedia","wordCount":72,"difficulty":1,"explanation":"Written by <strong>Claude 4.6 Opus</strong> in encyclopedic style. This is textbook AI output \u2014 a complex topic explained clearly with a qualifier ('does not allow for faster-than-light communication') that pre-empts a common misconception. The phrase 'often described as' is an AI verbal tic. Real Wikipedia articles are usually more fragmented and citationheavy.","twinText":"Quantum entanglement is a phenomenon in which the quantum states of two or more particles are correlated such that the state of each cannot be described independently of the others. The correlations persist regardless of the spatial separation of the particles. The no-communication theorem establishes that entanglement cannot be used to transmit classical information faster than light.[1] Bell's theorem (1964) and the experimental tests beginning with Freedman and Clauser (1972) ruled out a broad class of local hidden-variable theories.","twinSource":"human","tells":[{"phrase":"spooky action at a distance","type":"ai","note":"The clich\xE9 framing the model reaches for first."},{"phrase":"often described as","type":"ai","note":"A verbal tic \u2014 the model loves to introduce a phrase before using it."},{"phrase":"regardless of the physical distance separating them","type":"ai","note":"Lightly purple where Wikipedia would be terse."}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write a Wikipedia-style explanation of quantum entanglement"}},{"id":"a007","text":"The thing about grief is that it doesn't really go away, it just gets quieter. Like a radio station you can't fully tune out. Some days it's barely static, and you go about your life and buy groceries and laugh at things and feel almost normal. Other days it's so loud you can't hear anything else. Today was a static day. I ate a sandwich. I watched a bird outside. That was enough.","source":"ai","genre":"diary","wordCount":72,"difficulty":3,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to sound like an intimate grief journal. The radio metaphor is effective but <em>too</em> effective \u2014 it's a polished analogy for what should be raw emotion. The final three short sentences ('I ate a sandwich. I watched a bird. That was enough.') are a deliberate literary technique. Real grief journals are usually less composed.","twinText":"Saw a robin in the backyard this morning. Mom would've pointed it out. I keep noticing things she would have noticed and it makes me feel like I'm doing it wrong. Four months tomorrow. I had a pretty normal day at work yesterday and felt guilty about it the whole train ride home which is its own kind of stupid. Cheerios for dinner. Going to bed.","twinSource":"human","tells":[{"phrase":"Like a radio station you can't fully tune out","type":"ai","note":"The polished metaphor \u2014 too writerly for a real grief note."},{"phrase":"Today was a static day","type":"ai","note":"Callback to the metaphor \u2014 the model loves a callback."},{"phrase":"I ate a sandwich. I watched a bird outside. That was enough.","type":"ai","note":"A literary triplet pretending to be plain."}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write a diary entry about grief that uses a specific metaphor and ends with mundane details"}},{"id":"a008","text":"Regional transportation officials announced Thursday that the Elm Street bridge reconstruction project, originally scheduled for completion in November, will be delayed until at least March due to unexpected soil contamination discovered during foundation work. The delay is expected to add approximately $2.3 million to the project's $18 million budget. Commuters using the Route 9 corridor are advised to continue using the detour through Maple Avenue, which has experienced increased congestion during peak hours.","source":"ai","genre":"news","wordCount":70,"difficulty":2,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to mimic local news reporting. The invented-but-plausible details (Elm Street, Route 9, $2.3M / $18M, Maple Avenue) are designed to feel real. The inverted pyramid structure and passive voice ('are advised') are genre-appropriate. But the passage lacks a named source or direct quote \u2014 real news articles almost always attribute claims to a specific person.","twinText":"The Elm Street Bridge reopening has been pushed to March, county officials said at Thursday's commission meeting. 'We didn't expect to find what we found in that soil,' Public Works Director Janet Vasquez told reporters. 'We can't pour concrete on top of contamination \u2014 full stop.' The delay adds an estimated $2.3 million to a project already running $18 million. Drivers will continue using the Maple Avenue detour, which has averaged 14-minute backups during the morning peak, according to county traffic data.","twinSource":"human","tells":[{"phrase":"Regional transportation officials announced","type":"ai","note":"No named source \u2014 real news names a person."},{"phrase":"are advised to continue using the detour","type":"ai","note":"Passive register where reporters would write actively."},{"phrase":"approximately $2.3 million to the project's $18 million budget","type":"ai","note":"No quote, no named figure \u2014 the structural giveaway."}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write a local news excerpt about a construction delay with specific numbers and street names"}},{"id":"a009","text":"To make a proper risotto, the most important thing is patience. Begin by warming your broth in a separate pot \u2014 never add cold liquid to the rice. Saut\xE9 a finely diced onion in butter until translucent, then add the arborio rice and stir until each grain is coated and slightly toasted. From there, add broth one ladle at a time, stirring constantly and waiting until each addition is mostly absorbed before adding the next. This process takes roughly 18 to 20 minutes and cannot be rushed.","source":"ai","genre":"recipe","wordCount":87,"difficulty":2,"explanation":"Written by <strong>Claude 4.6 Opus</strong>. This reads like a clean, competent recipe introduction \u2014 and that's exactly why it feels like AI. The instructional voice is steady and authoritative without being personal. There's no 'my grandmother taught me' or 'I once ruined this by...' \u2014 no human fingerprint. Real home cooks usually inject at least one aside or personal tip.","twinText":"Don't believe anyone who says risotto needs constant stirring \u2014 that's a myth chefs tell each other. Stir it like, every minute or two. What it actually needs is hot stock (cold stock will tank it, learned this the hard way) and patience. I do mine in a cast iron Dutch oven because that's what I have. Onion in butter, then the rice until it smells nutty, then a splash of white wine, then stock a ladle at a time until it's done \u2014 usually around 18 minutes for arborio. Salt as you go, never at the end.","twinSource":"human","tells":[{"phrase":"the most important thing is patience","type":"ai","note":"An aphoristic opener \u2014 recipes from people start with the dish, not the lesson."},{"phrase":"From there, add broth one ladle at a time, stirring constantly","type":"ai","note":"Textbook order. Real cooks parenthesize, contradict, or skip steps."},{"phrase":"cannot be rushed","type":"ai","note":"Sermonic close \u2014 the model wants you to learn."}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write clear risotto instructions emphasizing patience and technique"}},{"id":"a010","text":"Last Tuesday I locked myself out of my apartment and had to wait for my landlord for two hours in the hallway. I sat on the floor next to my neighbor's door and could hear her watching some kind of cooking competition through the wall. Someone was getting eliminated and she gasped. I don't know why but that made me feel less alone. When my landlord finally showed up, he didn't even apologize, just shook his head like I was a problem he'd already solved in his mind.","source":"ai","genre":"diary","wordCount":90,"difficulty":3,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to sound like a casual personal anecdote. Every detail is designed to feel specific and lived-in: the neighbor's cooking show, the gasp through the wall, the landlord's dismissive head shake. These are <em>planted</em> details \u2014 they mimic the randomness of real memory. The emotional beat ('that made me feel less alone') is the kind of observation AI has learned to deploy for authenticity.","twinText":"locked out for like two hours yesterday waiting for Dave from the building to come up with the master key. just sat in the hall on the floor. heard the lady in 4B was watching some kind of baking show?? she was REALLY into it, kept yelling no no no through the wall, I almost knocked. when Dave finally came he was holding a slice of pizza and like sighed when he saw me. anyway. long day.","twinSource":"human","tells":[{"phrase":"shook his head like I was a problem he'd already solved in his mind","type":"ai","note":"Over-articulated body language \u2014 the model showing its work."},{"phrase":"that made me feel less alone","type":"ai","note":"A planted emotional beat."},{"phrase":"Last Tuesday","type":"ai","note":"An evenly specific opener that flags 'I am giving you a story.'"}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write a diary entry about being locked out with overheard details from a neighbor"}},{"id":"a011","text":"the sky tonight is doing that thing where it cant decide if its purple or grey and honestly same. been staring out the window for twenty minutes instead of finishing my essay thats due tomorrow. my roommate just made popcorn and the whole apartment smells like butter and bad decisions. i should probably start writing. or i could keep looking at the sky. the sky doesnt have a word count requirement.","source":"ai","genre":"tweet","wordCount":68,"difficulty":3,"explanation":"Written by <strong>Claude 4.6 Opus</strong> mimicking a stream-of-consciousness social media post. The deliberate lack of punctuation, the lowercase 'i,' the 'honestly same,' and the procrastination humor are all calibrated to read as authentic Gen Z internet voice. The final line ('the sky doesnt have a word count requirement') is a planted punchline \u2014 it's a <em>bit</em> too good for a real procrastination tweet.","twinText":"sky is doing something weird tonight. like greyish purple but not really either. been staring at it for like 20 min when i should be writing the lit essay due 9am. roommate just microwaved popcorn the whole apt smells. should be writing. wont be. anyway","twinSource":"human","tells":[{"phrase":"the sky doesnt have a word count requirement","type":"ai","note":"A constructed punchline. Real tweets don't land that cleanly."},{"phrase":"honestly same","type":"ai","note":"Gen Z register performed, not native."},{"phrase":"butter and bad decisions","type":"ai","note":"A clever phrase the model couldn't resist."}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write a casual social media post about procrastination with no punctuation and Gen Z voice"}},{"id":"a012","text":"What strikes me about this collection is how deliberately it resists chronology. The poems don't build toward revelation \u2014 they circle it, approaching the same themes of displacement and inheritance from shifting angles. There is a preoccupation with doorways, both literal and figurative, that runs through nearly every piece. The strongest work here lives in the tension between formal constraint and emotional excess, particularly in the villanelle on page forty-three, which manages to make repetition feel not like structure but like compulsion.","source":"ai","genre":"academic","wordCount":80,"difficulty":2,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to sound like a literary review or academic essay. The vocabulary ('displacement,' 'inheritance,' 'formal constraint,' 'emotional excess') and the reference to a specific page number are designed to signal expertise. But the analysis is impressionistic rather than specific \u2014 it could describe almost any poetry collection. Real critics anchor their claims in quoted lines.","twinText":"Reading these poems straight through, I noticed the doorways before anything else. They appear in seven of the twenty-three pieces, never quite as metaphor and never quite as literal image. I keep returning to the villanelle 'After the House Fire,' whose repeated lines \u2014 'I left the door open / I left the door open' \u2014 accuse rather than refrain. The book's organizing problem isn't displacement; it's culpability. That's a harder argument to advertise on a back cover.","twinSource":"human","tells":[{"phrase":"lives in the tension between formal constraint and emotional excess","type":"ai","note":"Essayistic boilerplate \u2014 could describe any collection."},{"phrase":"displacement and inheritance","type":"ai","note":"Generic theme nouns. A real critic names lines."},{"phrase":"the villanelle on page forty-three","type":"ai","note":"Page number with no title \u2014 a reference that conceals its source."}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write a literary criticism paragraph about a poetry collection with specific analytical language"}},{"id":"a013","text":"Hi everyone, just a heads up that the conference room on the 3rd floor will be unavailable next Monday and Tuesday for maintenance. If you have meetings scheduled during that time, please rebook to either the 2nd floor room or the large meeting space near reception. I know it's short notice \u2014 sorry about that. The HVAC unit has been making some concerning sounds and facilities wants to address it before it becomes a bigger issue. Thanks for your patience!","source":"ai","genre":"email","wordCount":77,"difficulty":2,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to sound like a standard office email. The casual-professional tone ('heads up,' 'concerning sounds,' 'sorry about that') is pitch-perfect workplace communication. But it's <em>too</em> considerate \u2014 real office emails about room closures tend to be more terse and less apologetic. The 'HVAC making concerning sounds' detail is a planted humanizing touch.","twinText":"heads up \u2014 3rd floor conf room closed mon + tues. hvac doing its thing again and facilities is finally getting to it. if you had something booked grab the 2nd floor room or the one by reception. lmk if anything is weird with the calendar invites. \u2014 ken","twinSource":"human","tells":[{"phrase":"I know it's short notice \u2014 sorry about that","type":"ai","note":"Calibrated apology. Real office notices skip this."},{"phrase":"Thanks for your patience!","type":"ai","note":"A corporate closer the model defaults to."},{"phrase":"Hi everyone, just a heads up","type":"ai","note":"Both salutation and qualifier \u2014 overdressed for a five-line email."}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write a workplace email about a conference room closure that sounds natural and slightly apologetic"}},{"id":"a014","text":"The kitchen window frames a square of light that changes every hour. Morning: the table holds its breath in amber. Noon: white, merciless, revealing every scratch in the wood. Evening: the shadows of the elm branches write cursive across the walls, a language I almost understand. I have lived in this house for eleven years and I am still learning what the light does here. It is the most patient teacher I have ever had.","source":"ai","genre":"poem","wordCount":74,"difficulty":2,"explanation":"Written by <strong>Claude 4.6 Opus</strong> as a prose poem. The extended personification of light and the colon-separated time structure are aesthetically pleasing but <em>organized</em> in a way real poems rarely are. The final metaphor ('the most patient teacher') ties everything up too neatly. Real poetry tends to resist such clean conclusions \u2014 it prefers to leave the reader unsettled.","twinText":"The kitchen window. Each hour a different room. Morning: amber, dust in the slant. Noon: too bright, the wood looks tired. Then later the elm out back writes on the wall and I can never read what it says. Eleven years and still I haven't learned. Maybe the light is teaching nothing. Maybe it's just light.","twinSource":"human","tells":[{"phrase":"It is the most patient teacher I have ever had","type":"ai","note":"A tidy moral close \u2014 real poems leave you stuck."},{"phrase":"the shadows of the elm branches write cursive across the walls","type":"ai","note":"Overcooked image \u2014 too well-built to be heard once."},{"phrase":"a language I almost understand","type":"ai","note":"A workshop phrase that's been around the block."}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write a prose poem about light in a kitchen across different times of day"}},{"id":"a015","text":"The concept of 'emotional labor,' first introduced by sociologist Arlie Russell Hochschild in her 1983 work The Managed Heart, refers to the process by which employees regulate their emotional expressions to fulfill the requirements of their jobs. Hochschild's research focused primarily on flight attendants and bill collectors, demonstrating how organizations effectively commodify human feeling. The term has since expanded well beyond its original academic context, entering popular discourse to describe the often-invisible emotional work performed in personal relationships.","source":"ai","genre":"academic","wordCount":76,"difficulty":1,"explanation":"Written by <strong>Claude 4.6 Opus</strong>. This is classic AI academic writing \u2014 a concept is introduced, attributed, explained, and then its broader significance is noted, all in one smooth paragraph. The structure is impeccable but <em>too</em> impeccable. Real academic writing tends to be more argumentative and less expository, with the author's own position woven into the summary.","twinText":"Hochschild's 'emotional labor,' introduced in The Managed Heart (1983), did not arrive in academic discourse so much as creep through it. Her case studies \u2014 flight attendants instructed to perform care, debt collectors trained to perform menace \u2014 were striking, but the term's later spread depended on a slow drift from sociology into the wider conversation. By the time it reached HR handbooks, it had lost most of Hochschild's argument and kept only the phrase. That asymmetry is, in fact, what the book is about.","twinSource":"human","tells":[{"phrase":"first introduced by sociologist Arlie Russell Hochschild in her 1983 work","type":"ai","note":"A textbook attribution chain \u2014 too neatly assembled."},{"phrase":"demonstrating how organizations effectively commodify human feeling","type":"ai","note":"A textbook gloss, not an argument."},{"phrase":"entering popular discourse","type":"ai","note":"The model's stock phrase for 'caught on.'"}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write an academic paragraph explaining emotional labor and its origin"}},{"id":"a016","text":"My grandmother's pie crust recipe calls for lard, and I know that's not what people want to hear in 2024, but I'm telling you \u2014 butter cannot do what lard does to a pie crust. You want flaky? You want layers? Use cold lard, cut it into the flour with a pastry cutter until it looks like wet sand, and do NOT overwork it. Add ice water a tablespoon at a time. The whole thing should come together like it barely wants to. That reluctance is what makes it perfect.","source":"ai","genre":"recipe","wordCount":91,"difficulty":3,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to mimic a personal food blog. The 'grandmother's recipe' framing, the defensive tone about lard, and the personification of dough ('barely wants to,' 'that reluctance') are all designed to feel authentically opinionated and personal. This is one of the trickiest AI passages \u2014 the voice is confident and specific. The tell is that it's <em>performatively</em> authentic rather than casually so.","twinText":"This is my mother-in-law's crust. She uses leaf lard from a guy in Lancaster County, but I just buy whatever the grocery has. Cold. Cut it into the flour with a pastry blender \u2014 no food processor, it heats up the fat. Coarse meal stage, not sand. Ice water and apple cider vinegar (yes vinegar, like a tablespoon for a double crust, it slows down the gluten). Stop adding water before you think you need to. Refrigerate at least an hour. If it cracks while you roll it out, patch it. It'll be ugly. It'll be flaky.","twinSource":"human","tells":[{"phrase":"barely wants to","type":"ai","note":"Personification dough doesn't get from real cooks."},{"phrase":"That reluctance is what makes it perfect","type":"ai","note":"An epigrammatic close \u2014 the writer winking at the reader."},{"phrase":"I know that's not what people want to hear in 2024","type":"ai","note":"Calibrated cultural awareness \u2014 performatively in-the-moment."}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write a recipe post defending an unpopular ingredient with a strong personal voice and grandmother reference"}},{"id":"a017","text":"The renovation of urban waterfronts has emerged as a significant trend in contemporary city planning, with municipalities increasingly recognizing the economic, ecological, and social benefits of reclaiming industrial harbor zones for public use. Cities such as Copenhagen, Melbourne, and Baltimore have transformed formerly polluted docklands into vibrant mixed-use districts featuring parks, cultural institutions, and residential developments. These projects typically involve complex negotiations between public agencies, private developers, and community stakeholders.","source":"ai","genre":"news","wordCount":68,"difficulty":1,"explanation":"Written by <strong>Claude 4.6 Opus</strong>. This reads like a generic overview paragraph from a magazine or textbook \u2014 balanced, informative, and completely impersonal. The list of three cities, the three-part benefit structure ('economic, ecological, and social'), and the 'complex negotiations' conclusion are structural patterns AI defaults to. Real journalism would focus on one city with specific people and conflicts.","twinText":"Baltimore's Inner Harbor was once a working port. Forty years ago, you couldn't walk along Pratt Street without smelling the canneries. Now it's a tourist district \u2014 a national aquarium, a science center, and a long-running argument about whether the redevelopment was worth it for residents of Sharp-Leadenhall and Federal Hill. The same fight is playing out in Copenhagen. In Melbourne. In dozens of mid-sized cities most of us couldn't name. The waterfront is rarely just a waterfront.","twinSource":"human","tells":[{"phrase":"Cities such as Copenhagen, Melbourne, and Baltimore","type":"ai","note":"The rule-of-three list \u2014 the model's signature."},{"phrase":"complex negotiations between public agencies, private developers, and community stakeholders","type":"ai","note":"Textbook phrasing with no actual conflict named."},{"phrase":"vibrant mixed-use districts featuring parks, cultural institutions, and residential developments","type":"ai","note":"Three-part listing \u2014 the model can't help itself."}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write a news-style paragraph about waterfront urban development trends"}},{"id":"a018","text":"Hey, sorry for the late reply \u2014 things have been kind of hectic. I talked to the vet and she said Biscuit's blood work came back mostly fine but his thyroid levels are a little high, so we might need to start him on medication. She didn't seem too worried though. Also I forgot to mention, mom called and wants to do Thanksgiving at her place this year instead of aunt Carol's. Let me know if that works. Hope your week's going ok.","source":"ai","genre":"email","wordCount":82,"difficulty":3,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to mimic a casual text message or email between siblings. The pet name ('Biscuit'), the thyroid detail, and the pivot from vet news to Thanksgiving plans create an illusion of real domestic life. The 'sorry for the late reply' opener and 'hope your week's going ok' closer are natural bookends. The giveaway is subtle: this message has <em>exactly</em> the right emotional temperature throughout \u2014 real messages tend to be more uneven.","twinText":"hey sorry forgot to text back yesterday \u2014 vet appt was a whole thing. biscuit's thyroid is up but she said it's fine for now, just gonna start him on a pill. ALSO mom wants thanksgiving at hers this year not aunt carols, she sounded weird about it tbh, you know how she gets when carol does the green bean casserole thing. lmk","twinSource":"human","tells":[{"phrase":"Hope your week's going ok","type":"ai","note":"A calibrated closer \u2014 real siblings don't sign off this gently."},{"phrase":"She didn't seem too worried though","type":"ai","note":"Reassurance the model adds reflexively."},{"phrase":"sorry for the late reply","type":"ai","note":"An even, polite opener \u2014 too composed for a sibling text."}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write a casual sibling text message about a pet's vet visit and holiday plans"}},{"id":"a019","text":"do not tell me the moon is shining; show me the glint of light on broken glass \u2014 I keep thinking about this quote, which people attribute to Chekhov though I can never find the original source. maybe it's apocryphal. the point stands either way. I've been revising the same paragraph for three days now and every version tells when it should show. the problem might be that I don't actually know what the character is feeling. how do you show something you haven't figured out yet.","source":"ai","genre":"diary","wordCount":86,"difficulty":3,"explanation":"Written by <strong>Claude 4.6 Opus</strong> to sound like a writer's journal. The Chekhov quote (which <em>is</em> commonly misattributed), the meta-commentary about 'telling vs. showing,' and the frustrated self-awareness are designed to feel like genuine creative struggle. The lowercase style and the final rhetorical question mimic informal journaling. But the passage is itself a perfectly executed example of 'showing' \u2014 which is a little too self-aware.","twinText":"stuck on para 4 again. the chekhov line about the moon and the broken glass keeps coming up \u2014 i looked it up and apparently he never actually wrote it that way, its from a letter, sort of. anyway. been trying to fix this paragraph since sunday. three different versions, all bad in slightly different ways. i think the problem is i dont know what shes feeling. or i do know and i dont want to write it.","twinSource":"human","tells":[{"phrase":"how do you show something you haven't figured out yet","type":"ai","note":"A clean rhetorical close \u2014 the model loves a final flourish."},{"phrase":"the point stands either way","type":"ai","note":"A calibrated handwave that's a little too smooth."},{"phrase":"every version tells when it should show","type":"ai","note":"Too neat \u2014 a model writing about writing."}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write a writer's journal entry about struggling with a Chekhov writing principle, lowercase and informal"}},{"id":"a020","text":"When I consider the extraordinary capacity of the human mind to construct meaning from fragmentary evidence \u2014 to see faces in clouds, narratives in coincidences, and intention in randomness \u2014 I am struck not by our irrationality but by our profound, almost desperate need for coherence. We are, at our core, pattern-seeking creatures, and this tendency serves us well in most contexts. It is only when we apply it too broadly that it becomes a liability, transforming noise into signal and correlation into cause.","source":"ai","genre":"academic","wordCount":80,"difficulty":1,"explanation":"Written by <strong>Claude 4.6 Opus</strong>. This is quintessential AI prose \u2014 eloquent, balanced, and making a point that sounds profound but is essentially a well-known observation about cognitive bias restated in elevated language. The three-part parallel structure ('faces in clouds, narratives in coincidences, intention in randomness') and the tidy reversal in the final sentence are hallmark AI rhetorical moves.","twinText":"Pareidolia \u2014 seeing faces in clouds, or in the burnt grain of toast \u2014 is the most charming case of a more general problem, which is that human cognition is, structurally, an apophenia engine. The interesting question isn't why we see patterns where none exist; we know the answer to that. The interesting question is why this same machinery, run at an angle, gives us science. Anyway, I haven't finished thinking about it.","twinSource":"human","tells":[{"phrase":"We are, at our core, pattern-seeking creatures","type":"ai","note":"A universal pronouncement \u2014 the model's stock posture."},{"phrase":"transforming noise into signal and correlation into cause","type":"ai","note":"A balanced rule-of-two close."},{"phrase":"almost desperate need for coherence","type":"ai","note":"Faintly purple \u2014 the model dialing up emotional weight."}],"meta":{"model":"Claude 4.6 Opus","prompt":"Write an essayistic reflection on human pattern-seeking behavior in formal academic style"}}]`);
function Je(e) {
  const a = [...e];
  for (let s = a.length - 1; s > 0; s--) {
    const n = Math.floor(Math.random() * (s + 1));
    [a[s], a[n]] = [a[n], a[s]];
  }
  return a;
}
function G(e) {
  return e[Math.floor(Math.random() * e.length)];
}
function Ue(e, a) {
  const s = new Set(a);
  let n = e.filter((d) => d.source === "human" && !s.has(d.id)), r = e.filter((d) => d.source === "ai" && !s.has(d.id));
  n.length < 5 && (n = e.filter((d) => d.source === "human")), r.length < 5 && (r = e.filter((d) => d.source === "ai"));
  const t = [], l = /* @__PURE__ */ new Set();
  function h(d) {
    const p = d.filter((b) => !l.has(b.id)), m = G(p);
    return l.add(m.id), m;
  }
  const i = n.filter((d) => d.difficulty === 3), u = r.filter((d) => d.difficulty === 3);
  if (i.length > 0) {
    const d = G(i);
    t.push(d), l.add(d.id);
  }
  if (u.length > 0) {
    const d = G(u);
    t.push(d), l.add(d.id);
  }
  const c = 5 - t.filter((d) => d.source === "human").length;
  for (let d = 0; d < c; d++) t.push(h(n));
  const y = 5 - t.filter((d) => d.source === "ai").length;
  for (let d = 0; d < y; d++) t.push(h(r));
  if (new Set(t.map((d) => d.genre)).size < 3) {
    const d = /* @__PURE__ */ new Map();
    for (const m of t) d.set(m.genre, (d.get(m.genre) || 0) + 1);
    const p = [...d.entries()].filter(([, m]) => m > 1).sort((m, b) => b[1] - m[1]);
    if (p.length > 0) {
      const [m] = p[0], b = t.findIndex((k) => k.genre === m), w = e.filter((k) => !l.has(k.id) && k.genre !== m);
      if (w.length > 0 && b >= 0) {
        const k = G(w);
        t[b] = k, l.add(k.id);
      }
    }
  }
  return Je(t);
}
function Qe(e, a) {
  let s = 0, n = 0;
  const r = /* @__PURE__ */ new Map();
  let t = 0, l = 0, h = 0, i = 0, u = 0;
  const c = /* @__PURE__ */ new Set(["poem", "fiction", "diary", "tweet"]), y = /* @__PURE__ */ new Set(["review", "recipe", "news", "wikipedia", "email", "instruction", "academic"]);
  for (let d = 0; d < a.length; d++) {
    const p = a[d], m = e[d];
    p.guess === "human" ? s++ : n++, p.correct || (r.set(m.genre, (r.get(m.genre) || 0) + 1), m.source === "human" && p.guess === "ai" && m.difficulty >= 2 && t++, m.source === "ai" && p.guess === "human" && (m.text.match(/street|avenue|road|plaza|1[0-9]{3}|200[0-9]|201[0-9]/i) && l++, m.difficulty >= 2 && h++, c.has(m.genre) && i++, y.has(m.genre) && u++));
  }
  const g = a.filter((d) => d.correct).length;
  return t >= 2 ? { primary: "You consistently flagged polished writing as AI. But some humans are just\u2026 good writers.", detail: 'Clean prose and well-structured sentences feel "too perfect" \u2014 but professional writers, editors, and journalists produce text like this daily. AI has made us suspicious of quality.' } : l >= 2 ? { primary: "You trusted specificity. When a passage mentioned a real place or date, you assumed human. AI has learned to exploit this.", detail: "Planted details \u2014 street names, years, sensory descriptions \u2014 are the most effective trick in AI's arsenal. Real specificity comes from memory; fake specificity comes from training data." } : h >= 2 ? { primary: 'You were fooled by imperfection. AI passages had deliberate "mistakes" \u2014 and you marked them as human.', detail: `Typos, run-on sentences, and hedging language ("I think", "maybe") were once reliable human signals. Now they're easily mimicked. The question is whether the imperfection feels organic or performed.` } : i > u && i >= 2 ? { primary: "You caught AI in functional text but missed it in creative writing. AI poetry and fiction slipped past you.", detail: "Many people assume AI is worse at creative text than functional text. But modern models can produce convincing poems and diary entries \u2014 especially when prompted with emotional specificity." } : u > i && u >= 2 ? { primary: "You caught every AI poem but missed the AI reviews. AI is better at functional text than creative text \u2014 and you knew it intuitively.", detail: "Reviews, instructions, and news excerpts are AI's comfort zone. The structured format and objective tone make it harder to spot the lack of genuine experience behind the words." } : s >= 7 ? { primary: 'You leaned heavily toward "Human." You trust writers \u2014 but that trust was exploited.', detail: `You guessed "Human" ${s} out of 10 times. In a world where AI text is increasingly common, a generous reading might be a liability.` } : n >= 7 ? { primary: `You leaned heavily toward "AI." You're suspicious of text \u2014 and sometimes that suspicion backfired.`, detail: `You guessed "AI" ${n} out of 10 times. Healthy skepticism is good, but over-suspicion can make you dismiss authentic human expression.` } : g >= 9 ? { primary: "You have a remarkably calibrated sense for AI text. Very few visitors score this high.", detail: "Whether through intuition or analysis, you can distinguish the subtle patterns that separate human expression from machine generation. The question is: how long will that edge last?" } : g <= 3 ? { primary: "This is a humbling result \u2014 but that's the point. The line between human and AI writing is thinner than most people think.", detail: "Don't worry: most visitors struggle with these passages. They were specifically chosen to challenge assumptions. The real takeaway is what you learned about your own biases." } : { primary: "Your accuracy was middle-of-the-road \u2014 which means you're experiencing the same uncertainty as most visitors.", detail: 'You got some right on instinct and some wrong despite confidence. The passages that fooled you reveal where your mental model of "AI writing" diverges from reality.' };
}
function le(e) {
  const a = { 10: { title: "Turing Complete", subtitle: "You see through the machine." }, 9: { title: "Pattern Anomaly", subtitle: "Almost nobody scores this high." }, 8: { title: "Signal Decoder", subtitle: "You read between the lines." }, 7: { title: "Binary Literate", subtitle: "You know which bits are real." }, 6: { title: "Above the Noise", subtitle: "You're starting to hear the difference." }, 5: { title: "Coin Flip Oracle", subtitle: "Exactly what random chance predicts." }, 4: { title: "Static Noise", subtitle: "The signal is getting lost." }, 3: { title: "Blurred Lines", subtitle: "The boundary deceived you." }, 2: { title: "Ghost in the Machine", subtitle: "You see humans where there are none." }, 1: { title: "AI Sympathizer", subtitle: "You trust the machine too much." }, 0: { title: "Perfectly Wrong", subtitle: "Statistically impressive, actually." } };
  return a[e] ?? a[5];
}
function Ze(e) {
  const a = e.filter((c) => c.confidence >= 80), s = e.filter((c) => c.confidence < 70), n = a.filter((c) => c.correct).length, r = s.filter((c) => c.correct).length, t = e.filter((c) => c.confidence >= 85 && !c.correct).length, l = e.filter((c) => c.confidence < 65 && c.correct).length, h = a.length >= 2 ? n / a.length : null, i = s.length >= 2 ? r / s.length : null;
  let u;
  return t >= 3 ? u = "You were frequently certain \u2014 and frequently wrong. Overconfidence is the most common trap in this game." : h !== null && h >= 0.8 ? u = "Your confidence was well-calibrated. When you felt sure, you usually were." : l >= 3 ? u = "You doubted yourself more than you should have. Your instincts were better than you thought." : h !== null && i !== null && i > h ? u = "Counterintuitively, you did better when you were less sure. Doubt might be your superpower." : u = "Your confidence didn't strongly predict your accuracy \u2014 which is typical. Our certainty about AI detection is often misplaced.", { highConfAccuracy: h, lowConfAccuracy: i, overconfidentCount: t, underconfidentCount: l, summary: u };
}
function Xe(e) {
  const a = e.map((c) => c.timeTaken), s = a.reduce((c, y) => c + y, 0) / a.length;
  let n = 0, r = 0;
  for (let c = 1; c < a.length; c++) a[c] < a[n] && (n = c), a[c] > a[r] && (r = c);
  const t = e.filter((c) => c.timeTaken < 5e3), l = e.filter((c) => c.timeTaken > 15e3), h = t.length >= 2 ? t.filter((c) => c.correct).length / t.length : null, i = l.length >= 2 ? l.filter((c) => c.correct).length / l.length : null;
  let u;
  return h !== null && i !== null && h > i + 0.15 ? u = "Your gut instinct outperformed your deliberation. Sometimes the first impression is the honest one." : h !== null && i !== null && i > h + 0.15 ? u = "Taking your time paid off. Careful reading caught what snap judgments missed." : s < 8e3 ? u = "You moved quickly through the passages. Speed suggests confidence \u2014 whether justified or not." : s > 2e4 ? u = "You took your time with each passage. Careful analysis is a valid strategy \u2014 but it doesn't always help." : u = "Your pace was steady throughout. Neither rushing nor overthinking \u2014 a balanced approach.", { avgTime: s, fastestIdx: n, slowestIdx: r, gutAccuracy: h, deliberateAccuracy: i, summary: u };
}
const Le = "turing_shuffle_history", Be = "turing_shuffle_last_ids";
function ye() {
  return { totalGames: 0, totalCorrect: 0, totalAnswered: 0, bestScore: 0, bestStreak: 0, results: [], passageMisses: {} };
}
function ce() {
  try {
    const e = localStorage.getItem(Le);
    return e ? JSON.parse(e) : ye();
  } catch {
    return ye();
  }
}
function et(e, a, s, n) {
  const r = ce(), t = { date: Date.now(), score: s, total: a.length, passageIds: e.map((l) => l.id), answers: a, bestStreak: n };
  r.totalGames++, r.totalCorrect += s, r.totalAnswered += a.length, s > r.bestScore && (r.bestScore = s), n > (r.bestStreak || 0) && (r.bestStreak = n), r.results.push(t);
  for (const l of a) l.correct || (r.passageMisses[l.passageId] = (r.passageMisses[l.passageId] || 0) + 1);
  r.results.length > 50 && (r.results = r.results.slice(-50)), localStorage.setItem(Le, JSON.stringify(r)), localStorage.setItem(Be, JSON.stringify(e.map((l) => l.id)));
}
function tt() {
  try {
    const e = localStorage.getItem(Be);
    return e ? JSON.parse(e) : [];
  } catch {
    return [];
  }
}
const qe = "/.netlify/functions/turing-stats";
async function at(e, a, s = {}) {
  const n = e.map((c) => ({ passageId: c.passageId, userGuess: c.guess })), r = JSON.stringify({ submissionId: a, answers: n }), t = s.fetchImpl ?? fetch, l = s.now ?? Date.now, h = s.sleep ?? ((c) => new Promise((y) => setTimeout(y, c))), i = l() + Math.min(s.timeoutMs ?? 2e4, 2e4);
  let u = new Error("Community statistics submission timed out");
  for (let c = 0; c < 3; c += 1) {
    const y = i - l();
    if (y <= 0) throw u;
    const g = new AbortController();
    let d, p;
    try {
      p = await Promise.race([t(qe, { method: "POST", headers: { "Content-Type": "application/json" }, body: r, signal: g.signal }), new Promise((w, k) => {
        d = setTimeout(() => {
          g.abort(), k(new Error("Community statistics submission timed out"));
        }, Math.min(12e3, y));
      })]);
    } catch (w) {
      u = w;
    } finally {
      clearTimeout(d);
    }
    if (p == null ? void 0 : p.ok) return;
    if (p && (u = new Error(`API error: ${p.status}`), p.status !== 429 && p.status < 500) || c === 2) throw u;
    let m = 250 * 2 ** c;
    const b = p == null ? void 0 : p.headers.get("Retry-After");
    if (b) {
      const w = Number(b), k = Number.isFinite(w) ? w * 1e3 : Date.parse(b) - l();
      Number.isFinite(k) && (m = Math.max(m, k));
    }
    if (l() + m >= i) throw u;
    await h(m);
  }
}
function nt(e) {
  return e ? e.global.totalGames === 0 ? "Be the first to play." : `Average score across all visitors: ${e.global.averageScore.toFixed(1)} / 10` : "Community statistics are temporarily unavailable.";
}
async function We() {
  try {
    const e = await fetch(qe, { method: "GET", signal: AbortSignal.timeout(12e3) });
    return e.ok ? await e.json() : null;
  } catch {
    return null;
  }
}
function it(e, a, s, n = 0) {
  const r = document.createElement("canvas");
  r.width = 600, r.height = 370;
  const t = r.getContext("2d"), l = t.createLinearGradient(0, 0, 600, 370);
  l.addColorStop(0, "#0a0c10"), l.addColorStop(1, "#131620"), t.fillStyle = l, t.fillRect(0, 0, 600, 370), t.strokeStyle = "rgba(100, 120, 180, 0.3)", t.lineWidth = 2, t.strokeRect(1, 1, 598, 368), t.fillStyle = "#eef0f6", t.font = 'bold 28px "Playfair Display", Georgia, serif', t.textAlign = "center", t.fillText("The Turing Shuffle", 300, 48), t.font = 'bold 52px "Inter", sans-serif';
  const h = t.createLinearGradient(200, 60, 400, 120);
  e >= 7 ? (h.addColorStop(0, "#2dd4bf"), h.addColorStop(1, "#38bdf8")) : e >= 4 ? (h.addColorStop(0, "#fbbf24"), h.addColorStop(1, "#f97316")) : (h.addColorStop(0, "#f87171"), h.addColorStop(1, "#fb923c")), t.fillStyle = h, t.fillText(`${e} / ${a}`, 300, 118);
  const { title: i } = le(e);
  t.fillStyle = "#fbbf24", t.font = 'bold 20px "Inter", sans-serif', t.fillText(i, 300, 150), t.fillStyle = "#8892b0", t.font = '16px "Inter", sans-serif', t.fillText("Can you tell human writing from AI?", 300, 178);
  const u = 36, c = 8, g = (600 - (a * u + (a - 1) * c)) / 2, d = 200;
  for (let p = 0; p < s.length; p++) {
    const m = g + p * (u + c), b = s[p].correct;
    t.fillStyle = b ? "rgba(45, 212, 191, 0.2)" : "rgba(248, 113, 113, 0.2)", t.beginPath(), t.roundRect(m, d, u, u, 6), t.fill(), t.strokeStyle = b ? "rgba(45, 212, 191, 0.6)" : "rgba(248, 113, 113, 0.6)", t.lineWidth = 2, t.beginPath(), t.roundRect(m, d, u, u, 6), t.stroke(), b ? (t.strokeStyle = "#2dd4bf", t.lineWidth = 3, t.beginPath(), t.moveTo(m + 10, d + 18), t.lineTo(m + 16, d + 25), t.lineTo(m + 27, d + 12), t.stroke()) : (t.strokeStyle = "#f87171", t.lineWidth = 3, t.beginPath(), t.moveTo(m + 10, d + 10), t.lineTo(m + 26, d + 26), t.moveTo(m + 26, d + 10), t.lineTo(m + 10, d + 26), t.stroke());
  }
  return n > 0 && (t.fillStyle = "#5eead4", t.font = 'italic 13px "Inter", sans-serif', t.fillText(`\u2194  saw all ${n} twins`, 300, 268)), t.fillStyle = "#eef0f6", t.font = '500 18px "Inter", sans-serif', t.fillText("Can you beat me?", 300, 295), t.fillStyle = "#4a5568", t.font = '13px "Inter", sans-serif', t.fillText("williamcfrancis.netlify.app", 300, 345), r.toDataURL("image/png");
}
async function ot(e, a, s, n = 0) {
  const r = it(e, a, s, n), { title: t } = le(e), l = `I scored ${e}/${a} on The Turing Shuffle \u2014 "${t}" \u{1F916}\u270D\uFE0F

https://williamcfrancis.netlify.app/games/turing_shuffle/`;
  if (navigator.share) try {
    const h = await (await fetch(r)).blob(), i = new File([h], "turing-shuffle-score.png", { type: "image/png" });
    await navigator.share({ text: l, files: [i] });
    return;
  } catch {
  }
  try {
    await navigator.clipboard.writeText(l), st();
  } catch {
    const h = window.open("", "_blank");
    h && h.document.write(`<html><body style="background:#0a0c10;display:flex;flex-direction:column;align-items:center;padding:40px;font-family:sans-serif;color:#eef0f6"><img src="${r}" style="max-width:100%"/><p style="margin-top:20px">${l}</p></body></html>`);
  }
}
function st() {
  const e = document.createElement("div");
  e.className = "toast", e.textContent = "Score copied to clipboard!", document.body.appendChild(e), requestAnimationFrame(() => e.classList.add("show")), setTimeout(() => {
    e.classList.remove("show"), setTimeout(() => e.remove(), 300);
  }, 2e3);
}
const we = ["\xB7", "\xB7", "\xB7", "\xB7", "\xB7", "\xB7", "\xB7", "\u2202", "\u2207", "\u2211", "\u221E", "\u25C7", "\u25CB", "a", "e", "i", "o", "t", "n", "s", "r"], ee = [168, 200, 240], ae = [45, 212, 191], He = [249, 115, 22], rt = [248, 113, 113];
let W = null, v = null, C = [], B = [], q = "idle", ne = false, ie = 0, oe = "neutral", j = null, N = 0, Y = 0, S = 0, _ = 0, R = 1, D = false, V = false, be = false;
const z = (e, a) => e + Math.random() * (a - e), H = (e, a, s) => e + (a - e) * s, lt = (e, a, s) => Math.min(s, Math.max(a, e));
function ve(e, a, s) {
  return [H(e[0], a[0], s), H(e[1], a[1], s), H(e[2], a[2], s)];
}
function ke(e) {
  return e > 0 ? ve(ee, He, Math.min(1, e)) : e < 0 ? ve(ee, ae, Math.min(1, -e)) : ee;
}
function Oe(e) {
  return 1 - Math.pow(1 - e, 3);
}
function ct() {
  return { x: Math.random() * S, y: Math.random() * _, vx: z(-0.05, 0.05), vy: z(-0.05, 0.05), char: we[Math.floor(Math.random() * we.length)], size: z(9, 16), baseAlpha: z(0.18, 0.42), tint: 0, phase: Math.random() * Math.PI * 2 };
}
function dt() {
  return S < 600 ? 50 : S < 1100 ? 90 : 130;
}
function xe() {
  if (!W || !v) return;
  S = window.innerWidth, _ = window.innerHeight, R = Math.min(window.devicePixelRatio || 1, 2), W.width = Math.floor(S * R), W.height = Math.floor(_ * R), W.style.width = `${S}px`, W.style.height = `${_}px`, v.setTransform(R, 0, 0, R, 0, 0);
  const e = dt();
  for (; C.length < e; ) C.push(ct());
  for (; C.length > e; ) C.pop();
  D || de(performance.now());
}
function ht(e) {
  const a = performance.now() / 1e3, s = oe === "human" ? ie : oe === "ai" ? -ie : 0, n = ne ? a * 0.08 : 0, r = Math.cos(n) * 0.18, t = Math.sin(n) * 0.18, l = q === "reveal" ? 0.97 : 0.96, h = q === "reveal" ? 0.9 : 1.6;
  for (const i of C) {
    i.tint = H(i.tint, s, 0.025);
    const u = 22e-4, c = Math.sin(i.y * u + a * 0.35) * 0.045, y = Math.cos(i.x * u + a * 0.35) * 0.045;
    if (i.vx += c, i.vy += y, q !== "reveal") {
      const p = S / 2, m = _ / 2;
      i.vx += (p - i.x) * 85e-7 * e, i.vy += (m - i.y) * 85e-7 * e;
    }
    if (q === "reading" && j) {
      const p = j.x - i.x, m = j.y - i.y, b = p * p + m * m, w = Math.sqrt(b) || 1, k = 18e-6 * Math.min(1, w / 400);
      i.vx += p / w * k * e, i.vy += m / w * k * e, i.vx += -m / w * 45e-7 * e, i.vy += p / w * 45e-7 * e;
    }
    ne && (i.vx = H(i.vx, r, 0.012), i.vy = H(i.vy, t, 0.012));
    const g = Math.abs(i.tint);
    if (g > 0.05) {
      const p = i.tint > 0 ? S * 0.72 : S * 0.28;
      i.vx += (p - i.x) * 35e-7 * g * e;
    }
    for (const p of B) {
      const m = i.x - p.x, b = i.y - p.y, w = Math.hypot(m, b) || 1, k = p.age / p.lifetime, f = Oe(k) * p.maxRadius, T = 70, x = Math.abs(w - f);
      if (x < T) {
        const M = (1 - x / T) * (1 - k) * 0.55;
        i.vx += m / w * M, i.vy += b / w * M;
      }
    }
    i.vx *= l, i.vy *= l;
    const d = Math.hypot(i.vx, i.vy);
    d > h && (i.vx = i.vx / d * h, i.vy = i.vy / d * h), i.x += i.vx * e * 0.06, i.y += i.vy * e * 0.06, i.x < -30 && (i.x = S + 30), i.x > S + 30 && (i.x = -30), i.y < -30 && (i.y = _ + 30), i.y > _ + 30 && (i.y = -30), i.phase += e * 12e-4;
  }
  for (const i of B) i.age += e;
  B = B.filter((i) => i.age < i.lifetime);
}
function de(e) {
  if (!v) return;
  v.clearRect(0, 0, S, _);
  const a = q === "reveal" ? 130 : 90, s = q === "reveal" ? 0.12 : 0.085;
  v.lineWidth = 0.6;
  for (let n = 0; n < C.length; n++) {
    const r = C[n];
    for (let t = n + 1; t < C.length; t++) {
      const l = C[t], h = r.x - l.x, i = r.y - l.y, u = h * h + i * i, c = a * a;
      if (u < c) {
        const g = (1 - Math.sqrt(u) / a) * s, d = (r.tint + l.tint) / 2, [p, m, b] = ke(d);
        v.strokeStyle = `rgba(${p | 0}, ${m | 0}, ${b | 0}, ${g})`, v.beginPath(), v.moveTo(r.x, r.y), v.lineTo(l.x, l.y), v.stroke();
      }
    }
  }
  v.textAlign = "center", v.textBaseline = "middle";
  for (const n of C) {
    const r = 0.85 + 0.15 * Math.sin(n.phase * 1.5 + e * 1e-3), t = n.baseAlpha * r, [l, h, i] = ke(n.tint);
    v.fillStyle = `rgba(${l | 0}, ${h | 0}, ${i | 0}, ${t})`, v.font = `${n.size}px ui-monospace, "SF Mono", Menlo, Consolas, monospace`, v.fillText(n.char, n.x, n.y);
  }
  for (const n of B) {
    const r = n.age / n.lifetime, t = Oe(r) * n.maxRadius, l = (1 - r) * 0.55, [h, i, u] = n.color, c = Math.max(0, t - 80), y = t + 40, g = v.createRadialGradient(n.x, n.y, c, n.x, n.y, y);
    g.addColorStop(0, `rgba(${h}, ${i}, ${u}, 0)`), g.addColorStop(0.55, `rgba(${h}, ${i}, ${u}, ${l})`), g.addColorStop(1, `rgba(${h}, ${i}, ${u}, 0)`), v.fillStyle = g, v.beginPath(), v.arc(n.x, n.y, y, 0, Math.PI * 2), v.fill();
  }
}
function Re(e) {
  if (!D) return;
  const a = Math.min(50, e - Y);
  Y = e, ht(a), de(e), N = requestAnimationFrame(Re);
}
function te() {
  D || !v || (Y = performance.now(), de(Y), !(V || document.hidden) && (D = true, N = requestAnimationFrame(Re)));
}
function Te() {
  D = false, N && cancelAnimationFrame(N);
}
function ut(e) {
  if (be || (W = e, v = e.getContext("2d"), !v)) return;
  const a = window.matchMedia("(prefers-reduced-motion: reduce)");
  V = a.matches, a.addEventListener("change", () => {
    V = a.matches, Te(), B = [], te();
  }), xe();
  let s = 0;
  window.addEventListener("resize", () => {
    clearTimeout(s), s = window.setTimeout(xe, 120);
  }), document.addEventListener("visibilitychange", () => {
    document.hidden ? Te() : te();
  }), be = true, te();
}
function he(e) {
  q = e, e !== "reading" && (j = null);
}
function Q(e) {
  ne = e;
}
function E(e, a) {
  ie = lt(e, 0, 1), oe = e === 0 ? "neutral" : a;
}
function mt(e, a) {
  j = { x: e, y: a };
}
function je(e, a, s) {
  if (V || document.hidden) return;
  let n;
  switch (s) {
    case "correct":
      n = ae;
      break;
    case "incorrect":
      n = rt;
      break;
    case "human":
      n = He;
      break;
    case "ai":
      n = ae;
      break;
  }
  B.push({ x: e, y: a, age: 0, lifetime: 1300, maxRadius: Math.max(S, _) * 0.7, color: n });
}
const Ie = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\xB7\u2202\u2207\u2211\u221E\u25C7\u25CB";
function pt() {
  return Ie[Math.floor(Math.random() * Ie.length)];
}
function Se(e) {
  return e === " " || e === `
` || e === "	";
}
function ft(e) {
  return /[\s.,:;!?'"\-—–()\[\]{}]/.test(e);
}
function gt(e) {
  return e < 0.5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2;
}
function yt(e, a, s, n = {}) {
  const r = n.duration ?? 1400, t = n.waveWidth ?? 28, l = typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return new Promise((h) => {
    var _a, _b, _c;
    if ((_a = n.signal) == null ? void 0 : _a.aborted) {
      e.textContent = s, (_b = n.onComplete) == null ? void 0 : _b.call(n), h();
      return;
    }
    if (l) {
      e.classList.add("morph-glow"), e.style.transition = "opacity 180ms ease", e.style.opacity = "0", setTimeout(() => {
        var _a2, _b2;
        if ((_a2 = n.signal) == null ? void 0 : _a2.aborted) {
          e.style.opacity = "", e.style.transition = "", e.classList.remove("morph-glow"), (_b2 = n.onComplete) == null ? void 0 : _b2.call(n), h();
          return;
        }
        e.textContent = s, e.style.opacity = "1", setTimeout(() => {
          var _a3;
          e.style.opacity = "", e.style.transition = "", e.classList.remove("morph-glow"), (_a3 = n.onComplete) == null ? void 0 : _a3.call(n), h();
        }, 200);
      }, 200);
      return;
    }
    const i = Math.max(a.length, s.length), u = a.padEnd(i, " "), c = s.padEnd(i, " ");
    e.classList.add("morph-glow");
    const y = performance.now();
    let g = 0;
    const d = () => {
      var _a2;
      cancelAnimationFrame(g), e.textContent = s, e.classList.remove("morph-glow"), (_a2 = n.onComplete) == null ? void 0 : _a2.call(n), h();
    };
    (_c = n.signal) == null ? void 0 : _c.addEventListener("abort", d, { once: true });
    function p(m) {
      var _a2, _b2, _c2, _d;
      if ((_a2 = n.signal) == null ? void 0 : _a2.aborted) return;
      const b = m - y, w = Math.min(b / r, 1), f = gt(w) * (i + t) - t;
      let T = "";
      for (let x = 0; x < i; x++) {
        const M = u[x], A = c[x], O = f - x;
        if (O < 0) T += M;
        else if (O >= t) T += A;
        else if (M === A) T += A;
        else if (Se(M) && Se(A)) T += A;
        else if (ft(A) && Math.random() > 0.4) T += A;
        else {
          const Z = O / t;
          T += Math.random() < Z ? A : pt();
        }
      }
      e.textContent = T, (_b2 = n.onProgress) == null ? void 0 : _b2.call(n, w), w < 1 ? g = requestAnimationFrame(p) : (e.textContent = s, e.classList.remove("morph-glow"), e.classList.add("morph-settled"), setTimeout(() => e.classList.remove("morph-settled"), 700), (_c2 = n.signal) == null ? void 0 : _c2.removeEventListener("abort", d), (_d = n.onComplete) == null ? void 0 : _d.call(n), h());
    }
    g = requestAnimationFrame(p);
  });
}
const L = document.getElementById("app"), wt = window.matchMedia("(prefers-reduced-motion: reduce)"), Ae = document.getElementById("latent-field");
Ae && ut(Ae);
let o = { screen: "landing", passages: [], currentIndex: 0, answers: [], submissionId: "", confidence: 75, aggregateStats: null, history: ce(), insight: null, passageStartTime: 0, currentStreak: 0, bestStreak: 0, showingTwin: false, twinsSeen: 0 }, F = false, se = false, $ = null, K = null;
const bt = { diary: "#f97316", review: "#fbbf24", fiction: "#a78bfa", poem: "#f472b6", recipe: "#34d399", news: "#60a5fa", tweet: "#38bdf8", email: "#fb923c", wikipedia: "#94a3b8", instruction: "#2dd4bf", academic: "#818cf8" };
function ue() {
  return wt.matches;
}
function I(e) {
  const a = document.createElement("div");
  return a.textContent = e, a.innerHTML;
}
function Ce(e) {
  const a = e / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const s = Math.floor(a / 60), n = Math.round(a % 60);
  return `${s}m ${n}s`;
}
function De(e) {
  const a = bt[e];
  return `<span class="genre-pill"${a ? ` style="color:${a}"` : ""}>${e}</span>`;
}
function Me(e) {
  var _a;
  try {
    (_a = navigator.vibrate) == null ? void 0 : _a.call(navigator, e);
  } catch {
  }
}
function Fe(e) {
  if (ue()) {
    window.scrollTo({ top: 0, behavior: "instant" }), e(), $e();
    return;
  }
  L.classList.add("transitioning"), setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "instant" }), e(), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        L.classList.remove("transitioning"), $e();
      });
    });
  }, 250);
}
function $e() {
  var _a;
  (_a = L.querySelector('button, [tabindex="0"]')) == null ? void 0 : _a.focus();
}
function vt(e) {
  const a = document.getElementById("score-num");
  if (!a || e === 0 || ue()) {
    a && (a.textContent = String(e));
    return;
  }
  a.textContent = "0";
  const s = performance.now(), n = 1500;
  function r(t) {
    const l = t - s, h = Math.min(l / n, 1), i = 1 - Math.pow(1 - h, 3);
    a.textContent = String(Math.round(i * e)), h < 1 && requestAnimationFrame(r);
  }
  requestAnimationFrame(r);
}
function _e(e) {
  o.confidence = Math.max(50, Math.min(100, o.confidence + e));
  const a = document.getElementById("confidence"), s = document.getElementById("conf-value");
  a && (a.value = String(o.confidence)), s && (s.textContent = `${o.confidence}%`);
}
function kt(e) {
  if (!(e.repeat || e.defaultPrevented) && !((e.key === "Enter" || e.key === " ") && e.target instanceof Element && e.target.closest("button, a, input, select, textarea")) && !(e.target instanceof HTMLTextAreaElement) && !(e.target instanceof HTMLInputElement && e.target.type === "text")) switch (o.screen) {
    case "landing":
      e.key === "Enter" && (e.preventDefault(), J());
      break;
    case "game":
      if (o.showingTwin) {
        (e.key === "Enter" || e.key === " ") && (e.preventDefault(), Pe());
        return;
      }
      if (F) return;
      e.key === "h" || e.key === "H" || e.key === "1" ? (e.preventDefault(), U("human")) : e.key === "a" || e.key === "A" || e.key === "2" ? (e.preventDefault(), U("ai")) : e.key === "ArrowLeft" ? (e.preventDefault(), _e(-5)) : e.key === "ArrowRight" && (e.preventDefault(), _e(5));
      break;
    case "reveal":
      e.key === "Enter" && (e.preventDefault(), J());
      break;
  }
}
document.addEventListener("keydown", kt);
function xt() {
  We().then((e) => {
    o.aggregateStats = e, o.screen === "landing" && Ee(), o.screen === "reveal" && re();
  }).catch(() => {
  }), Ee();
}
function J() {
  const e = tt();
  o.passages = Ue(Ke, e), o.currentIndex = 0, o.answers = [], o.submissionId = crypto.randomUUID(), o.confidence = 75, o.screen = "game", o.insight = null, o.currentStreak = 0, o.bestStreak = 0, o.showingTwin = false, o.twinsSeen = 0, F = false, se = false, Fe(() => Ge());
}
function U(e) {
  if (F) return;
  F = true;
  const a = document.getElementById(e === "human" ? "btn-human" : "btn-ai");
  document.querySelectorAll(".btn-guess").forEach((l) => {
    l.disabled = true;
  });
  const s = o.passages[o.currentIndex], n = Date.now() - o.passageStartTime, r = e === s.source, t = { passageId: s.id, guess: e, confidence: o.confidence, correct: r, timeTaken: n };
  if (o.answers.push(t), r ? (o.currentStreak++, o.currentStreak > o.bestStreak && (o.bestStreak = o.currentStreak), Me(50)) : (o.currentStreak = 0, Me([30, 50, 30])), a) {
    const l = a.getBoundingClientRect();
    je(l.left + l.width / 2, l.top + l.height / 2, r ? "correct" : "incorrect");
  }
  Q(o.currentStreak >= 3), $ = null, E(0, "neutral"), St(r, s.source), setTimeout(() => Tt(s), 900);
}
function Tt(e) {
  K == null ? void 0 : K.abort();
  const a = new AbortController();
  K = a, o.showingTwin = true, o.twinsSeen = Math.max(o.twinsSeen, o.currentIndex + 1);
  const s = L.querySelector(".game"), n = document.getElementById("passage-card"), r = (n == null ? void 0 : n.querySelector(".passage-text")) ?? null;
  if (!s || !n || !r) return;
  s.classList.add("game--twin");
  const t = document.querySelector(".feedback-overlay");
  t && (t.classList.remove("show"), setTimeout(() => t.remove(), 300));
  const l = document.createElement("div");
  l.className = "twin-label", l.innerHTML = '<span class="twin-label__bullet">\u2194</span> The twin', n.parentElement.insertBefore(l, n), requestAnimationFrame(() => l.classList.add("show"));
  const h = n.querySelector(".genre-pill");
  if (h) {
    const c = document.createElement("span");
    c.className = `twin-badge twin-badge--${e.twinSource}`, c.textContent = e.twinSource === "human" ? "now reads as Human" : "now reads as AI", h.after(c), requestAnimationFrame(() => c.classList.add("show"));
  }
  const i = document.createElement("div");
  i.className = "sr-only", i.setAttribute("aria-live", "polite"), i.textContent = `Twin reveal \u2014 same idea written by the ${e.twinSource === "human" ? "human" : "AI"}: ${e.twinText.substring(0, 160)}`, n.parentElement.appendChild(i), setTimeout(() => i.remove(), 2e3);
  const u = n.getBoundingClientRect();
  je(u.left + u.width / 2, u.top + u.height / 2, e.twinSource === "human" ? "human" : "ai"), yt(r, e.text, e.twinText, { duration: 1400, signal: a.signal, onComplete: () => {
    !a.signal.aborted && o.showingTwin && o.passages[o.currentIndex] === e && It(e);
  } });
}
function It(e) {
  const a = L.querySelector(".game");
  if (!a) return;
  const s = e.tells.map((h, i) => `
    <li class="tell tell--${h.type}" style="--tell-delay: ${i * 90}ms">
      <div class="tell__rule" aria-hidden="true"></div>
      <div class="tell__body">
        <div class="tell__phrase">&ldquo;${I(h.phrase)}&rdquo;</div>
        ${h.note ? `<div class="tell__note">${I(h.note)}</div>` : ""}
      </div>
    </li>
  `).join(""), n = document.createElement("div");
  n.className = "diff-strip", n.innerHTML = `
    <div class="diff-strip__title">What gave it away</div>
    <ul class="diff-strip__list" role="list">${s}</ul>
  `;
  const r = o.currentIndex >= 9, t = document.createElement("div");
  t.className = "twin-actions", t.innerHTML = `
    <button class="btn-continue" id="btn-continue" type="button" aria-label="${r ? "See your results" : "Continue to the next passage"}">
      <span class="btn-continue__label">${r ? "See results" : "Continue"}</span>
      <span class="btn-continue__arrow" aria-hidden="true">\u2192</span>
      <span class="btn-continue__hint" aria-hidden="true">Space</span>
    </button>
  `;
  const l = a.querySelector(".controls");
  l ? (l.before(n), l.before(t)) : (a.appendChild(n), a.appendChild(t)), requestAnimationFrame(() => {
    n.classList.add("show"), t.classList.add("show");
  }), document.getElementById("btn-continue").addEventListener("click", Pe), setTimeout(() => {
    var _a;
    return (_a = document.getElementById("btn-continue")) == null ? void 0 : _a.focus({ preventScroll: true });
  }, 60);
}
function Pe() {
  o.showingTwin && (o.showingTwin = false, K == null ? void 0 : K.abort(), K = null, F = false, o.currentIndex++, o.confidence = 75, o.currentIndex >= 10 ? At() : Ge());
}
function St(e, a) {
  const s = document.getElementById("passage-card");
  if (!s) return;
  const n = document.createElement("div");
  n.className = `feedback-overlay ${e ? "feedback-correct" : "feedback-incorrect"}`, n.innerHTML = `
    <div class="feedback-icon">${e ? "&#10003;" : "&#10007;"}</div>
    <div class="feedback-label">${e ? "Correct" : "Wrong"}</div>
    <div class="feedback-source">It was <strong>${a === "human" ? "Human" : "AI"}</strong></div>
  `, s.appendChild(n), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.classList.add("show");
    });
  });
  const t = document.querySelectorAll(".step-dot")[o.currentIndex];
  t && (t.classList.remove("step-dot--active"), t.classList.add(e ? "step-dot--correct" : "step-dot--incorrect"));
  const l = document.getElementById("streak");
  e && o.currentStreak >= 2 && l ? (l.textContent = `\u{1F525} ${o.currentStreak} in a row`, l.classList.remove("streak-hidden"), l.classList.add("streak-pop")) : !e && l && o.currentStreak === 0 && (l.classList.contains("streak-hidden") || (l.classList.add("streak-break"), setTimeout(() => l.classList.add("streak-hidden"), 300)));
}
async function At() {
  const e = o.submissionId, a = o.answers.filter((s) => s.correct).length;
  o.insight = Qe(o.passages, o.answers), et(o.passages, o.answers, a, o.bestStreak), o.history = ce(), o.screen = "reveal", Fe(() => re());
  try {
    await at(o.answers, e);
    const s = await We();
    s && (o.aggregateStats = s, o.screen === "reveal" && o.submissionId === e && re());
  } catch {
  }
}
function Ee() {
  const e = o.history, a = nt(o.aggregateStats);
  let s = "";
  if (e.totalGames > 0) {
    const n = (e.totalCorrect / e.totalAnswered * 100).toFixed(0);
    s = `
      <div class="landing__history">
        <div class="landing__history-row">
          <span>Games played</span><strong>${e.totalGames}</strong>
        </div>
        <div class="landing__history-row">
          <span>Lifetime accuracy</span><strong>${n}%</strong>
        </div>
        <div class="landing__history-row">
          <span>Best score</span><strong>${e.bestScore}/10</strong>
        </div>
        ${(e.bestStreak || 0) >= 2 ? `
        <div class="landing__history-row">
          <span>Best streak</span><strong>${e.bestStreak} \u{1F525}</strong>
        </div>` : ""}
      </div>
    `;
  }
  L.innerHTML = `
    <div class="landing">
      <h1 class="landing__title">The Turing Shuffle</h1>
      <div class="shuffle-animation" aria-hidden="true">
        ${Array.from({ length: 10 }, () => '<div class="shuffle-card"></div>').join("")}
      </div>
      <p class="landing__subtitle">
        10 passages. Some are human. Some are AI.<br />
        Can you tell the difference?
      </p>
      <button class="btn-begin" id="btn-begin">Begin</button>
      <p class="landing__stat">${a}</p>
      ${s}
    </div>
  `, document.getElementById("btn-begin").addEventListener("click", J), he("idle"), Q(false), E(0, "neutral"), $ = null;
}
function Ge() {
  window.scrollTo({ top: 0, behavior: "instant" });
  const e = o.passages[o.currentIndex], a = o.currentStreak >= 2, s = Array.from({ length: 10 }, (i, u) => {
    let c = "step-dot";
    return u < o.currentIndex ? c += o.answers[u].correct ? " step-dot--correct" : " step-dot--incorrect" : u === o.currentIndex && (c += " step-dot--active"), `<div class="${c}"></div>`;
  }).join("");
  L.innerHTML = `
    <div class="game">
      <div class="game-header">
        <div class="step-dots" role="progressbar" aria-valuenow="${o.currentIndex + 1}" aria-valuemin="1" aria-valuemax="10" aria-label="Question ${o.currentIndex + 1} of 10">
          ${s}
        </div>
        <div class="progress-label">${o.currentIndex + 1} of 10</div>
        <div class="streak-counter ${a ? "" : "streak-hidden"}" id="streak">
          \u{1F525} ${o.currentStreak} in a row
        </div>
      </div>

      <div class="passage-card" id="passage-card">
        ${De(e.genre)}
        <p class="passage-text">${I(e.text)}</p>
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
            value="${o.confidence}"
            step="1"
            aria-label="Confidence level: ${o.confidence}%"
          />
          <span class="confidence-value" id="conf-value">${o.confidence}%</span>
          <span class="confidence-label">Certain</span>
        </div>

        <div class="buttons-row">
          <button class="btn-guess btn-human" id="btn-human">
            <span class="btn-icon">&#9998;</span>
            Human
            <kbd class="kbd-hint">H</kbd>
          </button>
          <button class="btn-guess btn-ai" id="btn-ai">
            <span class="btn-icon">&#9881;</span>
            AI
            <kbd class="kbd-hint">A</kbd>
          </button>
        </div>
      </div>
    </div>
  `, document.getElementById("confidence").addEventListener("input", (i) => {
    o.confidence = parseInt(i.target.value, 10);
    const u = document.getElementById("conf-value");
    u && (u.textContent = `${o.confidence}%`), $ && E(o.confidence / 100, $);
  });
  const n = document.getElementById("btn-human"), r = document.getElementById("btn-ai");
  n.addEventListener("click", () => U("human")), r.addEventListener("click", () => U("ai"));
  const t = () => {
    $ = "human", E(o.confidence / 100, "human");
  }, l = () => {
    $ = "ai", E(o.confidence / 100, "ai");
  }, h = () => {
    $ = null, E(0, "neutral");
  };
  n.addEventListener("mouseenter", t), n.addEventListener("focus", t), n.addEventListener("mouseleave", h), n.addEventListener("blur", h), r.addEventListener("mouseenter", l), r.addEventListener("focus", l), r.addEventListener("mouseleave", h), r.addEventListener("blur", h), he("reading"), Q(o.currentStreak >= 3), E(0, "neutral"), $ = null, requestAnimationFrame(() => {
    const i = document.getElementById("passage-card");
    if (i) {
      const u = i.getBoundingClientRect();
      mt(u.left + u.width / 2, u.top + u.height / 2);
    }
  }), o.passageStartTime = Date.now();
}
function re() {
  var _a;
  he("reveal"), Q(false), E(0, "neutral"), $ = null;
  const e = o.answers.filter((f) => f.correct).length, a = e / 10 * 100, s = 2 * Math.PI * 66, n = s - a / 100 * s, r = e >= 7 ? "url(#grad-correct)" : e >= 4 ? "url(#grad-warn)" : "url(#grad-incorrect)", t = e >= 7 ? "rgba(45,212,191,0.25)" : e >= 4 ? "rgba(251,191,36,0.25)" : "rgba(248,113,113,0.25)", { title: l, subtitle: h } = le(e);
  let i = "";
  if (((_a = o.aggregateStats) == null ? void 0 : _a.global) && o.aggregateStats.global.totalGames > 0) {
    const f = o.aggregateStats.global.averageScore;
    i = `<p class="percentile">Better than ${Math.min(99, Math.max(1, Math.round(50 + (e - f) * 15)))}% of visitors</p>`;
  }
  const u = o.bestStreak >= 2 ? `<div class="best-streak">\u{1F525} Best streak: ${o.bestStreak} in a row</div>` : "", c = Ze(o.answers), y = Xe(o.answers);
  let g = "";
  c.highConfAccuracy !== null && (g += `
      <div class="analysis-stat">
        <span class="analysis-stat__label">When certain (80%+)</span>
        <span class="analysis-stat__value">${Math.round(c.highConfAccuracy * 100)}% right</span>
      </div>`), c.lowConfAccuracy !== null && (g += `
      <div class="analysis-stat">
        <span class="analysis-stat__label">When guessing (&lt;70%)</span>
        <span class="analysis-stat__value">${Math.round(c.lowConfAccuracy * 100)}% right</span>
      </div>`), c.overconfidentCount > 0 && (g += `
      <div class="analysis-stat">
        <span class="analysis-stat__label">Overconfident</span>
        <span class="analysis-stat__value">${c.overconfidentCount} time${c.overconfidentCount > 1 ? "s" : ""}</span>
      </div>`), c.underconfidentCount > 0 && (g += `
      <div class="analysis-stat">
        <span class="analysis-stat__label">Underconfident</span>
        <span class="analysis-stat__value">${c.underconfidentCount} time${c.underconfidentCount > 1 ? "s" : ""}</span>
      </div>`);
  let d = `
    <div class="analysis-stat">
      <span class="analysis-stat__label">Average per passage</span>
      <span class="analysis-stat__value">${Ce(y.avgTime)}</span>
    </div>`;
  y.gutAccuracy !== null && (d += `
      <div class="analysis-stat">
        <span class="analysis-stat__label">Gut instinct (&lt;5s)</span>
        <span class="analysis-stat__value">${Math.round(y.gutAccuracy * 100)}% right</span>
      </div>`), y.deliberateAccuracy !== null && (d += `
      <div class="analysis-stat">
        <span class="analysis-stat__label">Deliberated (&gt;15s)</span>
        <span class="analysis-stat__value">${Math.round(y.deliberateAccuracy * 100)}% right</span>
      </div>`);
  const p = `
    <div class="analysis-grid">
      <div class="analysis-card">
        <div class="analysis-card__title">Confidence Calibration</div>
        ${g}
        <p class="analysis-card__summary">${I(c.summary)}</p>
      </div>
      <div class="analysis-card">
        <div class="analysis-card__title">Timing Patterns</div>
        ${d}
        <p class="analysis-card__summary">${I(y.summary)}</p>
      </div>
    </div>
  `, m = ue(), b = o.passages.map((f, T) => {
    var _a2, _b;
    const x = o.answers[T], M = x.correct, A = M ? "&#10003;" : "&#10007;", O = m ? 0 : 0.06 * (T + 1), Z = f.source === "human" ? "Human" : "AI", ze = f.source === "human" ? f.meta.author ? `<div class="reveal-card__meta">${I(f.meta.author)}</div>` : "" : f.meta.model ? `<div class="reveal-card__meta">${I(f.meta.model)}${f.meta.prompt ? " \u2014 Prompt: \u201C" + I(f.meta.prompt) + "\u201D" : ""}</div>` : "", Ne = "\u2605".repeat(f.difficulty) + "\u2606".repeat(3 - f.difficulty), Ye = Ce(x.timeTaken), Ve = x.timeTaken < 5e3 ? "gut" : x.timeTaken > 15e3 ? "deliberate" : "", me = x.timeTaken < 5e3 ? "Gut instinct" : x.timeTaken > 15e3 ? "Deliberated" : "";
    let pe = "";
    const P = (_b = (_a2 = o.aggregateStats) == null ? void 0 : _a2.passages) == null ? void 0 : _b[f.id];
    if (P) {
      const fe = P.humanVotes + P.aiVotes;
      if (fe > 0) {
        const X = Math.round(P.humanVotes / fe * 100), ge = 100 - X;
        pe = `
          <div class="community-bar">
            <div class="community-bar__human" style="width:${X}%"></div>
            <div class="community-bar__ai" style="width:${ge}%"></div>
          </div>
          <div class="community-labels">
            <span>${X}% said Human</span>
            <span>${ge}% said AI</span>
          </div>
        `;
      }
    }
    return `
      <div class="reveal-card ${M ? "correct" : "incorrect"}" data-idx="${T}" style="animation-delay:${O}s">
        <div class="reveal-card__header">
          <div class="reveal-card__icon">${A}</div>
          <div>
            ${De(f.genre)}
            <div class="reveal-card__verdict">
              You said <strong>${x.guess === "human" ? "Human" : "AI"}</strong>
              \u2014 Actually <span class="source-label" style="color:${f.source === "human" ? "var(--human-start)" : "var(--ai-start)"}">${Z}</span>
            </div>
          </div>
        </div>
        <p class="reveal-card__text">${I(f.text)}</p>
        <div class="reveal-card__expand-hint">Tap to read more</div>
        <div class="reveal-card__details">
          <div>
            <p class="reveal-card__explanation">${f.explanation}</p>
            ${ze}
            <div class="reveal-card__badges">
              <span class="difficulty-badge" title="Difficulty">${Ne}</span>
              <span class="time-badge">${Ye}</span>
              ${me ? `<span class="reaction-badge ${Ve}">${me}</span>` : ""}
            </div>
            ${pe}
          </div>
        </div>
      </div>
    `;
  }).join(""), w = o.insight, k = w ? `
    <div class="insight-section">
      <div class="insight-section__title">Your Pattern</div>
      <p class="insight-section__primary">${I(w.primary)}</p>
      <p class="insight-section__detail">${I(w.detail)}</p>
    </div>
  ` : "";
  L.innerHTML = `
    <div class="reveal">
      <div class="score-header">
        <div class="score-circle" style="filter:drop-shadow(0 0 14px ${t})">
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
              stroke="${r}"
              stroke-dasharray="${s}"
              stroke-dashoffset="${s}"
              id="score-arc"
            />
          </svg>
          <div class="score-circle__text">
            <div class="score-number" id="score-num">${e}</div>
            <div class="score-label">out of 10</div>
          </div>
        </div>
        <div class="score-rank">
          <div class="score-rank__title">${I(l)}</div>
          <div class="score-rank__subtitle">${I(h)}</div>
        </div>
        <h2 class="score-title">You got ${e} out of 10 correct</h2>
        ${i}
        ${u}
      </div>

      ${k}

      ${p}

      <div class="breakdown">
        <h3 class="breakdown__title">Passage Breakdown</h3>
        ${b}
      </div>

      <div class="actions">
        <button class="btn-action btn-play-again" id="btn-again">Play Again</button>
        <button class="btn-action btn-share" id="btn-share">Share Score</button>
      </div>
    </div>
  `, se || (se = true, vt(e)), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const f = document.getElementById("score-arc");
      f && f.setAttribute("stroke-dashoffset", String(n));
    });
  }), document.querySelectorAll(".reveal-card").forEach((f) => {
    f.addEventListener("click", () => f.classList.toggle("expanded"));
  }), document.getElementById("btn-again").addEventListener("click", J), document.getElementById("btn-share").addEventListener("click", () => {
    ot(e, 10, o.answers, o.twinsSeen);
  });
}
xt();
