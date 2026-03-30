const fs = require('fs');
const html = fs.readFileSync('static/games/lexicon_atlas/index.html', 'utf8');
const js = html.match(/<script>\s*([\s\S]*?)\s*<\/script>/)[1];
const a = js.indexOf('const REGIONS={');
const b = js.indexOf('const COUNTRY_MAP={');
const regions = eval('(' + js.slice(a + 'const REGIONS='.length, b).trim().replace(/;$/, '') + ')');

// Check meanings that mention the country name
Object.entries(regions).forEach(([k, r]) => {
  r.words.forEach(w => {
    const m = w.meaning.toLowerCase();
    const rn = r.name.toLowerCase();
    const aliases = [rn];
    if (rn.includes(' ')) aliases.push(...rn.split(' '));
    // Also check adjective forms
    const adj = {
      'russia': 'russian', 'china': 'chinese', 'brazil': 'brazilian',
      'argentina': 'argentine', 'mexico': 'mexican', 'indonesia': 'indonesian',
      'iran': 'iranian', 'peru': 'peruvian', 'mongolia': 'mongolian',
      'algeria': 'algerian', 'libya': 'libyan', 'chad': 'chadian',
      'namibia': 'namibian', 'zambia': 'zambian', 'uganda': 'ugandan',
      'bangladesh': 'bangladeshi', 'kenya': 'kenyan', 'ghana': 'ghanaian',
      'nigeria': 'nigerian', 'jamaica': 'jamaican', 'fiji': 'fijian',
      'sudan': 'sudanese', 'zimbabwe': 'zimbabwean', 'barbados': 'barbadian',
      'bermuda': 'bermudian', 'trinidad': 'trinidadian',
      'singapore': 'singaporean', 'india': 'indian', 'australia': 'australian',
      'malaysia': 'malaysian', 'pakistan': 'pakistani',
      'saudi_arabia': 'saudi', 'kazakhstan': 'kazakh',
      'united_kingdom': 'british', 'scotland': 'scottish', 'wales': 'welsh',
      'ireland': 'irish', 'canada': 'canadian', 'new_zealand': 'new zealand',
      'south_africa': 'south african', 'philippines': 'philippine',
      'hong_kong': 'hong kong', 'sri_lanka': 'sri lankan',
      'united_states': 'american', 'dr_congo': 'congolese'
    };
    if (adj[k]) aliases.push(adj[k]);
    
    for (const al of aliases) {
      if (al.length > 3 && m.includes(al)) {
        console.log(`MEANING LEAK: ${k} / ${w.word}: "${w.meaning}" contains "${al}"`);
        break;
      }
    }
  });
});
