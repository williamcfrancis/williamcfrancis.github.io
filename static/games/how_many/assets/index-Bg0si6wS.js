var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) n(s);
  new MutationObserver((s) => {
    for (const r of s) if (r.type === "childList") for (const a of r.addedNodes) a.tagName === "LINK" && a.rel === "modulepreload" && n(a);
  }).observe(document, { childList: true, subtree: true });
  function e(s) {
    const r = {};
    return s.integrity && (r.integrity = s.integrity), s.referrerPolicy && (r.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? r.credentials = "include" : s.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r;
  }
  function n(s) {
    if (s.ep) return;
    s.ep = true;
    const r = e(s);
    fetch(s.href, r);
  }
})();
const Xo = [{ id: "tiny", label: "Tiny" }, { id: "small", label: "Small" }, { id: "medium", label: "Medium" }, { id: "large", label: "Large" }, { id: "huge", label: "Huge" }, { id: "cosmic", label: "Cosmic" }], Yo = Math.PI, xe = (i) => Yo / 6 * i ** 3, Hn = (i, t) => Yo / 4 * i ** 2 * t, qe = [{ id: "grain_of_sand", name: "Grain of Sand", category: "tiny", dimensions: [1e-3, 1e-3, 1e-3], volume: xe(1e-3), shape: "sphere", icon: "\u{1F3D6}\uFE0F", funFact: "More grains of sand on Earth than stars in the observable universe.", weight_kg: 67e-7, color: "#e8d5a3" }, { id: "grain_of_rice", name: "Grain of Rice", category: "tiny", dimensions: [7e-3, 2e-3, 2e-3], volume: 28e-9, shape: "box", icon: "\u{1F35A}", funFact: "Over half the world's population relies on rice as a staple food.", weight_kg: 3e-5, color: "#f5f0e1" }, { id: "sesame_seed", name: "Sesame Seed", category: "tiny", dimensions: [3e-3, 2e-3, 1e-3], volume: xe(2e-3), shape: "sphere", icon: "\u{1FAD8}", funFact: "Sesame is one of the oldest oilseed crops, domesticated over 3,000 years ago.", weight_kg: 4e-6, color: "#c4a862" }, { id: "ant", name: "Ant", category: "tiny", dimensions: [3e-3, 1e-3, 1e-3], volume: 3e-9, shape: "box", icon: "\u{1F41C}", funFact: "Ants can carry 10\u201350 times their own body weight.", weight_kg: 1e-6, color: "#2d1810" }, { id: "mm_candy", name: "M&M", category: "tiny", dimensions: [0.013, 9e-3, 0.013], volume: xe(0.013), shape: "sphere", icon: "\u{1F36C}", funFact: "M&Ms were created in 1941 so soldiers could enjoy chocolate without it melting.", weight_kg: 9e-4, color: "#e53935" }, { id: "lego_brick", name: "Lego Brick (2\xD74)", category: "tiny", dimensions: [0.032, 0.012, 0.016], volume: 0.032 * 0.012 * 0.016, shape: "box", icon: "\u{1F9F1}", funFact: "There are about 80 Lego bricks per person on Earth.", weight_kg: 23e-4, color: "#f44336" }, { id: "blueberry", name: "Blueberry", category: "tiny", dimensions: [0.015, 0.012, 0.015], volume: xe(0.014), shape: "sphere", icon: "\u{1FAD0}", funFact: "Blueberries are one of the only natural foods that are truly blue.", weight_kg: 15e-4, color: "#3949ab" }, { id: "postage_stamp", name: "Postage Stamp", category: "tiny", dimensions: [0.025, 3e-4, 0.021], volume: 0.025 * 3e-4 * 0.021, shape: "box", icon: "\u{1F4EE}", funFact: "The first adhesive postage stamp, the Penny Black, was issued in 1840.", weight_kg: 1e-3, color: "#1565c0" }, { id: "usb_c", name: "USB-C Connector", category: "tiny", dimensions: [9e-3, 3e-3, 7e-3], volume: 9e-3 * 3e-3 * 7e-3, shape: "box", icon: "\u{1F50C}", funFact: "USB-C can deliver up to 240 watts of power.", weight_kg: 1e-3, color: "#78909c" }, { id: "pill_capsule", name: "Pill Capsule", category: "tiny", dimensions: [7e-3, 0.02, 7e-3], volume: Hn(7e-3, 0.02), shape: "cylinder", icon: "\u{1F48A}", funFact: "The first gelatin capsule was patented in 1834.", weight_kg: 5e-4, color: "#ef5350" }, { id: "penny", name: "Penny", category: "tiny", dimensions: [0.019, 15e-4, 0.019], volume: Hn(0.019, 15e-4), shape: "cylinder", icon: "\u{1FA99}", funFact: "It costs about 2.7 cents to make a single penny.", weight_kg: 25e-4, color: "#bf6830" }, { id: "paperclip", name: "Paperclip", category: "tiny", dimensions: [0.033, 9e-3, 1e-3], volume: 297e-9, shape: "box", icon: "\u{1F4CE}", funFact: "Norwegians wore paperclips on their lapels as a symbol of resistance during WWII.", weight_kg: 1e-3, color: "#b0bec5" }, { id: "sd_card", name: "SD Card", category: "tiny", dimensions: [0.032, 2e-3, 0.024], volume: 0.032 * 2e-3 * 0.024, shape: "box", icon: "\u{1F4BE}", funFact: "A 1TB SD card can hold about 250,000 photos.", weight_kg: 2e-3, color: "#263238" }, { id: "cherry", name: "Cherry", category: "tiny", dimensions: [0.02, 0.02, 0.02], volume: xe(0.02), shape: "sphere", icon: "\u{1F352}", funFact: "There are over 1,000 varieties of cherries in the United States alone.", weight_kg: 8e-3, color: "#c62828" }, { id: "golf_ball", name: "Golf Ball", category: "small", dimensions: [0.043, 0.043, 0.043], volume: xe(0.043), shape: "sphere", icon: "\u26F3", funFact: "A golf ball has 300\u2013500 dimples that help it fly farther.", weight_kg: 0.046, color: "#fafafa" }, { id: "tennis_ball", name: "Tennis Ball", category: "small", dimensions: [0.067, 0.067, 0.067], volume: xe(0.067), shape: "sphere", icon: "\u{1F3BE}", funFact: "Tennis balls are pressurized to about 12 psi inside.", weight_kg: 0.057, color: "#cddc39" }, { id: "rubiks_cube", name: "Rubik's Cube", category: "small", dimensions: [0.057, 0.057, 0.057], volume: 0.057 ** 3, shape: "box", icon: "\u{1F3B2}", funFact: "There are 43 quintillion possible Rubik's Cube configurations.", weight_kg: 0.13, color: "#ff9800" }, { id: "iphone", name: "iPhone", category: "small", dimensions: [0.147, 8e-3, 0.071], volume: 0.147 * 8e-3 * 0.071, shape: "box", icon: "\u{1F4F1}", funFact: "The first iPhone had only 128MB of RAM.", weight_kg: 0.174, color: "#37474f" }, { id: "baseball", name: "Baseball", category: "small", dimensions: [0.074, 0.074, 0.074], volume: xe(0.074), shape: "sphere", icon: "\u26BE", funFact: "A baseball has exactly 108 double stitches.", weight_kg: 0.145, color: "#f5f5f0" }, { id: "coffee_mug", name: "Coffee Mug", category: "small", dimensions: [0.08, 0.095, 0.08], volume: Hn(0.08, 0.095), shape: "cylinder", icon: "\u2615", funFact: "Over 2.25 billion cups of coffee are consumed worldwide every day.", weight_kg: 0.35, color: "#5d4037" }, { id: "banana", name: "Banana", category: "small", dimensions: [0.035, 0.2, 0.035], volume: Hn(0.035, 0.2), shape: "cylinder", icon: "\u{1F34C}", funFact: "Bananas are naturally slightly radioactive due to their potassium content.", weight_kg: 0.12, color: "#fdd835" }, { id: "soda_can", name: "Can of Soda", category: "small", dimensions: [0.066, 0.122, 0.066], volume: Hn(0.066, 0.122), shape: "cylinder", icon: "\u{1F964}", funFact: "Americans consume about 12.4 billion gallons of soda per year.", weight_kg: 0.384, color: "#d32f2f" }, { id: "lightbulb", name: "Lightbulb", category: "small", dimensions: [0.06, 0.11, 0.06], volume: xe(0.06), shape: "sphere", icon: "\u{1F4A1}", funFact: "The longest-burning lightbulb has been on since 1901 in a California fire station.", weight_kg: 0.03, color: "#fff9c4" }, { id: "human_fist", name: "Human Fist", category: "small", dimensions: [0.1, 0.08, 0.07], volume: xe(0.09), shape: "sphere", icon: "\u270A", funFact: "The human hand has 27 bones.", weight_kg: 0.4, color: "#e8b89d" }, { id: "apple", name: "Apple", category: "small", dimensions: [0.08, 0.075, 0.08], volume: xe(0.08), shape: "sphere", icon: "\u{1F34E}", funFact: "There are over 7,500 varieties of apples grown worldwide.", weight_kg: 0.2, color: "#c62828" }, { id: "billiard_ball", name: "Billiard Ball", category: "small", dimensions: [0.057, 0.057, 0.057], volume: xe(0.057), shape: "sphere", icon: "\u{1F3B1}", funFact: "Billiard balls were once made from ivory.", weight_kg: 0.17, color: "#1a237e" }, { id: "computer_mouse", name: "Computer Mouse", category: "small", dimensions: [0.12, 0.04, 0.065], volume: 0.12 * 0.04 * 0.065, shape: "box", icon: "\u{1F5B1}\uFE0F", funFact: "The first computer mouse was made of wood in 1964.", weight_kg: 0.1, color: "#212121" }, { id: "tv_remote", name: "TV Remote", category: "small", dimensions: [0.2, 0.025, 0.05], volume: 0.2 * 0.025 * 0.05, shape: "box", icon: "\u{1F4FA}", funFact: "The average TV remote is pressed 500,000 times in its lifetime.", weight_kg: 0.12, color: "#424242" }, { id: "basketball", name: "Basketball", category: "medium", dimensions: [0.24, 0.24, 0.24], volume: xe(0.24), shape: "sphere", icon: "\u{1F3C0}", funFact: "The first basketball game used a soccer ball and peach baskets.", weight_kg: 0.62, color: "#e65100" }, { id: "watermelon", name: "Watermelon", category: "medium", dimensions: [0.3, 0.25, 0.3], volume: xe(0.28), shape: "sphere", icon: "\u{1F349}", funFact: "Watermelons are 92% water.", weight_kg: 9, color: "#2e7d32" }, { id: "microwave", name: "Microwave", category: "medium", dimensions: [0.5, 0.3, 0.4], volume: 0.06, shape: "box", icon: "\u{1F4E1}", funFact: "Microwaves were accidentally invented when a radar engineer's chocolate bar melted.", weight_kg: 13, color: "#546e7a" }, { id: "pc_tower", name: "Desktop PC Tower", category: "medium", dimensions: [0.2, 0.45, 0.45], volume: 0.0405, shape: "box", icon: "\u{1F5A5}\uFE0F", funFact: "The first personal computer weighed 55 pounds.", weight_kg: 10, color: "#212121" }, { id: "car_tire", name: "Car Tire", category: "medium", dimensions: [0.65, 0.2, 0.65], volume: Hn(0.65, 0.2), shape: "cylinder", icon: "\u{1F6DE}", funFact: "About 1 billion tires are produced globally each year.", weight_kg: 10, color: "#263238" }, { id: "suitcase", name: "Suitcase", category: "medium", dimensions: [0.7, 0.45, 0.25], volume: 0.07875, shape: "box", icon: "\u{1F9F3}", funFact: "Wheeled suitcases weren't invented until 1970.", weight_kg: 4, color: "#1565c0" }, { id: "guitar", name: "Guitar", category: "medium", dimensions: [0.37, 1, 0.12], volume: 0.0444, shape: "box", icon: "\u{1F3B8}", funFact: "The world's largest playable guitar is 13 meters long.", weight_kg: 2.5, color: "#6d4c41" }, { id: "office_chair", name: "Office Chair", category: "medium", dimensions: [0.65, 1.1, 0.65], volume: 0.46, shape: "box", icon: "\u{1FA91}", funFact: "Charles Darwin is credited with adding wheels to his office chair.", weight_kg: 15, color: "#37474f" }, { id: "mini_fridge", name: "Mini-Fridge", category: "medium", dimensions: [0.5, 0.5, 0.45], volume: 0.1125, shape: "box", icon: "\u{1F9CA}", funFact: "Mini-fridges use about 100 kWh of electricity per year.", weight_kg: 20, color: "#e0e0e0" }, { id: "bathtub", name: "Bathtub", category: "medium", dimensions: [1.5, 0.55, 0.7], volume: 0.5775, shape: "box", icon: "\u{1F6C1}", funFact: "The average bathtub holds about 300 liters of water.", weight_kg: 80, color: "#eceff1" }, { id: "dishwasher", name: "Dishwasher", category: "medium", dimensions: [0.6, 0.85, 0.6], volume: 0.306, shape: "box", icon: "\u{1F37D}\uFE0F", funFact: "The first dishwasher was patented by Josephine Cochrane in 1886.", weight_kg: 50, color: "#90a4ae" }, { id: "vending_machine", name: "Vending Machine", category: "medium", dimensions: [0.9, 1.83, 0.8], volume: 1.32, shape: "box", icon: "\u{1F3E7}", funFact: "Japan has about 5 million vending machines \u2014 one for every 23 people.", weight_kg: 200, color: "#b71c1c" }, { id: "park_bench", name: "Park Bench", category: "medium", dimensions: [1.5, 0.8, 0.6], volume: 0.72, shape: "box", icon: "\u{1FA91}", funFact: "Central Park has over 9,000 benches.", weight_kg: 60, color: "#4e342e" }, { id: "sedan", name: "Car (Sedan)", category: "large", dimensions: [4.5, 1.5, 1.8], volume: 8, shape: "box", icon: "\u{1F697}", funFact: "The average car has about 30,000 parts.", weight_kg: 1400, color: "#1565c0" }, { id: "grand_piano", name: "Grand Piano", category: "large", dimensions: [1.5, 1, 2.2], volume: 3.3, shape: "box", icon: "\u{1F3B9}", funFact: "A concert grand piano has about 12,000 individual parts.", weight_kg: 480, color: "#1a1a1a" }, { id: "elephant", name: "African Elephant", category: "large", dimensions: [3.5, 3.3, 6], volume: 5.5, shape: "box", icon: "\u{1F418}", funFact: "Elephants can't jump, but they can swim for up to 6 hours.", weight_kg: 5e3, color: "#78909c" }, { id: "hot_tub", name: "Hot Tub", category: "large", dimensions: [2.1, 0.9, 2.1], volume: 1.6, shape: "cylinder", icon: "\u2668\uFE0F", funFact: "The ancient Romans built public hot baths that could hold thousands.", weight_kg: 300, color: "#4fc3f7" }, { id: "shipping_container", name: "Shipping Container (20ft)", category: "large", dimensions: [6.06, 2.59, 2.44], volume: 33.2, shape: "box", icon: "\u{1F4E6}", funFact: "About 97% of all shipping containers are made in China.", weight_kg: 2300, color: "#ff6f00" }, { id: "school_bus", name: "School Bus", category: "large", dimensions: [10.7, 2.7, 2.4], volume: 41, shape: "box", icon: "\u{1F68C}", funFact: "About 480,000 school buses carry 26 million kids to school daily in the US.", weight_kg: 1e4, color: "#ffc107" }, { id: "t_rex", name: "T-Rex", category: "large", dimensions: [12, 3.7, 2], volume: 7, shape: "box", icon: "\u{1F996}", funFact: "T-Rex had a bite force of 12,800 pounds \u2014 enough to crush a car.", weight_kg: 7e3, color: "#5d4037" }, { id: "blue_whale", name: "Blue Whale", category: "large", dimensions: [30, 5, 6], volume: 100, shape: "cylinder", icon: "\u{1F40B}", funFact: "A blue whale's heart is the size of a small car.", weight_kg: 14e4, color: "#1565c0" }, { id: "studio_apartment", name: "Studio Apartment", category: "large", dimensions: [6.3, 2.7, 6.3], volume: 107, shape: "box", icon: "\u{1F3E0}", funFact: "The average studio apartment in Manhattan costs over $2,800/month.", weight_kg: 0, color: "#8d6e63" }, { id: "basketball_court", name: "Basketball Court", category: "large", dimensions: [28.65, 7, 15.24], volume: 3056, shape: "box", icon: "\u{1F3DF}\uFE0F", funFact: "An NBA basketball court is exactly 94 feet long.", weight_kg: 0, color: "#e65100" }, { id: "boeing_747", name: "Boeing 747", category: "large", dimensions: [70.7, 19.4, 64.4], volume: 876, shape: "cylinder", icon: "\u2708\uFE0F", funFact: "A 747 has 6 million parts, and half of them are fasteners.", weight_kg: 178756, color: "#e0e0e0" }, { id: "fire_truck", name: "Fire Truck", category: "large", dimensions: [10.5, 3.2, 2.5], volume: 50, shape: "box", icon: "\u{1F692}", funFact: "Fire trucks carry between 500 and 3,000 gallons of water.", weight_kg: 19e3, color: "#c62828" }, { id: "tiny_house", name: "Tiny House", category: "large", dimensions: [7.3, 3.7, 2.6], volume: 60, shape: "box", icon: "\u{1F3E1}", funFact: "The tiny house movement started in the US in the late 1990s.", weight_kg: 4500, color: "#795548" }, { id: "olympic_pool", name: "Olympic Swimming Pool", category: "huge", dimensions: [50, 2, 25], volume: 2500, shape: "box", icon: "\u{1F3CA}", funFact: "An Olympic pool holds 2.5 million liters (660,000 gallons) of water.", weight_kg: 25e5, color: "#0288d1" }, { id: "football_field", name: "Football Field", category: "huge", dimensions: [109.7, 10, 48.8], volume: 53534, shape: "box", icon: "\u{1F3C8}", funFact: "An NFL football field is exactly 100 yards long (plus two 10-yard end zones).", weight_kg: 0, color: "#2e7d32" }, { id: "statue_of_liberty", name: "Statue of Liberty", category: "huge", dimensions: [15, 93, 15], volume: 6540, shape: "cylinder", icon: "\u{1F5FD}", funFact: "Lady Liberty's nose is 4.5 feet long.", weight_kg: 204e3, color: "#4db6ac" }, { id: "great_pyramid", name: "Great Pyramid of Giza", category: "huge", dimensions: [230, 146, 230], volume: 2583283, shape: "box", icon: "\u{1F53A}", funFact: "The Great Pyramid was the tallest structure on Earth for 3,800 years.", weight_kg: 6e9, color: "#d4a843" }, { id: "titanic", name: "Titanic", category: "huge", dimensions: [269, 53, 28], volume: 131936, shape: "box", icon: "\u{1F6A2}", funFact: "The Titanic used 600 tons of coal per day.", weight_kg: 52e6, color: "#37474f" }, { id: "aircraft_carrier", name: "Aircraft Carrier", category: "huge", dimensions: [333, 77, 41], volume: 4e5, shape: "box", icon: "\u2693", funFact: "A Nimitz-class carrier carries enough food for 18,000 meals per day.", weight_kg: 1e8, color: "#455a64" }, { id: "iss", name: "International Space Station", category: "huge", dimensions: [108, 20, 73], volume: 916, shape: "box", icon: "\u{1F6F8}", funFact: "The ISS has been continuously inhabited since November 2000.", weight_kg: 42e4, color: "#b0bec5" }, { id: "central_park", name: "Central Park", category: "huge", dimensions: [4e3, 10, 800], volume: 32e6, shape: "box", icon: "\u{1F333}", funFact: "Central Park is visited by over 42 million people annually.", weight_kg: 0, color: "#388e3c" }, { id: "burj_khalifa", name: "Burj Khalifa", category: "huge", dimensions: [60, 828, 60], volume: 47e4, shape: "box", icon: "\u{1F3D9}\uFE0F", funFact: "The Burj Khalifa is so tall, you can watch two sunsets in one day from different floors.", weight_kg: 5e8, color: "#78909c" }, { id: "colosseum", name: "Colosseum", category: "huge", dimensions: [189, 48, 156], volume: 13e5, shape: "cylinder", icon: "\u{1F3DB}\uFE0F", funFact: "The Colosseum could hold 50,000\u201380,000 spectators.", weight_kg: 0, color: "#a1887f" }, { id: "empire_state", name: "Empire State Building", category: "huge", dimensions: [57, 443, 129], volume: 104e4, shape: "box", icon: "\u{1F3E2}", funFact: "The Empire State Building has its own zip code: 10118.", weight_kg: 331e6, color: "#9e9e9e" }, { id: "walmart", name: "Walmart Supercenter", category: "huge", dimensions: [180, 7, 100], volume: 126e3, shape: "box", icon: "\u{1F6D2}", funFact: "Walmart serves about 230 million customers per week.", weight_kg: 0, color: "#1565c0" }, { id: "moon", name: "The Moon", category: "cosmic", dimensions: [3474e3, 3474e3, 3474e3], volume: 21958e15, shape: "sphere", icon: "\u{1F319}", funFact: "The Moon is slowly drifting away from Earth at 3.8 cm per year.", weight_kg: 735e20, color: "#bdbdbd" }, { id: "mars", name: "Mars", category: "cosmic", dimensions: [6779e3, 6779e3, 6779e3], volume: 16318e16, shape: "sphere", icon: "\u{1F534}", funFact: "A day on Mars is only 37 minutes longer than a day on Earth.", weight_kg: 639e21, color: "#bf360c" }, { id: "earth", name: "Earth", category: "cosmic", dimensions: [12742e3, 12742e3, 12742e3], volume: 108321e16, shape: "sphere", icon: "\u{1F30D}", funFact: "Earth is the only planet not named after a Greek or Roman god.", weight_kg: 597e22, color: "#1565c0" }, { id: "jupiter", name: "Jupiter", category: "cosmic", dimensions: [13982e4, 13982e4, 13982e4], volume: 14313e20, shape: "sphere", icon: "\u{1F7E4}", funFact: "Jupiter's Great Red Spot is a storm bigger than Earth that has lasted 350+ years.", weight_kg: 1898e24, color: "#bf6830" }, { id: "saturn", name: "Saturn", category: "cosmic", dimensions: [11646e4, 11646e4, 11646e4], volume: 82713e19, shape: "sphere", icon: "\u{1FA90}", funFact: "Saturn is so light it would float in water (if you found a big enough bathtub).", weight_kg: 5683e23, color: "#d4a843" }, { id: "sun", name: "The Sun", category: "cosmic", dimensions: [13927e5, 13927e5, 13927e5], volume: 1412e24, shape: "sphere", icon: "\u2600\uFE0F", funFact: "The Sun accounts for 99.86% of all mass in our solar system.", weight_kg: 1989e27, color: "#ffab00" }, { id: "solar_system", name: "Solar System", category: "cosmic", dimensions: [9e12, 9e12, 9e12], volume: 381e36, shape: "sphere", icon: "\u{1F30C}", funFact: "Light from the Sun takes about 4.5 hours to reach Neptune.", weight_kg: 2e30, color: "#311b92" }, { id: "light_year_cube", name: "Light-Year Cube", category: "cosmic", dimensions: [9461e12, 9461e12, 9461e12], volume: 8468e44, shape: "box", icon: "\u2728", funFact: "A light-year is about 9.46 trillion kilometers.", weight_kg: 0, color: "#e8eaf6" }];
function fr(i) {
  return qe.find((t) => t.id === i);
}
function Pa(i) {
  const t = i.toLowerCase().trim();
  return t ? qe.filter((e) => e.name.toLowerCase().includes(t) || e.category.includes(t) || e.id.includes(t)) : qe;
}
function Ul(i, t) {
  let e;
  return i === "sphere" && t === "box" ? e = 0.64 : i === "box" && t === "box" ? e = 1 : i === "cylinder" && t === "box" ? e = 0.785 : i === "sphere" && t === "sphere" || i === "box" && t === "sphere" ? e = 0.64 : i === "cylinder" && t === "sphere" ? e = 0.6 : i === "box" && t === "cylinder" ? e = 0.785 : i === "sphere" && t === "cylinder" ? e = 0.6 : i === "cylinder" && t === "cylinder" ? e = 0.785 : e = 0.64, t === "sphere" && (e *= 0.85), e;
}
function Nl(i, t) {
  const [e, n, s] = i.dimensions, [r, a, o] = t.dimensions;
  return Math.floor(r / e) * Math.floor(a / n) * Math.floor(o / s);
}
function na(i, t) {
  const e = t.volume / i.volume;
  if (t.volume <= i.volume) return { count: 0, packingEfficiency: 0, gridFit: null, small: i, large: t, tooSmall: true, sizeRatio: e };
  const n = Ul(i.shape, t.shape);
  let s = Math.floor(t.volume * n / i.volume), r = null;
  return i.shape === "box" && t.shape === "box" && (r = Nl(i, t), s = Math.min(s, r)), { count: Math.max(0, s), packingEfficiency: n, gridFit: r, small: i, large: t, tooSmall: false, sizeRatio: e };
}
function qo(i) {
  const [t, e, n] = i.dimensions, s = (r) => r >= 946e13 ? `${(r / 9461e12).toFixed(1)} ly` : r >= 1e12 ? `${(r / 1e9).toFixed(0)}B km` : r >= 1e9 ? `${(r / 1e6).toLocaleString("en-US", { maximumFractionDigits: 0 })} km` : r >= 1e3 ? `${(r / 1e3).toLocaleString("en-US", { maximumFractionDigits: 1 })} km` : r >= 1 ? `${r.toFixed(2)} m` : r >= 0.01 ? `${(r * 100).toFixed(1)} cm` : r >= 1e-3 ? `${(r * 1e3).toFixed(1)} mm` : `${(r * 1e6).toFixed(0)} \u03BCm`;
  return `${s(t)} \xD7 ${s(e)} \xD7 ${s(n)}`;
}
function Ii(i, t, e, n) {
  i.innerHTML = "";
  const s = /* @__PURE__ */ new Map();
  for (const r of t) {
    const a = s.get(r.category) ?? [];
    a.push(r), s.set(r.category, a);
  }
  for (const r of Xo) {
    const a = s.get(r.id);
    if (!a || a.length === 0) continue;
    const o = document.createElement("div");
    o.className = "category-header", o.textContent = r.label, i.appendChild(o);
    for (const l of a) {
      const c = document.createElement("div");
      c.className = "object-item" + ((e == null ? void 0 : e.id) === l.id ? " selected" : ""), c.innerHTML = `
        <span class="object-icon">${l.icon}</span>
        <div class="object-info">
          <div class="object-name">${l.name}</div>
          <div class="object-dims">${qo(l)}</div>
        </div>
      `, c.addEventListener("click", () => n(l)), i.appendChild(c);
    }
  }
}
function Es(i, t) {
  if (!t) {
    i.style.display = "none";
    return;
  }
  i.style.display = "flex", i.innerHTML = `
    <span class="preview-icon">${t.icon}</span>
    <div class="preview-details">
      <h3>${t.name}</h3>
      <p>${qo(t)}</p>
      <p class="preview-fun-fact">${t.funFact}</p>
    </div>
  `;
}
function Da(i, t, e, n) {
  const s = document.createElement("div");
  s.className = "selection-card";
  const r = document.createElement("div");
  r.className = "card-label", r.textContent = i, s.appendChild(r);
  const a = document.createElement("input");
  a.className = "card-search", a.type = "text", a.placeholder = t, s.appendChild(a);
  const o = document.createElement("div");
  o.className = "object-grid", s.appendChild(o);
  const l = document.createElement("div");
  l.className = "card-preview", l.style.display = "none", s.appendChild(l);
  const c = { selected: e ? fr(e) ?? null : null, searchEl: a, gridEl: o, previewEl: l, onSelect: () => {
  } }, h = (f) => {
    c.selected = f, Ii(o, Pa(a.value), c.selected, h), Es(l, f), n(f);
  };
  return c.onSelect = h, a.addEventListener("input", () => {
    const f = Pa(a.value);
    Ii(o, f, c.selected, h);
  }), Ii(o, qe, c.selected, h), Es(l, c.selected), { el: s, state: c };
}
function Fl(i, t) {
  const e = document.createElement("div");
  e.className = "landing";
  const n = document.createElement("h1");
  n.className = "landing-title", n.textContent = "How Many?", e.appendChild(n);
  const s = document.createElement("p");
  s.className = "landing-subtitle", s.textContent = "Pick two objects and see how many of the smaller one fit inside the larger one.", e.appendChild(s);
  const r = document.createElement("div");
  r.className = "cards-row";
  let a = null, o = null;
  const l = () => {
    d.disabled = !(a && o);
  }, c = Da("How many...", "Search objects...", "golf_ball", (v) => {
    a = v, l();
  });
  a = c.state.selected;
  const h = Da("...fit in a...", "Search objects...", "boeing_747", (v) => {
    o = v, l();
  });
  o = h.state.selected, r.appendChild(c.el), r.appendChild(h.el), e.appendChild(r);
  const f = document.createElement("div");
  f.className = "landing-controls";
  const d = document.createElement("button");
  d.className = "btn-calculate", d.textContent = "Calculate!", d.disabled = !(a && o), d.addEventListener("click", () => {
    a && o && t.onCalculate(a, o);
  }), f.appendChild(d);
  const m = document.createElement("button");
  return m.className = "btn-surprise", m.textContent = "\u{1F3B2} Surprise Me", m.addEventListener("click", t.onSurprise), f.appendChild(m), e.appendChild(f), i.appendChild(e), { el: e, getSmall: () => a, getLarge: () => o, setSelections: (v, p) => {
    const u = fr(v), T = fr(p);
    u && (a = u, c.state.selected = u, Ii(c.state.gridEl, qe, u, c.state.onSelect), Es(c.state.previewEl, u)), T && (o = T, h.state.selected = T, Ii(h.state.gridEl, qe, T, h.state.onSelect), Es(h.state.previewEl, T)), l();
  } };
}
const Ol = [{ value: 600, label: "a small village" }, { value: 5e3, label: "a small town" }, { value: 36e3, label: "the city of Monaco" }, { value: 37e4, label: "the population of Iceland" }, { value: 58e4, label: "the population of Wyoming" }, { value: 87e4, label: "the population of San Francisco" }, { value: 5e6, label: "the population of New Zealand" }, { value: 88e5, label: "the population of Switzerland" }, { value: 14e6, label: "the population of Tokyo" }, { value: 28e6, label: "the population of Shanghai" }, { value: 67e6, label: "the population of France" }, { value: 331e6, label: "the population of the USA" }, { value: 14e8, label: "the population of India" }, { value: 8e9, label: "every person on Earth" }], Bl = [{ value: 1.7, label: "an average person" }, { value: 8.84, label: "a three-story building" }, { value: 93, label: "the Statue of Liberty" }, { value: 330, label: "the Eiffel Tower" }, { value: 443, label: "the Empire State Building" }, { value: 828, label: "the Burj Khalifa" }, { value: 8849, label: "Mount Everest" }, { value: 12e3, label: "cruising altitude of a jet" }, { value: 1e5, label: "the edge of space" }, { value: 3844e5, label: "the distance to the Moon" }, { value: 1496e8, label: "the distance to the Sun" }], zl = [{ value: 400, label: "an athletics track" }, { value: 42195, label: "a marathon" }, { value: 3944e3, label: "New York to Los Angeles" }, { value: 8849e3, label: "the width of the USA" }, { value: 40075e3, label: "around the Earth" }, { value: 3844e5, label: "here to the Moon" }, { value: 1496e8, label: "here to the Sun" }], kl = [{ value: 1e-3, label: "a paperclip" }, { value: 0.045, label: "a golf ball" }, { value: 0.15, label: "a baseball" }, { value: 1, label: "a liter of water" }, { value: 6.4, label: "a bowling ball" }, { value: 70, label: "an adult human" }, { value: 500, label: "a horse" }, { value: 1400, label: "a car" }, { value: 5e3, label: "an elephant" }, { value: 14e4, label: "a blue whale" }, { value: 735e3, label: "the International Space Station" }, { value: 52e6, label: "the Titanic" }, { value: 6e9, label: "the Great Pyramid of Giza" }];
function Hi(i, t) {
  if (i.length === 0) return null;
  let e = i[0], n = Math.abs(Math.log(t / e.value));
  for (const s of i) {
    const r = Math.abs(Math.log(t / s.value));
    r < n && (e = s, n = r);
  }
  return e;
}
function Ae(i) {
  return i >= 1e15 ? i.toExponential(1) : i >= 1e9 ? (i / 1e9).toFixed(1).replace(/\.0$/, "") + " billion" : i >= 1e6 ? (i / 1e6).toFixed(1).replace(/\.0$/, "") + " million" : i >= 1e4 ? i.toLocaleString("en-US", { maximumFractionDigits: 0 }) : i >= 100 ? i.toLocaleString("en-US", { maximumFractionDigits: 0 }) : i >= 1 ? i.toFixed(1).replace(/\.0$/, "") : i >= 0.01 ? i.toFixed(2) : i.toExponential(1);
}
function Hl(i) {
  if (i < 60) return `${Math.round(i)} seconds`;
  if (i < 3600) return `${(i / 60).toFixed(1)} minutes`;
  if (i < 86400) return `${(i / 3600).toFixed(1)} hours`;
  if (i < 604800) return `${(i / 86400).toFixed(1)} days`;
  if (i < 31536e3) return `${(i / 604800).toFixed(1)} weeks`;
  const t = i / 31536e3;
  return t < 100 ? `${t.toFixed(1)} years` : t < 1e3 ? `${Math.round(t)} years` : `${Ae(t)} years`;
}
function La(i) {
  const { count: t, small: e, large: n } = i, s = [];
  if (t <= 0) return s;
  const r = Hi(Ol, t);
  if (r) {
    const h = t / r.value;
    h > 0.5 && h < 2 ? s.push(`That's roughly ${r.label}.`) : h >= 2 && s.push(`That's about ${Ae(h)}\xD7 ${r.label}.`);
  }
  const a = t;
  s.push(`At 1 per second, counting them would take ${Hl(a)}.`);
  const o = Math.min(...e.dimensions);
  if (o > 0) {
    const h = t * o, f = Hi(Bl, h);
    if (f) {
      const d = h / f.value;
      d > 0.3 && s.push(`Stacked up, they'd reach ${Ae(h)}m \u2014 ${Ae(d)}\xD7 the height of ${f.label}.`);
    }
  }
  const l = Math.max(...e.dimensions);
  if (l > 0) {
    const h = t * l, f = Hi(zl, h);
    if (f) {
      const d = h / f.value;
      d > 0.3 && s.push(`Laid end to end, they'd stretch ${Ae(h)}m \u2014 ${Ae(d)}\xD7 ${f.label}.`);
    }
  }
  if (e.weight_kg > 0) {
    const h = t * e.weight_kg, f = Hi(kl, h);
    if (f) {
      const d = h / f.value;
      d > 0.5 && d < 2 ? s.push(`Total weight: ${Ae(h)} kg \u2014 about the same as ${f.label}.`) : d >= 2 && s.push(`Total weight: ${Ae(h)} kg \u2014 ${Ae(d)}\xD7 ${f.label}.`);
    }
  }
  const c = 2500;
  if (t * e.volume > c * 0.1) {
    const h = t * e.volume / c;
    s.push(`That's enough ${e.name}s to fill ${Ae(h)} Olympic swimming pools.`);
  }
  return s.slice(0, 4);
}
function Gl(i) {
  const t = i.large.volume / i.small.volume;
  return t <= 0 ? `The ${i.small.name} is infinitely larger! Not even close.` : `Not even close! The ${i.small.name} is ${Ae(1 / t)}\xD7 bigger than the ${i.large.name}.`;
}
class Vl {
  constructor(t, e = 2500) {
    __publicField(this, "container");
    __publicField(this, "digitEls", []);
    __publicField(this, "targetValue", 0);
    __publicField(this, "animFrameId", 0);
    __publicField(this, "startTime", 0);
    __publicField(this, "duration");
    __publicField(this, "isLargeNumber", false);
    __publicField(this, "tick", () => {
      const t = Date.now() - this.startTime, e = Math.min(t / this.duration, 1), n = this.easeOutExpo(e);
      this.setDigitsByValue(n * this.targetValue), e < 1 && (this.animFrameId = requestAnimationFrame(this.tick));
    });
    this.container = t, this.duration = e, this.container.classList.add("odometer");
  }
  buildDigits(t) {
    this.container.innerHTML = "", this.digitEls = [];
    for (const e of t) if (e >= "0" && e <= "9") {
      const n = document.createElement("span");
      n.className = "odometer-digit";
      const s = document.createElement("span");
      s.className = "odometer-column";
      for (let r = 0; r <= 9; r++) {
        const a = document.createElement("span");
        a.className = "odometer-cell", a.textContent = String(r), s.appendChild(a);
      }
      n.appendChild(s), this.container.appendChild(n), this.digitEls.push(s);
    } else {
      const n = document.createElement("span");
      n.className = "odometer-sep", n.textContent = e, this.container.appendChild(n);
    }
  }
  formatDisplay(t) {
    return t >= 1e15 ? t.toExponential(2) : t.toLocaleString("en-US", { maximumFractionDigits: 0 });
  }
  easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }
  setDigitsByValue(t) {
    const e = this.digitEls.length, n = Math.round(t).toString().padStart(e, "0");
    for (let s = 0; s < e; s++) {
      const r = parseInt(n[s], 10) || 0;
      this.digitEls[s].style.transform = `translateY(-${r * 10}%)`;
    }
  }
  animateTo(t) {
    cancelAnimationFrame(this.animFrameId), this.targetValue = t, this.isLargeNumber = t >= 1e15;
    const e = this.formatDisplay(t);
    if (this.buildDigits(e), this.isLargeNumber) {
      const n = [];
      for (const r of e) r >= "0" && r <= "9" && n.push(parseInt(r, 10));
      for (const r of this.digitEls) r.style.transition = "none", r.style.transform = "translateY(0%)";
      this.container.offsetHeight;
      const s = Math.min(80, this.duration / (this.digitEls.length + 1));
      for (let r = 0; r < this.digitEls.length; r++) {
        const a = n[r] ?? 0;
        this.digitEls[r].style.transition = `transform ${this.duration}ms cubic-bezier(0.23, 1, 0.32, 1) ${r * s}ms`, this.digitEls[r].style.transform = `translateY(-${a * 10}%)`;
      }
    } else {
      for (const n of this.digitEls) n.style.transition = "none";
      this.setDigitsByValue(0), this.startTime = Date.now(), this.animFrameId = requestAnimationFrame(this.tick);
    }
  }
  setImmediate(t) {
    cancelAnimationFrame(this.animFrameId), this.targetValue = t;
    const e = this.formatDisplay(t);
    this.buildDigits(e);
    const n = [];
    for (const s of e) s >= "0" && s <= "9" && n.push(parseInt(s, 10));
    for (let s = 0; s < this.digitEls.length; s++) {
      const r = n[s] ?? 0;
      this.digitEls[s].style.transition = "none", this.digitEls[s].style.transform = `translateY(-${r * 10}%)`;
    }
  }
  destroy() {
    cancelAnimationFrame(this.animFrameId), this.container.innerHTML = "";
  }
}
/**
* @license
* Copyright 2010-2024 Three.js Authors
* SPDX-License-Identifier: MIT
*/
const ia = "170", ri = { ROTATE: 0, DOLLY: 1, PAN: 2 }, ii = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 }, Wl = 0, Ia = 1, Xl = 2, $o = 1, Yl = 2, nn = 3, Mn = 0, ye = 1, sn = 2, vn = 0, ai = 1, Ua = 2, Na = 3, Fa = 4, ql = 5, Pn = 100, $l = 101, jl = 102, Zl = 103, Kl = 104, Jl = 200, Ql = 201, tc = 202, ec = 203, pr = 204, mr = 205, nc = 206, ic = 207, sc = 208, rc = 209, ac = 210, oc = 211, lc = 212, cc = 213, hc = 214, gr = 0, _r = 1, vr = 2, ci = 3, xr = 4, Mr = 5, Sr = 6, yr = 7, jo = 0, uc = 1, dc = 2, xn = 0, fc = 1, pc = 2, mc = 3, Zo = 4, gc = 5, _c = 6, vc = 7, Ko = 300, hi = 301, ui = 302, Er = 303, br = 304, Cs = 306, Tr = 1e3, Ln = 1001, Ar = 1002, Ce = 1003, xc = 1004, Gi = 1005, Xe = 1006, Is = 1007, In = 1008, on = 1009, Jo = 1010, Qo = 1011, Fi = 1012, sa = 1013, Un = 1014, Ye = 1015, Oi = 1016, ra = 1017, aa = 1018, di = 1020, tl = 35902, el = 1021, nl = 1022, ke = 1023, il = 1024, sl = 1025, oi = 1026, fi = 1027, oa = 1028, la = 1029, rl = 1030, ca = 1031, ha = 1033, _s = 33776, vs = 33777, xs = 33778, Ms = 33779, wr = 35840, Cr = 35841, Rr = 35842, Pr = 35843, Dr = 36196, Lr = 37492, Ir = 37496, Ur = 37808, Nr = 37809, Fr = 37810, Or = 37811, Br = 37812, zr = 37813, kr = 37814, Hr = 37815, Gr = 37816, Vr = 37817, Wr = 37818, Xr = 37819, Yr = 37820, qr = 37821, Ss = 36492, $r = 36494, jr = 36495, al = 36283, Zr = 36284, Kr = 36285, Jr = 36286, Mc = 3200, Sc = 3201, ol = 0, yc = 1, _n = "", Le = "srgb", mi = "srgb-linear", Rs = "linear", qt = "srgb", Gn = 7680, Oa = 519, Ec = 512, bc = 513, Tc = 514, ll = 515, Ac = 516, wc = 517, Cc = 518, Rc = 519, Ba = 35044, za = "300 es", rn = 2e3, bs = 2001;
class Bn {
  addEventListener(t, e) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[t] === void 0 && (n[t] = []), n[t].indexOf(e) === -1 && n[t].push(e);
  }
  hasEventListener(t, e) {
    if (this._listeners === void 0) return false;
    const n = this._listeners;
    return n[t] !== void 0 && n[t].indexOf(e) !== -1;
  }
  removeEventListener(t, e) {
    if (this._listeners === void 0) return;
    const s = this._listeners[t];
    if (s !== void 0) {
      const r = s.indexOf(e);
      r !== -1 && s.splice(r, 1);
    }
  }
  dispatchEvent(t) {
    if (this._listeners === void 0) return;
    const n = this._listeners[t.type];
    if (n !== void 0) {
      t.target = this;
      const s = n.slice(0);
      for (let r = 0, a = s.length; r < a; r++) s[r].call(this, t);
      t.target = null;
    }
  }
}
const de = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], Ui = Math.PI / 180, Qr = 180 / Math.PI;
function Bi() {
  const i = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (de[i & 255] + de[i >> 8 & 255] + de[i >> 16 & 255] + de[i >> 24 & 255] + "-" + de[t & 255] + de[t >> 8 & 255] + "-" + de[t >> 16 & 15 | 64] + de[t >> 24 & 255] + "-" + de[e & 63 | 128] + de[e >> 8 & 255] + "-" + de[e >> 16 & 255] + de[e >> 24 & 255] + de[n & 255] + de[n >> 8 & 255] + de[n >> 16 & 255] + de[n >> 24 & 255]).toLowerCase();
}
function ge(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function Pc(i, t) {
  return (i % t + t) % t;
}
function Us(i, t, e) {
  return (1 - e) * i + e * t;
}
function Si(i, t) {
  switch (t.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function Me(i, t) {
  switch (t.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
const Dc = { DEG2RAD: Ui };
class At {
  constructor(t = 0, e = 0) {
    At.prototype.isVector2 = true, this.x = t, this.y = e;
  }
  get width() {
    return this.x;
  }
  set width(t) {
    this.x = t;
  }
  get height() {
    return this.y;
  }
  set height(t) {
    this.y = t;
  }
  set(t, e) {
    return this.x = t, this.y = e, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this;
  }
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this;
  }
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this;
  }
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  applyMatrix3(t) {
    const e = this.x, n = this.y, s = t.elements;
    return this.x = s[0] * e + s[3] * n + s[6], this.y = s[1] * e + s[4] * n + s[7], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this;
  }
  clamp(t, e) {
    return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this;
  }
  clampScalar(t, e) {
    return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(ge(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x, n = this.y - t.y;
    return e * e + n * n;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this;
  }
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t;
  }
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this;
  }
  rotateAround(t, e) {
    const n = Math.cos(e), s = Math.sin(e), r = this.x - t.x, a = this.y - t.y;
    return this.x = r * n - a * s + t.x, this.y = r * s + a * n + t.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Pt {
  constructor(t, e, n, s, r, a, o, l, c) {
    Pt.prototype.isMatrix3 = true, this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], t !== void 0 && this.set(t, e, n, s, r, a, o, l, c);
  }
  set(t, e, n, s, r, a, o, l, c) {
    const h = this.elements;
    return h[0] = t, h[1] = s, h[2] = o, h[3] = e, h[4] = r, h[5] = l, h[6] = n, h[7] = a, h[8] = c, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
  }
  copy(t) {
    const e = this.elements, n = t.elements;
    return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], this;
  }
  extractBasis(t, e, n) {
    return t.setFromMatrix3Column(this, 0), e.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(t) {
    const e = t.elements;
    return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements, s = e.elements, r = this.elements, a = n[0], o = n[3], l = n[6], c = n[1], h = n[4], f = n[7], d = n[2], m = n[5], g = n[8], v = s[0], p = s[3], u = s[6], T = s[1], b = s[4], S = s[7], N = s[2], w = s[5], A = s[8];
    return r[0] = a * v + o * T + l * N, r[3] = a * p + o * b + l * w, r[6] = a * u + o * S + l * A, r[1] = c * v + h * T + f * N, r[4] = c * p + h * b + f * w, r[7] = c * u + h * S + f * A, r[2] = d * v + m * T + g * N, r[5] = d * p + m * b + g * w, r[8] = d * u + m * S + g * A, this;
  }
  multiplyScalar(t) {
    const e = this.elements;
    return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this;
  }
  determinant() {
    const t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8];
    return e * a * h - e * o * c - n * r * h + n * o * l + s * r * c - s * a * l;
  }
  invert() {
    const t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8], f = h * a - o * c, d = o * l - h * r, m = c * r - a * l, g = e * f + n * d + s * m;
    if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const v = 1 / g;
    return t[0] = f * v, t[1] = (s * c - h * n) * v, t[2] = (o * n - s * a) * v, t[3] = d * v, t[4] = (h * e - s * l) * v, t[5] = (s * r - o * e) * v, t[6] = m * v, t[7] = (n * l - c * e) * v, t[8] = (a * e - n * r) * v, this;
  }
  transpose() {
    let t;
    const e = this.elements;
    return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this;
  }
  getNormalMatrix(t) {
    return this.setFromMatrix4(t).invert().transpose();
  }
  transposeIntoArray(t) {
    const e = this.elements;
    return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this;
  }
  setUvTransform(t, e, n, s, r, a, o) {
    const l = Math.cos(r), c = Math.sin(r);
    return this.set(n * l, n * c, -n * (l * a + c * o) + a + t, -s * c, s * l, -s * (-c * a + l * o) + o + e, 0, 0, 1), this;
  }
  scale(t, e) {
    return this.premultiply(Ns.makeScale(t, e)), this;
  }
  rotate(t) {
    return this.premultiply(Ns.makeRotation(-t)), this;
  }
  translate(t, e) {
    return this.premultiply(Ns.makeTranslation(t, e)), this;
  }
  makeTranslation(t, e) {
    return t.isVector2 ? this.set(1, 0, t.x, 0, 1, t.y, 0, 0, 1) : this.set(1, 0, t, 0, 1, e, 0, 0, 1), this;
  }
  makeRotation(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(e, -n, 0, n, e, 0, 0, 0, 1), this;
  }
  makeScale(t, e) {
    return this.set(t, 0, 0, 0, e, 0, 0, 0, 1), this;
  }
  equals(t) {
    const e = this.elements, n = t.elements;
    for (let s = 0; s < 9; s++) if (e[s] !== n[s]) return false;
    return true;
  }
  fromArray(t, e = 0) {
    for (let n = 0; n < 9; n++) this.elements[n] = t[n + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const n = this.elements;
    return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const Ns = new Pt();
function cl(i) {
  for (let t = i.length - 1; t >= 0; --t) if (i[t] >= 65535) return true;
  return false;
}
function Ts(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function Lc() {
  const i = Ts("canvas");
  return i.style.display = "block", i;
}
const ka = {};
function Pi(i) {
  i in ka || (ka[i] = true, console.warn(i));
}
function Ic(i, t, e) {
  return new Promise(function(n, s) {
    function r() {
      switch (i.clientWaitSync(t, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case i.WAIT_FAILED:
          s();
          break;
        case i.TIMEOUT_EXPIRED:
          setTimeout(r, e);
          break;
        default:
          n();
      }
    }
    setTimeout(r, e);
  });
}
function Uc(i) {
  const t = i.elements;
  t[2] = 0.5 * t[2] + 0.5 * t[3], t[6] = 0.5 * t[6] + 0.5 * t[7], t[10] = 0.5 * t[10] + 0.5 * t[11], t[14] = 0.5 * t[14] + 0.5 * t[15];
}
function Nc(i) {
  const t = i.elements;
  t[11] === -1 ? (t[10] = -t[10] - 1, t[14] = -t[14]) : (t[10] = -t[10], t[14] = -t[14] + 1);
}
const Ht = { enabled: true, workingColorSpace: mi, spaces: {}, convert: function(i, t, e) {
  return this.enabled === false || t === e || !t || !e || (this.spaces[t].transfer === qt && (i.r = an(i.r), i.g = an(i.g), i.b = an(i.b)), this.spaces[t].primaries !== this.spaces[e].primaries && (i.applyMatrix3(this.spaces[t].toXYZ), i.applyMatrix3(this.spaces[e].fromXYZ)), this.spaces[e].transfer === qt && (i.r = li(i.r), i.g = li(i.g), i.b = li(i.b))), i;
}, fromWorkingColorSpace: function(i, t) {
  return this.convert(i, this.workingColorSpace, t);
}, toWorkingColorSpace: function(i, t) {
  return this.convert(i, t, this.workingColorSpace);
}, getPrimaries: function(i) {
  return this.spaces[i].primaries;
}, getTransfer: function(i) {
  return i === _n ? Rs : this.spaces[i].transfer;
}, getLuminanceCoefficients: function(i, t = this.workingColorSpace) {
  return i.fromArray(this.spaces[t].luminanceCoefficients);
}, define: function(i) {
  Object.assign(this.spaces, i);
}, _getMatrix: function(i, t, e) {
  return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ);
}, _getDrawingBufferColorSpace: function(i) {
  return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace;
}, _getUnpackColorSpace: function(i = this.workingColorSpace) {
  return this.spaces[i].workingColorSpaceConfig.unpackColorSpace;
} };
function an(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function li(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
const Ha = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], Ga = [0.2126, 0.7152, 0.0722], Va = [0.3127, 0.329], Wa = new Pt().set(0.4123908, 0.3575843, 0.1804808, 0.212639, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322), Xa = new Pt().set(3.2409699, -1.5373832, -0.4986108, -0.9692436, 1.8759675, 0.0415551, 0.0556301, -0.203977, 1.0569715);
Ht.define({ [mi]: { primaries: Ha, whitePoint: Va, transfer: Rs, toXYZ: Wa, fromXYZ: Xa, luminanceCoefficients: Ga, workingColorSpaceConfig: { unpackColorSpace: Le }, outputColorSpaceConfig: { drawingBufferColorSpace: Le } }, [Le]: { primaries: Ha, whitePoint: Va, transfer: qt, toXYZ: Wa, fromXYZ: Xa, luminanceCoefficients: Ga, outputColorSpaceConfig: { drawingBufferColorSpace: Le } } });
let Vn;
class Fc {
  static getDataURL(t) {
    if (/^data:/i.test(t.src) || typeof HTMLCanvasElement > "u") return t.src;
    let e;
    if (t instanceof HTMLCanvasElement) e = t;
    else {
      Vn === void 0 && (Vn = Ts("canvas")), Vn.width = t.width, Vn.height = t.height;
      const n = Vn.getContext("2d");
      t instanceof ImageData ? n.putImageData(t, 0, 0) : n.drawImage(t, 0, 0, t.width, t.height), e = Vn;
    }
    return e.width > 2048 || e.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", t), e.toDataURL("image/jpeg", 0.6)) : e.toDataURL("image/png");
  }
  static sRGBToLinear(t) {
    if (typeof HTMLImageElement < "u" && t instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && t instanceof ImageBitmap) {
      const e = Ts("canvas");
      e.width = t.width, e.height = t.height;
      const n = e.getContext("2d");
      n.drawImage(t, 0, 0, t.width, t.height);
      const s = n.getImageData(0, 0, t.width, t.height), r = s.data;
      for (let a = 0; a < r.length; a++) r[a] = an(r[a] / 255) * 255;
      return n.putImageData(s, 0, 0), e;
    } else if (t.data) {
      const e = t.data.slice(0);
      for (let n = 0; n < e.length; n++) e instanceof Uint8Array || e instanceof Uint8ClampedArray ? e[n] = Math.floor(an(e[n] / 255) * 255) : e[n] = an(e[n]);
      return { data: e, width: t.width, height: t.height };
    } else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), t;
  }
}
let Oc = 0;
class hl {
  constructor(t = null) {
    this.isSource = true, Object.defineProperty(this, "id", { value: Oc++ }), this.uuid = Bi(), this.data = t, this.dataReady = true, this.version = 0;
  }
  set needsUpdate(t) {
    t === true && this.version++;
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.images[this.uuid] !== void 0) return t.images[this.uuid];
    const n = { uuid: this.uuid, url: "" }, s = this.data;
    if (s !== null) {
      let r;
      if (Array.isArray(s)) {
        r = [];
        for (let a = 0, o = s.length; a < o; a++) s[a].isDataTexture ? r.push(Fs(s[a].image)) : r.push(Fs(s[a]));
      } else r = Fs(s);
      n.url = r;
    }
    return e || (t.images[this.uuid] = n), n;
  }
}
function Fs(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? Fc.getDataURL(i) : i.data ? { data: Array.from(i.data), width: i.width, height: i.height, type: i.data.constructor.name } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let Bc = 0;
class _e extends Bn {
  constructor(t = _e.DEFAULT_IMAGE, e = _e.DEFAULT_MAPPING, n = Ln, s = Ln, r = Xe, a = In, o = ke, l = on, c = _e.DEFAULT_ANISOTROPY, h = _n) {
    super(), this.isTexture = true, Object.defineProperty(this, "id", { value: Bc++ }), this.uuid = Bi(), this.name = "", this.source = new hl(t), this.mipmaps = [], this.mapping = e, this.channel = 0, this.wrapS = n, this.wrapT = s, this.magFilter = r, this.minFilter = a, this.anisotropy = c, this.format = o, this.internalFormat = null, this.type = l, this.offset = new At(0, 0), this.repeat = new At(1, 1), this.center = new At(0, 0), this.rotation = 0, this.matrixAutoUpdate = true, this.matrix = new Pt(), this.generateMipmaps = true, this.premultiplyAlpha = false, this.flipY = true, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = false, this.pmremVersion = 0;
  }
  get image() {
    return this.source.data;
  }
  set image(t = null) {
    this.source.data = t;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.name = t.name, this.source = t.source, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.channel = t.channel, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.internalFormat = t.internalFormat, this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.colorSpace = t.colorSpace, this.userData = JSON.parse(JSON.stringify(t.userData)), this.needsUpdate = true, this;
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.textures[this.uuid] !== void 0) return t.textures[this.uuid];
    const n = { metadata: { version: 4.6, type: "Texture", generator: "Texture.toJSON" }, uuid: this.uuid, name: this.name, image: this.source.toJSON(t).uuid, mapping: this.mapping, channel: this.channel, repeat: [this.repeat.x, this.repeat.y], offset: [this.offset.x, this.offset.y], center: [this.center.x, this.center.y], rotation: this.rotation, wrap: [this.wrapS, this.wrapT], format: this.format, internalFormat: this.internalFormat, type: this.type, colorSpace: this.colorSpace, minFilter: this.minFilter, magFilter: this.magFilter, anisotropy: this.anisotropy, flipY: this.flipY, generateMipmaps: this.generateMipmaps, premultiplyAlpha: this.premultiplyAlpha, unpackAlignment: this.unpackAlignment };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), e || (t.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(t) {
    if (this.mapping !== Ko) return t;
    if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1) switch (this.wrapS) {
      case Tr:
        t.x = t.x - Math.floor(t.x);
        break;
      case Ln:
        t.x = t.x < 0 ? 0 : 1;
        break;
      case Ar:
        Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
        break;
    }
    if (t.y < 0 || t.y > 1) switch (this.wrapT) {
      case Tr:
        t.y = t.y - Math.floor(t.y);
        break;
      case Ln:
        t.y = t.y < 0 ? 0 : 1;
        break;
      case Ar:
        Math.abs(Math.floor(t.y) % 2) === 1 ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y);
        break;
    }
    return this.flipY && (t.y = 1 - t.y), t;
  }
  set needsUpdate(t) {
    t === true && (this.version++, this.source.needsUpdate = true);
  }
  set needsPMREMUpdate(t) {
    t === true && this.pmremVersion++;
  }
}
_e.DEFAULT_IMAGE = null;
_e.DEFAULT_MAPPING = Ko;
_e.DEFAULT_ANISOTROPY = 1;
class jt {
  constructor(t = 0, e = 0, n = 0, s = 1) {
    jt.prototype.isVector4 = true, this.x = t, this.y = e, this.z = n, this.w = s;
  }
  get width() {
    return this.z;
  }
  set width(t) {
    this.z = t;
  }
  get height() {
    return this.w;
  }
  set height(t) {
    this.w = t;
  }
  set(t, e, n, s) {
    return this.x = t, this.y = e, this.z = n, this.w = s, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this.w = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setW(t) {
    return this.w = t, this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      case 3:
        this.w = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w !== void 0 ? t.w : 1, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this.w += t, this;
  }
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this;
  }
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this.w += t.w * e, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this;
  }
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
  }
  applyMatrix4(t) {
    const e = this.x, n = this.y, s = this.z, r = this.w, a = t.elements;
    return this.x = a[0] * e + a[4] * n + a[8] * s + a[12] * r, this.y = a[1] * e + a[5] * n + a[9] * s + a[13] * r, this.z = a[2] * e + a[6] * n + a[10] * s + a[14] * r, this.w = a[3] * e + a[7] * n + a[11] * s + a[15] * r, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this.w /= t.w, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  setAxisAngleFromQuaternion(t) {
    this.w = 2 * Math.acos(t.w);
    const e = Math.sqrt(1 - t.w * t.w);
    return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this;
  }
  setAxisAngleFromRotationMatrix(t) {
    let e, n, s, r;
    const l = t.elements, c = l[0], h = l[4], f = l[8], d = l[1], m = l[5], g = l[9], v = l[2], p = l[6], u = l[10];
    if (Math.abs(h - d) < 0.01 && Math.abs(f - v) < 0.01 && Math.abs(g - p) < 0.01) {
      if (Math.abs(h + d) < 0.1 && Math.abs(f + v) < 0.1 && Math.abs(g + p) < 0.1 && Math.abs(c + m + u - 3) < 0.1) return this.set(1, 0, 0, 0), this;
      e = Math.PI;
      const b = (c + 1) / 2, S = (m + 1) / 2, N = (u + 1) / 2, w = (h + d) / 4, A = (f + v) / 4, U = (g + p) / 4;
      return b > S && b > N ? b < 0.01 ? (n = 0, s = 0.707106781, r = 0.707106781) : (n = Math.sqrt(b), s = w / n, r = A / n) : S > N ? S < 0.01 ? (n = 0.707106781, s = 0, r = 0.707106781) : (s = Math.sqrt(S), n = w / s, r = U / s) : N < 0.01 ? (n = 0.707106781, s = 0.707106781, r = 0) : (r = Math.sqrt(N), n = A / r, s = U / r), this.set(n, s, r, e), this;
    }
    let T = Math.sqrt((p - g) * (p - g) + (f - v) * (f - v) + (d - h) * (d - h));
    return Math.abs(T) < 1e-3 && (T = 1), this.x = (p - g) / T, this.y = (f - v) / T, this.z = (d - h) / T, this.w = Math.acos((c + m + u - 1) / 2), this;
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    return this.x = e[12], this.y = e[13], this.z = e[14], this.w = e[15], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this;
  }
  clamp(t, e) {
    return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this.w = Math.max(t.w, Math.min(e.w, this.w)), this;
  }
  clampScalar(t, e) {
    return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this.z = Math.max(t, Math.min(e, this.z)), this.w = Math.max(t, Math.min(e, this.w)), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this;
  }
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this.w = t.w + (e.w - t.w) * n, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
  }
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this.w = t[e + 3], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, t;
  }
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this.w = t.getW(e), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class zc extends Bn {
  constructor(t = 1, e = 1, n = {}) {
    super(), this.isRenderTarget = true, this.width = t, this.height = e, this.depth = 1, this.scissor = new jt(0, 0, t, e), this.scissorTest = false, this.viewport = new jt(0, 0, t, e);
    const s = { width: t, height: e, depth: 1 };
    n = Object.assign({ generateMipmaps: false, internalFormat: null, minFilter: Xe, depthBuffer: true, stencilBuffer: false, resolveDepthBuffer: true, resolveStencilBuffer: true, depthTexture: null, samples: 0, count: 1 }, n);
    const r = new _e(s, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace);
    r.flipY = false, r.generateMipmaps = n.generateMipmaps, r.internalFormat = n.internalFormat, this.textures = [];
    const a = n.count;
    for (let o = 0; o < a; o++) this.textures[o] = r.clone(), this.textures[o].isRenderTargetTexture = true;
    this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this.depthTexture = n.depthTexture, this.samples = n.samples;
  }
  get texture() {
    return this.textures[0];
  }
  set texture(t) {
    this.textures[0] = t;
  }
  setSize(t, e, n = 1) {
    if (this.width !== t || this.height !== e || this.depth !== n) {
      this.width = t, this.height = e, this.depth = n;
      for (let s = 0, r = this.textures.length; s < r; s++) this.textures[s].image.width = t, this.textures[s].image.height = e, this.textures[s].image.depth = n;
      this.dispose();
    }
    this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.width = t.width, this.height = t.height, this.depth = t.depth, this.scissor.copy(t.scissor), this.scissorTest = t.scissorTest, this.viewport.copy(t.viewport), this.textures.length = 0;
    for (let n = 0, s = t.textures.length; n < s; n++) this.textures[n] = t.textures[n].clone(), this.textures[n].isRenderTargetTexture = true;
    const e = Object.assign({}, t.texture.image);
    return this.texture.source = new hl(e), this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.resolveDepthBuffer = t.resolveDepthBuffer, this.resolveStencilBuffer = t.resolveStencilBuffer, t.depthTexture !== null && (this.depthTexture = t.depthTexture.clone()), this.samples = t.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class Nn extends zc {
  constructor(t = 1, e = 1, n = {}) {
    super(t, e, n), this.isWebGLRenderTarget = true;
  }
}
class ul extends _e {
  constructor(t = null, e = 1, n = 1, s = 1) {
    super(null), this.isDataArrayTexture = true, this.image = { data: t, width: e, height: n, depth: s }, this.magFilter = Ce, this.minFilter = Ce, this.wrapR = Ln, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(t) {
    this.layerUpdates.add(t);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class kc extends _e {
  constructor(t = null, e = 1, n = 1, s = 1) {
    super(null), this.isData3DTexture = true, this.image = { data: t, width: e, height: n, depth: s }, this.magFilter = Ce, this.minFilter = Ce, this.wrapR = Ln, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1;
  }
}
class Fn {
  constructor(t = 0, e = 0, n = 0, s = 1) {
    this.isQuaternion = true, this._x = t, this._y = e, this._z = n, this._w = s;
  }
  static slerpFlat(t, e, n, s, r, a, o) {
    let l = n[s + 0], c = n[s + 1], h = n[s + 2], f = n[s + 3];
    const d = r[a + 0], m = r[a + 1], g = r[a + 2], v = r[a + 3];
    if (o === 0) {
      t[e + 0] = l, t[e + 1] = c, t[e + 2] = h, t[e + 3] = f;
      return;
    }
    if (o === 1) {
      t[e + 0] = d, t[e + 1] = m, t[e + 2] = g, t[e + 3] = v;
      return;
    }
    if (f !== v || l !== d || c !== m || h !== g) {
      let p = 1 - o;
      const u = l * d + c * m + h * g + f * v, T = u >= 0 ? 1 : -1, b = 1 - u * u;
      if (b > Number.EPSILON) {
        const N = Math.sqrt(b), w = Math.atan2(N, u * T);
        p = Math.sin(p * w) / N, o = Math.sin(o * w) / N;
      }
      const S = o * T;
      if (l = l * p + d * S, c = c * p + m * S, h = h * p + g * S, f = f * p + v * S, p === 1 - o) {
        const N = 1 / Math.sqrt(l * l + c * c + h * h + f * f);
        l *= N, c *= N, h *= N, f *= N;
      }
    }
    t[e] = l, t[e + 1] = c, t[e + 2] = h, t[e + 3] = f;
  }
  static multiplyQuaternionsFlat(t, e, n, s, r, a) {
    const o = n[s], l = n[s + 1], c = n[s + 2], h = n[s + 3], f = r[a], d = r[a + 1], m = r[a + 2], g = r[a + 3];
    return t[e] = o * g + h * f + l * m - c * d, t[e + 1] = l * g + h * d + c * f - o * m, t[e + 2] = c * g + h * m + o * d - l * f, t[e + 3] = h * g - o * f - l * d - c * m, t;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(t) {
    this._w = t, this._onChangeCallback();
  }
  set(t, e, n, s) {
    return this._x = t, this._y = e, this._z = n, this._w = s, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(t) {
    return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this._onChangeCallback(), this;
  }
  setFromEuler(t, e = true) {
    const n = t._x, s = t._y, r = t._z, a = t._order, o = Math.cos, l = Math.sin, c = o(n / 2), h = o(s / 2), f = o(r / 2), d = l(n / 2), m = l(s / 2), g = l(r / 2);
    switch (a) {
      case "XYZ":
        this._x = d * h * f + c * m * g, this._y = c * m * f - d * h * g, this._z = c * h * g + d * m * f, this._w = c * h * f - d * m * g;
        break;
      case "YXZ":
        this._x = d * h * f + c * m * g, this._y = c * m * f - d * h * g, this._z = c * h * g - d * m * f, this._w = c * h * f + d * m * g;
        break;
      case "ZXY":
        this._x = d * h * f - c * m * g, this._y = c * m * f + d * h * g, this._z = c * h * g + d * m * f, this._w = c * h * f - d * m * g;
        break;
      case "ZYX":
        this._x = d * h * f - c * m * g, this._y = c * m * f + d * h * g, this._z = c * h * g - d * m * f, this._w = c * h * f + d * m * g;
        break;
      case "YZX":
        this._x = d * h * f + c * m * g, this._y = c * m * f + d * h * g, this._z = c * h * g - d * m * f, this._w = c * h * f - d * m * g;
        break;
      case "XZY":
        this._x = d * h * f - c * m * g, this._y = c * m * f - d * h * g, this._z = c * h * g + d * m * f, this._w = c * h * f + d * m * g;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a);
    }
    return e === true && this._onChangeCallback(), this;
  }
  setFromAxisAngle(t, e) {
    const n = e / 2, s = Math.sin(n);
    return this._x = t.x * s, this._y = t.y * s, this._z = t.z * s, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t) {
    const e = t.elements, n = e[0], s = e[4], r = e[8], a = e[1], o = e[5], l = e[9], c = e[2], h = e[6], f = e[10], d = n + o + f;
    if (d > 0) {
      const m = 0.5 / Math.sqrt(d + 1);
      this._w = 0.25 / m, this._x = (h - l) * m, this._y = (r - c) * m, this._z = (a - s) * m;
    } else if (n > o && n > f) {
      const m = 2 * Math.sqrt(1 + n - o - f);
      this._w = (h - l) / m, this._x = 0.25 * m, this._y = (s + a) / m, this._z = (r + c) / m;
    } else if (o > f) {
      const m = 2 * Math.sqrt(1 + o - n - f);
      this._w = (r - c) / m, this._x = (s + a) / m, this._y = 0.25 * m, this._z = (l + h) / m;
    } else {
      const m = 2 * Math.sqrt(1 + f - n - o);
      this._w = (a - s) / m, this._x = (r + c) / m, this._y = (l + h) / m, this._z = 0.25 * m;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(t, e) {
    let n = t.dot(e) + 1;
    return n < Number.EPSILON ? (n = 0, Math.abs(t.x) > Math.abs(t.z) ? (this._x = -t.y, this._y = t.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -t.z, this._z = t.y, this._w = n)) : (this._x = t.y * e.z - t.z * e.y, this._y = t.z * e.x - t.x * e.z, this._z = t.x * e.y - t.y * e.x, this._w = n), this.normalize();
  }
  angleTo(t) {
    return 2 * Math.acos(Math.abs(ge(this.dot(t), -1, 1)));
  }
  rotateTowards(t, e) {
    const n = this.angleTo(t);
    if (n === 0) return this;
    const s = Math.min(1, e / n);
    return this.slerp(t, s), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(t) {
    return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let t = this.length();
    return t === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this._onChangeCallback(), this;
  }
  multiply(t) {
    return this.multiplyQuaternions(this, t);
  }
  premultiply(t) {
    return this.multiplyQuaternions(t, this);
  }
  multiplyQuaternions(t, e) {
    const n = t._x, s = t._y, r = t._z, a = t._w, o = e._x, l = e._y, c = e._z, h = e._w;
    return this._x = n * h + a * o + s * c - r * l, this._y = s * h + a * l + r * o - n * c, this._z = r * h + a * c + n * l - s * o, this._w = a * h - n * o - s * l - r * c, this._onChangeCallback(), this;
  }
  slerp(t, e) {
    if (e === 0) return this;
    if (e === 1) return this.copy(t);
    const n = this._x, s = this._y, r = this._z, a = this._w;
    let o = a * t._w + n * t._x + s * t._y + r * t._z;
    if (o < 0 ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, o = -o) : this.copy(t), o >= 1) return this._w = a, this._x = n, this._y = s, this._z = r, this;
    const l = 1 - o * o;
    if (l <= Number.EPSILON) {
      const m = 1 - e;
      return this._w = m * a + e * this._w, this._x = m * n + e * this._x, this._y = m * s + e * this._y, this._z = m * r + e * this._z, this.normalize(), this;
    }
    const c = Math.sqrt(l), h = Math.atan2(c, o), f = Math.sin((1 - e) * h) / c, d = Math.sin(e * h) / c;
    return this._w = a * f + this._w * d, this._x = n * f + this._x * d, this._y = s * f + this._y * d, this._z = r * f + this._z * d, this._onChangeCallback(), this;
  }
  slerpQuaternions(t, e, n) {
    return this.copy(t).slerp(e, n);
  }
  random() {
    const t = 2 * Math.PI * Math.random(), e = 2 * Math.PI * Math.random(), n = Math.random(), s = Math.sqrt(1 - n), r = Math.sqrt(n);
    return this.set(s * Math.sin(t), s * Math.cos(t), r * Math.sin(e), r * Math.cos(e));
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
  }
  fromArray(t, e = 0) {
    return this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this._onChangeCallback(), this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t;
  }
  fromBufferAttribute(t, e) {
    return this._x = t.getX(e), this._y = t.getY(e), this._z = t.getZ(e), this._w = t.getW(e), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class P {
  constructor(t = 0, e = 0, n = 0) {
    P.prototype.isVector3 = true, this.x = t, this.y = e, this.z = n;
  }
  set(t, e, n) {
    return n === void 0 && (n = this.z), this.x = t, this.y = e, this.z = n, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this;
  }
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this;
  }
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this;
  }
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this;
  }
  multiplyVectors(t, e) {
    return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this;
  }
  applyEuler(t) {
    return this.applyQuaternion(Ya.setFromEuler(t));
  }
  applyAxisAngle(t, e) {
    return this.applyQuaternion(Ya.setFromAxisAngle(t, e));
  }
  applyMatrix3(t) {
    const e = this.x, n = this.y, s = this.z, r = t.elements;
    return this.x = r[0] * e + r[3] * n + r[6] * s, this.y = r[1] * e + r[4] * n + r[7] * s, this.z = r[2] * e + r[5] * n + r[8] * s, this;
  }
  applyNormalMatrix(t) {
    return this.applyMatrix3(t).normalize();
  }
  applyMatrix4(t) {
    const e = this.x, n = this.y, s = this.z, r = t.elements, a = 1 / (r[3] * e + r[7] * n + r[11] * s + r[15]);
    return this.x = (r[0] * e + r[4] * n + r[8] * s + r[12]) * a, this.y = (r[1] * e + r[5] * n + r[9] * s + r[13]) * a, this.z = (r[2] * e + r[6] * n + r[10] * s + r[14]) * a, this;
  }
  applyQuaternion(t) {
    const e = this.x, n = this.y, s = this.z, r = t.x, a = t.y, o = t.z, l = t.w, c = 2 * (a * s - o * n), h = 2 * (o * e - r * s), f = 2 * (r * n - a * e);
    return this.x = e + l * c + a * f - o * h, this.y = n + l * h + o * c - r * f, this.z = s + l * f + r * h - a * c, this;
  }
  project(t) {
    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
  }
  unproject(t) {
    return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
  }
  transformDirection(t) {
    const e = this.x, n = this.y, s = this.z, r = t.elements;
    return this.x = r[0] * e + r[4] * n + r[8] * s, this.y = r[1] * e + r[5] * n + r[9] * s, this.z = r[2] * e + r[6] * n + r[10] * s, this.normalize();
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this;
  }
  clamp(t, e) {
    return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this;
  }
  clampScalar(t, e) {
    return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this.z = Math.max(t, Math.min(e, this.z)), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this;
  }
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this;
  }
  cross(t) {
    return this.crossVectors(this, t);
  }
  crossVectors(t, e) {
    const n = t.x, s = t.y, r = t.z, a = e.x, o = e.y, l = e.z;
    return this.x = s * l - r * o, this.y = r * a - n * l, this.z = n * o - s * a, this;
  }
  projectOnVector(t) {
    const e = t.lengthSq();
    if (e === 0) return this.set(0, 0, 0);
    const n = t.dot(this) / e;
    return this.copy(t).multiplyScalar(n);
  }
  projectOnPlane(t) {
    return Os.copy(this).projectOnVector(t), this.sub(Os);
  }
  reflect(t) {
    return this.sub(Os.copy(t).multiplyScalar(2 * this.dot(t)));
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(ge(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x, n = this.y - t.y, s = this.z - t.z;
    return e * e + n * n + s * s;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
  }
  setFromSpherical(t) {
    return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
  }
  setFromSphericalCoords(t, e, n) {
    const s = Math.sin(e) * t;
    return this.x = s * Math.sin(n), this.y = Math.cos(e) * t, this.z = s * Math.cos(n), this;
  }
  setFromCylindrical(t) {
    return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
  }
  setFromCylindricalCoords(t, e, n) {
    return this.x = t * Math.sin(e), this.y = n, this.z = t * Math.cos(e), this;
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    return this.x = e[12], this.y = e[13], this.z = e[14], this;
  }
  setFromMatrixScale(t) {
    const e = this.setFromMatrixColumn(t, 0).length(), n = this.setFromMatrixColumn(t, 1).length(), s = this.setFromMatrixColumn(t, 2).length();
    return this.x = e, this.y = n, this.z = s, this;
  }
  setFromMatrixColumn(t, e) {
    return this.fromArray(t.elements, e * 4);
  }
  setFromMatrix3Column(t, e) {
    return this.fromArray(t.elements, e * 3);
  }
  setFromEuler(t) {
    return this.x = t._x, this.y = t._y, this.z = t._z, this;
  }
  setFromColor(t) {
    return this.x = t.r, this.y = t.g, this.z = t.b, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z;
  }
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t;
  }
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const t = Math.random() * Math.PI * 2, e = Math.random() * 2 - 1, n = Math.sqrt(1 - e * e);
    return this.x = n * Math.cos(t), this.y = e, this.z = n * Math.sin(t), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const Os = new P(), Ya = new Fn();
class zn {
  constructor(t = new P(1 / 0, 1 / 0, 1 / 0), e = new P(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = true, this.min = t, this.max = e;
  }
  set(t, e) {
    return this.min.copy(t), this.max.copy(e), this;
  }
  setFromArray(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e += 3) this.expandByPoint(Oe.fromArray(t, e));
    return this;
  }
  setFromBufferAttribute(t) {
    this.makeEmpty();
    for (let e = 0, n = t.count; e < n; e++) this.expandByPoint(Oe.fromBufferAttribute(t, e));
    return this;
  }
  setFromPoints(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e]);
    return this;
  }
  setFromCenterAndSize(t, e) {
    const n = Oe.copy(e).multiplyScalar(0.5);
    return this.min.copy(t).sub(n), this.max.copy(t).add(n), this;
  }
  setFromObject(t, e = false) {
    return this.makeEmpty(), this.expandByObject(t, e);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.min.copy(t.min), this.max.copy(t.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
  }
  expandByPoint(t) {
    return this.min.min(t), this.max.max(t), this;
  }
  expandByVector(t) {
    return this.min.sub(t), this.max.add(t), this;
  }
  expandByScalar(t) {
    return this.min.addScalar(-t), this.max.addScalar(t), this;
  }
  expandByObject(t, e = false) {
    t.updateWorldMatrix(false, false);
    const n = t.geometry;
    if (n !== void 0) {
      const r = n.getAttribute("position");
      if (e === true && r !== void 0 && t.isInstancedMesh !== true) for (let a = 0, o = r.count; a < o; a++) t.isMesh === true ? t.getVertexPosition(a, Oe) : Oe.fromBufferAttribute(r, a), Oe.applyMatrix4(t.matrixWorld), this.expandByPoint(Oe);
      else t.boundingBox !== void 0 ? (t.boundingBox === null && t.computeBoundingBox(), Vi.copy(t.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), Vi.copy(n.boundingBox)), Vi.applyMatrix4(t.matrixWorld), this.union(Vi);
    }
    const s = t.children;
    for (let r = 0, a = s.length; r < a; r++) this.expandByObject(s[r], e);
    return this;
  }
  containsPoint(t) {
    return t.x >= this.min.x && t.x <= this.max.x && t.y >= this.min.y && t.y <= this.max.y && t.z >= this.min.z && t.z <= this.max.z;
  }
  containsBox(t) {
    return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z;
  }
  getParameter(t, e) {
    return e.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z));
  }
  intersectsBox(t) {
    return t.max.x >= this.min.x && t.min.x <= this.max.x && t.max.y >= this.min.y && t.min.y <= this.max.y && t.max.z >= this.min.z && t.min.z <= this.max.z;
  }
  intersectsSphere(t) {
    return this.clampPoint(t.center, Oe), Oe.distanceToSquared(t.center) <= t.radius * t.radius;
  }
  intersectsPlane(t) {
    let e, n;
    return t.normal.x > 0 ? (e = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, n = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, n += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, n += t.normal.z * this.min.z), e <= -t.constant && n >= -t.constant;
  }
  intersectsTriangle(t) {
    if (this.isEmpty()) return false;
    this.getCenter(yi), Wi.subVectors(this.max, yi), Wn.subVectors(t.a, yi), Xn.subVectors(t.b, yi), Yn.subVectors(t.c, yi), hn.subVectors(Xn, Wn), un.subVectors(Yn, Xn), En.subVectors(Wn, Yn);
    let e = [0, -hn.z, hn.y, 0, -un.z, un.y, 0, -En.z, En.y, hn.z, 0, -hn.x, un.z, 0, -un.x, En.z, 0, -En.x, -hn.y, hn.x, 0, -un.y, un.x, 0, -En.y, En.x, 0];
    return !Bs(e, Wn, Xn, Yn, Wi) || (e = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Bs(e, Wn, Xn, Yn, Wi)) ? false : (Xi.crossVectors(hn, un), e = [Xi.x, Xi.y, Xi.z], Bs(e, Wn, Xn, Yn, Wi));
  }
  clampPoint(t, e) {
    return e.copy(t).clamp(this.min, this.max);
  }
  distanceToPoint(t) {
    return this.clampPoint(t, Oe).distanceTo(t);
  }
  getBoundingSphere(t) {
    return this.isEmpty() ? t.makeEmpty() : (this.getCenter(t.center), t.radius = this.getSize(Oe).length() * 0.5), t;
  }
  intersect(t) {
    return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(t) {
    return this.min.min(t.min), this.max.max(t.max), this;
  }
  applyMatrix4(t) {
    return this.isEmpty() ? this : (Ke[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), Ke[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), Ke[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), Ke[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), Ke[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), Ke[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), Ke[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), Ke[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(Ke), this);
  }
  translate(t) {
    return this.min.add(t), this.max.add(t), this;
  }
  equals(t) {
    return t.min.equals(this.min) && t.max.equals(this.max);
  }
}
const Ke = [new P(), new P(), new P(), new P(), new P(), new P(), new P(), new P()], Oe = new P(), Vi = new zn(), Wn = new P(), Xn = new P(), Yn = new P(), hn = new P(), un = new P(), En = new P(), yi = new P(), Wi = new P(), Xi = new P(), bn = new P();
function Bs(i, t, e, n, s) {
  for (let r = 0, a = i.length - 3; r <= a; r += 3) {
    bn.fromArray(i, r);
    const o = s.x * Math.abs(bn.x) + s.y * Math.abs(bn.y) + s.z * Math.abs(bn.z), l = t.dot(bn), c = e.dot(bn), h = n.dot(bn);
    if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > o) return false;
  }
  return true;
}
const Hc = new zn(), Ei = new P(), zs = new P();
class gi {
  constructor(t = new P(), e = -1) {
    this.isSphere = true, this.center = t, this.radius = e;
  }
  set(t, e) {
    return this.center.copy(t), this.radius = e, this;
  }
  setFromPoints(t, e) {
    const n = this.center;
    e !== void 0 ? n.copy(e) : Hc.setFromPoints(t).getCenter(n);
    let s = 0;
    for (let r = 0, a = t.length; r < a; r++) s = Math.max(s, n.distanceToSquared(t[r]));
    return this.radius = Math.sqrt(s), this;
  }
  copy(t) {
    return this.center.copy(t.center), this.radius = t.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(t) {
    return t.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(t) {
    return t.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(t) {
    const e = this.radius + t.radius;
    return t.center.distanceToSquared(this.center) <= e * e;
  }
  intersectsBox(t) {
    return t.intersectsSphere(this);
  }
  intersectsPlane(t) {
    return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(t, e) {
    const n = this.center.distanceToSquared(t);
    return e.copy(t), n > this.radius * this.radius && (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)), e;
  }
  getBoundingBox(t) {
    return this.isEmpty() ? (t.makeEmpty(), t) : (t.set(this.center, this.center), t.expandByScalar(this.radius), t);
  }
  applyMatrix4(t) {
    return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this;
  }
  translate(t) {
    return this.center.add(t), this;
  }
  expandByPoint(t) {
    if (this.isEmpty()) return this.center.copy(t), this.radius = 0, this;
    Ei.subVectors(t, this.center);
    const e = Ei.lengthSq();
    if (e > this.radius * this.radius) {
      const n = Math.sqrt(e), s = (n - this.radius) * 0.5;
      this.center.addScaledVector(Ei, s / n), this.radius += s;
    }
    return this;
  }
  union(t) {
    return t.isEmpty() ? this : this.isEmpty() ? (this.copy(t), this) : (this.center.equals(t.center) === true ? this.radius = Math.max(this.radius, t.radius) : (zs.subVectors(t.center, this.center).setLength(t.radius), this.expandByPoint(Ei.copy(t.center).add(zs)), this.expandByPoint(Ei.copy(t.center).sub(zs))), this);
  }
  equals(t) {
    return t.center.equals(this.center) && t.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Je = new P(), ks = new P(), Yi = new P(), dn = new P(), Hs = new P(), qi = new P(), Gs = new P();
class ua {
  constructor(t = new P(), e = new P(0, 0, -1)) {
    this.origin = t, this.direction = e;
  }
  set(t, e) {
    return this.origin.copy(t), this.direction.copy(e), this;
  }
  copy(t) {
    return this.origin.copy(t.origin), this.direction.copy(t.direction), this;
  }
  at(t, e) {
    return e.copy(this.origin).addScaledVector(this.direction, t);
  }
  lookAt(t) {
    return this.direction.copy(t).sub(this.origin).normalize(), this;
  }
  recast(t) {
    return this.origin.copy(this.at(t, Je)), this;
  }
  closestPointToPoint(t, e) {
    e.subVectors(t, this.origin);
    const n = e.dot(this.direction);
    return n < 0 ? e.copy(this.origin) : e.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(t) {
    return Math.sqrt(this.distanceSqToPoint(t));
  }
  distanceSqToPoint(t) {
    const e = Je.subVectors(t, this.origin).dot(this.direction);
    return e < 0 ? this.origin.distanceToSquared(t) : (Je.copy(this.origin).addScaledVector(this.direction, e), Je.distanceToSquared(t));
  }
  distanceSqToSegment(t, e, n, s) {
    ks.copy(t).add(e).multiplyScalar(0.5), Yi.copy(e).sub(t).normalize(), dn.copy(this.origin).sub(ks);
    const r = t.distanceTo(e) * 0.5, a = -this.direction.dot(Yi), o = dn.dot(this.direction), l = -dn.dot(Yi), c = dn.lengthSq(), h = Math.abs(1 - a * a);
    let f, d, m, g;
    if (h > 0) if (f = a * l - o, d = a * o - l, g = r * h, f >= 0) if (d >= -g) if (d <= g) {
      const v = 1 / h;
      f *= v, d *= v, m = f * (f + a * d + 2 * o) + d * (a * f + d + 2 * l) + c;
    } else d = r, f = Math.max(0, -(a * d + o)), m = -f * f + d * (d + 2 * l) + c;
    else d = -r, f = Math.max(0, -(a * d + o)), m = -f * f + d * (d + 2 * l) + c;
    else d <= -g ? (f = Math.max(0, -(-a * r + o)), d = f > 0 ? -r : Math.min(Math.max(-r, -l), r), m = -f * f + d * (d + 2 * l) + c) : d <= g ? (f = 0, d = Math.min(Math.max(-r, -l), r), m = d * (d + 2 * l) + c) : (f = Math.max(0, -(a * r + o)), d = f > 0 ? r : Math.min(Math.max(-r, -l), r), m = -f * f + d * (d + 2 * l) + c);
    else d = a > 0 ? -r : r, f = Math.max(0, -(a * d + o)), m = -f * f + d * (d + 2 * l) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, f), s && s.copy(ks).addScaledVector(Yi, d), m;
  }
  intersectSphere(t, e) {
    Je.subVectors(t.center, this.origin);
    const n = Je.dot(this.direction), s = Je.dot(Je) - n * n, r = t.radius * t.radius;
    if (s > r) return null;
    const a = Math.sqrt(r - s), o = n - a, l = n + a;
    return l < 0 ? null : o < 0 ? this.at(l, e) : this.at(o, e);
  }
  intersectsSphere(t) {
    return this.distanceSqToPoint(t.center) <= t.radius * t.radius;
  }
  distanceToPlane(t) {
    const e = t.normal.dot(this.direction);
    if (e === 0) return t.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(t.normal) + t.constant) / e;
    return n >= 0 ? n : null;
  }
  intersectPlane(t, e) {
    const n = this.distanceToPlane(t);
    return n === null ? null : this.at(n, e);
  }
  intersectsPlane(t) {
    const e = t.distanceToPoint(this.origin);
    return e === 0 || t.normal.dot(this.direction) * e < 0;
  }
  intersectBox(t, e) {
    let n, s, r, a, o, l;
    const c = 1 / this.direction.x, h = 1 / this.direction.y, f = 1 / this.direction.z, d = this.origin;
    return c >= 0 ? (n = (t.min.x - d.x) * c, s = (t.max.x - d.x) * c) : (n = (t.max.x - d.x) * c, s = (t.min.x - d.x) * c), h >= 0 ? (r = (t.min.y - d.y) * h, a = (t.max.y - d.y) * h) : (r = (t.max.y - d.y) * h, a = (t.min.y - d.y) * h), n > a || r > s || ((r > n || isNaN(n)) && (n = r), (a < s || isNaN(s)) && (s = a), f >= 0 ? (o = (t.min.z - d.z) * f, l = (t.max.z - d.z) * f) : (o = (t.max.z - d.z) * f, l = (t.min.z - d.z) * f), n > l || o > s) || ((o > n || n !== n) && (n = o), (l < s || s !== s) && (s = l), s < 0) ? null : this.at(n >= 0 ? n : s, e);
  }
  intersectsBox(t) {
    return this.intersectBox(t, Je) !== null;
  }
  intersectTriangle(t, e, n, s, r) {
    Hs.subVectors(e, t), qi.subVectors(n, t), Gs.crossVectors(Hs, qi);
    let a = this.direction.dot(Gs), o;
    if (a > 0) {
      if (s) return null;
      o = 1;
    } else if (a < 0) o = -1, a = -a;
    else return null;
    dn.subVectors(this.origin, t);
    const l = o * this.direction.dot(qi.crossVectors(dn, qi));
    if (l < 0) return null;
    const c = o * this.direction.dot(Hs.cross(dn));
    if (c < 0 || l + c > a) return null;
    const h = -o * dn.dot(Gs);
    return h < 0 ? null : this.at(h / a, r);
  }
  applyMatrix4(t) {
    return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this;
  }
  equals(t) {
    return t.origin.equals(this.origin) && t.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Yt {
  constructor(t, e, n, s, r, a, o, l, c, h, f, d, m, g, v, p) {
    Yt.prototype.isMatrix4 = true, this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], t !== void 0 && this.set(t, e, n, s, r, a, o, l, c, h, f, d, m, g, v, p);
  }
  set(t, e, n, s, r, a, o, l, c, h, f, d, m, g, v, p) {
    const u = this.elements;
    return u[0] = t, u[4] = e, u[8] = n, u[12] = s, u[1] = r, u[5] = a, u[9] = o, u[13] = l, u[2] = c, u[6] = h, u[10] = f, u[14] = d, u[3] = m, u[7] = g, u[11] = v, u[15] = p, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new Yt().fromArray(this.elements);
  }
  copy(t) {
    const e = this.elements, n = t.elements;
    return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], e[9] = n[9], e[10] = n[10], e[11] = n[11], e[12] = n[12], e[13] = n[13], e[14] = n[14], e[15] = n[15], this;
  }
  copyPosition(t) {
    const e = this.elements, n = t.elements;
    return e[12] = n[12], e[13] = n[13], e[14] = n[14], this;
  }
  setFromMatrix3(t) {
    const e = t.elements;
    return this.set(e[0], e[3], e[6], 0, e[1], e[4], e[7], 0, e[2], e[5], e[8], 0, 0, 0, 0, 1), this;
  }
  extractBasis(t, e, n) {
    return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(t, e, n) {
    return this.set(t.x, e.x, n.x, 0, t.y, e.y, n.y, 0, t.z, e.z, n.z, 0, 0, 0, 0, 1), this;
  }
  extractRotation(t) {
    const e = this.elements, n = t.elements, s = 1 / qn.setFromMatrixColumn(t, 0).length(), r = 1 / qn.setFromMatrixColumn(t, 1).length(), a = 1 / qn.setFromMatrixColumn(t, 2).length();
    return e[0] = n[0] * s, e[1] = n[1] * s, e[2] = n[2] * s, e[3] = 0, e[4] = n[4] * r, e[5] = n[5] * r, e[6] = n[6] * r, e[7] = 0, e[8] = n[8] * a, e[9] = n[9] * a, e[10] = n[10] * a, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
  }
  makeRotationFromEuler(t) {
    const e = this.elements, n = t.x, s = t.y, r = t.z, a = Math.cos(n), o = Math.sin(n), l = Math.cos(s), c = Math.sin(s), h = Math.cos(r), f = Math.sin(r);
    if (t.order === "XYZ") {
      const d = a * h, m = a * f, g = o * h, v = o * f;
      e[0] = l * h, e[4] = -l * f, e[8] = c, e[1] = m + g * c, e[5] = d - v * c, e[9] = -o * l, e[2] = v - d * c, e[6] = g + m * c, e[10] = a * l;
    } else if (t.order === "YXZ") {
      const d = l * h, m = l * f, g = c * h, v = c * f;
      e[0] = d + v * o, e[4] = g * o - m, e[8] = a * c, e[1] = a * f, e[5] = a * h, e[9] = -o, e[2] = m * o - g, e[6] = v + d * o, e[10] = a * l;
    } else if (t.order === "ZXY") {
      const d = l * h, m = l * f, g = c * h, v = c * f;
      e[0] = d - v * o, e[4] = -a * f, e[8] = g + m * o, e[1] = m + g * o, e[5] = a * h, e[9] = v - d * o, e[2] = -a * c, e[6] = o, e[10] = a * l;
    } else if (t.order === "ZYX") {
      const d = a * h, m = a * f, g = o * h, v = o * f;
      e[0] = l * h, e[4] = g * c - m, e[8] = d * c + v, e[1] = l * f, e[5] = v * c + d, e[9] = m * c - g, e[2] = -c, e[6] = o * l, e[10] = a * l;
    } else if (t.order === "YZX") {
      const d = a * l, m = a * c, g = o * l, v = o * c;
      e[0] = l * h, e[4] = v - d * f, e[8] = g * f + m, e[1] = f, e[5] = a * h, e[9] = -o * h, e[2] = -c * h, e[6] = m * f + g, e[10] = d - v * f;
    } else if (t.order === "XZY") {
      const d = a * l, m = a * c, g = o * l, v = o * c;
      e[0] = l * h, e[4] = -f, e[8] = c * h, e[1] = d * f + v, e[5] = a * h, e[9] = m * f - g, e[2] = g * f - m, e[6] = o * h, e[10] = v * f + d;
    }
    return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
  }
  makeRotationFromQuaternion(t) {
    return this.compose(Gc, t, Vc);
  }
  lookAt(t, e, n) {
    const s = this.elements;
    return be.subVectors(t, e), be.lengthSq() === 0 && (be.z = 1), be.normalize(), fn.crossVectors(n, be), fn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? be.x += 1e-4 : be.z += 1e-4, be.normalize(), fn.crossVectors(n, be)), fn.normalize(), $i.crossVectors(be, fn), s[0] = fn.x, s[4] = $i.x, s[8] = be.x, s[1] = fn.y, s[5] = $i.y, s[9] = be.y, s[2] = fn.z, s[6] = $i.z, s[10] = be.z, this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements, s = e.elements, r = this.elements, a = n[0], o = n[4], l = n[8], c = n[12], h = n[1], f = n[5], d = n[9], m = n[13], g = n[2], v = n[6], p = n[10], u = n[14], T = n[3], b = n[7], S = n[11], N = n[15], w = s[0], A = s[4], U = s[8], y = s[12], M = s[1], C = s[5], k = s[9], z = s[13], W = s[2], j = s[6], V = s[10], K = s[14], G = s[3], it = s[7], ct = s[11], xt = s[15];
    return r[0] = a * w + o * M + l * W + c * G, r[4] = a * A + o * C + l * j + c * it, r[8] = a * U + o * k + l * V + c * ct, r[12] = a * y + o * z + l * K + c * xt, r[1] = h * w + f * M + d * W + m * G, r[5] = h * A + f * C + d * j + m * it, r[9] = h * U + f * k + d * V + m * ct, r[13] = h * y + f * z + d * K + m * xt, r[2] = g * w + v * M + p * W + u * G, r[6] = g * A + v * C + p * j + u * it, r[10] = g * U + v * k + p * V + u * ct, r[14] = g * y + v * z + p * K + u * xt, r[3] = T * w + b * M + S * W + N * G, r[7] = T * A + b * C + S * j + N * it, r[11] = T * U + b * k + S * V + N * ct, r[15] = T * y + b * z + S * K + N * xt, this;
  }
  multiplyScalar(t) {
    const e = this.elements;
    return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this;
  }
  determinant() {
    const t = this.elements, e = t[0], n = t[4], s = t[8], r = t[12], a = t[1], o = t[5], l = t[9], c = t[13], h = t[2], f = t[6], d = t[10], m = t[14], g = t[3], v = t[7], p = t[11], u = t[15];
    return g * (+r * l * f - s * c * f - r * o * d + n * c * d + s * o * m - n * l * m) + v * (+e * l * m - e * c * d + r * a * d - s * a * m + s * c * h - r * l * h) + p * (+e * c * f - e * o * m - r * a * f + n * a * m + r * o * h - n * c * h) + u * (-s * o * h - e * l * f + e * o * d + s * a * f - n * a * d + n * l * h);
  }
  transpose() {
    const t = this.elements;
    let e;
    return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this;
  }
  setPosition(t, e, n) {
    const s = this.elements;
    return t.isVector3 ? (s[12] = t.x, s[13] = t.y, s[14] = t.z) : (s[12] = t, s[13] = e, s[14] = n), this;
  }
  invert() {
    const t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8], f = t[9], d = t[10], m = t[11], g = t[12], v = t[13], p = t[14], u = t[15], T = f * p * c - v * d * c + v * l * m - o * p * m - f * l * u + o * d * u, b = g * d * c - h * p * c - g * l * m + a * p * m + h * l * u - a * d * u, S = h * v * c - g * f * c + g * o * m - a * v * m - h * o * u + a * f * u, N = g * f * l - h * v * l - g * o * d + a * v * d + h * o * p - a * f * p, w = e * T + n * b + s * S + r * N;
    if (w === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const A = 1 / w;
    return t[0] = T * A, t[1] = (v * d * r - f * p * r - v * s * m + n * p * m + f * s * u - n * d * u) * A, t[2] = (o * p * r - v * l * r + v * s * c - n * p * c - o * s * u + n * l * u) * A, t[3] = (f * l * r - o * d * r - f * s * c + n * d * c + o * s * m - n * l * m) * A, t[4] = b * A, t[5] = (h * p * r - g * d * r + g * s * m - e * p * m - h * s * u + e * d * u) * A, t[6] = (g * l * r - a * p * r - g * s * c + e * p * c + a * s * u - e * l * u) * A, t[7] = (a * d * r - h * l * r + h * s * c - e * d * c - a * s * m + e * l * m) * A, t[8] = S * A, t[9] = (g * f * r - h * v * r - g * n * m + e * v * m + h * n * u - e * f * u) * A, t[10] = (a * v * r - g * o * r + g * n * c - e * v * c - a * n * u + e * o * u) * A, t[11] = (h * o * r - a * f * r - h * n * c + e * f * c + a * n * m - e * o * m) * A, t[12] = N * A, t[13] = (h * v * s - g * f * s + g * n * d - e * v * d - h * n * p + e * f * p) * A, t[14] = (g * o * s - a * v * s - g * n * l + e * v * l + a * n * p - e * o * p) * A, t[15] = (a * f * s - h * o * s + h * n * l - e * f * l - a * n * d + e * o * d) * A, this;
  }
  scale(t) {
    const e = this.elements, n = t.x, s = t.y, r = t.z;
    return e[0] *= n, e[4] *= s, e[8] *= r, e[1] *= n, e[5] *= s, e[9] *= r, e[2] *= n, e[6] *= s, e[10] *= r, e[3] *= n, e[7] *= s, e[11] *= r, this;
  }
  getMaxScaleOnAxis() {
    const t = this.elements, e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2], n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6], s = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
    return Math.sqrt(Math.max(e, n, s));
  }
  makeTranslation(t, e, n) {
    return t.isVector3 ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1) : this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, n, 0, 0, 0, 1), this;
  }
  makeRotationX(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(1, 0, 0, 0, 0, e, -n, 0, 0, n, e, 0, 0, 0, 0, 1), this;
  }
  makeRotationY(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(e, 0, n, 0, 0, 1, 0, 0, -n, 0, e, 0, 0, 0, 0, 1), this;
  }
  makeRotationZ(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  makeRotationAxis(t, e) {
    const n = Math.cos(e), s = Math.sin(e), r = 1 - n, a = t.x, o = t.y, l = t.z, c = r * a, h = r * o;
    return this.set(c * a + n, c * o - s * l, c * l + s * o, 0, c * o + s * l, h * o + n, h * l - s * a, 0, c * l - s * o, h * l + s * a, r * l * l + n, 0, 0, 0, 0, 1), this;
  }
  makeScale(t, e, n) {
    return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
  }
  makeShear(t, e, n, s, r, a) {
    return this.set(1, n, r, 0, t, 1, a, 0, e, s, 1, 0, 0, 0, 0, 1), this;
  }
  compose(t, e, n) {
    const s = this.elements, r = e._x, a = e._y, o = e._z, l = e._w, c = r + r, h = a + a, f = o + o, d = r * c, m = r * h, g = r * f, v = a * h, p = a * f, u = o * f, T = l * c, b = l * h, S = l * f, N = n.x, w = n.y, A = n.z;
    return s[0] = (1 - (v + u)) * N, s[1] = (m + S) * N, s[2] = (g - b) * N, s[3] = 0, s[4] = (m - S) * w, s[5] = (1 - (d + u)) * w, s[6] = (p + T) * w, s[7] = 0, s[8] = (g + b) * A, s[9] = (p - T) * A, s[10] = (1 - (d + v)) * A, s[11] = 0, s[12] = t.x, s[13] = t.y, s[14] = t.z, s[15] = 1, this;
  }
  decompose(t, e, n) {
    const s = this.elements;
    let r = qn.set(s[0], s[1], s[2]).length();
    const a = qn.set(s[4], s[5], s[6]).length(), o = qn.set(s[8], s[9], s[10]).length();
    this.determinant() < 0 && (r = -r), t.x = s[12], t.y = s[13], t.z = s[14], Be.copy(this);
    const c = 1 / r, h = 1 / a, f = 1 / o;
    return Be.elements[0] *= c, Be.elements[1] *= c, Be.elements[2] *= c, Be.elements[4] *= h, Be.elements[5] *= h, Be.elements[6] *= h, Be.elements[8] *= f, Be.elements[9] *= f, Be.elements[10] *= f, e.setFromRotationMatrix(Be), n.x = r, n.y = a, n.z = o, this;
  }
  makePerspective(t, e, n, s, r, a, o = rn) {
    const l = this.elements, c = 2 * r / (e - t), h = 2 * r / (n - s), f = (e + t) / (e - t), d = (n + s) / (n - s);
    let m, g;
    if (o === rn) m = -(a + r) / (a - r), g = -2 * a * r / (a - r);
    else if (o === bs) m = -a / (a - r), g = -a * r / (a - r);
    else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return l[0] = c, l[4] = 0, l[8] = f, l[12] = 0, l[1] = 0, l[5] = h, l[9] = d, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = m, l[14] = g, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(t, e, n, s, r, a, o = rn) {
    const l = this.elements, c = 1 / (e - t), h = 1 / (n - s), f = 1 / (a - r), d = (e + t) * c, m = (n + s) * h;
    let g, v;
    if (o === rn) g = (a + r) * f, v = -2 * f;
    else if (o === bs) g = r * f, v = -1 * f;
    else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return l[0] = 2 * c, l[4] = 0, l[8] = 0, l[12] = -d, l[1] = 0, l[5] = 2 * h, l[9] = 0, l[13] = -m, l[2] = 0, l[6] = 0, l[10] = v, l[14] = -g, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
  }
  equals(t) {
    const e = this.elements, n = t.elements;
    for (let s = 0; s < 16; s++) if (e[s] !== n[s]) return false;
    return true;
  }
  fromArray(t, e = 0) {
    for (let n = 0; n < 16; n++) this.elements[n] = t[n + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const n = this.elements;
    return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t[e + 9] = n[9], t[e + 10] = n[10], t[e + 11] = n[11], t[e + 12] = n[12], t[e + 13] = n[13], t[e + 14] = n[14], t[e + 15] = n[15], t;
  }
}
const qn = new P(), Be = new Yt(), Gc = new P(0, 0, 0), Vc = new P(1, 1, 1), fn = new P(), $i = new P(), be = new P(), qa = new Yt(), $a = new Fn();
class $e {
  constructor(t = 0, e = 0, n = 0, s = $e.DEFAULT_ORDER) {
    this.isEuler = true, this._x = t, this._y = e, this._z = n, this._order = s;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(t) {
    this._order = t, this._onChangeCallback();
  }
  set(t, e, n, s = this._order) {
    return this._x = t, this._y = e, this._z = n, this._order = s, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(t) {
    return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t, e = this._order, n = true) {
    const s = t.elements, r = s[0], a = s[4], o = s[8], l = s[1], c = s[5], h = s[9], f = s[2], d = s[6], m = s[10];
    switch (e) {
      case "XYZ":
        this._y = Math.asin(ge(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-h, m), this._z = Math.atan2(-a, r)) : (this._x = Math.atan2(d, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-ge(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(o, m), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-f, r), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(ge(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._y = Math.atan2(-f, m), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(l, r));
        break;
      case "ZYX":
        this._y = Math.asin(-ge(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._x = Math.atan2(d, m), this._z = Math.atan2(l, r)) : (this._x = 0, this._z = Math.atan2(-a, c));
        break;
      case "YZX":
        this._z = Math.asin(ge(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-h, c), this._y = Math.atan2(-f, r)) : (this._x = 0, this._y = Math.atan2(o, m));
        break;
      case "XZY":
        this._z = Math.asin(-ge(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(o, r)) : (this._x = Math.atan2(-h, m), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e);
    }
    return this._order = e, n === true && this._onChangeCallback(), this;
  }
  setFromQuaternion(t, e, n) {
    return qa.makeRotationFromQuaternion(t), this.setFromRotationMatrix(qa, e, n);
  }
  setFromVector3(t, e = this._order) {
    return this.set(t.x, t.y, t.z, e);
  }
  reorder(t) {
    return $a.setFromEuler(this), this.setFromQuaternion($a, t);
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
  }
  fromArray(t) {
    return this._x = t[0], this._y = t[1], this._z = t[2], t[3] !== void 0 && (this._order = t[3]), this._onChangeCallback(), this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t;
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
$e.DEFAULT_ORDER = "XYZ";
class dl {
  constructor() {
    this.mask = 1;
  }
  set(t) {
    this.mask = (1 << t | 0) >>> 0;
  }
  enable(t) {
    this.mask |= 1 << t | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(t) {
    this.mask ^= 1 << t | 0;
  }
  disable(t) {
    this.mask &= ~(1 << t | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(t) {
    return (this.mask & t.mask) !== 0;
  }
  isEnabled(t) {
    return (this.mask & (1 << t | 0)) !== 0;
  }
}
let Wc = 0;
const ja = new P(), $n = new Fn(), Qe = new Yt(), ji = new P(), bi = new P(), Xc = new P(), Yc = new Fn(), Za = new P(1, 0, 0), Ka = new P(0, 1, 0), Ja = new P(0, 0, 1), Qa = { type: "added" }, qc = { type: "removed" }, jn = { type: "childadded", child: null }, Vs = { type: "childremoved", child: null };
class he extends Bn {
  constructor() {
    super(), this.isObject3D = true, Object.defineProperty(this, "id", { value: Wc++ }), this.uuid = Bi(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = he.DEFAULT_UP.clone();
    const t = new P(), e = new $e(), n = new Fn(), s = new P(1, 1, 1);
    function r() {
      n.setFromEuler(e, false);
    }
    function a() {
      e.setFromQuaternion(n, void 0, false);
    }
    e._onChange(r), n._onChange(a), Object.defineProperties(this, { position: { configurable: true, enumerable: true, value: t }, rotation: { configurable: true, enumerable: true, value: e }, quaternion: { configurable: true, enumerable: true, value: n }, scale: { configurable: true, enumerable: true, value: s }, modelViewMatrix: { value: new Yt() }, normalMatrix: { value: new Pt() } }), this.matrix = new Yt(), this.matrixWorld = new Yt(), this.matrixAutoUpdate = he.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = he.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = false, this.layers = new dl(), this.visible = true, this.castShadow = false, this.receiveShadow = false, this.frustumCulled = true, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(t) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(t) {
    return this.quaternion.premultiply(t), this;
  }
  setRotationFromAxisAngle(t, e) {
    this.quaternion.setFromAxisAngle(t, e);
  }
  setRotationFromEuler(t) {
    this.quaternion.setFromEuler(t, true);
  }
  setRotationFromMatrix(t) {
    this.quaternion.setFromRotationMatrix(t);
  }
  setRotationFromQuaternion(t) {
    this.quaternion.copy(t);
  }
  rotateOnAxis(t, e) {
    return $n.setFromAxisAngle(t, e), this.quaternion.multiply($n), this;
  }
  rotateOnWorldAxis(t, e) {
    return $n.setFromAxisAngle(t, e), this.quaternion.premultiply($n), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(Za, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(Ka, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(Ja, t);
  }
  translateOnAxis(t, e) {
    return ja.copy(t).applyQuaternion(this.quaternion), this.position.add(ja.multiplyScalar(e)), this;
  }
  translateX(t) {
    return this.translateOnAxis(Za, t);
  }
  translateY(t) {
    return this.translateOnAxis(Ka, t);
  }
  translateZ(t) {
    return this.translateOnAxis(Ja, t);
  }
  localToWorld(t) {
    return this.updateWorldMatrix(true, false), t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return this.updateWorldMatrix(true, false), t.applyMatrix4(Qe.copy(this.matrixWorld).invert());
  }
  lookAt(t, e, n) {
    t.isVector3 ? ji.copy(t) : ji.set(t, e, n);
    const s = this.parent;
    this.updateWorldMatrix(true, false), bi.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Qe.lookAt(bi, ji, this.up) : Qe.lookAt(ji, bi, this.up), this.quaternion.setFromRotationMatrix(Qe), s && (Qe.extractRotation(s.matrixWorld), $n.setFromRotationMatrix(Qe), this.quaternion.premultiply($n.invert()));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
      return this;
    }
    return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(Qa), jn.child = t, this.dispatchEvent(jn), jn.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++) this.remove(arguments[n]);
      return this;
    }
    const e = this.children.indexOf(t);
    return e !== -1 && (t.parent = null, this.children.splice(e, 1), t.dispatchEvent(qc), Vs.child = t, this.dispatchEvent(Vs), Vs.child = null), this;
  }
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return this.updateWorldMatrix(true, false), Qe.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(true, false), Qe.multiply(t.parent.matrixWorld)), t.applyMatrix4(Qe), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(false, true), t.dispatchEvent(Qa), jn.child = t, this.dispatchEvent(jn), jn.child = null, this;
  }
  getObjectById(t) {
    return this.getObjectByProperty("id", t);
  }
  getObjectByName(t) {
    return this.getObjectByProperty("name", t);
  }
  getObjectByProperty(t, e) {
    if (this[t] === e) return this;
    for (let n = 0, s = this.children.length; n < s; n++) {
      const a = this.children[n].getObjectByProperty(t, e);
      if (a !== void 0) return a;
    }
  }
  getObjectsByProperty(t, e, n = []) {
    this[t] === e && n.push(this);
    const s = this.children;
    for (let r = 0, a = s.length; r < a; r++) s[r].getObjectsByProperty(t, e, n);
    return n;
  }
  getWorldPosition(t) {
    return this.updateWorldMatrix(true, false), t.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(t) {
    return this.updateWorldMatrix(true, false), this.matrixWorld.decompose(bi, t, Xc), t;
  }
  getWorldScale(t) {
    return this.updateWorldMatrix(true, false), this.matrixWorld.decompose(bi, Yc, t), t;
  }
  getWorldDirection(t) {
    this.updateWorldMatrix(true, false);
    const e = this.matrixWorld.elements;
    return t.set(e[8], e[9], e[10]).normalize();
  }
  raycast() {
  }
  traverse(t) {
    t(this);
    const e = this.children;
    for (let n = 0, s = e.length; n < s; n++) e[n].traverse(t);
  }
  traverseVisible(t) {
    if (this.visible === false) return;
    t(this);
    const e = this.children;
    for (let n = 0, s = e.length; n < s; n++) e[n].traverseVisible(t);
  }
  traverseAncestors(t) {
    const e = this.parent;
    e !== null && (t(e), e.traverseAncestors(t));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = true;
  }
  updateMatrixWorld(t) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (this.matrixWorldAutoUpdate === true && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = false, t = true);
    const e = this.children;
    for (let n = 0, s = e.length; n < s; n++) e[n].updateMatrixWorld(t);
  }
  updateWorldMatrix(t, e) {
    const n = this.parent;
    if (t === true && n !== null && n.updateWorldMatrix(true, false), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === true && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), e === true) {
      const s = this.children;
      for (let r = 0, a = s.length; r < a; r++) s[r].updateWorldMatrix(false, true);
    }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string", n = {};
    e && (t = { geometries: {}, materials: {}, textures: {}, images: {}, shapes: {}, skeletons: {}, animations: {}, nodes: {} }, n.metadata = { version: 4.6, type: "Object", generator: "Object3D.toJSON" });
    const s = {};
    s.uuid = this.uuid, s.type = this.type, this.name !== "" && (s.name = this.name), this.castShadow === true && (s.castShadow = true), this.receiveShadow === true && (s.receiveShadow = true), this.visible === false && (s.visible = false), this.frustumCulled === false && (s.frustumCulled = false), this.renderOrder !== 0 && (s.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (s.userData = this.userData), s.layers = this.layers.mask, s.matrix = this.matrix.toArray(), s.up = this.up.toArray(), this.matrixAutoUpdate === false && (s.matrixAutoUpdate = false), this.isInstancedMesh && (s.type = "InstancedMesh", s.count = this.count, s.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (s.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (s.type = "BatchedMesh", s.perObjectFrustumCulled = this.perObjectFrustumCulled, s.sortObjects = this.sortObjects, s.drawRanges = this._drawRanges, s.reservedRanges = this._reservedRanges, s.visibility = this._visibility, s.active = this._active, s.bounds = this._bounds.map((o) => ({ boxInitialized: o.boxInitialized, boxMin: o.box.min.toArray(), boxMax: o.box.max.toArray(), sphereInitialized: o.sphereInitialized, sphereRadius: o.sphere.radius, sphereCenter: o.sphere.center.toArray() })), s.maxInstanceCount = this._maxInstanceCount, s.maxVertexCount = this._maxVertexCount, s.maxIndexCount = this._maxIndexCount, s.geometryInitialized = this._geometryInitialized, s.geometryCount = this._geometryCount, s.matricesTexture = this._matricesTexture.toJSON(t), this._colorsTexture !== null && (s.colorsTexture = this._colorsTexture.toJSON(t)), this.boundingSphere !== null && (s.boundingSphere = { center: s.boundingSphere.center.toArray(), radius: s.boundingSphere.radius }), this.boundingBox !== null && (s.boundingBox = { min: s.boundingBox.min.toArray(), max: s.boundingBox.max.toArray() }));
    function r(o, l) {
      return o[l.uuid] === void 0 && (o[l.uuid] = l.toJSON(t)), l.uuid;
    }
    if (this.isScene) this.background && (this.background.isColor ? s.background = this.background.toJSON() : this.background.isTexture && (s.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== true && (s.environment = this.environment.toJSON(t).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      s.geometry = r(t.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const l = o.shapes;
        if (Array.isArray(l)) for (let c = 0, h = l.length; c < h; c++) {
          const f = l[c];
          r(t.shapes, f);
        }
        else r(t.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (s.bindMode = this.bindMode, s.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (r(t.skeletons, this.skeleton), s.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) {
      const o = [];
      for (let l = 0, c = this.material.length; l < c; l++) o.push(r(t.materials, this.material[l]));
      s.material = o;
    } else s.material = r(t.materials, this.material);
    if (this.children.length > 0) {
      s.children = [];
      for (let o = 0; o < this.children.length; o++) s.children.push(this.children[o].toJSON(t).object);
    }
    if (this.animations.length > 0) {
      s.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const l = this.animations[o];
        s.animations.push(r(t.animations, l));
      }
    }
    if (e) {
      const o = a(t.geometries), l = a(t.materials), c = a(t.textures), h = a(t.images), f = a(t.shapes), d = a(t.skeletons), m = a(t.animations), g = a(t.nodes);
      o.length > 0 && (n.geometries = o), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), h.length > 0 && (n.images = h), f.length > 0 && (n.shapes = f), d.length > 0 && (n.skeletons = d), m.length > 0 && (n.animations = m), g.length > 0 && (n.nodes = g);
    }
    return n.object = s, n;
    function a(o) {
      const l = [];
      for (const c in o) {
        const h = o[c];
        delete h.metadata, l.push(h);
      }
      return l;
    }
  }
  clone(t) {
    return new this.constructor().copy(this, t);
  }
  copy(t, e = true) {
    if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.animations = t.animations.slice(), this.userData = JSON.parse(JSON.stringify(t.userData)), e === true) for (let n = 0; n < t.children.length; n++) {
      const s = t.children[n];
      this.add(s.clone());
    }
    return this;
  }
}
he.DEFAULT_UP = new P(0, 1, 0);
he.DEFAULT_MATRIX_AUTO_UPDATE = true;
he.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = true;
const ze = new P(), tn = new P(), Ws = new P(), en = new P(), Zn = new P(), Kn = new P(), to = new P(), Xs = new P(), Ys = new P(), qs = new P(), $s = new jt(), js = new jt(), Zs = new jt();
class Ie {
  constructor(t = new P(), e = new P(), n = new P()) {
    this.a = t, this.b = e, this.c = n;
  }
  static getNormal(t, e, n, s) {
    s.subVectors(n, e), ze.subVectors(t, e), s.cross(ze);
    const r = s.lengthSq();
    return r > 0 ? s.multiplyScalar(1 / Math.sqrt(r)) : s.set(0, 0, 0);
  }
  static getBarycoord(t, e, n, s, r) {
    ze.subVectors(s, e), tn.subVectors(n, e), Ws.subVectors(t, e);
    const a = ze.dot(ze), o = ze.dot(tn), l = ze.dot(Ws), c = tn.dot(tn), h = tn.dot(Ws), f = a * c - o * o;
    if (f === 0) return r.set(0, 0, 0), null;
    const d = 1 / f, m = (c * l - o * h) * d, g = (a * h - o * l) * d;
    return r.set(1 - m - g, g, m);
  }
  static containsPoint(t, e, n, s) {
    return this.getBarycoord(t, e, n, s, en) === null ? false : en.x >= 0 && en.y >= 0 && en.x + en.y <= 1;
  }
  static getInterpolation(t, e, n, s, r, a, o, l) {
    return this.getBarycoord(t, e, n, s, en) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(r, en.x), l.addScaledVector(a, en.y), l.addScaledVector(o, en.z), l);
  }
  static getInterpolatedAttribute(t, e, n, s, r, a) {
    return $s.setScalar(0), js.setScalar(0), Zs.setScalar(0), $s.fromBufferAttribute(t, e), js.fromBufferAttribute(t, n), Zs.fromBufferAttribute(t, s), a.setScalar(0), a.addScaledVector($s, r.x), a.addScaledVector(js, r.y), a.addScaledVector(Zs, r.z), a;
  }
  static isFrontFacing(t, e, n, s) {
    return ze.subVectors(n, e), tn.subVectors(t, e), ze.cross(tn).dot(s) < 0;
  }
  set(t, e, n) {
    return this.a.copy(t), this.b.copy(e), this.c.copy(n), this;
  }
  setFromPointsAndIndices(t, e, n, s) {
    return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[s]), this;
  }
  setFromAttributeAndIndices(t, e, n, s) {
    return this.a.fromBufferAttribute(t, e), this.b.fromBufferAttribute(t, n), this.c.fromBufferAttribute(t, s), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
  }
  getArea() {
    return ze.subVectors(this.c, this.b), tn.subVectors(this.a, this.b), ze.cross(tn).length() * 0.5;
  }
  getMidpoint(t) {
    return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return Ie.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, e) {
    return Ie.getBarycoord(t, this.a, this.b, this.c, e);
  }
  getInterpolation(t, e, n, s, r) {
    return Ie.getInterpolation(t, this.a, this.b, this.c, e, n, s, r);
  }
  containsPoint(t) {
    return Ie.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return Ie.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, e) {
    const n = this.a, s = this.b, r = this.c;
    let a, o;
    Zn.subVectors(s, n), Kn.subVectors(r, n), Xs.subVectors(t, n);
    const l = Zn.dot(Xs), c = Kn.dot(Xs);
    if (l <= 0 && c <= 0) return e.copy(n);
    Ys.subVectors(t, s);
    const h = Zn.dot(Ys), f = Kn.dot(Ys);
    if (h >= 0 && f <= h) return e.copy(s);
    const d = l * f - h * c;
    if (d <= 0 && l >= 0 && h <= 0) return a = l / (l - h), e.copy(n).addScaledVector(Zn, a);
    qs.subVectors(t, r);
    const m = Zn.dot(qs), g = Kn.dot(qs);
    if (g >= 0 && m <= g) return e.copy(r);
    const v = m * c - l * g;
    if (v <= 0 && c >= 0 && g <= 0) return o = c / (c - g), e.copy(n).addScaledVector(Kn, o);
    const p = h * g - m * f;
    if (p <= 0 && f - h >= 0 && m - g >= 0) return to.subVectors(r, s), o = (f - h) / (f - h + (m - g)), e.copy(s).addScaledVector(to, o);
    const u = 1 / (p + v + d);
    return a = v * u, o = d * u, e.copy(n).addScaledVector(Zn, a).addScaledVector(Kn, o);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}
const fl = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 }, pn = { h: 0, s: 0, l: 0 }, Zi = { h: 0, s: 0, l: 0 };
function Ks(i, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * 6 * (2 / 3 - e) : i;
}
class Nt {
  constructor(t, e, n) {
    return this.isColor = true, this.r = 1, this.g = 1, this.b = 1, this.set(t, e, n);
  }
  set(t, e, n) {
    if (e === void 0 && n === void 0) {
      const s = t;
      s && s.isColor ? this.copy(s) : typeof s == "number" ? this.setHex(s) : typeof s == "string" && this.setStyle(s);
    } else this.setRGB(t, e, n);
    return this;
  }
  setScalar(t) {
    return this.r = t, this.g = t, this.b = t, this;
  }
  setHex(t, e = Le) {
    return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (t & 255) / 255, Ht.toWorkingColorSpace(this, e), this;
  }
  setRGB(t, e, n, s = Ht.workingColorSpace) {
    return this.r = t, this.g = e, this.b = n, Ht.toWorkingColorSpace(this, s), this;
  }
  setHSL(t, e, n, s = Ht.workingColorSpace) {
    if (t = Pc(t, 1), e = ge(e, 0, 1), n = ge(n, 0, 1), e === 0) this.r = this.g = this.b = n;
    else {
      const r = n <= 0.5 ? n * (1 + e) : n + e - n * e, a = 2 * n - r;
      this.r = Ks(a, r, t + 1 / 3), this.g = Ks(a, r, t), this.b = Ks(a, r, t - 1 / 3);
    }
    return Ht.toWorkingColorSpace(this, s), this;
  }
  setStyle(t, e = Le) {
    function n(r) {
      r !== void 0 && parseFloat(r) < 1 && console.warn("THREE.Color: Alpha component of " + t + " will be ignored.");
    }
    let s;
    if (s = /^(\w+)\(([^\)]*)\)/.exec(t)) {
      let r;
      const a = s[1], o = s[2];
      switch (a) {
        case "rgb":
        case "rgba":
          if (r = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(r[4]), this.setRGB(Math.min(255, parseInt(r[1], 10)) / 255, Math.min(255, parseInt(r[2], 10)) / 255, Math.min(255, parseInt(r[3], 10)) / 255, e);
          if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(r[4]), this.setRGB(Math.min(100, parseInt(r[1], 10)) / 100, Math.min(100, parseInt(r[2], 10)) / 100, Math.min(100, parseInt(r[3], 10)) / 100, e);
          break;
        case "hsl":
        case "hsla":
          if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(r[4]), this.setHSL(parseFloat(r[1]) / 360, parseFloat(r[2]) / 100, parseFloat(r[3]) / 100, e);
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + t);
      }
    } else if (s = /^\#([A-Fa-f\d]+)$/.exec(t)) {
      const r = s[1], a = r.length;
      if (a === 3) return this.setRGB(parseInt(r.charAt(0), 16) / 15, parseInt(r.charAt(1), 16) / 15, parseInt(r.charAt(2), 16) / 15, e);
      if (a === 6) return this.setHex(parseInt(r, 16), e);
      console.warn("THREE.Color: Invalid hex color " + t);
    } else if (t && t.length > 0) return this.setColorName(t, e);
    return this;
  }
  setColorName(t, e = Le) {
    const n = fl[t.toLowerCase()];
    return n !== void 0 ? this.setHex(n, e) : console.warn("THREE.Color: Unknown color " + t), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(t) {
    return this.r = t.r, this.g = t.g, this.b = t.b, this;
  }
  copySRGBToLinear(t) {
    return this.r = an(t.r), this.g = an(t.g), this.b = an(t.b), this;
  }
  copyLinearToSRGB(t) {
    return this.r = li(t.r), this.g = li(t.g), this.b = li(t.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(t = Le) {
    return Ht.fromWorkingColorSpace(fe.copy(this), t), Math.round(ge(fe.r * 255, 0, 255)) * 65536 + Math.round(ge(fe.g * 255, 0, 255)) * 256 + Math.round(ge(fe.b * 255, 0, 255));
  }
  getHexString(t = Le) {
    return ("000000" + this.getHex(t).toString(16)).slice(-6);
  }
  getHSL(t, e = Ht.workingColorSpace) {
    Ht.fromWorkingColorSpace(fe.copy(this), e);
    const n = fe.r, s = fe.g, r = fe.b, a = Math.max(n, s, r), o = Math.min(n, s, r);
    let l, c;
    const h = (o + a) / 2;
    if (o === a) l = 0, c = 0;
    else {
      const f = a - o;
      switch (c = h <= 0.5 ? f / (a + o) : f / (2 - a - o), a) {
        case n:
          l = (s - r) / f + (s < r ? 6 : 0);
          break;
        case s:
          l = (r - n) / f + 2;
          break;
        case r:
          l = (n - s) / f + 4;
          break;
      }
      l /= 6;
    }
    return t.h = l, t.s = c, t.l = h, t;
  }
  getRGB(t, e = Ht.workingColorSpace) {
    return Ht.fromWorkingColorSpace(fe.copy(this), e), t.r = fe.r, t.g = fe.g, t.b = fe.b, t;
  }
  getStyle(t = Le) {
    Ht.fromWorkingColorSpace(fe.copy(this), t);
    const e = fe.r, n = fe.g, s = fe.b;
    return t !== Le ? `color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})` : `rgb(${Math.round(e * 255)},${Math.round(n * 255)},${Math.round(s * 255)})`;
  }
  offsetHSL(t, e, n) {
    return this.getHSL(pn), this.setHSL(pn.h + t, pn.s + e, pn.l + n);
  }
  add(t) {
    return this.r += t.r, this.g += t.g, this.b += t.b, this;
  }
  addColors(t, e) {
    return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this;
  }
  addScalar(t) {
    return this.r += t, this.g += t, this.b += t, this;
  }
  sub(t) {
    return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this;
  }
  multiply(t) {
    return this.r *= t.r, this.g *= t.g, this.b *= t.b, this;
  }
  multiplyScalar(t) {
    return this.r *= t, this.g *= t, this.b *= t, this;
  }
  lerp(t, e) {
    return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this;
  }
  lerpColors(t, e, n) {
    return this.r = t.r + (e.r - t.r) * n, this.g = t.g + (e.g - t.g) * n, this.b = t.b + (e.b - t.b) * n, this;
  }
  lerpHSL(t, e) {
    this.getHSL(pn), t.getHSL(Zi);
    const n = Us(pn.h, Zi.h, e), s = Us(pn.s, Zi.s, e), r = Us(pn.l, Zi.l, e);
    return this.setHSL(n, s, r), this;
  }
  setFromVector3(t) {
    return this.r = t.x, this.g = t.y, this.b = t.z, this;
  }
  applyMatrix3(t) {
    const e = this.r, n = this.g, s = this.b, r = t.elements;
    return this.r = r[0] * e + r[3] * n + r[6] * s, this.g = r[1] * e + r[4] * n + r[7] * s, this.b = r[2] * e + r[5] * n + r[8] * s, this;
  }
  equals(t) {
    return t.r === this.r && t.g === this.g && t.b === this.b;
  }
  fromArray(t, e = 0) {
    return this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t;
  }
  fromBufferAttribute(t, e) {
    return this.r = t.getX(e), this.g = t.getY(e), this.b = t.getZ(e), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const fe = new Nt();
Nt.NAMES = fl;
let $c = 0;
class _i extends Bn {
  static get type() {
    return "Material";
  }
  get type() {
    return this.constructor.type;
  }
  set type(t) {
  }
  constructor() {
    super(), this.isMaterial = true, Object.defineProperty(this, "id", { value: $c++ }), this.uuid = Bi(), this.name = "", this.blending = ai, this.side = Mn, this.vertexColors = false, this.opacity = 1, this.transparent = false, this.alphaHash = false, this.blendSrc = pr, this.blendDst = mr, this.blendEquation = Pn, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Nt(0, 0, 0), this.blendAlpha = 0, this.depthFunc = ci, this.depthTest = true, this.depthWrite = true, this.stencilWriteMask = 255, this.stencilFunc = Oa, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Gn, this.stencilZFail = Gn, this.stencilZPass = Gn, this.stencilWrite = false, this.clippingPlanes = null, this.clipIntersection = false, this.clipShadows = false, this.shadowSide = null, this.colorWrite = true, this.precision = null, this.polygonOffset = false, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = false, this.alphaToCoverage = false, this.premultipliedAlpha = false, this.forceSinglePass = false, this.visible = true, this.toneMapped = true, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(t) {
    this._alphaTest > 0 != t > 0 && this.version++, this._alphaTest = t;
  }
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(t) {
    if (t !== void 0) for (const e in t) {
      const n = t[e];
      if (n === void 0) {
        console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);
        continue;
      }
      const s = this[e];
      if (s === void 0) {
        console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);
        continue;
      }
      s && s.isColor ? s.set(n) : s && s.isVector3 && n && n.isVector3 ? s.copy(n) : this[e] = n;
    }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    e && (t = { textures: {}, images: {} });
    const n = { metadata: { version: 4.6, type: "Material", generator: "Material.toJSON" } };
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(t).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(t).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(t).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(t).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(t).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(t).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(t).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(t).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(t).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(t).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(t).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(t).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(t).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== ai && (n.blending = this.blending), this.side !== Mn && (n.side = this.side), this.vertexColors === true && (n.vertexColors = true), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === true && (n.transparent = true), this.blendSrc !== pr && (n.blendSrc = this.blendSrc), this.blendDst !== mr && (n.blendDst = this.blendDst), this.blendEquation !== Pn && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== ci && (n.depthFunc = this.depthFunc), this.depthTest === false && (n.depthTest = this.depthTest), this.depthWrite === false && (n.depthWrite = this.depthWrite), this.colorWrite === false && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== Oa && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== Gn && (n.stencilFail = this.stencilFail), this.stencilZFail !== Gn && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== Gn && (n.stencilZPass = this.stencilZPass), this.stencilWrite === true && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === true && (n.polygonOffset = true), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === true && (n.dithering = true), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === true && (n.alphaHash = true), this.alphaToCoverage === true && (n.alphaToCoverage = true), this.premultipliedAlpha === true && (n.premultipliedAlpha = true), this.forceSinglePass === true && (n.forceSinglePass = true), this.wireframe === true && (n.wireframe = true), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === true && (n.flatShading = true), this.visible === false && (n.visible = false), this.toneMapped === false && (n.toneMapped = false), this.fog === false && (n.fog = false), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function s(r) {
      const a = [];
      for (const o in r) {
        const l = r[o];
        delete l.metadata, a.push(l);
      }
      return a;
    }
    if (e) {
      const r = s(t.textures), a = s(t.images);
      r.length > 0 && (n.textures = r), a.length > 0 && (n.images = a);
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.name = t.name, this.blending = t.blending, this.side = t.side, this.vertexColors = t.vertexColors, this.opacity = t.opacity, this.transparent = t.transparent, this.blendSrc = t.blendSrc, this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, this.blendColor.copy(t.blendColor), this.blendAlpha = t.blendAlpha, this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, this.stencilWriteMask = t.stencilWriteMask, this.stencilFunc = t.stencilFunc, this.stencilRef = t.stencilRef, this.stencilFuncMask = t.stencilFuncMask, this.stencilFail = t.stencilFail, this.stencilZFail = t.stencilZFail, this.stencilZPass = t.stencilZPass, this.stencilWrite = t.stencilWrite;
    const e = t.clippingPlanes;
    let n = null;
    if (e !== null) {
      const s = e.length;
      n = new Array(s);
      for (let r = 0; r !== s; ++r) n[r] = e[r].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = t.clipIntersection, this.clipShadows = t.clipShadows, this.shadowSide = t.shadowSide, this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, this.dithering = t.dithering, this.alphaTest = t.alphaTest, this.alphaHash = t.alphaHash, this.alphaToCoverage = t.alphaToCoverage, this.premultipliedAlpha = t.premultipliedAlpha, this.forceSinglePass = t.forceSinglePass, this.visible = t.visible, this.toneMapped = t.toneMapped, this.userData = JSON.parse(JSON.stringify(t.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(t) {
    t === true && this.version++;
  }
  onBuild() {
    console.warn("Material: onBuild() has been removed.");
  }
}
class da extends _i {
  static get type() {
    return "MeshBasicMaterial";
  }
  constructor(t) {
    super(), this.isMeshBasicMaterial = true, this.color = new Nt(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new $e(), this.combine = jo, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = false, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = true, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.fog = t.fog, this;
  }
}
const re = new P(), Ki = new At();
class He {
  constructor(t, e, n = false) {
    if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = true, this.name = "", this.array = t, this.itemSize = e, this.count = t !== void 0 ? t.length / e : 0, this.normalized = n, this.usage = Ba, this.updateRanges = [], this.gpuType = Ye, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(t) {
    t === true && this.version++;
  }
  setUsage(t) {
    return this.usage = t, this;
  }
  addUpdateRange(t, e) {
    this.updateRanges.push({ start: t, count: e });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(t) {
    return this.name = t.name, this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.usage = t.usage, this.gpuType = t.gpuType, this;
  }
  copyAt(t, e, n) {
    t *= this.itemSize, n *= e.itemSize;
    for (let s = 0, r = this.itemSize; s < r; s++) this.array[t + s] = e.array[n + s];
    return this;
  }
  copyArray(t) {
    return this.array.set(t), this;
  }
  applyMatrix3(t) {
    if (this.itemSize === 2) for (let e = 0, n = this.count; e < n; e++) Ki.fromBufferAttribute(this, e), Ki.applyMatrix3(t), this.setXY(e, Ki.x, Ki.y);
    else if (this.itemSize === 3) for (let e = 0, n = this.count; e < n; e++) re.fromBufferAttribute(this, e), re.applyMatrix3(t), this.setXYZ(e, re.x, re.y, re.z);
    return this;
  }
  applyMatrix4(t) {
    for (let e = 0, n = this.count; e < n; e++) re.fromBufferAttribute(this, e), re.applyMatrix4(t), this.setXYZ(e, re.x, re.y, re.z);
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, n = this.count; e < n; e++) re.fromBufferAttribute(this, e), re.applyNormalMatrix(t), this.setXYZ(e, re.x, re.y, re.z);
    return this;
  }
  transformDirection(t) {
    for (let e = 0, n = this.count; e < n; e++) re.fromBufferAttribute(this, e), re.transformDirection(t), this.setXYZ(e, re.x, re.y, re.z);
    return this;
  }
  set(t, e = 0) {
    return this.array.set(t, e), this;
  }
  getComponent(t, e) {
    let n = this.array[t * this.itemSize + e];
    return this.normalized && (n = Si(n, this.array)), n;
  }
  setComponent(t, e, n) {
    return this.normalized && (n = Me(n, this.array)), this.array[t * this.itemSize + e] = n, this;
  }
  getX(t) {
    let e = this.array[t * this.itemSize];
    return this.normalized && (e = Si(e, this.array)), e;
  }
  setX(t, e) {
    return this.normalized && (e = Me(e, this.array)), this.array[t * this.itemSize] = e, this;
  }
  getY(t) {
    let e = this.array[t * this.itemSize + 1];
    return this.normalized && (e = Si(e, this.array)), e;
  }
  setY(t, e) {
    return this.normalized && (e = Me(e, this.array)), this.array[t * this.itemSize + 1] = e, this;
  }
  getZ(t) {
    let e = this.array[t * this.itemSize + 2];
    return this.normalized && (e = Si(e, this.array)), e;
  }
  setZ(t, e) {
    return this.normalized && (e = Me(e, this.array)), this.array[t * this.itemSize + 2] = e, this;
  }
  getW(t) {
    let e = this.array[t * this.itemSize + 3];
    return this.normalized && (e = Si(e, this.array)), e;
  }
  setW(t, e) {
    return this.normalized && (e = Me(e, this.array)), this.array[t * this.itemSize + 3] = e, this;
  }
  setXY(t, e, n) {
    return t *= this.itemSize, this.normalized && (e = Me(e, this.array), n = Me(n, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this;
  }
  setXYZ(t, e, n, s) {
    return t *= this.itemSize, this.normalized && (e = Me(e, this.array), n = Me(n, this.array), s = Me(s, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = s, this;
  }
  setXYZW(t, e, n, s, r) {
    return t *= this.itemSize, this.normalized && (e = Me(e, this.array), n = Me(n, this.array), s = Me(s, this.array), r = Me(r, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = s, this.array[t + 3] = r, this;
  }
  onUpload(t) {
    return this.onUploadCallback = t, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const t = { itemSize: this.itemSize, type: this.array.constructor.name, array: Array.from(this.array), normalized: this.normalized };
    return this.name !== "" && (t.name = this.name), this.usage !== Ba && (t.usage = this.usage), t;
  }
}
class pl extends He {
  constructor(t, e, n) {
    super(new Uint16Array(t), e, n);
  }
}
class ml extends He {
  constructor(t, e, n) {
    super(new Uint32Array(t), e, n);
  }
}
class pe extends He {
  constructor(t, e, n) {
    super(new Float32Array(t), e, n);
  }
}
let jc = 0;
const De = new Yt(), Js = new he(), Jn = new P(), Te = new zn(), Ti = new zn(), ce = new P();
class Ge extends Bn {
  constructor() {
    super(), this.isBufferGeometry = true, Object.defineProperty(this, "id", { value: jc++ }), this.uuid = Bi(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = false, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return Array.isArray(t) ? this.index = new (cl(t) ? ml : pl)(t, 1) : this.index = t, this;
  }
  setIndirect(t) {
    return this.indirect = t, this;
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(t) {
    return this.attributes[t];
  }
  setAttribute(t, e) {
    return this.attributes[t] = e, this;
  }
  deleteAttribute(t) {
    return delete this.attributes[t], this;
  }
  hasAttribute(t) {
    return this.attributes[t] !== void 0;
  }
  addGroup(t, e, n = 0) {
    this.groups.push({ start: t, count: e, materialIndex: n });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(t, e) {
    this.drawRange.start = t, this.drawRange.count = e;
  }
  applyMatrix4(t) {
    const e = this.attributes.position;
    e !== void 0 && (e.applyMatrix4(t), e.needsUpdate = true);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const r = new Pt().getNormalMatrix(t);
      n.applyNormalMatrix(r), n.needsUpdate = true;
    }
    const s = this.attributes.tangent;
    return s !== void 0 && (s.transformDirection(t), s.needsUpdate = true), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(t) {
    return De.makeRotationFromQuaternion(t), this.applyMatrix4(De), this;
  }
  rotateX(t) {
    return De.makeRotationX(t), this.applyMatrix4(De), this;
  }
  rotateY(t) {
    return De.makeRotationY(t), this.applyMatrix4(De), this;
  }
  rotateZ(t) {
    return De.makeRotationZ(t), this.applyMatrix4(De), this;
  }
  translate(t, e, n) {
    return De.makeTranslation(t, e, n), this.applyMatrix4(De), this;
  }
  scale(t, e, n) {
    return De.makeScale(t, e, n), this.applyMatrix4(De), this;
  }
  lookAt(t) {
    return Js.lookAt(t), Js.updateMatrix(), this.applyMatrix4(Js.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Jn).negate(), this.translate(Jn.x, Jn.y, Jn.z), this;
  }
  setFromPoints(t) {
    const e = this.getAttribute("position");
    if (e === void 0) {
      const n = [];
      for (let s = 0, r = t.length; s < r; s++) {
        const a = t[s];
        n.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new pe(n, 3));
    } else {
      for (let n = 0, s = e.count; n < s; n++) {
        const r = t[n];
        e.setXYZ(n, r.x, r.y, r.z || 0);
      }
      t.length > e.count && console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), e.needsUpdate = true;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new zn());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new P(-1 / 0, -1 / 0, -1 / 0), new P(1 / 0, 1 / 0, 1 / 0));
      return;
    }
    if (t !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(t), e) for (let n = 0, s = e.length; n < s; n++) {
        const r = e[n];
        Te.setFromBufferAttribute(r), this.morphTargetsRelative ? (ce.addVectors(this.boundingBox.min, Te.min), this.boundingBox.expandByPoint(ce), ce.addVectors(this.boundingBox.max, Te.max), this.boundingBox.expandByPoint(ce)) : (this.boundingBox.expandByPoint(Te.min), this.boundingBox.expandByPoint(Te.max));
      }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new gi());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new P(), 1 / 0);
      return;
    }
    if (t) {
      const n = this.boundingSphere.center;
      if (Te.setFromBufferAttribute(t), e) for (let r = 0, a = e.length; r < a; r++) {
        const o = e[r];
        Ti.setFromBufferAttribute(o), this.morphTargetsRelative ? (ce.addVectors(Te.min, Ti.min), Te.expandByPoint(ce), ce.addVectors(Te.max, Ti.max), Te.expandByPoint(ce)) : (Te.expandByPoint(Ti.min), Te.expandByPoint(Ti.max));
      }
      Te.getCenter(n);
      let s = 0;
      for (let r = 0, a = t.count; r < a; r++) ce.fromBufferAttribute(t, r), s = Math.max(s, n.distanceToSquared(ce));
      if (e) for (let r = 0, a = e.length; r < a; r++) {
        const o = e[r], l = this.morphTargetsRelative;
        for (let c = 0, h = o.count; c < h; c++) ce.fromBufferAttribute(o, c), l && (Jn.fromBufferAttribute(t, c), ce.add(Jn)), s = Math.max(s, n.distanceToSquared(ce));
      }
      this.boundingSphere.radius = Math.sqrt(s), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const t = this.index, e = this.attributes;
    if (t === null || e.position === void 0 || e.normal === void 0 || e.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = e.position, s = e.normal, r = e.uv;
    this.hasAttribute("tangent") === false && this.setAttribute("tangent", new He(new Float32Array(4 * n.count), 4));
    const a = this.getAttribute("tangent"), o = [], l = [];
    for (let U = 0; U < n.count; U++) o[U] = new P(), l[U] = new P();
    const c = new P(), h = new P(), f = new P(), d = new At(), m = new At(), g = new At(), v = new P(), p = new P();
    function u(U, y, M) {
      c.fromBufferAttribute(n, U), h.fromBufferAttribute(n, y), f.fromBufferAttribute(n, M), d.fromBufferAttribute(r, U), m.fromBufferAttribute(r, y), g.fromBufferAttribute(r, M), h.sub(c), f.sub(c), m.sub(d), g.sub(d);
      const C = 1 / (m.x * g.y - g.x * m.y);
      isFinite(C) && (v.copy(h).multiplyScalar(g.y).addScaledVector(f, -m.y).multiplyScalar(C), p.copy(f).multiplyScalar(m.x).addScaledVector(h, -g.x).multiplyScalar(C), o[U].add(v), o[y].add(v), o[M].add(v), l[U].add(p), l[y].add(p), l[M].add(p));
    }
    let T = this.groups;
    T.length === 0 && (T = [{ start: 0, count: t.count }]);
    for (let U = 0, y = T.length; U < y; ++U) {
      const M = T[U], C = M.start, k = M.count;
      for (let z = C, W = C + k; z < W; z += 3) u(t.getX(z + 0), t.getX(z + 1), t.getX(z + 2));
    }
    const b = new P(), S = new P(), N = new P(), w = new P();
    function A(U) {
      N.fromBufferAttribute(s, U), w.copy(N);
      const y = o[U];
      b.copy(y), b.sub(N.multiplyScalar(N.dot(y))).normalize(), S.crossVectors(w, y);
      const C = S.dot(l[U]) < 0 ? -1 : 1;
      a.setXYZW(U, b.x, b.y, b.z, C);
    }
    for (let U = 0, y = T.length; U < y; ++U) {
      const M = T[U], C = M.start, k = M.count;
      for (let z = C, W = C + k; z < W; z += 3) A(t.getX(z + 0)), A(t.getX(z + 1)), A(t.getX(z + 2));
    }
  }
  computeVertexNormals() {
    const t = this.index, e = this.getAttribute("position");
    if (e !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0) n = new He(new Float32Array(e.count * 3), 3), this.setAttribute("normal", n);
      else for (let d = 0, m = n.count; d < m; d++) n.setXYZ(d, 0, 0, 0);
      const s = new P(), r = new P(), a = new P(), o = new P(), l = new P(), c = new P(), h = new P(), f = new P();
      if (t) for (let d = 0, m = t.count; d < m; d += 3) {
        const g = t.getX(d + 0), v = t.getX(d + 1), p = t.getX(d + 2);
        s.fromBufferAttribute(e, g), r.fromBufferAttribute(e, v), a.fromBufferAttribute(e, p), h.subVectors(a, r), f.subVectors(s, r), h.cross(f), o.fromBufferAttribute(n, g), l.fromBufferAttribute(n, v), c.fromBufferAttribute(n, p), o.add(h), l.add(h), c.add(h), n.setXYZ(g, o.x, o.y, o.z), n.setXYZ(v, l.x, l.y, l.z), n.setXYZ(p, c.x, c.y, c.z);
      }
      else for (let d = 0, m = e.count; d < m; d += 3) s.fromBufferAttribute(e, d + 0), r.fromBufferAttribute(e, d + 1), a.fromBufferAttribute(e, d + 2), h.subVectors(a, r), f.subVectors(s, r), h.cross(f), n.setXYZ(d + 0, h.x, h.y, h.z), n.setXYZ(d + 1, h.x, h.y, h.z), n.setXYZ(d + 2, h.x, h.y, h.z);
      this.normalizeNormals(), n.needsUpdate = true;
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let e = 0, n = t.count; e < n; e++) ce.fromBufferAttribute(t, e), ce.normalize(), t.setXYZ(e, ce.x, ce.y, ce.z);
  }
  toNonIndexed() {
    function t(o, l) {
      const c = o.array, h = o.itemSize, f = o.normalized, d = new c.constructor(l.length * h);
      let m = 0, g = 0;
      for (let v = 0, p = l.length; v < p; v++) {
        o.isInterleavedBufferAttribute ? m = l[v] * o.data.stride + o.offset : m = l[v] * h;
        for (let u = 0; u < h; u++) d[g++] = c[m++];
      }
      return new He(d, h, f);
    }
    if (this.index === null) return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const e = new Ge(), n = this.index.array, s = this.attributes;
    for (const o in s) {
      const l = s[o], c = t(l, n);
      e.setAttribute(o, c);
    }
    const r = this.morphAttributes;
    for (const o in r) {
      const l = [], c = r[o];
      for (let h = 0, f = c.length; h < f; h++) {
        const d = c[h], m = t(d, n);
        l.push(m);
      }
      e.morphAttributes[o] = l;
    }
    e.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, l = a.length; o < l; o++) {
      const c = a[o];
      e.addGroup(c.start, c.count, c.materialIndex);
    }
    return e;
  }
  toJSON() {
    const t = { metadata: { version: 4.6, type: "BufferGeometry", generator: "BufferGeometry.toJSON" } };
    if (t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), this.parameters !== void 0) {
      const l = this.parameters;
      for (const c in l) l[c] !== void 0 && (t[c] = l[c]);
      return t;
    }
    t.data = { attributes: {} };
    const e = this.index;
    e !== null && (t.data.index = { type: e.array.constructor.name, array: Array.prototype.slice.call(e.array) });
    const n = this.attributes;
    for (const l in n) {
      const c = n[l];
      t.data.attributes[l] = c.toJSON(t.data);
    }
    const s = {};
    let r = false;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l], h = [];
      for (let f = 0, d = c.length; f < d; f++) {
        const m = c[f];
        h.push(m.toJSON(t.data));
      }
      h.length > 0 && (s[l] = h, r = true);
    }
    r && (t.data.morphAttributes = s, t.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return o !== null && (t.data.boundingSphere = { center: o.center.toArray(), radius: o.radius }), t;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const e = {};
    this.name = t.name;
    const n = t.index;
    n !== null && this.setIndex(n.clone(e));
    const s = t.attributes;
    for (const c in s) {
      const h = s[c];
      this.setAttribute(c, h.clone(e));
    }
    const r = t.morphAttributes;
    for (const c in r) {
      const h = [], f = r[c];
      for (let d = 0, m = f.length; d < m; d++) h.push(f[d].clone(e));
      this.morphAttributes[c] = h;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const a = t.groups;
    for (let c = 0, h = a.length; c < h; c++) {
      const f = a[c];
      this.addGroup(f.start, f.count, f.materialIndex);
    }
    const o = t.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const l = t.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const eo = new Yt(), Tn = new ua(), Ji = new gi(), no = new P(), Qi = new P(), ts = new P(), es = new P(), Qs = new P(), ns = new P(), io = new P(), is = new P();
class Ue extends he {
  constructor(t = new Ge(), e = new da()) {
    super(), this.isMesh = true, this.type = "Mesh", this.geometry = t, this.material = e, this.updateMorphTargets();
  }
  copy(t, e) {
    return super.copy(t, e), t.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = t.morphTargetInfluences.slice()), t.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, n = Object.keys(e);
    if (n.length > 0) {
      const s = e[n[0]];
      if (s !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let r = 0, a = s.length; r < a; r++) {
          const o = s[r].name || String(r);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = r;
        }
      }
    }
  }
  getVertexPosition(t, e) {
    const n = this.geometry, s = n.attributes.position, r = n.morphAttributes.position, a = n.morphTargetsRelative;
    e.fromBufferAttribute(s, t);
    const o = this.morphTargetInfluences;
    if (r && o) {
      ns.set(0, 0, 0);
      for (let l = 0, c = r.length; l < c; l++) {
        const h = o[l], f = r[l];
        h !== 0 && (Qs.fromBufferAttribute(f, t), a ? ns.addScaledVector(Qs, h) : ns.addScaledVector(Qs.sub(e), h));
      }
      e.add(ns);
    }
    return e;
  }
  raycast(t, e) {
    const n = this.geometry, s = this.material, r = this.matrixWorld;
    s !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), Ji.copy(n.boundingSphere), Ji.applyMatrix4(r), Tn.copy(t.ray).recast(t.near), !(Ji.containsPoint(Tn.origin) === false && (Tn.intersectSphere(Ji, no) === null || Tn.origin.distanceToSquared(no) > (t.far - t.near) ** 2)) && (eo.copy(r).invert(), Tn.copy(t.ray).applyMatrix4(eo), !(n.boundingBox !== null && Tn.intersectsBox(n.boundingBox) === false) && this._computeIntersections(t, e, Tn)));
  }
  _computeIntersections(t, e, n) {
    let s;
    const r = this.geometry, a = this.material, o = r.index, l = r.attributes.position, c = r.attributes.uv, h = r.attributes.uv1, f = r.attributes.normal, d = r.groups, m = r.drawRange;
    if (o !== null) if (Array.isArray(a)) for (let g = 0, v = d.length; g < v; g++) {
      const p = d[g], u = a[p.materialIndex], T = Math.max(p.start, m.start), b = Math.min(o.count, Math.min(p.start + p.count, m.start + m.count));
      for (let S = T, N = b; S < N; S += 3) {
        const w = o.getX(S), A = o.getX(S + 1), U = o.getX(S + 2);
        s = ss(this, u, t, n, c, h, f, w, A, U), s && (s.faceIndex = Math.floor(S / 3), s.face.materialIndex = p.materialIndex, e.push(s));
      }
    }
    else {
      const g = Math.max(0, m.start), v = Math.min(o.count, m.start + m.count);
      for (let p = g, u = v; p < u; p += 3) {
        const T = o.getX(p), b = o.getX(p + 1), S = o.getX(p + 2);
        s = ss(this, a, t, n, c, h, f, T, b, S), s && (s.faceIndex = Math.floor(p / 3), e.push(s));
      }
    }
    else if (l !== void 0) if (Array.isArray(a)) for (let g = 0, v = d.length; g < v; g++) {
      const p = d[g], u = a[p.materialIndex], T = Math.max(p.start, m.start), b = Math.min(l.count, Math.min(p.start + p.count, m.start + m.count));
      for (let S = T, N = b; S < N; S += 3) {
        const w = S, A = S + 1, U = S + 2;
        s = ss(this, u, t, n, c, h, f, w, A, U), s && (s.faceIndex = Math.floor(S / 3), s.face.materialIndex = p.materialIndex, e.push(s));
      }
    }
    else {
      const g = Math.max(0, m.start), v = Math.min(l.count, m.start + m.count);
      for (let p = g, u = v; p < u; p += 3) {
        const T = p, b = p + 1, S = p + 2;
        s = ss(this, a, t, n, c, h, f, T, b, S), s && (s.faceIndex = Math.floor(p / 3), e.push(s));
      }
    }
  }
}
function Zc(i, t, e, n, s, r, a, o) {
  let l;
  if (t.side === ye ? l = n.intersectTriangle(a, r, s, true, o) : l = n.intersectTriangle(s, r, a, t.side === Mn, o), l === null) return null;
  is.copy(o), is.applyMatrix4(i.matrixWorld);
  const c = e.ray.origin.distanceTo(is);
  return c < e.near || c > e.far ? null : { distance: c, point: is.clone(), object: i };
}
function ss(i, t, e, n, s, r, a, o, l, c) {
  i.getVertexPosition(o, Qi), i.getVertexPosition(l, ts), i.getVertexPosition(c, es);
  const h = Zc(i, t, e, n, Qi, ts, es, io);
  if (h) {
    const f = new P();
    Ie.getBarycoord(io, Qi, ts, es, f), s && (h.uv = Ie.getInterpolatedAttribute(s, o, l, c, f, new At())), r && (h.uv1 = Ie.getInterpolatedAttribute(r, o, l, c, f, new At())), a && (h.normal = Ie.getInterpolatedAttribute(a, o, l, c, f, new P()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const d = { a: o, b: l, c, normal: new P(), materialIndex: 0 };
    Ie.getNormal(Qi, ts, es, d.normal), h.face = d, h.barycoord = f;
  }
  return h;
}
class On extends Ge {
  constructor(t = 1, e = 1, n = 1, s = 1, r = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = { width: t, height: e, depth: n, widthSegments: s, heightSegments: r, depthSegments: a };
    const o = this;
    s = Math.floor(s), r = Math.floor(r), a = Math.floor(a);
    const l = [], c = [], h = [], f = [];
    let d = 0, m = 0;
    g("z", "y", "x", -1, -1, n, e, t, a, r, 0), g("z", "y", "x", 1, -1, n, e, -t, a, r, 1), g("x", "z", "y", 1, 1, t, n, e, s, a, 2), g("x", "z", "y", 1, -1, t, n, -e, s, a, 3), g("x", "y", "z", 1, -1, t, e, n, s, r, 4), g("x", "y", "z", -1, -1, t, e, -n, s, r, 5), this.setIndex(l), this.setAttribute("position", new pe(c, 3)), this.setAttribute("normal", new pe(h, 3)), this.setAttribute("uv", new pe(f, 2));
    function g(v, p, u, T, b, S, N, w, A, U, y) {
      const M = S / A, C = N / U, k = S / 2, z = N / 2, W = w / 2, j = A + 1, V = U + 1;
      let K = 0, G = 0;
      const it = new P();
      for (let ct = 0; ct < V; ct++) {
        const xt = ct * C - z;
        for (let It = 0; It < j; It++) {
          const Zt = It * M - k;
          it[v] = Zt * T, it[p] = xt * b, it[u] = W, c.push(it.x, it.y, it.z), it[v] = 0, it[p] = 0, it[u] = w > 0 ? 1 : -1, h.push(it.x, it.y, it.z), f.push(It / A), f.push(1 - ct / U), K += 1;
        }
      }
      for (let ct = 0; ct < U; ct++) for (let xt = 0; xt < A; xt++) {
        const It = d + xt + j * ct, Zt = d + xt + j * (ct + 1), Y = d + (xt + 1) + j * (ct + 1), tt = d + (xt + 1) + j * ct;
        l.push(It, Zt, tt), l.push(Zt, Y, tt), G += 6;
      }
      o.addGroup(m, G, y), m += G, d += K;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new On(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}
function pi(i) {
  const t = {};
  for (const e in i) {
    t[e] = {};
    for (const n in i[e]) {
      const s = i[e][n];
      s && (s.isColor || s.isMatrix3 || s.isMatrix4 || s.isVector2 || s.isVector3 || s.isVector4 || s.isTexture || s.isQuaternion) ? s.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[e][n] = null) : t[e][n] = s.clone() : Array.isArray(s) ? t[e][n] = s.slice() : t[e][n] = s;
    }
  }
  return t;
}
function me(i) {
  const t = {};
  for (let e = 0; e < i.length; e++) {
    const n = pi(i[e]);
    for (const s in n) t[s] = n[s];
  }
  return t;
}
function Kc(i) {
  const t = [];
  for (let e = 0; e < i.length; e++) t.push(i[e].clone());
  return t;
}
function gl(i) {
  const t = i.getRenderTarget();
  return t === null ? i.outputColorSpace : t.isXRRenderTarget === true ? t.texture.colorSpace : Ht.workingColorSpace;
}
const Jc = { clone: pi, merge: me };
var Qc = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, th = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class Sn extends _i {
  static get type() {
    return "ShaderMaterial";
  }
  constructor(t) {
    super(), this.isShaderMaterial = true, this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Qc, this.fragmentShader = th, this.linewidth = 1, this.wireframe = false, this.wireframeLinewidth = 1, this.fog = false, this.lights = false, this.clipping = false, this.forceSinglePass = true, this.extensions = { clipCullDistance: false, multiDraw: false }, this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv1: [0, 0] }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = false, this.glslVersion = null, t !== void 0 && this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = pi(t.uniforms), this.uniformsGroups = Kc(t.uniformsGroups), this.defines = Object.assign({}, t.defines), this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.fog = t.fog, this.lights = t.lights, this.clipping = t.clipping, this.extensions = Object.assign({}, t.extensions), this.glslVersion = t.glslVersion, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    e.glslVersion = this.glslVersion, e.uniforms = {};
    for (const s in this.uniforms) {
      const a = this.uniforms[s].value;
      a && a.isTexture ? e.uniforms[s] = { type: "t", value: a.toJSON(t).uuid } : a && a.isColor ? e.uniforms[s] = { type: "c", value: a.getHex() } : a && a.isVector2 ? e.uniforms[s] = { type: "v2", value: a.toArray() } : a && a.isVector3 ? e.uniforms[s] = { type: "v3", value: a.toArray() } : a && a.isVector4 ? e.uniforms[s] = { type: "v4", value: a.toArray() } : a && a.isMatrix3 ? e.uniforms[s] = { type: "m3", value: a.toArray() } : a && a.isMatrix4 ? e.uniforms[s] = { type: "m4", value: a.toArray() } : e.uniforms[s] = { value: a };
    }
    Object.keys(this.defines).length > 0 && (e.defines = this.defines), e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader, e.lights = this.lights, e.clipping = this.clipping;
    const n = {};
    for (const s in this.extensions) this.extensions[s] === true && (n[s] = true);
    return Object.keys(n).length > 0 && (e.extensions = n), e;
  }
}
class _l extends he {
  constructor() {
    super(), this.isCamera = true, this.type = "Camera", this.matrixWorldInverse = new Yt(), this.projectionMatrix = new Yt(), this.projectionMatrixInverse = new Yt(), this.coordinateSystem = rn;
  }
  copy(t, e) {
    return super.copy(t, e), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this.projectionMatrixInverse.copy(t.projectionMatrixInverse), this.coordinateSystem = t.coordinateSystem, this;
  }
  getWorldDirection(t) {
    return super.getWorldDirection(t).negate();
  }
  updateMatrixWorld(t) {
    super.updateMatrixWorld(t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(t, e) {
    super.updateWorldMatrix(t, e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const mn = new P(), so = new At(), ro = new At();
class we extends _l {
  constructor(t = 50, e = 1, n = 0.1, s = 2e3) {
    super(), this.isPerspectiveCamera = true, this.type = "PerspectiveCamera", this.fov = t, this.zoom = 1, this.near = n, this.far = s, this.focus = 10, this.aspect = e, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(t, e) {
    return super.copy(t, e), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = t.view === null ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this;
  }
  setFocalLength(t) {
    const e = 0.5 * this.getFilmHeight() / t;
    this.fov = Qr * 2 * Math.atan(e), this.updateProjectionMatrix();
  }
  getFocalLength() {
    const t = Math.tan(Ui * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / t;
  }
  getEffectiveFOV() {
    return Qr * 2 * Math.atan(Math.tan(Ui * 0.5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  getViewBounds(t, e, n) {
    mn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), e.set(mn.x, mn.y).multiplyScalar(-t / mn.z), mn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(mn.x, mn.y).multiplyScalar(-t / mn.z);
  }
  getViewSize(t, e) {
    return this.getViewBounds(t, so, ro), e.subVectors(ro, so);
  }
  setViewOffset(t, e, n, s, r, a) {
    this.aspect = t / e, this.view === null && (this.view = { enabled: true, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = true, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = s, this.view.width = r, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = false), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const t = this.near;
    let e = t * Math.tan(Ui * 0.5 * this.fov) / this.zoom, n = 2 * e, s = this.aspect * n, r = -0.5 * s;
    const a = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = a.fullWidth, c = a.fullHeight;
      r += a.offsetX * s / l, e -= a.offsetY * n / c, s *= a.width / l, n *= a.height / c;
    }
    const o = this.filmOffset;
    o !== 0 && (r += t * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + s, e, e - n, t, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, this.view !== null && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e;
  }
}
const Qn = -90, ti = 1;
class eh extends he {
  constructor(t, e, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const s = new we(Qn, ti, t, e);
    s.layers = this.layers, this.add(s);
    const r = new we(Qn, ti, t, e);
    r.layers = this.layers, this.add(r);
    const a = new we(Qn, ti, t, e);
    a.layers = this.layers, this.add(a);
    const o = new we(Qn, ti, t, e);
    o.layers = this.layers, this.add(o);
    const l = new we(Qn, ti, t, e);
    l.layers = this.layers, this.add(l);
    const c = new we(Qn, ti, t, e);
    c.layers = this.layers, this.add(c);
  }
  updateCoordinateSystem() {
    const t = this.coordinateSystem, e = this.children.concat(), [n, s, r, a, o, l] = e;
    for (const c of e) this.remove(c);
    if (t === rn) n.up.set(0, 1, 0), n.lookAt(1, 0, 0), s.up.set(0, 1, 0), s.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (t === bs) n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), s.up.set(0, -1, 0), s.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);
    else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + t);
    for (const c of e) this.add(c), c.updateMatrixWorld();
  }
  update(t, e) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: s } = this;
    this.coordinateSystem !== t.coordinateSystem && (this.coordinateSystem = t.coordinateSystem, this.updateCoordinateSystem());
    const [r, a, o, l, c, h] = this.children, f = t.getRenderTarget(), d = t.getActiveCubeFace(), m = t.getActiveMipmapLevel(), g = t.xr.enabled;
    t.xr.enabled = false;
    const v = n.texture.generateMipmaps;
    n.texture.generateMipmaps = false, t.setRenderTarget(n, 0, s), t.render(e, r), t.setRenderTarget(n, 1, s), t.render(e, a), t.setRenderTarget(n, 2, s), t.render(e, o), t.setRenderTarget(n, 3, s), t.render(e, l), t.setRenderTarget(n, 4, s), t.render(e, c), n.texture.generateMipmaps = v, t.setRenderTarget(n, 5, s), t.render(e, h), t.setRenderTarget(f, d, m), t.xr.enabled = g, n.texture.needsPMREMUpdate = true;
  }
}
class vl extends _e {
  constructor(t, e, n, s, r, a, o, l, c, h) {
    t = t !== void 0 ? t : [], e = e !== void 0 ? e : hi, super(t, e, n, s, r, a, o, l, c, h), this.isCubeTexture = true, this.flipY = false;
  }
  get images() {
    return this.image;
  }
  set images(t) {
    this.image = t;
  }
}
class nh extends Nn {
  constructor(t = 1, e = {}) {
    super(t, t, e), this.isWebGLCubeRenderTarget = true;
    const n = { width: t, height: t, depth: 1 }, s = [n, n, n, n, n, n];
    this.texture = new vl(s, e.mapping, e.wrapS, e.wrapT, e.magFilter, e.minFilter, e.format, e.type, e.anisotropy, e.colorSpace), this.texture.isRenderTargetTexture = true, this.texture.generateMipmaps = e.generateMipmaps !== void 0 ? e.generateMipmaps : false, this.texture.minFilter = e.minFilter !== void 0 ? e.minFilter : Xe;
  }
  fromEquirectangularTexture(t, e) {
    this.texture.type = e.type, this.texture.colorSpace = e.colorSpace, this.texture.generateMipmaps = e.generateMipmaps, this.texture.minFilter = e.minFilter, this.texture.magFilter = e.magFilter;
    const n = { uniforms: { tEquirect: { value: null } }, vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`, fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			` }, s = new On(5, 5, 5), r = new Sn({ name: "CubemapFromEquirect", uniforms: pi(n.uniforms), vertexShader: n.vertexShader, fragmentShader: n.fragmentShader, side: ye, blending: vn });
    r.uniforms.tEquirect.value = e;
    const a = new Ue(s, r), o = e.minFilter;
    return e.minFilter === In && (e.minFilter = Xe), new eh(1, 10, this).update(t, a), e.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
  }
  clear(t, e, n, s) {
    const r = t.getRenderTarget();
    for (let a = 0; a < 6; a++) t.setRenderTarget(this, a), t.clear(e, n, s);
    t.setRenderTarget(r);
  }
}
const tr = new P(), ih = new P(), sh = new Pt();
class gn {
  constructor(t = new P(1, 0, 0), e = 0) {
    this.isPlane = true, this.normal = t, this.constant = e;
  }
  set(t, e) {
    return this.normal.copy(t), this.constant = e, this;
  }
  setComponents(t, e, n, s) {
    return this.normal.set(t, e, n), this.constant = s, this;
  }
  setFromNormalAndCoplanarPoint(t, e) {
    return this.normal.copy(t), this.constant = -e.dot(this.normal), this;
  }
  setFromCoplanarPoints(t, e, n) {
    const s = tr.subVectors(n, e).cross(ih.subVectors(t, e)).normalize();
    return this.setFromNormalAndCoplanarPoint(s, t), this;
  }
  copy(t) {
    return this.normal.copy(t.normal), this.constant = t.constant, this;
  }
  normalize() {
    const t = 1 / this.normal.length();
    return this.normal.multiplyScalar(t), this.constant *= t, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(t) {
    return this.normal.dot(t) + this.constant;
  }
  distanceToSphere(t) {
    return this.distanceToPoint(t.center) - t.radius;
  }
  projectPoint(t, e) {
    return e.copy(t).addScaledVector(this.normal, -this.distanceToPoint(t));
  }
  intersectLine(t, e) {
    const n = t.delta(tr), s = this.normal.dot(n);
    if (s === 0) return this.distanceToPoint(t.start) === 0 ? e.copy(t.start) : null;
    const r = -(t.start.dot(this.normal) + this.constant) / s;
    return r < 0 || r > 1 ? null : e.copy(t.start).addScaledVector(n, r);
  }
  intersectsLine(t) {
    const e = this.distanceToPoint(t.start), n = this.distanceToPoint(t.end);
    return e < 0 && n > 0 || n < 0 && e > 0;
  }
  intersectsBox(t) {
    return t.intersectsPlane(this);
  }
  intersectsSphere(t) {
    return t.intersectsPlane(this);
  }
  coplanarPoint(t) {
    return t.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(t, e) {
    const n = e || sh.getNormalMatrix(t), s = this.coplanarPoint(tr).applyMatrix4(t), r = this.normal.applyMatrix3(n).normalize();
    return this.constant = -s.dot(r), this;
  }
  translate(t) {
    return this.constant -= t.dot(this.normal), this;
  }
  equals(t) {
    return t.normal.equals(this.normal) && t.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const An = new gi(), rs = new P();
class fa {
  constructor(t = new gn(), e = new gn(), n = new gn(), s = new gn(), r = new gn(), a = new gn()) {
    this.planes = [t, e, n, s, r, a];
  }
  set(t, e, n, s, r, a) {
    const o = this.planes;
    return o[0].copy(t), o[1].copy(e), o[2].copy(n), o[3].copy(s), o[4].copy(r), o[5].copy(a), this;
  }
  copy(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) e[n].copy(t.planes[n]);
    return this;
  }
  setFromProjectionMatrix(t, e = rn) {
    const n = this.planes, s = t.elements, r = s[0], a = s[1], o = s[2], l = s[3], c = s[4], h = s[5], f = s[6], d = s[7], m = s[8], g = s[9], v = s[10], p = s[11], u = s[12], T = s[13], b = s[14], S = s[15];
    if (n[0].setComponents(l - r, d - c, p - m, S - u).normalize(), n[1].setComponents(l + r, d + c, p + m, S + u).normalize(), n[2].setComponents(l + a, d + h, p + g, S + T).normalize(), n[3].setComponents(l - a, d - h, p - g, S - T).normalize(), n[4].setComponents(l - o, d - f, p - v, S - b).normalize(), e === rn) n[5].setComponents(l + o, d + f, p + v, S + b).normalize();
    else if (e === bs) n[5].setComponents(o, f, v, b).normalize();
    else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + e);
    return this;
  }
  intersectsObject(t) {
    if (t.boundingSphere !== void 0) t.boundingSphere === null && t.computeBoundingSphere(), An.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);
    else {
      const e = t.geometry;
      e.boundingSphere === null && e.computeBoundingSphere(), An.copy(e.boundingSphere).applyMatrix4(t.matrixWorld);
    }
    return this.intersectsSphere(An);
  }
  intersectsSprite(t) {
    return An.center.set(0, 0, 0), An.radius = 0.7071067811865476, An.applyMatrix4(t.matrixWorld), this.intersectsSphere(An);
  }
  intersectsSphere(t) {
    const e = this.planes, n = t.center, s = -t.radius;
    for (let r = 0; r < 6; r++) if (e[r].distanceToPoint(n) < s) return false;
    return true;
  }
  intersectsBox(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) {
      const s = e[n];
      if (rs.x = s.normal.x > 0 ? t.max.x : t.min.x, rs.y = s.normal.y > 0 ? t.max.y : t.min.y, rs.z = s.normal.z > 0 ? t.max.z : t.min.z, s.distanceToPoint(rs) < 0) return false;
    }
    return true;
  }
  containsPoint(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) if (e[n].distanceToPoint(t) < 0) return false;
    return true;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function xl() {
  let i = null, t = false, e = null, n = null;
  function s(r, a) {
    e(r, a), n = i.requestAnimationFrame(s);
  }
  return { start: function() {
    t !== true && e !== null && (n = i.requestAnimationFrame(s), t = true);
  }, stop: function() {
    i.cancelAnimationFrame(n), t = false;
  }, setAnimationLoop: function(r) {
    e = r;
  }, setContext: function(r) {
    i = r;
  } };
}
function rh(i) {
  const t = /* @__PURE__ */ new WeakMap();
  function e(o, l) {
    const c = o.array, h = o.usage, f = c.byteLength, d = i.createBuffer();
    i.bindBuffer(l, d), i.bufferData(l, c, h), o.onUploadCallback();
    let m;
    if (c instanceof Float32Array) m = i.FLOAT;
    else if (c instanceof Uint16Array) o.isFloat16BufferAttribute ? m = i.HALF_FLOAT : m = i.UNSIGNED_SHORT;
    else if (c instanceof Int16Array) m = i.SHORT;
    else if (c instanceof Uint32Array) m = i.UNSIGNED_INT;
    else if (c instanceof Int32Array) m = i.INT;
    else if (c instanceof Int8Array) m = i.BYTE;
    else if (c instanceof Uint8Array) m = i.UNSIGNED_BYTE;
    else if (c instanceof Uint8ClampedArray) m = i.UNSIGNED_BYTE;
    else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
    return { buffer: d, type: m, bytesPerElement: c.BYTES_PER_ELEMENT, version: o.version, size: f };
  }
  function n(o, l, c) {
    const h = l.array, f = l.updateRanges;
    if (i.bindBuffer(c, o), f.length === 0) i.bufferSubData(c, 0, h);
    else {
      f.sort((m, g) => m.start - g.start);
      let d = 0;
      for (let m = 1; m < f.length; m++) {
        const g = f[d], v = f[m];
        v.start <= g.start + g.count + 1 ? g.count = Math.max(g.count, v.start + v.count - g.start) : (++d, f[d] = v);
      }
      f.length = d + 1;
      for (let m = 0, g = f.length; m < g; m++) {
        const v = f[m];
        i.bufferSubData(c, v.start * h.BYTES_PER_ELEMENT, h, v.start, v.count);
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function s(o) {
    return o.isInterleavedBufferAttribute && (o = o.data), t.get(o);
  }
  function r(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const l = t.get(o);
    l && (i.deleteBuffer(l.buffer), t.delete(o));
  }
  function a(o, l) {
    if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
      const h = t.get(o);
      (!h || h.version < o.version) && t.set(o, { buffer: o.buffer, type: o.type, bytesPerElement: o.elementSize, version: o.version });
      return;
    }
    const c = t.get(o);
    if (c === void 0) t.set(o, e(o, l));
    else if (c.version < o.version) {
      if (c.size !== o.array.byteLength) throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(c.buffer, o, l), c.version = o.version;
    }
  }
  return { get: s, remove: r, update: a };
}
class Ps extends Ge {
  constructor(t = 1, e = 1, n = 1, s = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = { width: t, height: e, widthSegments: n, heightSegments: s };
    const r = t / 2, a = e / 2, o = Math.floor(n), l = Math.floor(s), c = o + 1, h = l + 1, f = t / o, d = e / l, m = [], g = [], v = [], p = [];
    for (let u = 0; u < h; u++) {
      const T = u * d - a;
      for (let b = 0; b < c; b++) {
        const S = b * f - r;
        g.push(S, -T, 0), v.push(0, 0, 1), p.push(b / o), p.push(1 - u / l);
      }
    }
    for (let u = 0; u < l; u++) for (let T = 0; T < o; T++) {
      const b = T + c * u, S = T + c * (u + 1), N = T + 1 + c * (u + 1), w = T + 1 + c * u;
      m.push(b, S, w), m.push(S, N, w);
    }
    this.setIndex(m), this.setAttribute("position", new pe(g, 3)), this.setAttribute("normal", new pe(v, 3)), this.setAttribute("uv", new pe(p, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Ps(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}
var ah = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, oh = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, lh = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, ch = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, hh = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, uh = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, dh = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, fh = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, ph = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`, mh = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, gh = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, _h = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, vh = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, xh = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, Mh = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, Sh = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, yh = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, Eh = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, bh = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, Th = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, Ah = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, wh = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, Ch = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`, Rh = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, Ph = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, Dh = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, Lh = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, Ih = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, Uh = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Nh = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, Fh = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Oh = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, Bh = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, zh = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, kh = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, Hh = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Gh = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, Vh = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Wh = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Xh = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, Yh = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, qh = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, $h = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, jh = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Zh = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, Kh = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, Jh = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, Qh = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, tu = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, eu = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, nu = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, iu = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, su = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, ru = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, au = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, ou = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, lu = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, cu = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, hu = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, uu = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, du = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, fu = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, pu = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, mu = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, gu = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, _u = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, vu = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, xu = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, Mu = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Su = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, yu = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Eu = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, bu = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, Tu = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Au = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, wu = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, Cu = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, Ru = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, Pu = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, Du = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, Lu = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, Iu = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Uu = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, Nu = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, Fu = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, Ou = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Bu = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, zu = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, ku = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Hu = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`, Gu = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, Vu = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, Wu = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, Xu = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, Yu = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, qu = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, $u = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, ju = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, Zu = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, Ku = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, Ju = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, Qu = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, td = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, ed = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, nd = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, id = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, sd = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const rd = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, ad = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, od = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, ld = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, cd = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, hd = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, ud = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, dd = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, fd = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, pd = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, md = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, gd = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, _d = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, vd = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, xd = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, Md = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Sd = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, yd = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Ed = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, bd = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Td = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, Ad = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, wd = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Cd = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Rd = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, Pd = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Dd = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Ld = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Id = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, Ud = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Nd = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Fd = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Od = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Bd = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Lt = { alphahash_fragment: ah, alphahash_pars_fragment: oh, alphamap_fragment: lh, alphamap_pars_fragment: ch, alphatest_fragment: hh, alphatest_pars_fragment: uh, aomap_fragment: dh, aomap_pars_fragment: fh, batching_pars_vertex: ph, batching_vertex: mh, begin_vertex: gh, beginnormal_vertex: _h, bsdfs: vh, iridescence_fragment: xh, bumpmap_pars_fragment: Mh, clipping_planes_fragment: Sh, clipping_planes_pars_fragment: yh, clipping_planes_pars_vertex: Eh, clipping_planes_vertex: bh, color_fragment: Th, color_pars_fragment: Ah, color_pars_vertex: wh, color_vertex: Ch, common: Rh, cube_uv_reflection_fragment: Ph, defaultnormal_vertex: Dh, displacementmap_pars_vertex: Lh, displacementmap_vertex: Ih, emissivemap_fragment: Uh, emissivemap_pars_fragment: Nh, colorspace_fragment: Fh, colorspace_pars_fragment: Oh, envmap_fragment: Bh, envmap_common_pars_fragment: zh, envmap_pars_fragment: kh, envmap_pars_vertex: Hh, envmap_physical_pars_fragment: Jh, envmap_vertex: Gh, fog_vertex: Vh, fog_pars_vertex: Wh, fog_fragment: Xh, fog_pars_fragment: Yh, gradientmap_pars_fragment: qh, lightmap_pars_fragment: $h, lights_lambert_fragment: jh, lights_lambert_pars_fragment: Zh, lights_pars_begin: Kh, lights_toon_fragment: Qh, lights_toon_pars_fragment: tu, lights_phong_fragment: eu, lights_phong_pars_fragment: nu, lights_physical_fragment: iu, lights_physical_pars_fragment: su, lights_fragment_begin: ru, lights_fragment_maps: au, lights_fragment_end: ou, logdepthbuf_fragment: lu, logdepthbuf_pars_fragment: cu, logdepthbuf_pars_vertex: hu, logdepthbuf_vertex: uu, map_fragment: du, map_pars_fragment: fu, map_particle_fragment: pu, map_particle_pars_fragment: mu, metalnessmap_fragment: gu, metalnessmap_pars_fragment: _u, morphinstance_vertex: vu, morphcolor_vertex: xu, morphnormal_vertex: Mu, morphtarget_pars_vertex: Su, morphtarget_vertex: yu, normal_fragment_begin: Eu, normal_fragment_maps: bu, normal_pars_fragment: Tu, normal_pars_vertex: Au, normal_vertex: wu, normalmap_pars_fragment: Cu, clearcoat_normal_fragment_begin: Ru, clearcoat_normal_fragment_maps: Pu, clearcoat_pars_fragment: Du, iridescence_pars_fragment: Lu, opaque_fragment: Iu, packing: Uu, premultiplied_alpha_fragment: Nu, project_vertex: Fu, dithering_fragment: Ou, dithering_pars_fragment: Bu, roughnessmap_fragment: zu, roughnessmap_pars_fragment: ku, shadowmap_pars_fragment: Hu, shadowmap_pars_vertex: Gu, shadowmap_vertex: Vu, shadowmask_pars_fragment: Wu, skinbase_vertex: Xu, skinning_pars_vertex: Yu, skinning_vertex: qu, skinnormal_vertex: $u, specularmap_fragment: ju, specularmap_pars_fragment: Zu, tonemapping_fragment: Ku, tonemapping_pars_fragment: Ju, transmission_fragment: Qu, transmission_pars_fragment: td, uv_pars_fragment: ed, uv_pars_vertex: nd, uv_vertex: id, worldpos_vertex: sd, background_vert: rd, background_frag: ad, backgroundCube_vert: od, backgroundCube_frag: ld, cube_vert: cd, cube_frag: hd, depth_vert: ud, depth_frag: dd, distanceRGBA_vert: fd, distanceRGBA_frag: pd, equirect_vert: md, equirect_frag: gd, linedashed_vert: _d, linedashed_frag: vd, meshbasic_vert: xd, meshbasic_frag: Md, meshlambert_vert: Sd, meshlambert_frag: yd, meshmatcap_vert: Ed, meshmatcap_frag: bd, meshnormal_vert: Td, meshnormal_frag: Ad, meshphong_vert: wd, meshphong_frag: Cd, meshphysical_vert: Rd, meshphysical_frag: Pd, meshtoon_vert: Dd, meshtoon_frag: Ld, points_vert: Id, points_frag: Ud, shadow_vert: Nd, shadow_frag: Fd, sprite_vert: Od, sprite_frag: Bd }, et = { common: { diffuse: { value: new Nt(16777215) }, opacity: { value: 1 }, map: { value: null }, mapTransform: { value: new Pt() }, alphaMap: { value: null }, alphaMapTransform: { value: new Pt() }, alphaTest: { value: 0 } }, specularmap: { specularMap: { value: null }, specularMapTransform: { value: new Pt() } }, envmap: { envMap: { value: null }, envMapRotation: { value: new Pt() }, flipEnvMap: { value: -1 }, reflectivity: { value: 1 }, ior: { value: 1.5 }, refractionRatio: { value: 0.98 } }, aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 }, aoMapTransform: { value: new Pt() } }, lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 }, lightMapTransform: { value: new Pt() } }, bumpmap: { bumpMap: { value: null }, bumpMapTransform: { value: new Pt() }, bumpScale: { value: 1 } }, normalmap: { normalMap: { value: null }, normalMapTransform: { value: new Pt() }, normalScale: { value: new At(1, 1) } }, displacementmap: { displacementMap: { value: null }, displacementMapTransform: { value: new Pt() }, displacementScale: { value: 1 }, displacementBias: { value: 0 } }, emissivemap: { emissiveMap: { value: null }, emissiveMapTransform: { value: new Pt() } }, metalnessmap: { metalnessMap: { value: null }, metalnessMapTransform: { value: new Pt() } }, roughnessmap: { roughnessMap: { value: null }, roughnessMapTransform: { value: new Pt() } }, gradientmap: { gradientMap: { value: null } }, fog: { fogDensity: { value: 25e-5 }, fogNear: { value: 1 }, fogFar: { value: 2e3 }, fogColor: { value: new Nt(16777215) } }, lights: { ambientLightColor: { value: [] }, lightProbe: { value: [] }, directionalLights: { value: [], properties: { direction: {}, color: {} } }, directionalLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, directionalShadowMap: { value: [] }, directionalShadowMatrix: { value: [] }, spotLights: { value: [], properties: { color: {}, position: {}, direction: {}, distance: {}, coneCos: {}, penumbraCos: {}, decay: {} } }, spotLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, spotLightMap: { value: [] }, spotShadowMap: { value: [] }, spotLightMatrix: { value: [] }, pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } }, pointLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {}, shadowCameraNear: {}, shadowCameraFar: {} } }, pointShadowMap: { value: [] }, pointShadowMatrix: { value: [] }, hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } }, rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } }, ltc_1: { value: null }, ltc_2: { value: null } }, points: { diffuse: { value: new Nt(16777215) }, opacity: { value: 1 }, size: { value: 1 }, scale: { value: 1 }, map: { value: null }, alphaMap: { value: null }, alphaMapTransform: { value: new Pt() }, alphaTest: { value: 0 }, uvTransform: { value: new Pt() } }, sprite: { diffuse: { value: new Nt(16777215) }, opacity: { value: 1 }, center: { value: new At(0.5, 0.5) }, rotation: { value: 0 }, map: { value: null }, mapTransform: { value: new Pt() }, alphaMap: { value: null }, alphaMapTransform: { value: new Pt() }, alphaTest: { value: 0 } } }, We = { basic: { uniforms: me([et.common, et.specularmap, et.envmap, et.aomap, et.lightmap, et.fog]), vertexShader: Lt.meshbasic_vert, fragmentShader: Lt.meshbasic_frag }, lambert: { uniforms: me([et.common, et.specularmap, et.envmap, et.aomap, et.lightmap, et.emissivemap, et.bumpmap, et.normalmap, et.displacementmap, et.fog, et.lights, { emissive: { value: new Nt(0) } }]), vertexShader: Lt.meshlambert_vert, fragmentShader: Lt.meshlambert_frag }, phong: { uniforms: me([et.common, et.specularmap, et.envmap, et.aomap, et.lightmap, et.emissivemap, et.bumpmap, et.normalmap, et.displacementmap, et.fog, et.lights, { emissive: { value: new Nt(0) }, specular: { value: new Nt(1118481) }, shininess: { value: 30 } }]), vertexShader: Lt.meshphong_vert, fragmentShader: Lt.meshphong_frag }, standard: { uniforms: me([et.common, et.envmap, et.aomap, et.lightmap, et.emissivemap, et.bumpmap, et.normalmap, et.displacementmap, et.roughnessmap, et.metalnessmap, et.fog, et.lights, { emissive: { value: new Nt(0) }, roughness: { value: 1 }, metalness: { value: 0 }, envMapIntensity: { value: 1 } }]), vertexShader: Lt.meshphysical_vert, fragmentShader: Lt.meshphysical_frag }, toon: { uniforms: me([et.common, et.aomap, et.lightmap, et.emissivemap, et.bumpmap, et.normalmap, et.displacementmap, et.gradientmap, et.fog, et.lights, { emissive: { value: new Nt(0) } }]), vertexShader: Lt.meshtoon_vert, fragmentShader: Lt.meshtoon_frag }, matcap: { uniforms: me([et.common, et.bumpmap, et.normalmap, et.displacementmap, et.fog, { matcap: { value: null } }]), vertexShader: Lt.meshmatcap_vert, fragmentShader: Lt.meshmatcap_frag }, points: { uniforms: me([et.points, et.fog]), vertexShader: Lt.points_vert, fragmentShader: Lt.points_frag }, dashed: { uniforms: me([et.common, et.fog, { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } }]), vertexShader: Lt.linedashed_vert, fragmentShader: Lt.linedashed_frag }, depth: { uniforms: me([et.common, et.displacementmap]), vertexShader: Lt.depth_vert, fragmentShader: Lt.depth_frag }, normal: { uniforms: me([et.common, et.bumpmap, et.normalmap, et.displacementmap, { opacity: { value: 1 } }]), vertexShader: Lt.meshnormal_vert, fragmentShader: Lt.meshnormal_frag }, sprite: { uniforms: me([et.sprite, et.fog]), vertexShader: Lt.sprite_vert, fragmentShader: Lt.sprite_frag }, background: { uniforms: { uvTransform: { value: new Pt() }, t2D: { value: null }, backgroundIntensity: { value: 1 } }, vertexShader: Lt.background_vert, fragmentShader: Lt.background_frag }, backgroundCube: { uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 }, backgroundBlurriness: { value: 0 }, backgroundIntensity: { value: 1 }, backgroundRotation: { value: new Pt() } }, vertexShader: Lt.backgroundCube_vert, fragmentShader: Lt.backgroundCube_frag }, cube: { uniforms: { tCube: { value: null }, tFlip: { value: -1 }, opacity: { value: 1 } }, vertexShader: Lt.cube_vert, fragmentShader: Lt.cube_frag }, equirect: { uniforms: { tEquirect: { value: null } }, vertexShader: Lt.equirect_vert, fragmentShader: Lt.equirect_frag }, distanceRGBA: { uniforms: me([et.common, et.displacementmap, { referencePosition: { value: new P() }, nearDistance: { value: 1 }, farDistance: { value: 1e3 } }]), vertexShader: Lt.distanceRGBA_vert, fragmentShader: Lt.distanceRGBA_frag }, shadow: { uniforms: me([et.lights, et.fog, { color: { value: new Nt(0) }, opacity: { value: 1 } }]), vertexShader: Lt.shadow_vert, fragmentShader: Lt.shadow_frag } };
We.physical = { uniforms: me([We.standard.uniforms, { clearcoat: { value: 0 }, clearcoatMap: { value: null }, clearcoatMapTransform: { value: new Pt() }, clearcoatNormalMap: { value: null }, clearcoatNormalMapTransform: { value: new Pt() }, clearcoatNormalScale: { value: new At(1, 1) }, clearcoatRoughness: { value: 0 }, clearcoatRoughnessMap: { value: null }, clearcoatRoughnessMapTransform: { value: new Pt() }, dispersion: { value: 0 }, iridescence: { value: 0 }, iridescenceMap: { value: null }, iridescenceMapTransform: { value: new Pt() }, iridescenceIOR: { value: 1.3 }, iridescenceThicknessMinimum: { value: 100 }, iridescenceThicknessMaximum: { value: 400 }, iridescenceThicknessMap: { value: null }, iridescenceThicknessMapTransform: { value: new Pt() }, sheen: { value: 0 }, sheenColor: { value: new Nt(0) }, sheenColorMap: { value: null }, sheenColorMapTransform: { value: new Pt() }, sheenRoughness: { value: 1 }, sheenRoughnessMap: { value: null }, sheenRoughnessMapTransform: { value: new Pt() }, transmission: { value: 0 }, transmissionMap: { value: null }, transmissionMapTransform: { value: new Pt() }, transmissionSamplerSize: { value: new At() }, transmissionSamplerMap: { value: null }, thickness: { value: 0 }, thicknessMap: { value: null }, thicknessMapTransform: { value: new Pt() }, attenuationDistance: { value: 0 }, attenuationColor: { value: new Nt(0) }, specularColor: { value: new Nt(1, 1, 1) }, specularColorMap: { value: null }, specularColorMapTransform: { value: new Pt() }, specularIntensity: { value: 1 }, specularIntensityMap: { value: null }, specularIntensityMapTransform: { value: new Pt() }, anisotropyVector: { value: new At() }, anisotropyMap: { value: null }, anisotropyMapTransform: { value: new Pt() } }]), vertexShader: Lt.meshphysical_vert, fragmentShader: Lt.meshphysical_frag };
const as = { r: 0, b: 0, g: 0 }, wn = new $e(), zd = new Yt();
function kd(i, t, e, n, s, r, a) {
  const o = new Nt(0);
  let l = r === true ? 0 : 1, c, h, f = null, d = 0, m = null;
  function g(T) {
    let b = T.isScene === true ? T.background : null;
    return b && b.isTexture && (b = (T.backgroundBlurriness > 0 ? e : t).get(b)), b;
  }
  function v(T) {
    let b = false;
    const S = g(T);
    S === null ? u(o, l) : S && S.isColor && (u(S, 1), b = true);
    const N = i.xr.getEnvironmentBlendMode();
    N === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, a) : N === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, a), (i.autoClear || b) && (n.buffers.depth.setTest(true), n.buffers.depth.setMask(true), n.buffers.color.setMask(true), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function p(T, b) {
    const S = g(b);
    S && (S.isCubeTexture || S.mapping === Cs) ? (h === void 0 && (h = new Ue(new On(1, 1, 1), new Sn({ name: "BackgroundCubeMaterial", uniforms: pi(We.backgroundCube.uniforms), vertexShader: We.backgroundCube.vertexShader, fragmentShader: We.backgroundCube.fragmentShader, side: ye, depthTest: false, depthWrite: false, fog: false })), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(N, w, A) {
      this.matrixWorld.copyPosition(A.matrixWorld);
    }, Object.defineProperty(h.material, "envMap", { get: function() {
      return this.uniforms.envMap.value;
    } }), s.update(h)), wn.copy(b.backgroundRotation), wn.x *= -1, wn.y *= -1, wn.z *= -1, S.isCubeTexture && S.isRenderTargetTexture === false && (wn.y *= -1, wn.z *= -1), h.material.uniforms.envMap.value = S, h.material.uniforms.flipEnvMap.value = S.isCubeTexture && S.isRenderTargetTexture === false ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = b.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = b.backgroundIntensity, h.material.uniforms.backgroundRotation.value.setFromMatrix4(zd.makeRotationFromEuler(wn)), h.material.toneMapped = Ht.getTransfer(S.colorSpace) !== qt, (f !== S || d !== S.version || m !== i.toneMapping) && (h.material.needsUpdate = true, f = S, d = S.version, m = i.toneMapping), h.layers.enableAll(), T.unshift(h, h.geometry, h.material, 0, 0, null)) : S && S.isTexture && (c === void 0 && (c = new Ue(new Ps(2, 2), new Sn({ name: "BackgroundMaterial", uniforms: pi(We.background.uniforms), vertexShader: We.background.vertexShader, fragmentShader: We.background.fragmentShader, side: Mn, depthTest: false, depthWrite: false, fog: false })), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", { get: function() {
      return this.uniforms.t2D.value;
    } }), s.update(c)), c.material.uniforms.t2D.value = S, c.material.uniforms.backgroundIntensity.value = b.backgroundIntensity, c.material.toneMapped = Ht.getTransfer(S.colorSpace) !== qt, S.matrixAutoUpdate === true && S.updateMatrix(), c.material.uniforms.uvTransform.value.copy(S.matrix), (f !== S || d !== S.version || m !== i.toneMapping) && (c.material.needsUpdate = true, f = S, d = S.version, m = i.toneMapping), c.layers.enableAll(), T.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function u(T, b) {
    T.getRGB(as, gl(i)), n.buffers.color.setClear(as.r, as.g, as.b, b, a);
  }
  return { getClearColor: function() {
    return o;
  }, setClearColor: function(T, b = 1) {
    o.set(T), l = b, u(o, l);
  }, getClearAlpha: function() {
    return l;
  }, setClearAlpha: function(T) {
    l = T, u(o, l);
  }, render: v, addToRenderList: p };
}
function Hd(i, t) {
  const e = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, s = d(null);
  let r = s, a = false;
  function o(M, C, k, z, W) {
    let j = false;
    const V = f(z, k, C);
    r !== V && (r = V, c(r.object)), j = m(M, z, k, W), j && g(M, z, k, W), W !== null && t.update(W, i.ELEMENT_ARRAY_BUFFER), (j || a) && (a = false, S(M, C, k, z), W !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, t.get(W).buffer));
  }
  function l() {
    return i.createVertexArray();
  }
  function c(M) {
    return i.bindVertexArray(M);
  }
  function h(M) {
    return i.deleteVertexArray(M);
  }
  function f(M, C, k) {
    const z = k.wireframe === true;
    let W = n[M.id];
    W === void 0 && (W = {}, n[M.id] = W);
    let j = W[C.id];
    j === void 0 && (j = {}, W[C.id] = j);
    let V = j[z];
    return V === void 0 && (V = d(l()), j[z] = V), V;
  }
  function d(M) {
    const C = [], k = [], z = [];
    for (let W = 0; W < e; W++) C[W] = 0, k[W] = 0, z[W] = 0;
    return { geometry: null, program: null, wireframe: false, newAttributes: C, enabledAttributes: k, attributeDivisors: z, object: M, attributes: {}, index: null };
  }
  function m(M, C, k, z) {
    const W = r.attributes, j = C.attributes;
    let V = 0;
    const K = k.getAttributes();
    for (const G in K) if (K[G].location >= 0) {
      const ct = W[G];
      let xt = j[G];
      if (xt === void 0 && (G === "instanceMatrix" && M.instanceMatrix && (xt = M.instanceMatrix), G === "instanceColor" && M.instanceColor && (xt = M.instanceColor)), ct === void 0 || ct.attribute !== xt || xt && ct.data !== xt.data) return true;
      V++;
    }
    return r.attributesNum !== V || r.index !== z;
  }
  function g(M, C, k, z) {
    const W = {}, j = C.attributes;
    let V = 0;
    const K = k.getAttributes();
    for (const G in K) if (K[G].location >= 0) {
      let ct = j[G];
      ct === void 0 && (G === "instanceMatrix" && M.instanceMatrix && (ct = M.instanceMatrix), G === "instanceColor" && M.instanceColor && (ct = M.instanceColor));
      const xt = {};
      xt.attribute = ct, ct && ct.data && (xt.data = ct.data), W[G] = xt, V++;
    }
    r.attributes = W, r.attributesNum = V, r.index = z;
  }
  function v() {
    const M = r.newAttributes;
    for (let C = 0, k = M.length; C < k; C++) M[C] = 0;
  }
  function p(M) {
    u(M, 0);
  }
  function u(M, C) {
    const k = r.newAttributes, z = r.enabledAttributes, W = r.attributeDivisors;
    k[M] = 1, z[M] === 0 && (i.enableVertexAttribArray(M), z[M] = 1), W[M] !== C && (i.vertexAttribDivisor(M, C), W[M] = C);
  }
  function T() {
    const M = r.newAttributes, C = r.enabledAttributes;
    for (let k = 0, z = C.length; k < z; k++) C[k] !== M[k] && (i.disableVertexAttribArray(k), C[k] = 0);
  }
  function b(M, C, k, z, W, j, V) {
    V === true ? i.vertexAttribIPointer(M, C, k, W, j) : i.vertexAttribPointer(M, C, k, z, W, j);
  }
  function S(M, C, k, z) {
    v();
    const W = z.attributes, j = k.getAttributes(), V = C.defaultAttributeValues;
    for (const K in j) {
      const G = j[K];
      if (G.location >= 0) {
        let it = W[K];
        if (it === void 0 && (K === "instanceMatrix" && M.instanceMatrix && (it = M.instanceMatrix), K === "instanceColor" && M.instanceColor && (it = M.instanceColor)), it !== void 0) {
          const ct = it.normalized, xt = it.itemSize, It = t.get(it);
          if (It === void 0) continue;
          const Zt = It.buffer, Y = It.type, tt = It.bytesPerElement, gt = Y === i.INT || Y === i.UNSIGNED_INT || it.gpuType === sa;
          if (it.isInterleavedBufferAttribute) {
            const st = it.data, Et = st.stride, wt = it.offset;
            if (st.isInstancedInterleavedBuffer) {
              for (let Ut = 0; Ut < G.locationSize; Ut++) u(G.location + Ut, st.meshPerAttribute);
              M.isInstancedMesh !== true && z._maxInstanceCount === void 0 && (z._maxInstanceCount = st.meshPerAttribute * st.count);
            } else for (let Ut = 0; Ut < G.locationSize; Ut++) p(G.location + Ut);
            i.bindBuffer(i.ARRAY_BUFFER, Zt);
            for (let Ut = 0; Ut < G.locationSize; Ut++) b(G.location + Ut, xt / G.locationSize, Y, ct, Et * tt, (wt + xt / G.locationSize * Ut) * tt, gt);
          } else {
            if (it.isInstancedBufferAttribute) {
              for (let st = 0; st < G.locationSize; st++) u(G.location + st, it.meshPerAttribute);
              M.isInstancedMesh !== true && z._maxInstanceCount === void 0 && (z._maxInstanceCount = it.meshPerAttribute * it.count);
            } else for (let st = 0; st < G.locationSize; st++) p(G.location + st);
            i.bindBuffer(i.ARRAY_BUFFER, Zt);
            for (let st = 0; st < G.locationSize; st++) b(G.location + st, xt / G.locationSize, Y, ct, xt * tt, xt / G.locationSize * st * tt, gt);
          }
        } else if (V !== void 0) {
          const ct = V[K];
          if (ct !== void 0) switch (ct.length) {
            case 2:
              i.vertexAttrib2fv(G.location, ct);
              break;
            case 3:
              i.vertexAttrib3fv(G.location, ct);
              break;
            case 4:
              i.vertexAttrib4fv(G.location, ct);
              break;
            default:
              i.vertexAttrib1fv(G.location, ct);
          }
        }
      }
    }
    T();
  }
  function N() {
    U();
    for (const M in n) {
      const C = n[M];
      for (const k in C) {
        const z = C[k];
        for (const W in z) h(z[W].object), delete z[W];
        delete C[k];
      }
      delete n[M];
    }
  }
  function w(M) {
    if (n[M.id] === void 0) return;
    const C = n[M.id];
    for (const k in C) {
      const z = C[k];
      for (const W in z) h(z[W].object), delete z[W];
      delete C[k];
    }
    delete n[M.id];
  }
  function A(M) {
    for (const C in n) {
      const k = n[C];
      if (k[M.id] === void 0) continue;
      const z = k[M.id];
      for (const W in z) h(z[W].object), delete z[W];
      delete k[M.id];
    }
  }
  function U() {
    y(), a = true, r !== s && (r = s, c(r.object));
  }
  function y() {
    s.geometry = null, s.program = null, s.wireframe = false;
  }
  return { setup: o, reset: U, resetDefaultState: y, dispose: N, releaseStatesOfGeometry: w, releaseStatesOfProgram: A, initAttributes: v, enableAttribute: p, disableUnusedAttributes: T };
}
function Gd(i, t, e) {
  let n;
  function s(c) {
    n = c;
  }
  function r(c, h) {
    i.drawArrays(n, c, h), e.update(h, n, 1);
  }
  function a(c, h, f) {
    f !== 0 && (i.drawArraysInstanced(n, c, h, f), e.update(h, n, f));
  }
  function o(c, h, f) {
    if (f === 0) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, c, 0, h, 0, f);
    let m = 0;
    for (let g = 0; g < f; g++) m += h[g];
    e.update(m, n, 1);
  }
  function l(c, h, f, d) {
    if (f === 0) return;
    const m = t.get("WEBGL_multi_draw");
    if (m === null) for (let g = 0; g < c.length; g++) a(c[g], h[g], d[g]);
    else {
      m.multiDrawArraysInstancedWEBGL(n, c, 0, h, 0, d, 0, f);
      let g = 0;
      for (let v = 0; v < f; v++) g += h[v] * d[v];
      e.update(g, n, 1);
    }
  }
  this.setMode = s, this.render = r, this.renderInstances = a, this.renderMultiDraw = o, this.renderMultiDrawInstances = l;
}
function Vd(i, t, e, n) {
  let s;
  function r() {
    if (s !== void 0) return s;
    if (t.has("EXT_texture_filter_anisotropic") === true) {
      const A = t.get("EXT_texture_filter_anisotropic");
      s = i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else s = 0;
    return s;
  }
  function a(A) {
    return !(A !== ke && n.convert(A) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(A) {
    const U = A === Oi && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(A !== on && n.convert(A) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && A !== Ye && !U);
  }
  function l(A) {
    if (A === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0) return "highp";
      A = "mediump";
    }
    return A === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let c = e.precision !== void 0 ? e.precision : "highp";
  const h = l(c);
  h !== c && (console.warn("THREE.WebGLRenderer:", c, "not supported, using", h, "instead."), c = h);
  const f = e.logarithmicDepthBuffer === true, d = e.reverseDepthBuffer === true && t.has("EXT_clip_control"), m = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), g = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), v = i.getParameter(i.MAX_TEXTURE_SIZE), p = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), u = i.getParameter(i.MAX_VERTEX_ATTRIBS), T = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), b = i.getParameter(i.MAX_VARYING_VECTORS), S = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), N = g > 0, w = i.getParameter(i.MAX_SAMPLES);
  return { isWebGL2: true, getMaxAnisotropy: r, getMaxPrecision: l, textureFormatReadable: a, textureTypeReadable: o, precision: c, logarithmicDepthBuffer: f, reverseDepthBuffer: d, maxTextures: m, maxVertexTextures: g, maxTextureSize: v, maxCubemapSize: p, maxAttributes: u, maxVertexUniforms: T, maxVaryings: b, maxFragmentUniforms: S, vertexTextures: N, maxSamples: w };
}
function Wd(i) {
  const t = this;
  let e = null, n = 0, s = false, r = false;
  const a = new gn(), o = new Pt(), l = { value: null, needsUpdate: false };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(f, d) {
    const m = f.length !== 0 || d || n !== 0 || s;
    return s = d, n = f.length, m;
  }, this.beginShadows = function() {
    r = true, h(null);
  }, this.endShadows = function() {
    r = false;
  }, this.setGlobalState = function(f, d) {
    e = h(f, d, 0);
  }, this.setState = function(f, d, m) {
    const g = f.clippingPlanes, v = f.clipIntersection, p = f.clipShadows, u = i.get(f);
    if (!s || g === null || g.length === 0 || r && !p) r ? h(null) : c();
    else {
      const T = r ? 0 : n, b = T * 4;
      let S = u.clippingState || null;
      l.value = S, S = h(g, d, b, m);
      for (let N = 0; N !== b; ++N) S[N] = e[N];
      u.clippingState = S, this.numIntersection = v ? this.numPlanes : 0, this.numPlanes += T;
    }
  };
  function c() {
    l.value !== e && (l.value = e, l.needsUpdate = n > 0), t.numPlanes = n, t.numIntersection = 0;
  }
  function h(f, d, m, g) {
    const v = f !== null ? f.length : 0;
    let p = null;
    if (v !== 0) {
      if (p = l.value, g !== true || p === null) {
        const u = m + v * 4, T = d.matrixWorldInverse;
        o.getNormalMatrix(T), (p === null || p.length < u) && (p = new Float32Array(u));
        for (let b = 0, S = m; b !== v; ++b, S += 4) a.copy(f[b]).applyMatrix4(T, o), a.normal.toArray(p, S), p[S + 3] = a.constant;
      }
      l.value = p, l.needsUpdate = true;
    }
    return t.numPlanes = v, t.numIntersection = 0, p;
  }
}
function Xd(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(a, o) {
    return o === Er ? a.mapping = hi : o === br && (a.mapping = ui), a;
  }
  function n(a) {
    if (a && a.isTexture) {
      const o = a.mapping;
      if (o === Er || o === br) if (t.has(a)) {
        const l = t.get(a).texture;
        return e(l, a.mapping);
      } else {
        const l = a.image;
        if (l && l.height > 0) {
          const c = new nh(l.height);
          return c.fromEquirectangularTexture(i, a), t.set(a, c), a.addEventListener("dispose", s), e(c.texture, a.mapping);
        } else return null;
      }
    }
    return a;
  }
  function s(a) {
    const o = a.target;
    o.removeEventListener("dispose", s);
    const l = t.get(o);
    l !== void 0 && (t.delete(o), l.dispose());
  }
  function r() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return { get: n, dispose: r };
}
class Ml extends _l {
  constructor(t = -1, e = 1, n = 1, s = -1, r = 0.1, a = 2e3) {
    super(), this.isOrthographicCamera = true, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = t, this.right = e, this.top = n, this.bottom = s, this.near = r, this.far = a, this.updateProjectionMatrix();
  }
  copy(t, e) {
    return super.copy(t, e), this.left = t.left, this.right = t.right, this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, this.zoom = t.zoom, this.view = t.view === null ? null : Object.assign({}, t.view), this;
  }
  setViewOffset(t, e, n, s, r, a) {
    this.view === null && (this.view = { enabled: true, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = true, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = s, this.view.width = r, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = false), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const t = (this.right - this.left) / (2 * this.zoom), e = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, s = (this.top + this.bottom) / 2;
    let r = n - t, a = n + t, o = s + e, l = s - e;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom, h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      r += c * this.view.offsetX, a = r + c * this.view.width, o -= h * this.view.offsetY, l = o - h * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(r, a, o, l, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, this.view !== null && (e.object.view = Object.assign({}, this.view)), e;
  }
}
const si = 4, ao = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], Dn = 20, er = new Ml(), oo = new Nt();
let nr = null, ir = 0, sr = 0, rr = false;
const Rn = (1 + Math.sqrt(5)) / 2, ei = 1 / Rn, lo = [new P(-Rn, ei, 0), new P(Rn, ei, 0), new P(-ei, 0, Rn), new P(ei, 0, Rn), new P(0, Rn, -ei), new P(0, Rn, ei), new P(-1, 1, -1), new P(1, 1, -1), new P(-1, 1, 1), new P(1, 1, 1)];
class co {
  constructor(t) {
    this._renderer = t, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  fromScene(t, e = 0, n = 0.1, s = 100) {
    nr = this._renderer.getRenderTarget(), ir = this._renderer.getActiveCubeFace(), sr = this._renderer.getActiveMipmapLevel(), rr = this._renderer.xr.enabled, this._renderer.xr.enabled = false, this._setSize(256);
    const r = this._allocateTargets();
    return r.depthBuffer = true, this._sceneToCubeUV(t, n, s, r), e > 0 && this._blur(r, 0, 0, e), this._applyPMREM(r), this._cleanup(r), r;
  }
  fromEquirectangular(t, e = null) {
    return this._fromTexture(t, e);
  }
  fromCubemap(t, e = null) {
    return this._fromTexture(t, e);
  }
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = fo(), this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = uo(), this._compileMaterial(this._equirectMaterial));
  }
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  _setSize(t) {
    this._lodMax = Math.floor(Math.log2(t)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let t = 0; t < this._lodPlanes.length; t++) this._lodPlanes[t].dispose();
  }
  _cleanup(t) {
    this._renderer.setRenderTarget(nr, ir, sr), this._renderer.xr.enabled = rr, t.scissorTest = false, os(t, 0, 0, t.width, t.height);
  }
  _fromTexture(t, e) {
    t.mapping === hi || t.mapping === ui ? this._setSize(t.image.length === 0 ? 16 : t.image[0].width || t.image[0].image.width) : this._setSize(t.image.width / 4), nr = this._renderer.getRenderTarget(), ir = this._renderer.getActiveCubeFace(), sr = this._renderer.getActiveMipmapLevel(), rr = this._renderer.xr.enabled, this._renderer.xr.enabled = false;
    const n = e || this._allocateTargets();
    return this._textureToCubeUV(t, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const t = 3 * Math.max(this._cubeSize, 112), e = 4 * this._cubeSize, n = { magFilter: Xe, minFilter: Xe, generateMipmaps: false, type: Oi, format: ke, colorSpace: mi, depthBuffer: false }, s = ho(t, e, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== t || this._pingPongRenderTarget.height !== e) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = ho(t, e, n);
      const { _lodMax: r } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = Yd(r)), this._blurMaterial = qd(r, t, e);
    }
    return s;
  }
  _compileMaterial(t) {
    const e = new Ue(this._lodPlanes[0], t);
    this._renderer.compile(e, er);
  }
  _sceneToCubeUV(t, e, n, s) {
    const o = new we(90, 1, e, n), l = [1, -1, 1, 1, 1, 1], c = [1, 1, 1, -1, -1, -1], h = this._renderer, f = h.autoClear, d = h.toneMapping;
    h.getClearColor(oo), h.toneMapping = xn, h.autoClear = false;
    const m = new da({ name: "PMREM.Background", side: ye, depthWrite: false, depthTest: false }), g = new Ue(new On(), m);
    let v = false;
    const p = t.background;
    p ? p.isColor && (m.color.copy(p), t.background = null, v = true) : (m.color.copy(oo), v = true);
    for (let u = 0; u < 6; u++) {
      const T = u % 3;
      T === 0 ? (o.up.set(0, l[u], 0), o.lookAt(c[u], 0, 0)) : T === 1 ? (o.up.set(0, 0, l[u]), o.lookAt(0, c[u], 0)) : (o.up.set(0, l[u], 0), o.lookAt(0, 0, c[u]));
      const b = this._cubeSize;
      os(s, T * b, u > 2 ? b : 0, b, b), h.setRenderTarget(s), v && h.render(g, o), h.render(t, o);
    }
    g.geometry.dispose(), g.material.dispose(), h.toneMapping = d, h.autoClear = f, t.background = p;
  }
  _textureToCubeUV(t, e) {
    const n = this._renderer, s = t.mapping === hi || t.mapping === ui;
    s ? (this._cubemapMaterial === null && (this._cubemapMaterial = fo()), this._cubemapMaterial.uniforms.flipEnvMap.value = t.isRenderTargetTexture === false ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = uo());
    const r = s ? this._cubemapMaterial : this._equirectMaterial, a = new Ue(this._lodPlanes[0], r), o = r.uniforms;
    o.envMap.value = t;
    const l = this._cubeSize;
    os(e, 0, 0, 3 * l, 2 * l), n.setRenderTarget(e), n.render(a, er);
  }
  _applyPMREM(t) {
    const e = this._renderer, n = e.autoClear;
    e.autoClear = false;
    const s = this._lodPlanes.length;
    for (let r = 1; r < s; r++) {
      const a = Math.sqrt(this._sigmas[r] * this._sigmas[r] - this._sigmas[r - 1] * this._sigmas[r - 1]), o = lo[(s - r - 1) % lo.length];
      this._blur(t, r - 1, r, a, o);
    }
    e.autoClear = n;
  }
  _blur(t, e, n, s, r) {
    const a = this._pingPongRenderTarget;
    this._halfBlur(t, a, e, n, s, "latitudinal", r), this._halfBlur(a, t, n, n, s, "longitudinal", r);
  }
  _halfBlur(t, e, n, s, r, a, o) {
    const l = this._renderer, c = this._blurMaterial;
    a !== "latitudinal" && a !== "longitudinal" && console.error("blur direction must be either latitudinal or longitudinal!");
    const h = 3, f = new Ue(this._lodPlanes[s], c), d = c.uniforms, m = this._sizeLods[n] - 1, g = isFinite(r) ? Math.PI / (2 * m) : 2 * Math.PI / (2 * Dn - 1), v = r / g, p = isFinite(r) ? 1 + Math.floor(h * v) : Dn;
    p > Dn && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Dn}`);
    const u = [];
    let T = 0;
    for (let A = 0; A < Dn; ++A) {
      const U = A / v, y = Math.exp(-U * U / 2);
      u.push(y), A === 0 ? T += y : A < p && (T += 2 * y);
    }
    for (let A = 0; A < u.length; A++) u[A] = u[A] / T;
    d.envMap.value = t.texture, d.samples.value = p, d.weights.value = u, d.latitudinal.value = a === "latitudinal", o && (d.poleAxis.value = o);
    const { _lodMax: b } = this;
    d.dTheta.value = g, d.mipInt.value = b - n;
    const S = this._sizeLods[s], N = 3 * S * (s > b - si ? s - b + si : 0), w = 4 * (this._cubeSize - S);
    os(e, N, w, 3 * S, 2 * S), l.setRenderTarget(e), l.render(f, er);
  }
}
function Yd(i) {
  const t = [], e = [], n = [];
  let s = i;
  const r = i - si + 1 + ao.length;
  for (let a = 0; a < r; a++) {
    const o = Math.pow(2, s);
    e.push(o);
    let l = 1 / o;
    a > i - si ? l = ao[a - i + si - 1] : a === 0 && (l = 0), n.push(l);
    const c = 1 / (o - 2), h = -c, f = 1 + c, d = [h, h, f, h, f, f, h, h, f, f, h, f], m = 6, g = 6, v = 3, p = 2, u = 1, T = new Float32Array(v * g * m), b = new Float32Array(p * g * m), S = new Float32Array(u * g * m);
    for (let w = 0; w < m; w++) {
      const A = w % 3 * 2 / 3 - 1, U = w > 2 ? 0 : -1, y = [A, U, 0, A + 2 / 3, U, 0, A + 2 / 3, U + 1, 0, A, U, 0, A + 2 / 3, U + 1, 0, A, U + 1, 0];
      T.set(y, v * g * w), b.set(d, p * g * w);
      const M = [w, w, w, w, w, w];
      S.set(M, u * g * w);
    }
    const N = new Ge();
    N.setAttribute("position", new He(T, v)), N.setAttribute("uv", new He(b, p)), N.setAttribute("faceIndex", new He(S, u)), t.push(N), s > si && s--;
  }
  return { lodPlanes: t, sizeLods: e, sigmas: n };
}
function ho(i, t, e) {
  const n = new Nn(i, t, e);
  return n.texture.mapping = Cs, n.texture.name = "PMREM.cubeUv", n.scissorTest = true, n;
}
function os(i, t, e, n, s) {
  i.viewport.set(t, e, n, s), i.scissor.set(t, e, n, s);
}
function qd(i, t, e) {
  const n = new Float32Array(Dn), s = new P(0, 1, 0);
  return new Sn({ name: "SphericalGaussianBlur", defines: { n: Dn, CUBEUV_TEXEL_WIDTH: 1 / t, CUBEUV_TEXEL_HEIGHT: 1 / e, CUBEUV_MAX_MIP: `${i}.0` }, uniforms: { envMap: { value: null }, samples: { value: 1 }, weights: { value: n }, latitudinal: { value: false }, dTheta: { value: 0 }, mipInt: { value: 0 }, poleAxis: { value: s } }, vertexShader: pa(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`, blending: vn, depthTest: false, depthWrite: false });
}
function uo() {
  return new Sn({ name: "EquirectangularToCubeUV", uniforms: { envMap: { value: null } }, vertexShader: pa(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`, blending: vn, depthTest: false, depthWrite: false });
}
function fo() {
  return new Sn({ name: "CubemapToCubeUV", uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } }, vertexShader: pa(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`, blending: vn, depthTest: false, depthWrite: false });
}
function pa() {
  return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
}
function $d(i) {
  let t = /* @__PURE__ */ new WeakMap(), e = null;
  function n(o) {
    if (o && o.isTexture) {
      const l = o.mapping, c = l === Er || l === br, h = l === hi || l === ui;
      if (c || h) {
        let f = t.get(o);
        const d = f !== void 0 ? f.texture.pmremVersion : 0;
        if (o.isRenderTargetTexture && o.pmremVersion !== d) return e === null && (e = new co(i)), f = c ? e.fromEquirectangular(o, f) : e.fromCubemap(o, f), f.texture.pmremVersion = o.pmremVersion, t.set(o, f), f.texture;
        if (f !== void 0) return f.texture;
        {
          const m = o.image;
          return c && m && m.height > 0 || h && m && s(m) ? (e === null && (e = new co(i)), f = c ? e.fromEquirectangular(o) : e.fromCubemap(o), f.texture.pmremVersion = o.pmremVersion, t.set(o, f), o.addEventListener("dispose", r), f.texture) : null;
        }
      }
    }
    return o;
  }
  function s(o) {
    let l = 0;
    const c = 6;
    for (let h = 0; h < c; h++) o[h] !== void 0 && l++;
    return l === c;
  }
  function r(o) {
    const l = o.target;
    l.removeEventListener("dispose", r);
    const c = t.get(l);
    c !== void 0 && (t.delete(l), c.dispose());
  }
  function a() {
    t = /* @__PURE__ */ new WeakMap(), e !== null && (e.dispose(), e = null);
  }
  return { get: n, dispose: a };
}
function jd(i) {
  const t = {};
  function e(n) {
    if (t[n] !== void 0) return t[n];
    let s;
    switch (n) {
      case "WEBGL_depth_texture":
        s = i.getExtension("WEBGL_depth_texture") || i.getExtension("MOZ_WEBGL_depth_texture") || i.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        s = i.getExtension("EXT_texture_filter_anisotropic") || i.getExtension("MOZ_EXT_texture_filter_anisotropic") || i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        s = i.getExtension("WEBGL_compressed_texture_s3tc") || i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        s = i.getExtension("WEBGL_compressed_texture_pvrtc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        s = i.getExtension(n);
    }
    return t[n] = s, s;
  }
  return { has: function(n) {
    return e(n) !== null;
  }, init: function() {
    e("EXT_color_buffer_float"), e("WEBGL_clip_cull_distance"), e("OES_texture_float_linear"), e("EXT_color_buffer_half_float"), e("WEBGL_multisampled_render_to_texture"), e("WEBGL_render_shared_exponent");
  }, get: function(n) {
    const s = e(n);
    return s === null && Pi("THREE.WebGLRenderer: " + n + " extension not supported."), s;
  } };
}
function Zd(i, t, e, n) {
  const s = {}, r = /* @__PURE__ */ new WeakMap();
  function a(f) {
    const d = f.target;
    d.index !== null && t.remove(d.index);
    for (const g in d.attributes) t.remove(d.attributes[g]);
    for (const g in d.morphAttributes) {
      const v = d.morphAttributes[g];
      for (let p = 0, u = v.length; p < u; p++) t.remove(v[p]);
    }
    d.removeEventListener("dispose", a), delete s[d.id];
    const m = r.get(d);
    m && (t.remove(m), r.delete(d)), n.releaseStatesOfGeometry(d), d.isInstancedBufferGeometry === true && delete d._maxInstanceCount, e.memory.geometries--;
  }
  function o(f, d) {
    return s[d.id] === true || (d.addEventListener("dispose", a), s[d.id] = true, e.memory.geometries++), d;
  }
  function l(f) {
    const d = f.attributes;
    for (const g in d) t.update(d[g], i.ARRAY_BUFFER);
    const m = f.morphAttributes;
    for (const g in m) {
      const v = m[g];
      for (let p = 0, u = v.length; p < u; p++) t.update(v[p], i.ARRAY_BUFFER);
    }
  }
  function c(f) {
    const d = [], m = f.index, g = f.attributes.position;
    let v = 0;
    if (m !== null) {
      const T = m.array;
      v = m.version;
      for (let b = 0, S = T.length; b < S; b += 3) {
        const N = T[b + 0], w = T[b + 1], A = T[b + 2];
        d.push(N, w, w, A, A, N);
      }
    } else if (g !== void 0) {
      const T = g.array;
      v = g.version;
      for (let b = 0, S = T.length / 3 - 1; b < S; b += 3) {
        const N = b + 0, w = b + 1, A = b + 2;
        d.push(N, w, w, A, A, N);
      }
    } else return;
    const p = new (cl(d) ? ml : pl)(d, 1);
    p.version = v;
    const u = r.get(f);
    u && t.remove(u), r.set(f, p);
  }
  function h(f) {
    const d = r.get(f);
    if (d) {
      const m = f.index;
      m !== null && d.version < m.version && c(f);
    } else c(f);
    return r.get(f);
  }
  return { get: o, update: l, getWireframeAttribute: h };
}
function Kd(i, t, e) {
  let n;
  function s(d) {
    n = d;
  }
  let r, a;
  function o(d) {
    r = d.type, a = d.bytesPerElement;
  }
  function l(d, m) {
    i.drawElements(n, m, r, d * a), e.update(m, n, 1);
  }
  function c(d, m, g) {
    g !== 0 && (i.drawElementsInstanced(n, m, r, d * a, g), e.update(m, n, g));
  }
  function h(d, m, g) {
    if (g === 0) return;
    t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, m, 0, r, d, 0, g);
    let p = 0;
    for (let u = 0; u < g; u++) p += m[u];
    e.update(p, n, 1);
  }
  function f(d, m, g, v) {
    if (g === 0) return;
    const p = t.get("WEBGL_multi_draw");
    if (p === null) for (let u = 0; u < d.length; u++) c(d[u] / a, m[u], v[u]);
    else {
      p.multiDrawElementsInstancedWEBGL(n, m, 0, r, d, 0, v, 0, g);
      let u = 0;
      for (let T = 0; T < g; T++) u += m[T] * v[T];
      e.update(u, n, 1);
    }
  }
  this.setMode = s, this.setIndex = o, this.render = l, this.renderInstances = c, this.renderMultiDraw = h, this.renderMultiDrawInstances = f;
}
function Jd(i) {
  const t = { geometries: 0, textures: 0 }, e = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
  function n(r, a, o) {
    switch (e.calls++, a) {
      case i.TRIANGLES:
        e.triangles += o * (r / 3);
        break;
      case i.LINES:
        e.lines += o * (r / 2);
        break;
      case i.LINE_STRIP:
        e.lines += o * (r - 1);
        break;
      case i.LINE_LOOP:
        e.lines += o * r;
        break;
      case i.POINTS:
        e.points += o * r;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", a);
        break;
    }
  }
  function s() {
    e.calls = 0, e.triangles = 0, e.points = 0, e.lines = 0;
  }
  return { memory: t, render: e, programs: null, autoReset: true, reset: s, update: n };
}
function Qd(i, t, e) {
  const n = /* @__PURE__ */ new WeakMap(), s = new jt();
  function r(a, o, l) {
    const c = a.morphTargetInfluences, h = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, f = h !== void 0 ? h.length : 0;
    let d = n.get(o);
    if (d === void 0 || d.count !== f) {
      let M = function() {
        U.dispose(), n.delete(o), o.removeEventListener("dispose", M);
      };
      var m = M;
      d !== void 0 && d.texture.dispose();
      const g = o.morphAttributes.position !== void 0, v = o.morphAttributes.normal !== void 0, p = o.morphAttributes.color !== void 0, u = o.morphAttributes.position || [], T = o.morphAttributes.normal || [], b = o.morphAttributes.color || [];
      let S = 0;
      g === true && (S = 1), v === true && (S = 2), p === true && (S = 3);
      let N = o.attributes.position.count * S, w = 1;
      N > t.maxTextureSize && (w = Math.ceil(N / t.maxTextureSize), N = t.maxTextureSize);
      const A = new Float32Array(N * w * 4 * f), U = new ul(A, N, w, f);
      U.type = Ye, U.needsUpdate = true;
      const y = S * 4;
      for (let C = 0; C < f; C++) {
        const k = u[C], z = T[C], W = b[C], j = N * w * 4 * C;
        for (let V = 0; V < k.count; V++) {
          const K = V * y;
          g === true && (s.fromBufferAttribute(k, V), A[j + K + 0] = s.x, A[j + K + 1] = s.y, A[j + K + 2] = s.z, A[j + K + 3] = 0), v === true && (s.fromBufferAttribute(z, V), A[j + K + 4] = s.x, A[j + K + 5] = s.y, A[j + K + 6] = s.z, A[j + K + 7] = 0), p === true && (s.fromBufferAttribute(W, V), A[j + K + 8] = s.x, A[j + K + 9] = s.y, A[j + K + 10] = s.z, A[j + K + 11] = W.itemSize === 4 ? s.w : 1);
        }
      }
      d = { count: f, texture: U, size: new At(N, w) }, n.set(o, d), o.addEventListener("dispose", M);
    }
    if (a.isInstancedMesh === true && a.morphTexture !== null) l.getUniforms().setValue(i, "morphTexture", a.morphTexture, e);
    else {
      let g = 0;
      for (let p = 0; p < c.length; p++) g += c[p];
      const v = o.morphTargetsRelative ? 1 : 1 - g;
      l.getUniforms().setValue(i, "morphTargetBaseInfluence", v), l.getUniforms().setValue(i, "morphTargetInfluences", c);
    }
    l.getUniforms().setValue(i, "morphTargetsTexture", d.texture, e), l.getUniforms().setValue(i, "morphTargetsTextureSize", d.size);
  }
  return { update: r };
}
function tf(i, t, e, n) {
  let s = /* @__PURE__ */ new WeakMap();
  function r(l) {
    const c = n.render.frame, h = l.geometry, f = t.get(l, h);
    if (s.get(f) !== c && (t.update(f), s.set(f, c)), l.isInstancedMesh && (l.hasEventListener("dispose", o) === false && l.addEventListener("dispose", o), s.get(l) !== c && (e.update(l.instanceMatrix, i.ARRAY_BUFFER), l.instanceColor !== null && e.update(l.instanceColor, i.ARRAY_BUFFER), s.set(l, c))), l.isSkinnedMesh) {
      const d = l.skeleton;
      s.get(d) !== c && (d.update(), s.set(d, c));
    }
    return f;
  }
  function a() {
    s = /* @__PURE__ */ new WeakMap();
  }
  function o(l) {
    const c = l.target;
    c.removeEventListener("dispose", o), e.remove(c.instanceMatrix), c.instanceColor !== null && e.remove(c.instanceColor);
  }
  return { update: r, dispose: a };
}
class Sl extends _e {
  constructor(t, e, n, s, r, a, o, l, c, h = oi) {
    if (h !== oi && h !== fi) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && h === oi && (n = Un), n === void 0 && h === fi && (n = di), super(null, s, r, a, o, l, h, n, c), this.isDepthTexture = true, this.image = { width: t, height: e }, this.magFilter = o !== void 0 ? o : Ce, this.minFilter = l !== void 0 ? l : Ce, this.flipY = false, this.generateMipmaps = false, this.compareFunction = null;
  }
  copy(t) {
    return super.copy(t), this.compareFunction = t.compareFunction, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.compareFunction !== null && (e.compareFunction = this.compareFunction), e;
  }
}
const yl = new _e(), po = new Sl(1, 1), El = new ul(), bl = new kc(), Tl = new vl(), mo = [], go = [], _o = new Float32Array(16), vo = new Float32Array(9), xo = new Float32Array(4);
function vi(i, t, e) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const s = t * e;
  let r = mo[s];
  if (r === void 0 && (r = new Float32Array(s), mo[s] = r), t !== 0) {
    n.toArray(r, 0);
    for (let a = 1, o = 0; a !== t; ++a) o += e, i[a].toArray(r, o);
  }
  return r;
}
function oe(i, t) {
  if (i.length !== t.length) return false;
  for (let e = 0, n = i.length; e < n; e++) if (i[e] !== t[e]) return false;
  return true;
}
function le(i, t) {
  for (let e = 0, n = t.length; e < n; e++) i[e] = t[e];
}
function Ds(i, t) {
  let e = go[t];
  e === void 0 && (e = new Int32Array(t), go[t] = e);
  for (let n = 0; n !== t; ++n) e[n] = i.allocateTextureUnit();
  return e;
}
function ef(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1f(this.addr, t), e[0] = t);
}
function nf(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y) && (i.uniform2f(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (oe(e, t)) return;
    i.uniform2fv(this.addr, t), le(e, t);
  }
}
function sf(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3f(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else if (t.r !== void 0) (e[0] !== t.r || e[1] !== t.g || e[2] !== t.b) && (i.uniform3f(this.addr, t.r, t.g, t.b), e[0] = t.r, e[1] = t.g, e[2] = t.b);
  else {
    if (oe(e, t)) return;
    i.uniform3fv(this.addr, t), le(e, t);
  }
}
function rf(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4f(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (oe(e, t)) return;
    i.uniform4fv(this.addr, t), le(e, t);
  }
}
function af(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (oe(e, t)) return;
    i.uniformMatrix2fv(this.addr, false, t), le(e, t);
  } else {
    if (oe(e, n)) return;
    xo.set(n), i.uniformMatrix2fv(this.addr, false, xo), le(e, n);
  }
}
function of(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (oe(e, t)) return;
    i.uniformMatrix3fv(this.addr, false, t), le(e, t);
  } else {
    if (oe(e, n)) return;
    vo.set(n), i.uniformMatrix3fv(this.addr, false, vo), le(e, n);
  }
}
function lf(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (oe(e, t)) return;
    i.uniformMatrix4fv(this.addr, false, t), le(e, t);
  } else {
    if (oe(e, n)) return;
    _o.set(n), i.uniformMatrix4fv(this.addr, false, _o), le(e, n);
  }
}
function cf(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1i(this.addr, t), e[0] = t);
}
function hf(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y) && (i.uniform2i(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (oe(e, t)) return;
    i.uniform2iv(this.addr, t), le(e, t);
  }
}
function uf(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3i(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (oe(e, t)) return;
    i.uniform3iv(this.addr, t), le(e, t);
  }
}
function df(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4i(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (oe(e, t)) return;
    i.uniform4iv(this.addr, t), le(e, t);
  }
}
function ff(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1ui(this.addr, t), e[0] = t);
}
function pf(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y) && (i.uniform2ui(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (oe(e, t)) return;
    i.uniform2uiv(this.addr, t), le(e, t);
  }
}
function mf(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3ui(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (oe(e, t)) return;
    i.uniform3uiv(this.addr, t), le(e, t);
  }
}
function gf(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4ui(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (oe(e, t)) return;
    i.uniform4uiv(this.addr, t), le(e, t);
  }
}
function _f(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s);
  let r;
  this.type === i.SAMPLER_2D_SHADOW ? (po.compareFunction = ll, r = po) : r = yl, e.setTexture2D(t || r, s);
}
function vf(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTexture3D(t || bl, s);
}
function xf(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTextureCube(t || Tl, s);
}
function Mf(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTexture2DArray(t || El, s);
}
function Sf(i) {
  switch (i) {
    case 5126:
      return ef;
    case 35664:
      return nf;
    case 35665:
      return sf;
    case 35666:
      return rf;
    case 35674:
      return af;
    case 35675:
      return of;
    case 35676:
      return lf;
    case 5124:
    case 35670:
      return cf;
    case 35667:
    case 35671:
      return hf;
    case 35668:
    case 35672:
      return uf;
    case 35669:
    case 35673:
      return df;
    case 5125:
      return ff;
    case 36294:
      return pf;
    case 36295:
      return mf;
    case 36296:
      return gf;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return _f;
    case 35679:
    case 36299:
    case 36307:
      return vf;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return xf;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Mf;
  }
}
function yf(i, t) {
  i.uniform1fv(this.addr, t);
}
function Ef(i, t) {
  const e = vi(t, this.size, 2);
  i.uniform2fv(this.addr, e);
}
function bf(i, t) {
  const e = vi(t, this.size, 3);
  i.uniform3fv(this.addr, e);
}
function Tf(i, t) {
  const e = vi(t, this.size, 4);
  i.uniform4fv(this.addr, e);
}
function Af(i, t) {
  const e = vi(t, this.size, 4);
  i.uniformMatrix2fv(this.addr, false, e);
}
function wf(i, t) {
  const e = vi(t, this.size, 9);
  i.uniformMatrix3fv(this.addr, false, e);
}
function Cf(i, t) {
  const e = vi(t, this.size, 16);
  i.uniformMatrix4fv(this.addr, false, e);
}
function Rf(i, t) {
  i.uniform1iv(this.addr, t);
}
function Pf(i, t) {
  i.uniform2iv(this.addr, t);
}
function Df(i, t) {
  i.uniform3iv(this.addr, t);
}
function Lf(i, t) {
  i.uniform4iv(this.addr, t);
}
function If(i, t) {
  i.uniform1uiv(this.addr, t);
}
function Uf(i, t) {
  i.uniform2uiv(this.addr, t);
}
function Nf(i, t) {
  i.uniform3uiv(this.addr, t);
}
function Ff(i, t) {
  i.uniform4uiv(this.addr, t);
}
function Of(i, t, e) {
  const n = this.cache, s = t.length, r = Ds(e, s);
  oe(n, r) || (i.uniform1iv(this.addr, r), le(n, r));
  for (let a = 0; a !== s; ++a) e.setTexture2D(t[a] || yl, r[a]);
}
function Bf(i, t, e) {
  const n = this.cache, s = t.length, r = Ds(e, s);
  oe(n, r) || (i.uniform1iv(this.addr, r), le(n, r));
  for (let a = 0; a !== s; ++a) e.setTexture3D(t[a] || bl, r[a]);
}
function zf(i, t, e) {
  const n = this.cache, s = t.length, r = Ds(e, s);
  oe(n, r) || (i.uniform1iv(this.addr, r), le(n, r));
  for (let a = 0; a !== s; ++a) e.setTextureCube(t[a] || Tl, r[a]);
}
function kf(i, t, e) {
  const n = this.cache, s = t.length, r = Ds(e, s);
  oe(n, r) || (i.uniform1iv(this.addr, r), le(n, r));
  for (let a = 0; a !== s; ++a) e.setTexture2DArray(t[a] || El, r[a]);
}
function Hf(i) {
  switch (i) {
    case 5126:
      return yf;
    case 35664:
      return Ef;
    case 35665:
      return bf;
    case 35666:
      return Tf;
    case 35674:
      return Af;
    case 35675:
      return wf;
    case 35676:
      return Cf;
    case 5124:
    case 35670:
      return Rf;
    case 35667:
    case 35671:
      return Pf;
    case 35668:
    case 35672:
      return Df;
    case 35669:
    case 35673:
      return Lf;
    case 5125:
      return If;
    case 36294:
      return Uf;
    case 36295:
      return Nf;
    case 36296:
      return Ff;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Of;
    case 35679:
    case 36299:
    case 36307:
      return Bf;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return zf;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return kf;
  }
}
class Gf {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.setValue = Sf(e.type);
  }
}
class Vf {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.size = e.size, this.setValue = Hf(e.type);
  }
}
class Wf {
  constructor(t) {
    this.id = t, this.seq = [], this.map = {};
  }
  setValue(t, e, n) {
    const s = this.seq;
    for (let r = 0, a = s.length; r !== a; ++r) {
      const o = s[r];
      o.setValue(t, e[o.id], n);
    }
  }
}
const ar = /(\w+)(\])?(\[|\.)?/g;
function Mo(i, t) {
  i.seq.push(t), i.map[t.id] = t;
}
function Xf(i, t, e) {
  const n = i.name, s = n.length;
  for (ar.lastIndex = 0; ; ) {
    const r = ar.exec(n), a = ar.lastIndex;
    let o = r[1];
    const l = r[2] === "]", c = r[3];
    if (l && (o = o | 0), c === void 0 || c === "[" && a + 2 === s) {
      Mo(e, c === void 0 ? new Gf(o, i, t) : new Vf(o, i, t));
      break;
    } else {
      let f = e.map[o];
      f === void 0 && (f = new Wf(o), Mo(e, f)), e = f;
    }
  }
}
class ys {
  constructor(t, e) {
    this.seq = [], this.map = {};
    const n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
    for (let s = 0; s < n; ++s) {
      const r = t.getActiveUniform(e, s), a = t.getUniformLocation(e, r.name);
      Xf(r, a, this);
    }
  }
  setValue(t, e, n, s) {
    const r = this.map[e];
    r !== void 0 && r.setValue(t, n, s);
  }
  setOptional(t, e, n) {
    const s = e[n];
    s !== void 0 && this.setValue(t, n, s);
  }
  static upload(t, e, n, s) {
    for (let r = 0, a = e.length; r !== a; ++r) {
      const o = e[r], l = n[o.id];
      l.needsUpdate !== false && o.setValue(t, l.value, s);
    }
  }
  static seqWithValue(t, e) {
    const n = [];
    for (let s = 0, r = t.length; s !== r; ++s) {
      const a = t[s];
      a.id in e && n.push(a);
    }
    return n;
  }
}
function So(i, t, e) {
  const n = i.createShader(t);
  return i.shaderSource(n, e), i.compileShader(n), n;
}
const Yf = 37297;
let qf = 0;
function $f(i, t) {
  const e = i.split(`
`), n = [], s = Math.max(t - 6, 0), r = Math.min(t + 6, e.length);
  for (let a = s; a < r; a++) {
    const o = a + 1;
    n.push(`${o === t ? ">" : " "} ${o}: ${e[a]}`);
  }
  return n.join(`
`);
}
const yo = new Pt();
function jf(i) {
  Ht._getMatrix(yo, Ht.workingColorSpace, i);
  const t = `mat3( ${yo.elements.map((e) => e.toFixed(4))} )`;
  switch (Ht.getTransfer(i)) {
    case Rs:
      return [t, "LinearTransferOETF"];
    case qt:
      return [t, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space: ", i), [t, "LinearTransferOETF"];
  }
}
function Eo(i, t, e) {
  const n = i.getShaderParameter(t, i.COMPILE_STATUS), s = i.getShaderInfoLog(t).trim();
  if (n && s === "") return "";
  const r = /ERROR: 0:(\d+)/.exec(s);
  if (r) {
    const a = parseInt(r[1]);
    return e.toUpperCase() + `

` + s + `

` + $f(i.getShaderSource(t), a);
  } else return s;
}
function Zf(i, t) {
  const e = jf(t);
  return [`vec4 ${i}( vec4 value ) {`, `	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`, "}"].join(`
`);
}
function Kf(i, t) {
  let e;
  switch (t) {
    case fc:
      e = "Linear";
      break;
    case pc:
      e = "Reinhard";
      break;
    case mc:
      e = "Cineon";
      break;
    case Zo:
      e = "ACESFilmic";
      break;
    case _c:
      e = "AgX";
      break;
    case vc:
      e = "Neutral";
      break;
    case gc:
      e = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t), e = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + e + "ToneMapping( color ); }";
}
const ls = new P();
function Jf() {
  Ht.getLuminanceCoefficients(ls);
  const i = ls.x.toFixed(4), t = ls.y.toFixed(4), e = ls.z.toFixed(4);
  return ["float luminance( const in vec3 rgb ) {", `	const vec3 weights = vec3( ${i}, ${t}, ${e} );`, "	return dot( weights, rgb );", "}"].join(`
`);
}
function Qf(i) {
  return [i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(Di).join(`
`);
}
function tp(i) {
  const t = [];
  for (const e in i) {
    const n = i[e];
    n !== false && t.push("#define " + e + " " + n);
  }
  return t.join(`
`);
}
function ep(i, t) {
  const e = {}, n = i.getProgramParameter(t, i.ACTIVE_ATTRIBUTES);
  for (let s = 0; s < n; s++) {
    const r = i.getActiveAttrib(t, s), a = r.name;
    let o = 1;
    r.type === i.FLOAT_MAT2 && (o = 2), r.type === i.FLOAT_MAT3 && (o = 3), r.type === i.FLOAT_MAT4 && (o = 4), e[a] = { type: r.type, location: i.getAttribLocation(t, a), locationSize: o };
  }
  return e;
}
function Di(i) {
  return i !== "";
}
function bo(i, t) {
  const e = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, e).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function To(i, t) {
  return i.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
const np = /^[ \t]*#include +<([\w\d./]+)>/gm;
function ta(i) {
  return i.replace(np, sp);
}
const ip = /* @__PURE__ */ new Map();
function sp(i, t) {
  let e = Lt[t];
  if (e === void 0) {
    const n = ip.get(t);
    if (n !== void 0) e = Lt[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, n);
    else throw new Error("Can not resolve #include <" + t + ">");
  }
  return ta(e);
}
const rp = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Ao(i) {
  return i.replace(rp, ap);
}
function ap(i, t, e, n) {
  let s = "";
  for (let r = parseInt(t); r < parseInt(e); r++) s += n.replace(/\[\s*i\s*\]/g, "[ " + r + " ]").replace(/UNROLLED_LOOP_INDEX/g, r);
  return s;
}
function wo(i) {
  let t = `precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;
  return i.precision === "highp" ? t += `
#define HIGH_PRECISION` : i.precision === "mediump" ? t += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (t += `
#define LOW_PRECISION`), t;
}
function op(i) {
  let t = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === $o ? t = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === Yl ? t = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === nn && (t = "SHADOWMAP_TYPE_VSM"), t;
}
function lp(i) {
  let t = "ENVMAP_TYPE_CUBE";
  if (i.envMap) switch (i.envMapMode) {
    case hi:
    case ui:
      t = "ENVMAP_TYPE_CUBE";
      break;
    case Cs:
      t = "ENVMAP_TYPE_CUBE_UV";
      break;
  }
  return t;
}
function cp(i) {
  let t = "ENVMAP_MODE_REFLECTION";
  if (i.envMap) switch (i.envMapMode) {
    case ui:
      t = "ENVMAP_MODE_REFRACTION";
      break;
  }
  return t;
}
function hp(i) {
  let t = "ENVMAP_BLENDING_NONE";
  if (i.envMap) switch (i.combine) {
    case jo:
      t = "ENVMAP_BLENDING_MULTIPLY";
      break;
    case uc:
      t = "ENVMAP_BLENDING_MIX";
      break;
    case dc:
      t = "ENVMAP_BLENDING_ADD";
      break;
  }
  return t;
}
function up(i) {
  const t = i.envMapCubeUVHeight;
  if (t === null) return null;
  const e = Math.log2(t) - 2, n = 1 / t;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, e), 112)), texelHeight: n, maxMip: e };
}
function dp(i, t, e, n) {
  const s = i.getContext(), r = e.defines;
  let a = e.vertexShader, o = e.fragmentShader;
  const l = op(e), c = lp(e), h = cp(e), f = hp(e), d = up(e), m = Qf(e), g = tp(r), v = s.createProgram();
  let p, u, T = e.glslVersion ? "#version " + e.glslVersion + `
` : "";
  e.isRawShaderMaterial ? (p = ["#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, g].filter(Di).join(`
`), p.length > 0 && (p += `
`), u = ["#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, g].filter(Di).join(`
`), u.length > 0 && (u += `
`)) : (p = [wo(e), "#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, g, e.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "", e.batching ? "#define USE_BATCHING" : "", e.batchingColor ? "#define USE_BATCHING_COLOR" : "", e.instancing ? "#define USE_INSTANCING" : "", e.instancingColor ? "#define USE_INSTANCING_COLOR" : "", e.instancingMorph ? "#define USE_INSTANCING_MORPH" : "", e.useFog && e.fog ? "#define USE_FOG" : "", e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "", e.map ? "#define USE_MAP" : "", e.envMap ? "#define USE_ENVMAP" : "", e.envMap ? "#define " + h : "", e.lightMap ? "#define USE_LIGHTMAP" : "", e.aoMap ? "#define USE_AOMAP" : "", e.bumpMap ? "#define USE_BUMPMAP" : "", e.normalMap ? "#define USE_NORMALMAP" : "", e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", e.displacementMap ? "#define USE_DISPLACEMENTMAP" : "", e.emissiveMap ? "#define USE_EMISSIVEMAP" : "", e.anisotropy ? "#define USE_ANISOTROPY" : "", e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", e.specularMap ? "#define USE_SPECULARMAP" : "", e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", e.metalnessMap ? "#define USE_METALNESSMAP" : "", e.alphaMap ? "#define USE_ALPHAMAP" : "", e.alphaHash ? "#define USE_ALPHAHASH" : "", e.transmission ? "#define USE_TRANSMISSION" : "", e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", e.thicknessMap ? "#define USE_THICKNESSMAP" : "", e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", e.mapUv ? "#define MAP_UV " + e.mapUv : "", e.alphaMapUv ? "#define ALPHAMAP_UV " + e.alphaMapUv : "", e.lightMapUv ? "#define LIGHTMAP_UV " + e.lightMapUv : "", e.aoMapUv ? "#define AOMAP_UV " + e.aoMapUv : "", e.emissiveMapUv ? "#define EMISSIVEMAP_UV " + e.emissiveMapUv : "", e.bumpMapUv ? "#define BUMPMAP_UV " + e.bumpMapUv : "", e.normalMapUv ? "#define NORMALMAP_UV " + e.normalMapUv : "", e.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + e.displacementMapUv : "", e.metalnessMapUv ? "#define METALNESSMAP_UV " + e.metalnessMapUv : "", e.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + e.roughnessMapUv : "", e.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + e.anisotropyMapUv : "", e.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + e.clearcoatMapUv : "", e.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + e.clearcoatNormalMapUv : "", e.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + e.clearcoatRoughnessMapUv : "", e.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + e.iridescenceMapUv : "", e.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + e.iridescenceThicknessMapUv : "", e.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + e.sheenColorMapUv : "", e.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + e.sheenRoughnessMapUv : "", e.specularMapUv ? "#define SPECULARMAP_UV " + e.specularMapUv : "", e.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + e.specularColorMapUv : "", e.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + e.specularIntensityMapUv : "", e.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + e.transmissionMapUv : "", e.thicknessMapUv ? "#define THICKNESSMAP_UV " + e.thicknessMapUv : "", e.vertexTangents && e.flatShading === false ? "#define USE_TANGENT" : "", e.vertexColors ? "#define USE_COLOR" : "", e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", e.vertexUv1s ? "#define USE_UV1" : "", e.vertexUv2s ? "#define USE_UV2" : "", e.vertexUv3s ? "#define USE_UV3" : "", e.pointsUvs ? "#define USE_POINTS_UV" : "", e.flatShading ? "#define FLAT_SHADED" : "", e.skinning ? "#define USE_SKINNING" : "", e.morphTargets ? "#define USE_MORPHTARGETS" : "", e.morphNormals && e.flatShading === false ? "#define USE_MORPHNORMALS" : "", e.morphColors ? "#define USE_MORPHCOLORS" : "", e.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + e.morphTextureStride : "", e.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + e.morphTargetsCount : "", e.doubleSided ? "#define DOUBLE_SIDED" : "", e.flipSided ? "#define FLIP_SIDED" : "", e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", e.shadowMapEnabled ? "#define " + l : "", e.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", e.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "	attribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "	attribute vec3 instanceColor;", "#endif", "#ifdef USE_INSTANCING_MORPH", "	uniform sampler2D morphTexture;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_UV1", "	attribute vec2 uv1;", "#endif", "#ifdef USE_UV2", "	attribute vec2 uv2;", "#endif", "#ifdef USE_UV3", "	attribute vec2 uv3;", "#endif", "#ifdef USE_TANGENT", "	attribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "	attribute vec4 color;", "#elif defined( USE_COLOR )", "	attribute vec3 color;", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", `
`].filter(Di).join(`
`), u = [wo(e), "#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, g, e.useFog && e.fog ? "#define USE_FOG" : "", e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "", e.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "", e.map ? "#define USE_MAP" : "", e.matcap ? "#define USE_MATCAP" : "", e.envMap ? "#define USE_ENVMAP" : "", e.envMap ? "#define " + c : "", e.envMap ? "#define " + h : "", e.envMap ? "#define " + f : "", d ? "#define CUBEUV_TEXEL_WIDTH " + d.texelWidth : "", d ? "#define CUBEUV_TEXEL_HEIGHT " + d.texelHeight : "", d ? "#define CUBEUV_MAX_MIP " + d.maxMip + ".0" : "", e.lightMap ? "#define USE_LIGHTMAP" : "", e.aoMap ? "#define USE_AOMAP" : "", e.bumpMap ? "#define USE_BUMPMAP" : "", e.normalMap ? "#define USE_NORMALMAP" : "", e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", e.emissiveMap ? "#define USE_EMISSIVEMAP" : "", e.anisotropy ? "#define USE_ANISOTROPY" : "", e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", e.clearcoat ? "#define USE_CLEARCOAT" : "", e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", e.dispersion ? "#define USE_DISPERSION" : "", e.iridescence ? "#define USE_IRIDESCENCE" : "", e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", e.specularMap ? "#define USE_SPECULARMAP" : "", e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", e.metalnessMap ? "#define USE_METALNESSMAP" : "", e.alphaMap ? "#define USE_ALPHAMAP" : "", e.alphaTest ? "#define USE_ALPHATEST" : "", e.alphaHash ? "#define USE_ALPHAHASH" : "", e.sheen ? "#define USE_SHEEN" : "", e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", e.transmission ? "#define USE_TRANSMISSION" : "", e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", e.thicknessMap ? "#define USE_THICKNESSMAP" : "", e.vertexTangents && e.flatShading === false ? "#define USE_TANGENT" : "", e.vertexColors || e.instancingColor || e.batchingColor ? "#define USE_COLOR" : "", e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", e.vertexUv1s ? "#define USE_UV1" : "", e.vertexUv2s ? "#define USE_UV2" : "", e.vertexUv3s ? "#define USE_UV3" : "", e.pointsUvs ? "#define USE_POINTS_UV" : "", e.gradientMap ? "#define USE_GRADIENTMAP" : "", e.flatShading ? "#define FLAT_SHADED" : "", e.doubleSided ? "#define DOUBLE_SIDED" : "", e.flipSided ? "#define FLIP_SIDED" : "", e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", e.shadowMapEnabled ? "#define " + l : "", e.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", e.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", e.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "", e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", e.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", e.toneMapping !== xn ? "#define TONE_MAPPING" : "", e.toneMapping !== xn ? Lt.tonemapping_pars_fragment : "", e.toneMapping !== xn ? Kf("toneMapping", e.toneMapping) : "", e.dithering ? "#define DITHERING" : "", e.opaque ? "#define OPAQUE" : "", Lt.colorspace_pars_fragment, Zf("linearToOutputTexel", e.outputColorSpace), Jf(), e.useDepthPacking ? "#define DEPTH_PACKING " + e.depthPacking : "", `
`].filter(Di).join(`
`)), a = ta(a), a = bo(a, e), a = To(a, e), o = ta(o), o = bo(o, e), o = To(o, e), a = Ao(a), o = Ao(o), e.isRawShaderMaterial !== true && (T = `#version 300 es
`, p = [m, "#define attribute in", "#define varying out", "#define texture2D texture"].join(`
`) + `
` + p, u = ["#define varying in", e.glslVersion === za ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", e.glslVersion === za ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join(`
`) + `
` + u);
  const b = T + p + a, S = T + u + o, N = So(s, s.VERTEX_SHADER, b), w = So(s, s.FRAGMENT_SHADER, S);
  s.attachShader(v, N), s.attachShader(v, w), e.index0AttributeName !== void 0 ? s.bindAttribLocation(v, 0, e.index0AttributeName) : e.morphTargets === true && s.bindAttribLocation(v, 0, "position"), s.linkProgram(v);
  function A(C) {
    if (i.debug.checkShaderErrors) {
      const k = s.getProgramInfoLog(v).trim(), z = s.getShaderInfoLog(N).trim(), W = s.getShaderInfoLog(w).trim();
      let j = true, V = true;
      if (s.getProgramParameter(v, s.LINK_STATUS) === false) if (j = false, typeof i.debug.onShaderError == "function") i.debug.onShaderError(s, v, N, w);
      else {
        const K = Eo(s, N, "vertex"), G = Eo(s, w, "fragment");
        console.error("THREE.WebGLProgram: Shader Error " + s.getError() + " - VALIDATE_STATUS " + s.getProgramParameter(v, s.VALIDATE_STATUS) + `

Material Name: ` + C.name + `
Material Type: ` + C.type + `

Program Info Log: ` + k + `
` + K + `
` + G);
      }
      else k !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", k) : (z === "" || W === "") && (V = false);
      V && (C.diagnostics = { runnable: j, programLog: k, vertexShader: { log: z, prefix: p }, fragmentShader: { log: W, prefix: u } });
    }
    s.deleteShader(N), s.deleteShader(w), U = new ys(s, v), y = ep(s, v);
  }
  let U;
  this.getUniforms = function() {
    return U === void 0 && A(this), U;
  };
  let y;
  this.getAttributes = function() {
    return y === void 0 && A(this), y;
  };
  let M = e.rendererExtensionParallelShaderCompile === false;
  return this.isReady = function() {
    return M === false && (M = s.getProgramParameter(v, Yf)), M;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), s.deleteProgram(v), this.program = void 0;
  }, this.type = e.shaderType, this.name = e.shaderName, this.id = qf++, this.cacheKey = t, this.usedTimes = 1, this.program = v, this.vertexShader = N, this.fragmentShader = w, this;
}
let fp = 0;
class pp {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(t) {
    const e = t.vertexShader, n = t.fragmentShader, s = this._getShaderStage(e), r = this._getShaderStage(n), a = this._getShaderCacheForMaterial(t);
    return a.has(s) === false && (a.add(s), s.usedTimes++), a.has(r) === false && (a.add(r), r.usedTimes++), this;
  }
  remove(t) {
    const e = this.materialCache.get(t);
    for (const n of e) n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(t), this;
  }
  getVertexShaderID(t) {
    return this._getShaderStage(t.vertexShader).id;
  }
  getFragmentShaderID(t) {
    return this._getShaderStage(t.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(t) {
    const e = this.materialCache;
    let n = e.get(t);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), e.set(t, n)), n;
  }
  _getShaderStage(t) {
    const e = this.shaderCache;
    let n = e.get(t);
    return n === void 0 && (n = new mp(t), e.set(t, n)), n;
  }
}
class mp {
  constructor(t) {
    this.id = fp++, this.code = t, this.usedTimes = 0;
  }
}
function gp(i, t, e, n, s, r, a) {
  const o = new dl(), l = new pp(), c = /* @__PURE__ */ new Set(), h = [], f = s.logarithmicDepthBuffer, d = s.vertexTextures;
  let m = s.precision;
  const g = { MeshDepthMaterial: "depth", MeshDistanceMaterial: "distanceRGBA", MeshNormalMaterial: "normal", MeshBasicMaterial: "basic", MeshLambertMaterial: "lambert", MeshPhongMaterial: "phong", MeshToonMaterial: "toon", MeshStandardMaterial: "physical", MeshPhysicalMaterial: "physical", MeshMatcapMaterial: "matcap", LineBasicMaterial: "basic", LineDashedMaterial: "dashed", PointsMaterial: "points", ShadowMaterial: "shadow", SpriteMaterial: "sprite" };
  function v(y) {
    return c.add(y), y === 0 ? "uv" : `uv${y}`;
  }
  function p(y, M, C, k, z) {
    const W = k.fog, j = z.geometry, V = y.isMeshStandardMaterial ? k.environment : null, K = (y.isMeshStandardMaterial ? e : t).get(y.envMap || V), G = K && K.mapping === Cs ? K.image.height : null, it = g[y.type];
    y.precision !== null && (m = s.getMaxPrecision(y.precision), m !== y.precision && console.warn("THREE.WebGLProgram.getParameters:", y.precision, "not supported, using", m, "instead."));
    const ct = j.morphAttributes.position || j.morphAttributes.normal || j.morphAttributes.color, xt = ct !== void 0 ? ct.length : 0;
    let It = 0;
    j.morphAttributes.position !== void 0 && (It = 1), j.morphAttributes.normal !== void 0 && (It = 2), j.morphAttributes.color !== void 0 && (It = 3);
    let Zt, Y, tt, gt;
    if (it) {
      const Xt = We[it];
      Zt = Xt.vertexShader, Y = Xt.fragmentShader;
    } else Zt = y.vertexShader, Y = y.fragmentShader, l.update(y), tt = l.getVertexShaderID(y), gt = l.getFragmentShaderID(y);
    const st = i.getRenderTarget(), Et = i.state.buffers.depth.getReversed(), wt = z.isInstancedMesh === true, Ut = z.isBatchedMesh === true, ne = !!y.map, zt = !!y.matcap, se = !!K, I = !!y.aoMap, Re = !!y.lightMap, Ft = !!y.bumpMap, Ot = !!y.normalMap, St = !!y.displacementMap, Qt = !!y.emissiveMap, Mt = !!y.metalnessMap, E = !!y.roughnessMap, _ = y.anisotropy > 0, F = y.clearcoat > 0, q = y.dispersion > 0, Z = y.iridescence > 0, X = y.sheen > 0, _t = y.transmission > 0, rt = _ && !!y.anisotropyMap, ht = F && !!y.clearcoatMap, kt = F && !!y.clearcoatNormalMap, J = F && !!y.clearcoatRoughnessMap, ut = Z && !!y.iridescenceMap, yt = Z && !!y.iridescenceThicknessMap, bt = X && !!y.sheenColorMap, dt = X && !!y.sheenRoughnessMap, Bt = !!y.specularMap, Dt = !!y.specularColorMap, Kt = !!y.specularIntensityMap, R = _t && !!y.transmissionMap, nt = _t && !!y.thicknessMap, H = !!y.gradientMap, $ = !!y.alphaMap, lt = y.alphaTest > 0, at = !!y.alphaHash, Ct = !!y.extensions;
    let ie = xn;
    y.toneMapped && (st === null || st.isXRRenderTarget === true) && (ie = i.toneMapping);
    const ue = { shaderID: it, shaderType: y.type, shaderName: y.name, vertexShader: Zt, fragmentShader: Y, defines: y.defines, customVertexShaderID: tt, customFragmentShaderID: gt, isRawShaderMaterial: y.isRawShaderMaterial === true, glslVersion: y.glslVersion, precision: m, batching: Ut, batchingColor: Ut && z._colorsTexture !== null, instancing: wt, instancingColor: wt && z.instanceColor !== null, instancingMorph: wt && z.morphTexture !== null, supportsVertexTextures: d, outputColorSpace: st === null ? i.outputColorSpace : st.isXRRenderTarget === true ? st.texture.colorSpace : mi, alphaToCoverage: !!y.alphaToCoverage, map: ne, matcap: zt, envMap: se, envMapMode: se && K.mapping, envMapCubeUVHeight: G, aoMap: I, lightMap: Re, bumpMap: Ft, normalMap: Ot, displacementMap: d && St, emissiveMap: Qt, normalMapObjectSpace: Ot && y.normalMapType === yc, normalMapTangentSpace: Ot && y.normalMapType === ol, metalnessMap: Mt, roughnessMap: E, anisotropy: _, anisotropyMap: rt, clearcoat: F, clearcoatMap: ht, clearcoatNormalMap: kt, clearcoatRoughnessMap: J, dispersion: q, iridescence: Z, iridescenceMap: ut, iridescenceThicknessMap: yt, sheen: X, sheenColorMap: bt, sheenRoughnessMap: dt, specularMap: Bt, specularColorMap: Dt, specularIntensityMap: Kt, transmission: _t, transmissionMap: R, thicknessMap: nt, gradientMap: H, opaque: y.transparent === false && y.blending === ai && y.alphaToCoverage === false, alphaMap: $, alphaTest: lt, alphaHash: at, combine: y.combine, mapUv: ne && v(y.map.channel), aoMapUv: I && v(y.aoMap.channel), lightMapUv: Re && v(y.lightMap.channel), bumpMapUv: Ft && v(y.bumpMap.channel), normalMapUv: Ot && v(y.normalMap.channel), displacementMapUv: St && v(y.displacementMap.channel), emissiveMapUv: Qt && v(y.emissiveMap.channel), metalnessMapUv: Mt && v(y.metalnessMap.channel), roughnessMapUv: E && v(y.roughnessMap.channel), anisotropyMapUv: rt && v(y.anisotropyMap.channel), clearcoatMapUv: ht && v(y.clearcoatMap.channel), clearcoatNormalMapUv: kt && v(y.clearcoatNormalMap.channel), clearcoatRoughnessMapUv: J && v(y.clearcoatRoughnessMap.channel), iridescenceMapUv: ut && v(y.iridescenceMap.channel), iridescenceThicknessMapUv: yt && v(y.iridescenceThicknessMap.channel), sheenColorMapUv: bt && v(y.sheenColorMap.channel), sheenRoughnessMapUv: dt && v(y.sheenRoughnessMap.channel), specularMapUv: Bt && v(y.specularMap.channel), specularColorMapUv: Dt && v(y.specularColorMap.channel), specularIntensityMapUv: Kt && v(y.specularIntensityMap.channel), transmissionMapUv: R && v(y.transmissionMap.channel), thicknessMapUv: nt && v(y.thicknessMap.channel), alphaMapUv: $ && v(y.alphaMap.channel), vertexTangents: !!j.attributes.tangent && (Ot || _), vertexColors: y.vertexColors, vertexAlphas: y.vertexColors === true && !!j.attributes.color && j.attributes.color.itemSize === 4, pointsUvs: z.isPoints === true && !!j.attributes.uv && (ne || $), fog: !!W, useFog: y.fog === true, fogExp2: !!W && W.isFogExp2, flatShading: y.flatShading === true, sizeAttenuation: y.sizeAttenuation === true, logarithmicDepthBuffer: f, reverseDepthBuffer: Et, skinning: z.isSkinnedMesh === true, morphTargets: j.morphAttributes.position !== void 0, morphNormals: j.morphAttributes.normal !== void 0, morphColors: j.morphAttributes.color !== void 0, morphTargetsCount: xt, morphTextureStride: It, numDirLights: M.directional.length, numPointLights: M.point.length, numSpotLights: M.spot.length, numSpotLightMaps: M.spotLightMap.length, numRectAreaLights: M.rectArea.length, numHemiLights: M.hemi.length, numDirLightShadows: M.directionalShadowMap.length, numPointLightShadows: M.pointShadowMap.length, numSpotLightShadows: M.spotShadowMap.length, numSpotLightShadowsWithMaps: M.numSpotLightShadowsWithMaps, numLightProbes: M.numLightProbes, numClippingPlanes: a.numPlanes, numClipIntersection: a.numIntersection, dithering: y.dithering, shadowMapEnabled: i.shadowMap.enabled && C.length > 0, shadowMapType: i.shadowMap.type, toneMapping: ie, decodeVideoTexture: ne && y.map.isVideoTexture === true && Ht.getTransfer(y.map.colorSpace) === qt, decodeVideoTextureEmissive: Qt && y.emissiveMap.isVideoTexture === true && Ht.getTransfer(y.emissiveMap.colorSpace) === qt, premultipliedAlpha: y.premultipliedAlpha, doubleSided: y.side === sn, flipSided: y.side === ye, useDepthPacking: y.depthPacking >= 0, depthPacking: y.depthPacking || 0, index0AttributeName: y.index0AttributeName, extensionClipCullDistance: Ct && y.extensions.clipCullDistance === true && n.has("WEBGL_clip_cull_distance"), extensionMultiDraw: (Ct && y.extensions.multiDraw === true || Ut) && n.has("WEBGL_multi_draw"), rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"), customProgramCacheKey: y.customProgramCacheKey() };
    return ue.vertexUv1s = c.has(1), ue.vertexUv2s = c.has(2), ue.vertexUv3s = c.has(3), c.clear(), ue;
  }
  function u(y) {
    const M = [];
    if (y.shaderID ? M.push(y.shaderID) : (M.push(y.customVertexShaderID), M.push(y.customFragmentShaderID)), y.defines !== void 0) for (const C in y.defines) M.push(C), M.push(y.defines[C]);
    return y.isRawShaderMaterial === false && (T(M, y), b(M, y), M.push(i.outputColorSpace)), M.push(y.customProgramCacheKey), M.join();
  }
  function T(y, M) {
    y.push(M.precision), y.push(M.outputColorSpace), y.push(M.envMapMode), y.push(M.envMapCubeUVHeight), y.push(M.mapUv), y.push(M.alphaMapUv), y.push(M.lightMapUv), y.push(M.aoMapUv), y.push(M.bumpMapUv), y.push(M.normalMapUv), y.push(M.displacementMapUv), y.push(M.emissiveMapUv), y.push(M.metalnessMapUv), y.push(M.roughnessMapUv), y.push(M.anisotropyMapUv), y.push(M.clearcoatMapUv), y.push(M.clearcoatNormalMapUv), y.push(M.clearcoatRoughnessMapUv), y.push(M.iridescenceMapUv), y.push(M.iridescenceThicknessMapUv), y.push(M.sheenColorMapUv), y.push(M.sheenRoughnessMapUv), y.push(M.specularMapUv), y.push(M.specularColorMapUv), y.push(M.specularIntensityMapUv), y.push(M.transmissionMapUv), y.push(M.thicknessMapUv), y.push(M.combine), y.push(M.fogExp2), y.push(M.sizeAttenuation), y.push(M.morphTargetsCount), y.push(M.morphAttributeCount), y.push(M.numDirLights), y.push(M.numPointLights), y.push(M.numSpotLights), y.push(M.numSpotLightMaps), y.push(M.numHemiLights), y.push(M.numRectAreaLights), y.push(M.numDirLightShadows), y.push(M.numPointLightShadows), y.push(M.numSpotLightShadows), y.push(M.numSpotLightShadowsWithMaps), y.push(M.numLightProbes), y.push(M.shadowMapType), y.push(M.toneMapping), y.push(M.numClippingPlanes), y.push(M.numClipIntersection), y.push(M.depthPacking);
  }
  function b(y, M) {
    o.disableAll(), M.supportsVertexTextures && o.enable(0), M.instancing && o.enable(1), M.instancingColor && o.enable(2), M.instancingMorph && o.enable(3), M.matcap && o.enable(4), M.envMap && o.enable(5), M.normalMapObjectSpace && o.enable(6), M.normalMapTangentSpace && o.enable(7), M.clearcoat && o.enable(8), M.iridescence && o.enable(9), M.alphaTest && o.enable(10), M.vertexColors && o.enable(11), M.vertexAlphas && o.enable(12), M.vertexUv1s && o.enable(13), M.vertexUv2s && o.enable(14), M.vertexUv3s && o.enable(15), M.vertexTangents && o.enable(16), M.anisotropy && o.enable(17), M.alphaHash && o.enable(18), M.batching && o.enable(19), M.dispersion && o.enable(20), M.batchingColor && o.enable(21), y.push(o.mask), o.disableAll(), M.fog && o.enable(0), M.useFog && o.enable(1), M.flatShading && o.enable(2), M.logarithmicDepthBuffer && o.enable(3), M.reverseDepthBuffer && o.enable(4), M.skinning && o.enable(5), M.morphTargets && o.enable(6), M.morphNormals && o.enable(7), M.morphColors && o.enable(8), M.premultipliedAlpha && o.enable(9), M.shadowMapEnabled && o.enable(10), M.doubleSided && o.enable(11), M.flipSided && o.enable(12), M.useDepthPacking && o.enable(13), M.dithering && o.enable(14), M.transmission && o.enable(15), M.sheen && o.enable(16), M.opaque && o.enable(17), M.pointsUvs && o.enable(18), M.decodeVideoTexture && o.enable(19), M.decodeVideoTextureEmissive && o.enable(20), M.alphaToCoverage && o.enable(21), y.push(o.mask);
  }
  function S(y) {
    const M = g[y.type];
    let C;
    if (M) {
      const k = We[M];
      C = Jc.clone(k.uniforms);
    } else C = y.uniforms;
    return C;
  }
  function N(y, M) {
    let C;
    for (let k = 0, z = h.length; k < z; k++) {
      const W = h[k];
      if (W.cacheKey === M) {
        C = W, ++C.usedTimes;
        break;
      }
    }
    return C === void 0 && (C = new dp(i, M, y, r), h.push(C)), C;
  }
  function w(y) {
    if (--y.usedTimes === 0) {
      const M = h.indexOf(y);
      h[M] = h[h.length - 1], h.pop(), y.destroy();
    }
  }
  function A(y) {
    l.remove(y);
  }
  function U() {
    l.dispose();
  }
  return { getParameters: p, getProgramCacheKey: u, getUniforms: S, acquireProgram: N, releaseProgram: w, releaseShaderCache: A, programs: h, dispose: U };
}
function _p() {
  let i = /* @__PURE__ */ new WeakMap();
  function t(a) {
    return i.has(a);
  }
  function e(a) {
    let o = i.get(a);
    return o === void 0 && (o = {}, i.set(a, o)), o;
  }
  function n(a) {
    i.delete(a);
  }
  function s(a, o, l) {
    i.get(a)[o] = l;
  }
  function r() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return { has: t, get: e, remove: n, update: s, dispose: r };
}
function vp(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.material.id !== t.material.id ? i.material.id - t.material.id : i.z !== t.z ? i.z - t.z : i.id - t.id;
}
function Co(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.z !== t.z ? t.z - i.z : i.id - t.id;
}
function Ro() {
  const i = [];
  let t = 0;
  const e = [], n = [], s = [];
  function r() {
    t = 0, e.length = 0, n.length = 0, s.length = 0;
  }
  function a(f, d, m, g, v, p) {
    let u = i[t];
    return u === void 0 ? (u = { id: f.id, object: f, geometry: d, material: m, groupOrder: g, renderOrder: f.renderOrder, z: v, group: p }, i[t] = u) : (u.id = f.id, u.object = f, u.geometry = d, u.material = m, u.groupOrder = g, u.renderOrder = f.renderOrder, u.z = v, u.group = p), t++, u;
  }
  function o(f, d, m, g, v, p) {
    const u = a(f, d, m, g, v, p);
    m.transmission > 0 ? n.push(u) : m.transparent === true ? s.push(u) : e.push(u);
  }
  function l(f, d, m, g, v, p) {
    const u = a(f, d, m, g, v, p);
    m.transmission > 0 ? n.unshift(u) : m.transparent === true ? s.unshift(u) : e.unshift(u);
  }
  function c(f, d) {
    e.length > 1 && e.sort(f || vp), n.length > 1 && n.sort(d || Co), s.length > 1 && s.sort(d || Co);
  }
  function h() {
    for (let f = t, d = i.length; f < d; f++) {
      const m = i[f];
      if (m.id === null) break;
      m.id = null, m.object = null, m.geometry = null, m.material = null, m.group = null;
    }
  }
  return { opaque: e, transmissive: n, transparent: s, init: r, push: o, unshift: l, finish: h, sort: c };
}
function xp() {
  let i = /* @__PURE__ */ new WeakMap();
  function t(n, s) {
    const r = i.get(n);
    let a;
    return r === void 0 ? (a = new Ro(), i.set(n, [a])) : s >= r.length ? (a = new Ro(), r.push(a)) : a = r[s], a;
  }
  function e() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return { get: t, dispose: e };
}
function Mp() {
  const i = {};
  return { get: function(t) {
    if (i[t.id] !== void 0) return i[t.id];
    let e;
    switch (t.type) {
      case "DirectionalLight":
        e = { direction: new P(), color: new Nt() };
        break;
      case "SpotLight":
        e = { position: new P(), direction: new P(), color: new Nt(), distance: 0, coneCos: 0, penumbraCos: 0, decay: 0 };
        break;
      case "PointLight":
        e = { position: new P(), color: new Nt(), distance: 0, decay: 0 };
        break;
      case "HemisphereLight":
        e = { direction: new P(), skyColor: new Nt(), groundColor: new Nt() };
        break;
      case "RectAreaLight":
        e = { color: new Nt(), position: new P(), halfWidth: new P(), halfHeight: new P() };
        break;
    }
    return i[t.id] = e, e;
  } };
}
function Sp() {
  const i = {};
  return { get: function(t) {
    if (i[t.id] !== void 0) return i[t.id];
    let e;
    switch (t.type) {
      case "DirectionalLight":
        e = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new At() };
        break;
      case "SpotLight":
        e = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new At() };
        break;
      case "PointLight":
        e = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new At(), shadowCameraNear: 1, shadowCameraFar: 1e3 };
        break;
    }
    return i[t.id] = e, e;
  } };
}
let yp = 0;
function Ep(i, t) {
  return (t.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (i.map ? 1 : 0);
}
function bp(i) {
  const t = new Mp(), e = Sp(), n = { version: 0, hash: { directionalLength: -1, pointLength: -1, spotLength: -1, rectAreaLength: -1, hemiLength: -1, numDirectionalShadows: -1, numPointShadows: -1, numSpotShadows: -1, numSpotMaps: -1, numLightProbes: -1 }, ambient: [0, 0, 0], probe: [], directional: [], directionalShadow: [], directionalShadowMap: [], directionalShadowMatrix: [], spot: [], spotLightMap: [], spotShadow: [], spotShadowMap: [], spotLightMatrix: [], rectArea: [], rectAreaLTC1: null, rectAreaLTC2: null, point: [], pointShadow: [], pointShadowMap: [], pointShadowMatrix: [], hemi: [], numSpotLightShadowsWithMaps: 0, numLightProbes: 0 };
  for (let c = 0; c < 9; c++) n.probe.push(new P());
  const s = new P(), r = new Yt(), a = new Yt();
  function o(c) {
    let h = 0, f = 0, d = 0;
    for (let y = 0; y < 9; y++) n.probe[y].set(0, 0, 0);
    let m = 0, g = 0, v = 0, p = 0, u = 0, T = 0, b = 0, S = 0, N = 0, w = 0, A = 0;
    c.sort(Ep);
    for (let y = 0, M = c.length; y < M; y++) {
      const C = c[y], k = C.color, z = C.intensity, W = C.distance, j = C.shadow && C.shadow.map ? C.shadow.map.texture : null;
      if (C.isAmbientLight) h += k.r * z, f += k.g * z, d += k.b * z;
      else if (C.isLightProbe) {
        for (let V = 0; V < 9; V++) n.probe[V].addScaledVector(C.sh.coefficients[V], z);
        A++;
      } else if (C.isDirectionalLight) {
        const V = t.get(C);
        if (V.color.copy(C.color).multiplyScalar(C.intensity), C.castShadow) {
          const K = C.shadow, G = e.get(C);
          G.shadowIntensity = K.intensity, G.shadowBias = K.bias, G.shadowNormalBias = K.normalBias, G.shadowRadius = K.radius, G.shadowMapSize = K.mapSize, n.directionalShadow[m] = G, n.directionalShadowMap[m] = j, n.directionalShadowMatrix[m] = C.shadow.matrix, T++;
        }
        n.directional[m] = V, m++;
      } else if (C.isSpotLight) {
        const V = t.get(C);
        V.position.setFromMatrixPosition(C.matrixWorld), V.color.copy(k).multiplyScalar(z), V.distance = W, V.coneCos = Math.cos(C.angle), V.penumbraCos = Math.cos(C.angle * (1 - C.penumbra)), V.decay = C.decay, n.spot[v] = V;
        const K = C.shadow;
        if (C.map && (n.spotLightMap[N] = C.map, N++, K.updateMatrices(C), C.castShadow && w++), n.spotLightMatrix[v] = K.matrix, C.castShadow) {
          const G = e.get(C);
          G.shadowIntensity = K.intensity, G.shadowBias = K.bias, G.shadowNormalBias = K.normalBias, G.shadowRadius = K.radius, G.shadowMapSize = K.mapSize, n.spotShadow[v] = G, n.spotShadowMap[v] = j, S++;
        }
        v++;
      } else if (C.isRectAreaLight) {
        const V = t.get(C);
        V.color.copy(k).multiplyScalar(z), V.halfWidth.set(C.width * 0.5, 0, 0), V.halfHeight.set(0, C.height * 0.5, 0), n.rectArea[p] = V, p++;
      } else if (C.isPointLight) {
        const V = t.get(C);
        if (V.color.copy(C.color).multiplyScalar(C.intensity), V.distance = C.distance, V.decay = C.decay, C.castShadow) {
          const K = C.shadow, G = e.get(C);
          G.shadowIntensity = K.intensity, G.shadowBias = K.bias, G.shadowNormalBias = K.normalBias, G.shadowRadius = K.radius, G.shadowMapSize = K.mapSize, G.shadowCameraNear = K.camera.near, G.shadowCameraFar = K.camera.far, n.pointShadow[g] = G, n.pointShadowMap[g] = j, n.pointShadowMatrix[g] = C.shadow.matrix, b++;
        }
        n.point[g] = V, g++;
      } else if (C.isHemisphereLight) {
        const V = t.get(C);
        V.skyColor.copy(C.color).multiplyScalar(z), V.groundColor.copy(C.groundColor).multiplyScalar(z), n.hemi[u] = V, u++;
      }
    }
    p > 0 && (i.has("OES_texture_float_linear") === true ? (n.rectAreaLTC1 = et.LTC_FLOAT_1, n.rectAreaLTC2 = et.LTC_FLOAT_2) : (n.rectAreaLTC1 = et.LTC_HALF_1, n.rectAreaLTC2 = et.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = f, n.ambient[2] = d;
    const U = n.hash;
    (U.directionalLength !== m || U.pointLength !== g || U.spotLength !== v || U.rectAreaLength !== p || U.hemiLength !== u || U.numDirectionalShadows !== T || U.numPointShadows !== b || U.numSpotShadows !== S || U.numSpotMaps !== N || U.numLightProbes !== A) && (n.directional.length = m, n.spot.length = v, n.rectArea.length = p, n.point.length = g, n.hemi.length = u, n.directionalShadow.length = T, n.directionalShadowMap.length = T, n.pointShadow.length = b, n.pointShadowMap.length = b, n.spotShadow.length = S, n.spotShadowMap.length = S, n.directionalShadowMatrix.length = T, n.pointShadowMatrix.length = b, n.spotLightMatrix.length = S + N - w, n.spotLightMap.length = N, n.numSpotLightShadowsWithMaps = w, n.numLightProbes = A, U.directionalLength = m, U.pointLength = g, U.spotLength = v, U.rectAreaLength = p, U.hemiLength = u, U.numDirectionalShadows = T, U.numPointShadows = b, U.numSpotShadows = S, U.numSpotMaps = N, U.numLightProbes = A, n.version = yp++);
  }
  function l(c, h) {
    let f = 0, d = 0, m = 0, g = 0, v = 0;
    const p = h.matrixWorldInverse;
    for (let u = 0, T = c.length; u < T; u++) {
      const b = c[u];
      if (b.isDirectionalLight) {
        const S = n.directional[f];
        S.direction.setFromMatrixPosition(b.matrixWorld), s.setFromMatrixPosition(b.target.matrixWorld), S.direction.sub(s), S.direction.transformDirection(p), f++;
      } else if (b.isSpotLight) {
        const S = n.spot[m];
        S.position.setFromMatrixPosition(b.matrixWorld), S.position.applyMatrix4(p), S.direction.setFromMatrixPosition(b.matrixWorld), s.setFromMatrixPosition(b.target.matrixWorld), S.direction.sub(s), S.direction.transformDirection(p), m++;
      } else if (b.isRectAreaLight) {
        const S = n.rectArea[g];
        S.position.setFromMatrixPosition(b.matrixWorld), S.position.applyMatrix4(p), a.identity(), r.copy(b.matrixWorld), r.premultiply(p), a.extractRotation(r), S.halfWidth.set(b.width * 0.5, 0, 0), S.halfHeight.set(0, b.height * 0.5, 0), S.halfWidth.applyMatrix4(a), S.halfHeight.applyMatrix4(a), g++;
      } else if (b.isPointLight) {
        const S = n.point[d];
        S.position.setFromMatrixPosition(b.matrixWorld), S.position.applyMatrix4(p), d++;
      } else if (b.isHemisphereLight) {
        const S = n.hemi[v];
        S.direction.setFromMatrixPosition(b.matrixWorld), S.direction.transformDirection(p), v++;
      }
    }
  }
  return { setup: o, setupView: l, state: n };
}
function Po(i) {
  const t = new bp(i), e = [], n = [];
  function s(h) {
    c.camera = h, e.length = 0, n.length = 0;
  }
  function r(h) {
    e.push(h);
  }
  function a(h) {
    n.push(h);
  }
  function o() {
    t.setup(e);
  }
  function l(h) {
    t.setupView(e, h);
  }
  const c = { lightsArray: e, shadowsArray: n, camera: null, lights: t, transmissionRenderTarget: {} };
  return { init: s, state: c, setupLights: o, setupLightsView: l, pushLight: r, pushShadow: a };
}
function Tp(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(s, r = 0) {
    const a = t.get(s);
    let o;
    return a === void 0 ? (o = new Po(i), t.set(s, [o])) : r >= a.length ? (o = new Po(i), a.push(o)) : o = a[r], o;
  }
  function n() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return { get: e, dispose: n };
}
class Ap extends _i {
  static get type() {
    return "MeshDepthMaterial";
  }
  constructor(t) {
    super(), this.isMeshDepthMaterial = true, this.depthPacking = Mc, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = false, this.wireframeLinewidth = 1, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.depthPacking = t.depthPacking, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this;
  }
}
class wp extends _i {
  static get type() {
    return "MeshDistanceMaterial";
  }
  constructor(t) {
    super(), this.isMeshDistanceMaterial = true, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this;
  }
}
const Cp = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, Rp = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function Pp(i, t, e) {
  let n = new fa();
  const s = new At(), r = new At(), a = new jt(), o = new Ap({ depthPacking: Sc }), l = new wp(), c = {}, h = e.maxTextureSize, f = { [Mn]: ye, [ye]: Mn, [sn]: sn }, d = new Sn({ defines: { VSM_SAMPLES: 8 }, uniforms: { shadow_pass: { value: null }, resolution: { value: new At() }, radius: { value: 4 } }, vertexShader: Cp, fragmentShader: Rp }), m = d.clone();
  m.defines.HORIZONTAL_PASS = 1;
  const g = new Ge();
  g.setAttribute("position", new He(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3));
  const v = new Ue(g, d), p = this;
  this.enabled = false, this.autoUpdate = true, this.needsUpdate = false, this.type = $o;
  let u = this.type;
  this.render = function(w, A, U) {
    if (p.enabled === false || p.autoUpdate === false && p.needsUpdate === false || w.length === 0) return;
    const y = i.getRenderTarget(), M = i.getActiveCubeFace(), C = i.getActiveMipmapLevel(), k = i.state;
    k.setBlending(vn), k.buffers.color.setClear(1, 1, 1, 1), k.buffers.depth.setTest(true), k.setScissorTest(false);
    const z = u !== nn && this.type === nn, W = u === nn && this.type !== nn;
    for (let j = 0, V = w.length; j < V; j++) {
      const K = w[j], G = K.shadow;
      if (G === void 0) {
        console.warn("THREE.WebGLShadowMap:", K, "has no shadow.");
        continue;
      }
      if (G.autoUpdate === false && G.needsUpdate === false) continue;
      s.copy(G.mapSize);
      const it = G.getFrameExtents();
      if (s.multiply(it), r.copy(G.mapSize), (s.x > h || s.y > h) && (s.x > h && (r.x = Math.floor(h / it.x), s.x = r.x * it.x, G.mapSize.x = r.x), s.y > h && (r.y = Math.floor(h / it.y), s.y = r.y * it.y, G.mapSize.y = r.y)), G.map === null || z === true || W === true) {
        const xt = this.type !== nn ? { minFilter: Ce, magFilter: Ce } : {};
        G.map !== null && G.map.dispose(), G.map = new Nn(s.x, s.y, xt), G.map.texture.name = K.name + ".shadowMap", G.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(G.map), i.clear();
      const ct = G.getViewportCount();
      for (let xt = 0; xt < ct; xt++) {
        const It = G.getViewport(xt);
        a.set(r.x * It.x, r.y * It.y, r.x * It.z, r.y * It.w), k.viewport(a), G.updateMatrices(K, xt), n = G.getFrustum(), S(A, U, G.camera, K, this.type);
      }
      G.isPointLightShadow !== true && this.type === nn && T(G, U), G.needsUpdate = false;
    }
    u = this.type, p.needsUpdate = false, i.setRenderTarget(y, M, C);
  };
  function T(w, A) {
    const U = t.update(v);
    d.defines.VSM_SAMPLES !== w.blurSamples && (d.defines.VSM_SAMPLES = w.blurSamples, m.defines.VSM_SAMPLES = w.blurSamples, d.needsUpdate = true, m.needsUpdate = true), w.mapPass === null && (w.mapPass = new Nn(s.x, s.y)), d.uniforms.shadow_pass.value = w.map.texture, d.uniforms.resolution.value = w.mapSize, d.uniforms.radius.value = w.radius, i.setRenderTarget(w.mapPass), i.clear(), i.renderBufferDirect(A, null, U, d, v, null), m.uniforms.shadow_pass.value = w.mapPass.texture, m.uniforms.resolution.value = w.mapSize, m.uniforms.radius.value = w.radius, i.setRenderTarget(w.map), i.clear(), i.renderBufferDirect(A, null, U, m, v, null);
  }
  function b(w, A, U, y) {
    let M = null;
    const C = U.isPointLight === true ? w.customDistanceMaterial : w.customDepthMaterial;
    if (C !== void 0) M = C;
    else if (M = U.isPointLight === true ? l : o, i.localClippingEnabled && A.clipShadows === true && Array.isArray(A.clippingPlanes) && A.clippingPlanes.length !== 0 || A.displacementMap && A.displacementScale !== 0 || A.alphaMap && A.alphaTest > 0 || A.map && A.alphaTest > 0) {
      const k = M.uuid, z = A.uuid;
      let W = c[k];
      W === void 0 && (W = {}, c[k] = W);
      let j = W[z];
      j === void 0 && (j = M.clone(), W[z] = j, A.addEventListener("dispose", N)), M = j;
    }
    if (M.visible = A.visible, M.wireframe = A.wireframe, y === nn ? M.side = A.shadowSide !== null ? A.shadowSide : A.side : M.side = A.shadowSide !== null ? A.shadowSide : f[A.side], M.alphaMap = A.alphaMap, M.alphaTest = A.alphaTest, M.map = A.map, M.clipShadows = A.clipShadows, M.clippingPlanes = A.clippingPlanes, M.clipIntersection = A.clipIntersection, M.displacementMap = A.displacementMap, M.displacementScale = A.displacementScale, M.displacementBias = A.displacementBias, M.wireframeLinewidth = A.wireframeLinewidth, M.linewidth = A.linewidth, U.isPointLight === true && M.isMeshDistanceMaterial === true) {
      const k = i.properties.get(M);
      k.light = U;
    }
    return M;
  }
  function S(w, A, U, y, M) {
    if (w.visible === false) return;
    if (w.layers.test(A.layers) && (w.isMesh || w.isLine || w.isPoints) && (w.castShadow || w.receiveShadow && M === nn) && (!w.frustumCulled || n.intersectsObject(w))) {
      w.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse, w.matrixWorld);
      const z = t.update(w), W = w.material;
      if (Array.isArray(W)) {
        const j = z.groups;
        for (let V = 0, K = j.length; V < K; V++) {
          const G = j[V], it = W[G.materialIndex];
          if (it && it.visible) {
            const ct = b(w, it, y, M);
            w.onBeforeShadow(i, w, A, U, z, ct, G), i.renderBufferDirect(U, null, z, ct, w, G), w.onAfterShadow(i, w, A, U, z, ct, G);
          }
        }
      } else if (W.visible) {
        const j = b(w, W, y, M);
        w.onBeforeShadow(i, w, A, U, z, j, null), i.renderBufferDirect(U, null, z, j, w, null), w.onAfterShadow(i, w, A, U, z, j, null);
      }
    }
    const k = w.children;
    for (let z = 0, W = k.length; z < W; z++) S(k[z], A, U, y, M);
  }
  function N(w) {
    w.target.removeEventListener("dispose", N);
    for (const U in c) {
      const y = c[U], M = w.target.uuid;
      M in y && (y[M].dispose(), delete y[M]);
    }
  }
}
const Dp = { [gr]: _r, [vr]: Sr, [xr]: yr, [ci]: Mr, [_r]: gr, [Sr]: vr, [yr]: xr, [Mr]: ci };
function Lp(i, t) {
  function e() {
    let R = false;
    const nt = new jt();
    let H = null;
    const $ = new jt(0, 0, 0, 0);
    return { setMask: function(lt) {
      H !== lt && !R && (i.colorMask(lt, lt, lt, lt), H = lt);
    }, setLocked: function(lt) {
      R = lt;
    }, setClear: function(lt, at, Ct, ie, ue) {
      ue === true && (lt *= ie, at *= ie, Ct *= ie), nt.set(lt, at, Ct, ie), $.equals(nt) === false && (i.clearColor(lt, at, Ct, ie), $.copy(nt));
    }, reset: function() {
      R = false, H = null, $.set(-1, 0, 0, 0);
    } };
  }
  function n() {
    let R = false, nt = false, H = null, $ = null, lt = null;
    return { setReversed: function(at) {
      if (nt !== at) {
        const Ct = t.get("EXT_clip_control");
        nt ? Ct.clipControlEXT(Ct.LOWER_LEFT_EXT, Ct.ZERO_TO_ONE_EXT) : Ct.clipControlEXT(Ct.LOWER_LEFT_EXT, Ct.NEGATIVE_ONE_TO_ONE_EXT);
        const ie = lt;
        lt = null, this.setClear(ie);
      }
      nt = at;
    }, getReversed: function() {
      return nt;
    }, setTest: function(at) {
      at ? st(i.DEPTH_TEST) : Et(i.DEPTH_TEST);
    }, setMask: function(at) {
      H !== at && !R && (i.depthMask(at), H = at);
    }, setFunc: function(at) {
      if (nt && (at = Dp[at]), $ !== at) {
        switch (at) {
          case gr:
            i.depthFunc(i.NEVER);
            break;
          case _r:
            i.depthFunc(i.ALWAYS);
            break;
          case vr:
            i.depthFunc(i.LESS);
            break;
          case ci:
            i.depthFunc(i.LEQUAL);
            break;
          case xr:
            i.depthFunc(i.EQUAL);
            break;
          case Mr:
            i.depthFunc(i.GEQUAL);
            break;
          case Sr:
            i.depthFunc(i.GREATER);
            break;
          case yr:
            i.depthFunc(i.NOTEQUAL);
            break;
          default:
            i.depthFunc(i.LEQUAL);
        }
        $ = at;
      }
    }, setLocked: function(at) {
      R = at;
    }, setClear: function(at) {
      lt !== at && (nt && (at = 1 - at), i.clearDepth(at), lt = at);
    }, reset: function() {
      R = false, H = null, $ = null, lt = null, nt = false;
    } };
  }
  function s() {
    let R = false, nt = null, H = null, $ = null, lt = null, at = null, Ct = null, ie = null, ue = null;
    return { setTest: function(Xt) {
      R || (Xt ? st(i.STENCIL_TEST) : Et(i.STENCIL_TEST));
    }, setMask: function(Xt) {
      nt !== Xt && !R && (i.stencilMask(Xt), nt = Xt);
    }, setFunc: function(Xt, Ne, je) {
      (H !== Xt || $ !== Ne || lt !== je) && (i.stencilFunc(Xt, Ne, je), H = Xt, $ = Ne, lt = je);
    }, setOp: function(Xt, Ne, je) {
      (at !== Xt || Ct !== Ne || ie !== je) && (i.stencilOp(Xt, Ne, je), at = Xt, Ct = Ne, ie = je);
    }, setLocked: function(Xt) {
      R = Xt;
    }, setClear: function(Xt) {
      ue !== Xt && (i.clearStencil(Xt), ue = Xt);
    }, reset: function() {
      R = false, nt = null, H = null, $ = null, lt = null, at = null, Ct = null, ie = null, ue = null;
    } };
  }
  const r = new e(), a = new n(), o = new s(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let h = {}, f = {}, d = /* @__PURE__ */ new WeakMap(), m = [], g = null, v = false, p = null, u = null, T = null, b = null, S = null, N = null, w = null, A = new Nt(0, 0, 0), U = 0, y = false, M = null, C = null, k = null, z = null, W = null;
  const j = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let V = false, K = 0;
  const G = i.getParameter(i.VERSION);
  G.indexOf("WebGL") !== -1 ? (K = parseFloat(/^WebGL (\d)/.exec(G)[1]), V = K >= 1) : G.indexOf("OpenGL ES") !== -1 && (K = parseFloat(/^OpenGL ES (\d)/.exec(G)[1]), V = K >= 2);
  let it = null, ct = {};
  const xt = i.getParameter(i.SCISSOR_BOX), It = i.getParameter(i.VIEWPORT), Zt = new jt().fromArray(xt), Y = new jt().fromArray(It);
  function tt(R, nt, H, $) {
    const lt = new Uint8Array(4), at = i.createTexture();
    i.bindTexture(R, at), i.texParameteri(R, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(R, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Ct = 0; Ct < H; Ct++) R === i.TEXTURE_3D || R === i.TEXTURE_2D_ARRAY ? i.texImage3D(nt, 0, i.RGBA, 1, 1, $, 0, i.RGBA, i.UNSIGNED_BYTE, lt) : i.texImage2D(nt + Ct, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, lt);
    return at;
  }
  const gt = {};
  gt[i.TEXTURE_2D] = tt(i.TEXTURE_2D, i.TEXTURE_2D, 1), gt[i.TEXTURE_CUBE_MAP] = tt(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), gt[i.TEXTURE_2D_ARRAY] = tt(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), gt[i.TEXTURE_3D] = tt(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), r.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), st(i.DEPTH_TEST), a.setFunc(ci), Ft(false), Ot(Ia), st(i.CULL_FACE), I(vn);
  function st(R) {
    h[R] !== true && (i.enable(R), h[R] = true);
  }
  function Et(R) {
    h[R] !== false && (i.disable(R), h[R] = false);
  }
  function wt(R, nt) {
    return f[R] !== nt ? (i.bindFramebuffer(R, nt), f[R] = nt, R === i.DRAW_FRAMEBUFFER && (f[i.FRAMEBUFFER] = nt), R === i.FRAMEBUFFER && (f[i.DRAW_FRAMEBUFFER] = nt), true) : false;
  }
  function Ut(R, nt) {
    let H = m, $ = false;
    if (R) {
      H = d.get(nt), H === void 0 && (H = [], d.set(nt, H));
      const lt = R.textures;
      if (H.length !== lt.length || H[0] !== i.COLOR_ATTACHMENT0) {
        for (let at = 0, Ct = lt.length; at < Ct; at++) H[at] = i.COLOR_ATTACHMENT0 + at;
        H.length = lt.length, $ = true;
      }
    } else H[0] !== i.BACK && (H[0] = i.BACK, $ = true);
    $ && i.drawBuffers(H);
  }
  function ne(R) {
    return g !== R ? (i.useProgram(R), g = R, true) : false;
  }
  const zt = { [Pn]: i.FUNC_ADD, [$l]: i.FUNC_SUBTRACT, [jl]: i.FUNC_REVERSE_SUBTRACT };
  zt[Zl] = i.MIN, zt[Kl] = i.MAX;
  const se = { [Jl]: i.ZERO, [Ql]: i.ONE, [tc]: i.SRC_COLOR, [pr]: i.SRC_ALPHA, [ac]: i.SRC_ALPHA_SATURATE, [sc]: i.DST_COLOR, [nc]: i.DST_ALPHA, [ec]: i.ONE_MINUS_SRC_COLOR, [mr]: i.ONE_MINUS_SRC_ALPHA, [rc]: i.ONE_MINUS_DST_COLOR, [ic]: i.ONE_MINUS_DST_ALPHA, [oc]: i.CONSTANT_COLOR, [lc]: i.ONE_MINUS_CONSTANT_COLOR, [cc]: i.CONSTANT_ALPHA, [hc]: i.ONE_MINUS_CONSTANT_ALPHA };
  function I(R, nt, H, $, lt, at, Ct, ie, ue, Xt) {
    if (R === vn) {
      v === true && (Et(i.BLEND), v = false);
      return;
    }
    if (v === false && (st(i.BLEND), v = true), R !== ql) {
      if (R !== p || Xt !== y) {
        if ((u !== Pn || S !== Pn) && (i.blendEquation(i.FUNC_ADD), u = Pn, S = Pn), Xt) switch (R) {
          case ai:
            i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
            break;
          case Ua:
            i.blendFunc(i.ONE, i.ONE);
            break;
          case Na:
            i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
            break;
          case Fa:
            i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
            break;
          default:
            console.error("THREE.WebGLState: Invalid blending: ", R);
            break;
        }
        else switch (R) {
          case ai:
            i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
            break;
          case Ua:
            i.blendFunc(i.SRC_ALPHA, i.ONE);
            break;
          case Na:
            i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
            break;
          case Fa:
            i.blendFunc(i.ZERO, i.SRC_COLOR);
            break;
          default:
            console.error("THREE.WebGLState: Invalid blending: ", R);
            break;
        }
        T = null, b = null, N = null, w = null, A.set(0, 0, 0), U = 0, p = R, y = Xt;
      }
      return;
    }
    lt = lt || nt, at = at || H, Ct = Ct || $, (nt !== u || lt !== S) && (i.blendEquationSeparate(zt[nt], zt[lt]), u = nt, S = lt), (H !== T || $ !== b || at !== N || Ct !== w) && (i.blendFuncSeparate(se[H], se[$], se[at], se[Ct]), T = H, b = $, N = at, w = Ct), (ie.equals(A) === false || ue !== U) && (i.blendColor(ie.r, ie.g, ie.b, ue), A.copy(ie), U = ue), p = R, y = false;
  }
  function Re(R, nt) {
    R.side === sn ? Et(i.CULL_FACE) : st(i.CULL_FACE);
    let H = R.side === ye;
    nt && (H = !H), Ft(H), R.blending === ai && R.transparent === false ? I(vn) : I(R.blending, R.blendEquation, R.blendSrc, R.blendDst, R.blendEquationAlpha, R.blendSrcAlpha, R.blendDstAlpha, R.blendColor, R.blendAlpha, R.premultipliedAlpha), a.setFunc(R.depthFunc), a.setTest(R.depthTest), a.setMask(R.depthWrite), r.setMask(R.colorWrite);
    const $ = R.stencilWrite;
    o.setTest($), $ && (o.setMask(R.stencilWriteMask), o.setFunc(R.stencilFunc, R.stencilRef, R.stencilFuncMask), o.setOp(R.stencilFail, R.stencilZFail, R.stencilZPass)), Qt(R.polygonOffset, R.polygonOffsetFactor, R.polygonOffsetUnits), R.alphaToCoverage === true ? st(i.SAMPLE_ALPHA_TO_COVERAGE) : Et(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Ft(R) {
    M !== R && (R ? i.frontFace(i.CW) : i.frontFace(i.CCW), M = R);
  }
  function Ot(R) {
    R !== Wl ? (st(i.CULL_FACE), R !== C && (R === Ia ? i.cullFace(i.BACK) : R === Xl ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : Et(i.CULL_FACE), C = R;
  }
  function St(R) {
    R !== k && (V && i.lineWidth(R), k = R);
  }
  function Qt(R, nt, H) {
    R ? (st(i.POLYGON_OFFSET_FILL), (z !== nt || W !== H) && (i.polygonOffset(nt, H), z = nt, W = H)) : Et(i.POLYGON_OFFSET_FILL);
  }
  function Mt(R) {
    R ? st(i.SCISSOR_TEST) : Et(i.SCISSOR_TEST);
  }
  function E(R) {
    R === void 0 && (R = i.TEXTURE0 + j - 1), it !== R && (i.activeTexture(R), it = R);
  }
  function _(R, nt, H) {
    H === void 0 && (it === null ? H = i.TEXTURE0 + j - 1 : H = it);
    let $ = ct[H];
    $ === void 0 && ($ = { type: void 0, texture: void 0 }, ct[H] = $), ($.type !== R || $.texture !== nt) && (it !== H && (i.activeTexture(H), it = H), i.bindTexture(R, nt || gt[R]), $.type = R, $.texture = nt);
  }
  function F() {
    const R = ct[it];
    R !== void 0 && R.type !== void 0 && (i.bindTexture(R.type, null), R.type = void 0, R.texture = void 0);
  }
  function q() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function Z() {
    try {
      i.compressedTexImage3D.apply(i, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function X() {
    try {
      i.texSubImage2D.apply(i, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function _t() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function rt() {
    try {
      i.compressedTexSubImage2D.apply(i, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function ht() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function kt() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function J() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function ut() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function yt() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function bt(R) {
    Zt.equals(R) === false && (i.scissor(R.x, R.y, R.z, R.w), Zt.copy(R));
  }
  function dt(R) {
    Y.equals(R) === false && (i.viewport(R.x, R.y, R.z, R.w), Y.copy(R));
  }
  function Bt(R, nt) {
    let H = c.get(nt);
    H === void 0 && (H = /* @__PURE__ */ new WeakMap(), c.set(nt, H));
    let $ = H.get(R);
    $ === void 0 && ($ = i.getUniformBlockIndex(nt, R.name), H.set(R, $));
  }
  function Dt(R, nt) {
    const $ = c.get(nt).get(R);
    l.get(nt) !== $ && (i.uniformBlockBinding(nt, $, R.__bindingPointIndex), l.set(nt, $));
  }
  function Kt() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(true, true, true, true), i.clearColor(0, 0, 0, 0), i.depthMask(true), i.depthFunc(i.LESS), a.setReversed(false), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), h = {}, it = null, ct = {}, f = {}, d = /* @__PURE__ */ new WeakMap(), m = [], g = null, v = false, p = null, u = null, T = null, b = null, S = null, N = null, w = null, A = new Nt(0, 0, 0), U = 0, y = false, M = null, C = null, k = null, z = null, W = null, Zt.set(0, 0, i.canvas.width, i.canvas.height), Y.set(0, 0, i.canvas.width, i.canvas.height), r.reset(), a.reset(), o.reset();
  }
  return { buffers: { color: r, depth: a, stencil: o }, enable: st, disable: Et, bindFramebuffer: wt, drawBuffers: Ut, useProgram: ne, setBlending: I, setMaterial: Re, setFlipSided: Ft, setCullFace: Ot, setLineWidth: St, setPolygonOffset: Qt, setScissorTest: Mt, activeTexture: E, bindTexture: _, unbindTexture: F, compressedTexImage2D: q, compressedTexImage3D: Z, texImage2D: ut, texImage3D: yt, updateUBOMapping: Bt, uniformBlockBinding: Dt, texStorage2D: kt, texStorage3D: J, texSubImage2D: X, texSubImage3D: _t, compressedTexSubImage2D: rt, compressedTexSubImage3D: ht, scissor: bt, viewport: dt, reset: Kt };
}
function Do(i, t, e, n) {
  const s = Ip(n);
  switch (e) {
    case el:
      return i * t;
    case il:
      return i * t;
    case sl:
      return i * t * 2;
    case oa:
      return i * t / s.components * s.byteLength;
    case la:
      return i * t / s.components * s.byteLength;
    case rl:
      return i * t * 2 / s.components * s.byteLength;
    case ca:
      return i * t * 2 / s.components * s.byteLength;
    case nl:
      return i * t * 3 / s.components * s.byteLength;
    case ke:
      return i * t * 4 / s.components * s.byteLength;
    case ha:
      return i * t * 4 / s.components * s.byteLength;
    case _s:
    case vs:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case xs:
    case Ms:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Cr:
    case Pr:
      return Math.max(i, 16) * Math.max(t, 8) / 4;
    case wr:
    case Rr:
      return Math.max(i, 8) * Math.max(t, 8) / 2;
    case Dr:
    case Lr:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case Ir:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Ur:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Nr:
      return Math.floor((i + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case Fr:
      return Math.floor((i + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case Or:
      return Math.floor((i + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case Br:
      return Math.floor((i + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case zr:
      return Math.floor((i + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case kr:
      return Math.floor((i + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case Hr:
      return Math.floor((i + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case Gr:
      return Math.floor((i + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case Vr:
      return Math.floor((i + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case Wr:
      return Math.floor((i + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case Xr:
      return Math.floor((i + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case Yr:
      return Math.floor((i + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case qr:
      return Math.floor((i + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case Ss:
    case $r:
    case jr:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
    case al:
    case Zr:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 8;
    case Kr:
    case Jr:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${e} format.`);
}
function Ip(i) {
  switch (i) {
    case on:
    case Jo:
      return { byteLength: 1, components: 1 };
    case Fi:
    case Qo:
    case Oi:
      return { byteLength: 2, components: 1 };
    case ra:
    case aa:
      return { byteLength: 2, components: 4 };
    case Un:
    case sa:
    case Ye:
      return { byteLength: 4, components: 1 };
    case tl:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${i}.`);
}
function Up(i, t, e, n, s, r, a) {
  const o = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? false : /OculusBrowser/g.test(navigator.userAgent), c = new At(), h = /* @__PURE__ */ new WeakMap();
  let f;
  const d = /* @__PURE__ */ new WeakMap();
  let m = false;
  try {
    m = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function g(E, _) {
    return m ? new OffscreenCanvas(E, _) : Ts("canvas");
  }
  function v(E, _, F) {
    let q = 1;
    const Z = Mt(E);
    if ((Z.width > F || Z.height > F) && (q = F / Math.max(Z.width, Z.height)), q < 1) if (typeof HTMLImageElement < "u" && E instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && E instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && E instanceof ImageBitmap || typeof VideoFrame < "u" && E instanceof VideoFrame) {
      const X = Math.floor(q * Z.width), _t = Math.floor(q * Z.height);
      f === void 0 && (f = g(X, _t));
      const rt = _ ? g(X, _t) : f;
      return rt.width = X, rt.height = _t, rt.getContext("2d").drawImage(E, 0, 0, X, _t), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + Z.width + "x" + Z.height + ") to (" + X + "x" + _t + ")."), rt;
    } else return "data" in E && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + Z.width + "x" + Z.height + ")."), E;
    return E;
  }
  function p(E) {
    return E.generateMipmaps;
  }
  function u(E) {
    i.generateMipmap(E);
  }
  function T(E) {
    return E.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : E.isWebGL3DRenderTarget ? i.TEXTURE_3D : E.isWebGLArrayRenderTarget || E.isCompressedArrayTexture ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D;
  }
  function b(E, _, F, q, Z = false) {
    if (E !== null) {
      if (i[E] !== void 0) return i[E];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + E + "'");
    }
    let X = _;
    if (_ === i.RED && (F === i.FLOAT && (X = i.R32F), F === i.HALF_FLOAT && (X = i.R16F), F === i.UNSIGNED_BYTE && (X = i.R8)), _ === i.RED_INTEGER && (F === i.UNSIGNED_BYTE && (X = i.R8UI), F === i.UNSIGNED_SHORT && (X = i.R16UI), F === i.UNSIGNED_INT && (X = i.R32UI), F === i.BYTE && (X = i.R8I), F === i.SHORT && (X = i.R16I), F === i.INT && (X = i.R32I)), _ === i.RG && (F === i.FLOAT && (X = i.RG32F), F === i.HALF_FLOAT && (X = i.RG16F), F === i.UNSIGNED_BYTE && (X = i.RG8)), _ === i.RG_INTEGER && (F === i.UNSIGNED_BYTE && (X = i.RG8UI), F === i.UNSIGNED_SHORT && (X = i.RG16UI), F === i.UNSIGNED_INT && (X = i.RG32UI), F === i.BYTE && (X = i.RG8I), F === i.SHORT && (X = i.RG16I), F === i.INT && (X = i.RG32I)), _ === i.RGB_INTEGER && (F === i.UNSIGNED_BYTE && (X = i.RGB8UI), F === i.UNSIGNED_SHORT && (X = i.RGB16UI), F === i.UNSIGNED_INT && (X = i.RGB32UI), F === i.BYTE && (X = i.RGB8I), F === i.SHORT && (X = i.RGB16I), F === i.INT && (X = i.RGB32I)), _ === i.RGBA_INTEGER && (F === i.UNSIGNED_BYTE && (X = i.RGBA8UI), F === i.UNSIGNED_SHORT && (X = i.RGBA16UI), F === i.UNSIGNED_INT && (X = i.RGBA32UI), F === i.BYTE && (X = i.RGBA8I), F === i.SHORT && (X = i.RGBA16I), F === i.INT && (X = i.RGBA32I)), _ === i.RGB && F === i.UNSIGNED_INT_5_9_9_9_REV && (X = i.RGB9_E5), _ === i.RGBA) {
      const _t = Z ? Rs : Ht.getTransfer(q);
      F === i.FLOAT && (X = i.RGBA32F), F === i.HALF_FLOAT && (X = i.RGBA16F), F === i.UNSIGNED_BYTE && (X = _t === qt ? i.SRGB8_ALPHA8 : i.RGBA8), F === i.UNSIGNED_SHORT_4_4_4_4 && (X = i.RGBA4), F === i.UNSIGNED_SHORT_5_5_5_1 && (X = i.RGB5_A1);
    }
    return (X === i.R16F || X === i.R32F || X === i.RG16F || X === i.RG32F || X === i.RGBA16F || X === i.RGBA32F) && t.get("EXT_color_buffer_float"), X;
  }
  function S(E, _) {
    let F;
    return E ? _ === null || _ === Un || _ === di ? F = i.DEPTH24_STENCIL8 : _ === Ye ? F = i.DEPTH32F_STENCIL8 : _ === Fi && (F = i.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : _ === null || _ === Un || _ === di ? F = i.DEPTH_COMPONENT24 : _ === Ye ? F = i.DEPTH_COMPONENT32F : _ === Fi && (F = i.DEPTH_COMPONENT16), F;
  }
  function N(E, _) {
    return p(E) === true || E.isFramebufferTexture && E.minFilter !== Ce && E.minFilter !== Xe ? Math.log2(Math.max(_.width, _.height)) + 1 : E.mipmaps !== void 0 && E.mipmaps.length > 0 ? E.mipmaps.length : E.isCompressedTexture && Array.isArray(E.image) ? _.mipmaps.length : 1;
  }
  function w(E) {
    const _ = E.target;
    _.removeEventListener("dispose", w), U(_), _.isVideoTexture && h.delete(_);
  }
  function A(E) {
    const _ = E.target;
    _.removeEventListener("dispose", A), M(_);
  }
  function U(E) {
    const _ = n.get(E);
    if (_.__webglInit === void 0) return;
    const F = E.source, q = d.get(F);
    if (q) {
      const Z = q[_.__cacheKey];
      Z.usedTimes--, Z.usedTimes === 0 && y(E), Object.keys(q).length === 0 && d.delete(F);
    }
    n.remove(E);
  }
  function y(E) {
    const _ = n.get(E);
    i.deleteTexture(_.__webglTexture);
    const F = E.source, q = d.get(F);
    delete q[_.__cacheKey], a.memory.textures--;
  }
  function M(E) {
    const _ = n.get(E);
    if (E.depthTexture && (E.depthTexture.dispose(), n.remove(E.depthTexture)), E.isWebGLCubeRenderTarget) for (let q = 0; q < 6; q++) {
      if (Array.isArray(_.__webglFramebuffer[q])) for (let Z = 0; Z < _.__webglFramebuffer[q].length; Z++) i.deleteFramebuffer(_.__webglFramebuffer[q][Z]);
      else i.deleteFramebuffer(_.__webglFramebuffer[q]);
      _.__webglDepthbuffer && i.deleteRenderbuffer(_.__webglDepthbuffer[q]);
    }
    else {
      if (Array.isArray(_.__webglFramebuffer)) for (let q = 0; q < _.__webglFramebuffer.length; q++) i.deleteFramebuffer(_.__webglFramebuffer[q]);
      else i.deleteFramebuffer(_.__webglFramebuffer);
      if (_.__webglDepthbuffer && i.deleteRenderbuffer(_.__webglDepthbuffer), _.__webglMultisampledFramebuffer && i.deleteFramebuffer(_.__webglMultisampledFramebuffer), _.__webglColorRenderbuffer) for (let q = 0; q < _.__webglColorRenderbuffer.length; q++) _.__webglColorRenderbuffer[q] && i.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);
      _.__webglDepthRenderbuffer && i.deleteRenderbuffer(_.__webglDepthRenderbuffer);
    }
    const F = E.textures;
    for (let q = 0, Z = F.length; q < Z; q++) {
      const X = n.get(F[q]);
      X.__webglTexture && (i.deleteTexture(X.__webglTexture), a.memory.textures--), n.remove(F[q]);
    }
    n.remove(E);
  }
  let C = 0;
  function k() {
    C = 0;
  }
  function z() {
    const E = C;
    return E >= s.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + E + " texture units while this GPU supports only " + s.maxTextures), C += 1, E;
  }
  function W(E) {
    const _ = [];
    return _.push(E.wrapS), _.push(E.wrapT), _.push(E.wrapR || 0), _.push(E.magFilter), _.push(E.minFilter), _.push(E.anisotropy), _.push(E.internalFormat), _.push(E.format), _.push(E.type), _.push(E.generateMipmaps), _.push(E.premultiplyAlpha), _.push(E.flipY), _.push(E.unpackAlignment), _.push(E.colorSpace), _.join();
  }
  function j(E, _) {
    const F = n.get(E);
    if (E.isVideoTexture && St(E), E.isRenderTargetTexture === false && E.version > 0 && F.__version !== E.version) {
      const q = E.image;
      if (q === null) console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (q.complete === false) console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        Y(F, E, _);
        return;
      }
    }
    e.bindTexture(i.TEXTURE_2D, F.__webglTexture, i.TEXTURE0 + _);
  }
  function V(E, _) {
    const F = n.get(E);
    if (E.version > 0 && F.__version !== E.version) {
      Y(F, E, _);
      return;
    }
    e.bindTexture(i.TEXTURE_2D_ARRAY, F.__webglTexture, i.TEXTURE0 + _);
  }
  function K(E, _) {
    const F = n.get(E);
    if (E.version > 0 && F.__version !== E.version) {
      Y(F, E, _);
      return;
    }
    e.bindTexture(i.TEXTURE_3D, F.__webglTexture, i.TEXTURE0 + _);
  }
  function G(E, _) {
    const F = n.get(E);
    if (E.version > 0 && F.__version !== E.version) {
      tt(F, E, _);
      return;
    }
    e.bindTexture(i.TEXTURE_CUBE_MAP, F.__webglTexture, i.TEXTURE0 + _);
  }
  const it = { [Tr]: i.REPEAT, [Ln]: i.CLAMP_TO_EDGE, [Ar]: i.MIRRORED_REPEAT }, ct = { [Ce]: i.NEAREST, [xc]: i.NEAREST_MIPMAP_NEAREST, [Gi]: i.NEAREST_MIPMAP_LINEAR, [Xe]: i.LINEAR, [Is]: i.LINEAR_MIPMAP_NEAREST, [In]: i.LINEAR_MIPMAP_LINEAR }, xt = { [Ec]: i.NEVER, [Rc]: i.ALWAYS, [bc]: i.LESS, [ll]: i.LEQUAL, [Tc]: i.EQUAL, [Cc]: i.GEQUAL, [Ac]: i.GREATER, [wc]: i.NOTEQUAL };
  function It(E, _) {
    if (_.type === Ye && t.has("OES_texture_float_linear") === false && (_.magFilter === Xe || _.magFilter === Is || _.magFilter === Gi || _.magFilter === In || _.minFilter === Xe || _.minFilter === Is || _.minFilter === Gi || _.minFilter === In) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(E, i.TEXTURE_WRAP_S, it[_.wrapS]), i.texParameteri(E, i.TEXTURE_WRAP_T, it[_.wrapT]), (E === i.TEXTURE_3D || E === i.TEXTURE_2D_ARRAY) && i.texParameteri(E, i.TEXTURE_WRAP_R, it[_.wrapR]), i.texParameteri(E, i.TEXTURE_MAG_FILTER, ct[_.magFilter]), i.texParameteri(E, i.TEXTURE_MIN_FILTER, ct[_.minFilter]), _.compareFunction && (i.texParameteri(E, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(E, i.TEXTURE_COMPARE_FUNC, xt[_.compareFunction])), t.has("EXT_texture_filter_anisotropic") === true) {
      if (_.magFilter === Ce || _.minFilter !== Gi && _.minFilter !== In || _.type === Ye && t.has("OES_texture_float_linear") === false) return;
      if (_.anisotropy > 1 || n.get(_).__currentAnisotropy) {
        const F = t.get("EXT_texture_filter_anisotropic");
        i.texParameterf(E, F.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(_.anisotropy, s.getMaxAnisotropy())), n.get(_).__currentAnisotropy = _.anisotropy;
      }
    }
  }
  function Zt(E, _) {
    let F = false;
    E.__webglInit === void 0 && (E.__webglInit = true, _.addEventListener("dispose", w));
    const q = _.source;
    let Z = d.get(q);
    Z === void 0 && (Z = {}, d.set(q, Z));
    const X = W(_);
    if (X !== E.__cacheKey) {
      Z[X] === void 0 && (Z[X] = { texture: i.createTexture(), usedTimes: 0 }, a.memory.textures++, F = true), Z[X].usedTimes++;
      const _t = Z[E.__cacheKey];
      _t !== void 0 && (Z[E.__cacheKey].usedTimes--, _t.usedTimes === 0 && y(_)), E.__cacheKey = X, E.__webglTexture = Z[X].texture;
    }
    return F;
  }
  function Y(E, _, F) {
    let q = i.TEXTURE_2D;
    (_.isDataArrayTexture || _.isCompressedArrayTexture) && (q = i.TEXTURE_2D_ARRAY), _.isData3DTexture && (q = i.TEXTURE_3D);
    const Z = Zt(E, _), X = _.source;
    e.bindTexture(q, E.__webglTexture, i.TEXTURE0 + F);
    const _t = n.get(X);
    if (X.version !== _t.__version || Z === true) {
      e.activeTexture(i.TEXTURE0 + F);
      const rt = Ht.getPrimaries(Ht.workingColorSpace), ht = _.colorSpace === _n ? null : Ht.getPrimaries(_.colorSpace), kt = _.colorSpace === _n || rt === ht ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, _.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, _.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, kt);
      let J = v(_.image, false, s.maxTextureSize);
      J = Qt(_, J);
      const ut = r.convert(_.format, _.colorSpace), yt = r.convert(_.type);
      let bt = b(_.internalFormat, ut, yt, _.colorSpace, _.isVideoTexture);
      It(q, _);
      let dt;
      const Bt = _.mipmaps, Dt = _.isVideoTexture !== true, Kt = _t.__version === void 0 || Z === true, R = X.dataReady, nt = N(_, J);
      if (_.isDepthTexture) bt = S(_.format === fi, _.type), Kt && (Dt ? e.texStorage2D(i.TEXTURE_2D, 1, bt, J.width, J.height) : e.texImage2D(i.TEXTURE_2D, 0, bt, J.width, J.height, 0, ut, yt, null));
      else if (_.isDataTexture) if (Bt.length > 0) {
        Dt && Kt && e.texStorage2D(i.TEXTURE_2D, nt, bt, Bt[0].width, Bt[0].height);
        for (let H = 0, $ = Bt.length; H < $; H++) dt = Bt[H], Dt ? R && e.texSubImage2D(i.TEXTURE_2D, H, 0, 0, dt.width, dt.height, ut, yt, dt.data) : e.texImage2D(i.TEXTURE_2D, H, bt, dt.width, dt.height, 0, ut, yt, dt.data);
        _.generateMipmaps = false;
      } else Dt ? (Kt && e.texStorage2D(i.TEXTURE_2D, nt, bt, J.width, J.height), R && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, J.width, J.height, ut, yt, J.data)) : e.texImage2D(i.TEXTURE_2D, 0, bt, J.width, J.height, 0, ut, yt, J.data);
      else if (_.isCompressedTexture) if (_.isCompressedArrayTexture) {
        Dt && Kt && e.texStorage3D(i.TEXTURE_2D_ARRAY, nt, bt, Bt[0].width, Bt[0].height, J.depth);
        for (let H = 0, $ = Bt.length; H < $; H++) if (dt = Bt[H], _.format !== ke) if (ut !== null) if (Dt) {
          if (R) if (_.layerUpdates.size > 0) {
            const lt = Do(dt.width, dt.height, _.format, _.type);
            for (const at of _.layerUpdates) {
              const Ct = dt.data.subarray(at * lt / dt.data.BYTES_PER_ELEMENT, (at + 1) * lt / dt.data.BYTES_PER_ELEMENT);
              e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, H, 0, 0, at, dt.width, dt.height, 1, ut, Ct);
            }
            _.clearLayerUpdates();
          } else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, H, 0, 0, 0, dt.width, dt.height, J.depth, ut, dt.data);
        } else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY, H, bt, dt.width, dt.height, J.depth, 0, dt.data, 0, 0);
        else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
        else Dt ? R && e.texSubImage3D(i.TEXTURE_2D_ARRAY, H, 0, 0, 0, dt.width, dt.height, J.depth, ut, yt, dt.data) : e.texImage3D(i.TEXTURE_2D_ARRAY, H, bt, dt.width, dt.height, J.depth, 0, ut, yt, dt.data);
      } else {
        Dt && Kt && e.texStorage2D(i.TEXTURE_2D, nt, bt, Bt[0].width, Bt[0].height);
        for (let H = 0, $ = Bt.length; H < $; H++) dt = Bt[H], _.format !== ke ? ut !== null ? Dt ? R && e.compressedTexSubImage2D(i.TEXTURE_2D, H, 0, 0, dt.width, dt.height, ut, dt.data) : e.compressedTexImage2D(i.TEXTURE_2D, H, bt, dt.width, dt.height, 0, dt.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Dt ? R && e.texSubImage2D(i.TEXTURE_2D, H, 0, 0, dt.width, dt.height, ut, yt, dt.data) : e.texImage2D(i.TEXTURE_2D, H, bt, dt.width, dt.height, 0, ut, yt, dt.data);
      }
      else if (_.isDataArrayTexture) if (Dt) {
        if (Kt && e.texStorage3D(i.TEXTURE_2D_ARRAY, nt, bt, J.width, J.height, J.depth), R) if (_.layerUpdates.size > 0) {
          const H = Do(J.width, J.height, _.format, _.type);
          for (const $ of _.layerUpdates) {
            const lt = J.data.subarray($ * H / J.data.BYTES_PER_ELEMENT, ($ + 1) * H / J.data.BYTES_PER_ELEMENT);
            e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, $, J.width, J.height, 1, ut, yt, lt);
          }
          _.clearLayerUpdates();
        } else e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, J.width, J.height, J.depth, ut, yt, J.data);
      } else e.texImage3D(i.TEXTURE_2D_ARRAY, 0, bt, J.width, J.height, J.depth, 0, ut, yt, J.data);
      else if (_.isData3DTexture) Dt ? (Kt && e.texStorage3D(i.TEXTURE_3D, nt, bt, J.width, J.height, J.depth), R && e.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, J.width, J.height, J.depth, ut, yt, J.data)) : e.texImage3D(i.TEXTURE_3D, 0, bt, J.width, J.height, J.depth, 0, ut, yt, J.data);
      else if (_.isFramebufferTexture) {
        if (Kt) if (Dt) e.texStorage2D(i.TEXTURE_2D, nt, bt, J.width, J.height);
        else {
          let H = J.width, $ = J.height;
          for (let lt = 0; lt < nt; lt++) e.texImage2D(i.TEXTURE_2D, lt, bt, H, $, 0, ut, yt, null), H >>= 1, $ >>= 1;
        }
      } else if (Bt.length > 0) {
        if (Dt && Kt) {
          const H = Mt(Bt[0]);
          e.texStorage2D(i.TEXTURE_2D, nt, bt, H.width, H.height);
        }
        for (let H = 0, $ = Bt.length; H < $; H++) dt = Bt[H], Dt ? R && e.texSubImage2D(i.TEXTURE_2D, H, 0, 0, ut, yt, dt) : e.texImage2D(i.TEXTURE_2D, H, bt, ut, yt, dt);
        _.generateMipmaps = false;
      } else if (Dt) {
        if (Kt) {
          const H = Mt(J);
          e.texStorage2D(i.TEXTURE_2D, nt, bt, H.width, H.height);
        }
        R && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, ut, yt, J);
      } else e.texImage2D(i.TEXTURE_2D, 0, bt, ut, yt, J);
      p(_) && u(q), _t.__version = X.version, _.onUpdate && _.onUpdate(_);
    }
    E.__version = _.version;
  }
  function tt(E, _, F) {
    if (_.image.length !== 6) return;
    const q = Zt(E, _), Z = _.source;
    e.bindTexture(i.TEXTURE_CUBE_MAP, E.__webglTexture, i.TEXTURE0 + F);
    const X = n.get(Z);
    if (Z.version !== X.__version || q === true) {
      e.activeTexture(i.TEXTURE0 + F);
      const _t = Ht.getPrimaries(Ht.workingColorSpace), rt = _.colorSpace === _n ? null : Ht.getPrimaries(_.colorSpace), ht = _.colorSpace === _n || _t === rt ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, _.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, _.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, ht);
      const kt = _.isCompressedTexture || _.image[0].isCompressedTexture, J = _.image[0] && _.image[0].isDataTexture, ut = [];
      for (let $ = 0; $ < 6; $++) !kt && !J ? ut[$] = v(_.image[$], true, s.maxCubemapSize) : ut[$] = J ? _.image[$].image : _.image[$], ut[$] = Qt(_, ut[$]);
      const yt = ut[0], bt = r.convert(_.format, _.colorSpace), dt = r.convert(_.type), Bt = b(_.internalFormat, bt, dt, _.colorSpace), Dt = _.isVideoTexture !== true, Kt = X.__version === void 0 || q === true, R = Z.dataReady;
      let nt = N(_, yt);
      It(i.TEXTURE_CUBE_MAP, _);
      let H;
      if (kt) {
        Dt && Kt && e.texStorage2D(i.TEXTURE_CUBE_MAP, nt, Bt, yt.width, yt.height);
        for (let $ = 0; $ < 6; $++) {
          H = ut[$].mipmaps;
          for (let lt = 0; lt < H.length; lt++) {
            const at = H[lt];
            _.format !== ke ? bt !== null ? Dt ? R && e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, lt, 0, 0, at.width, at.height, bt, at.data) : e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, lt, Bt, at.width, at.height, 0, at.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Dt ? R && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, lt, 0, 0, at.width, at.height, bt, dt, at.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, lt, Bt, at.width, at.height, 0, bt, dt, at.data);
          }
        }
      } else {
        if (H = _.mipmaps, Dt && Kt) {
          H.length > 0 && nt++;
          const $ = Mt(ut[0]);
          e.texStorage2D(i.TEXTURE_CUBE_MAP, nt, Bt, $.width, $.height);
        }
        for (let $ = 0; $ < 6; $++) if (J) {
          Dt ? R && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, 0, 0, ut[$].width, ut[$].height, bt, dt, ut[$].data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, Bt, ut[$].width, ut[$].height, 0, bt, dt, ut[$].data);
          for (let lt = 0; lt < H.length; lt++) {
            const Ct = H[lt].image[$].image;
            Dt ? R && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, lt + 1, 0, 0, Ct.width, Ct.height, bt, dt, Ct.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, lt + 1, Bt, Ct.width, Ct.height, 0, bt, dt, Ct.data);
          }
        } else {
          Dt ? R && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, 0, 0, bt, dt, ut[$]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, Bt, bt, dt, ut[$]);
          for (let lt = 0; lt < H.length; lt++) {
            const at = H[lt];
            Dt ? R && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, lt + 1, 0, 0, bt, dt, at.image[$]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, lt + 1, Bt, bt, dt, at.image[$]);
          }
        }
      }
      p(_) && u(i.TEXTURE_CUBE_MAP), X.__version = Z.version, _.onUpdate && _.onUpdate(_);
    }
    E.__version = _.version;
  }
  function gt(E, _, F, q, Z, X) {
    const _t = r.convert(F.format, F.colorSpace), rt = r.convert(F.type), ht = b(F.internalFormat, _t, rt, F.colorSpace), kt = n.get(_), J = n.get(F);
    if (J.__renderTarget = _, !kt.__hasExternalTextures) {
      const ut = Math.max(1, _.width >> X), yt = Math.max(1, _.height >> X);
      Z === i.TEXTURE_3D || Z === i.TEXTURE_2D_ARRAY ? e.texImage3D(Z, X, ht, ut, yt, _.depth, 0, _t, rt, null) : e.texImage2D(Z, X, ht, ut, yt, 0, _t, rt, null);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, E), Ot(_) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, q, Z, J.__webglTexture, 0, Ft(_)) : (Z === i.TEXTURE_2D || Z >= i.TEXTURE_CUBE_MAP_POSITIVE_X && Z <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, q, Z, J.__webglTexture, X), e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function st(E, _, F) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, E), _.depthBuffer) {
      const q = _.depthTexture, Z = q && q.isDepthTexture ? q.type : null, X = S(_.stencilBuffer, Z), _t = _.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, rt = Ft(_);
      Ot(_) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, rt, X, _.width, _.height) : F ? i.renderbufferStorageMultisample(i.RENDERBUFFER, rt, X, _.width, _.height) : i.renderbufferStorage(i.RENDERBUFFER, X, _.width, _.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, _t, i.RENDERBUFFER, E);
    } else {
      const q = _.textures;
      for (let Z = 0; Z < q.length; Z++) {
        const X = q[Z], _t = r.convert(X.format, X.colorSpace), rt = r.convert(X.type), ht = b(X.internalFormat, _t, rt, X.colorSpace), kt = Ft(_);
        F && Ot(_) === false ? i.renderbufferStorageMultisample(i.RENDERBUFFER, kt, ht, _.width, _.height) : Ot(_) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, kt, ht, _.width, _.height) : i.renderbufferStorage(i.RENDERBUFFER, ht, _.width, _.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function Et(E, _) {
    if (_ && _.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (e.bindFramebuffer(i.FRAMEBUFFER, E), !(_.depthTexture && _.depthTexture.isDepthTexture)) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const q = n.get(_.depthTexture);
    q.__renderTarget = _, (!q.__webglTexture || _.depthTexture.image.width !== _.width || _.depthTexture.image.height !== _.height) && (_.depthTexture.image.width = _.width, _.depthTexture.image.height = _.height, _.depthTexture.needsUpdate = true), j(_.depthTexture, 0);
    const Z = q.__webglTexture, X = Ft(_);
    if (_.depthTexture.format === oi) Ot(_) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, Z, 0, X) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, Z, 0);
    else if (_.depthTexture.format === fi) Ot(_) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, Z, 0, X) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, Z, 0);
    else throw new Error("Unknown depthTexture format");
  }
  function wt(E) {
    const _ = n.get(E), F = E.isWebGLCubeRenderTarget === true;
    if (_.__boundDepthTexture !== E.depthTexture) {
      const q = E.depthTexture;
      if (_.__depthDisposeCallback && _.__depthDisposeCallback(), q) {
        const Z = () => {
          delete _.__boundDepthTexture, delete _.__depthDisposeCallback, q.removeEventListener("dispose", Z);
        };
        q.addEventListener("dispose", Z), _.__depthDisposeCallback = Z;
      }
      _.__boundDepthTexture = q;
    }
    if (E.depthTexture && !_.__autoAllocateDepthBuffer) {
      if (F) throw new Error("target.depthTexture not supported in Cube render targets");
      Et(_.__webglFramebuffer, E);
    } else if (F) {
      _.__webglDepthbuffer = [];
      for (let q = 0; q < 6; q++) if (e.bindFramebuffer(i.FRAMEBUFFER, _.__webglFramebuffer[q]), _.__webglDepthbuffer[q] === void 0) _.__webglDepthbuffer[q] = i.createRenderbuffer(), st(_.__webglDepthbuffer[q], E, false);
      else {
        const Z = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, X = _.__webglDepthbuffer[q];
        i.bindRenderbuffer(i.RENDERBUFFER, X), i.framebufferRenderbuffer(i.FRAMEBUFFER, Z, i.RENDERBUFFER, X);
      }
    } else if (e.bindFramebuffer(i.FRAMEBUFFER, _.__webglFramebuffer), _.__webglDepthbuffer === void 0) _.__webglDepthbuffer = i.createRenderbuffer(), st(_.__webglDepthbuffer, E, false);
    else {
      const q = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, Z = _.__webglDepthbuffer;
      i.bindRenderbuffer(i.RENDERBUFFER, Z), i.framebufferRenderbuffer(i.FRAMEBUFFER, q, i.RENDERBUFFER, Z);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Ut(E, _, F) {
    const q = n.get(E);
    _ !== void 0 && gt(q.__webglFramebuffer, E, E.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), F !== void 0 && wt(E);
  }
  function ne(E) {
    const _ = E.texture, F = n.get(E), q = n.get(_);
    E.addEventListener("dispose", A);
    const Z = E.textures, X = E.isWebGLCubeRenderTarget === true, _t = Z.length > 1;
    if (_t || (q.__webglTexture === void 0 && (q.__webglTexture = i.createTexture()), q.__version = _.version, a.memory.textures++), X) {
      F.__webglFramebuffer = [];
      for (let rt = 0; rt < 6; rt++) if (_.mipmaps && _.mipmaps.length > 0) {
        F.__webglFramebuffer[rt] = [];
        for (let ht = 0; ht < _.mipmaps.length; ht++) F.__webglFramebuffer[rt][ht] = i.createFramebuffer();
      } else F.__webglFramebuffer[rt] = i.createFramebuffer();
    } else {
      if (_.mipmaps && _.mipmaps.length > 0) {
        F.__webglFramebuffer = [];
        for (let rt = 0; rt < _.mipmaps.length; rt++) F.__webglFramebuffer[rt] = i.createFramebuffer();
      } else F.__webglFramebuffer = i.createFramebuffer();
      if (_t) for (let rt = 0, ht = Z.length; rt < ht; rt++) {
        const kt = n.get(Z[rt]);
        kt.__webglTexture === void 0 && (kt.__webglTexture = i.createTexture(), a.memory.textures++);
      }
      if (E.samples > 0 && Ot(E) === false) {
        F.__webglMultisampledFramebuffer = i.createFramebuffer(), F.__webglColorRenderbuffer = [], e.bindFramebuffer(i.FRAMEBUFFER, F.__webglMultisampledFramebuffer);
        for (let rt = 0; rt < Z.length; rt++) {
          const ht = Z[rt];
          F.__webglColorRenderbuffer[rt] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, F.__webglColorRenderbuffer[rt]);
          const kt = r.convert(ht.format, ht.colorSpace), J = r.convert(ht.type), ut = b(ht.internalFormat, kt, J, ht.colorSpace, E.isXRRenderTarget === true), yt = Ft(E);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, yt, ut, E.width, E.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + rt, i.RENDERBUFFER, F.__webglColorRenderbuffer[rt]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), E.depthBuffer && (F.__webglDepthRenderbuffer = i.createRenderbuffer(), st(F.__webglDepthRenderbuffer, E, true)), e.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (X) {
      e.bindTexture(i.TEXTURE_CUBE_MAP, q.__webglTexture), It(i.TEXTURE_CUBE_MAP, _);
      for (let rt = 0; rt < 6; rt++) if (_.mipmaps && _.mipmaps.length > 0) for (let ht = 0; ht < _.mipmaps.length; ht++) gt(F.__webglFramebuffer[rt][ht], E, _, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + rt, ht);
      else gt(F.__webglFramebuffer[rt], E, _, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + rt, 0);
      p(_) && u(i.TEXTURE_CUBE_MAP), e.unbindTexture();
    } else if (_t) {
      for (let rt = 0, ht = Z.length; rt < ht; rt++) {
        const kt = Z[rt], J = n.get(kt);
        e.bindTexture(i.TEXTURE_2D, J.__webglTexture), It(i.TEXTURE_2D, kt), gt(F.__webglFramebuffer, E, kt, i.COLOR_ATTACHMENT0 + rt, i.TEXTURE_2D, 0), p(kt) && u(i.TEXTURE_2D);
      }
      e.unbindTexture();
    } else {
      let rt = i.TEXTURE_2D;
      if ((E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && (rt = E.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), e.bindTexture(rt, q.__webglTexture), It(rt, _), _.mipmaps && _.mipmaps.length > 0) for (let ht = 0; ht < _.mipmaps.length; ht++) gt(F.__webglFramebuffer[ht], E, _, i.COLOR_ATTACHMENT0, rt, ht);
      else gt(F.__webglFramebuffer, E, _, i.COLOR_ATTACHMENT0, rt, 0);
      p(_) && u(rt), e.unbindTexture();
    }
    E.depthBuffer && wt(E);
  }
  function zt(E) {
    const _ = E.textures;
    for (let F = 0, q = _.length; F < q; F++) {
      const Z = _[F];
      if (p(Z)) {
        const X = T(E), _t = n.get(Z).__webglTexture;
        e.bindTexture(X, _t), u(X), e.unbindTexture();
      }
    }
  }
  const se = [], I = [];
  function Re(E) {
    if (E.samples > 0) {
      if (Ot(E) === false) {
        const _ = E.textures, F = E.width, q = E.height;
        let Z = i.COLOR_BUFFER_BIT;
        const X = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, _t = n.get(E), rt = _.length > 1;
        if (rt) for (let ht = 0; ht < _.length; ht++) e.bindFramebuffer(i.FRAMEBUFFER, _t.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ht, i.RENDERBUFFER, null), e.bindFramebuffer(i.FRAMEBUFFER, _t.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ht, i.TEXTURE_2D, null, 0);
        e.bindFramebuffer(i.READ_FRAMEBUFFER, _t.__webglMultisampledFramebuffer), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, _t.__webglFramebuffer);
        for (let ht = 0; ht < _.length; ht++) {
          if (E.resolveDepthBuffer && (E.depthBuffer && (Z |= i.DEPTH_BUFFER_BIT), E.stencilBuffer && E.resolveStencilBuffer && (Z |= i.STENCIL_BUFFER_BIT)), rt) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, _t.__webglColorRenderbuffer[ht]);
            const kt = n.get(_[ht]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, kt, 0);
          }
          i.blitFramebuffer(0, 0, F, q, 0, 0, F, q, Z, i.NEAREST), l === true && (se.length = 0, I.length = 0, se.push(i.COLOR_ATTACHMENT0 + ht), E.depthBuffer && E.resolveDepthBuffer === false && (se.push(X), I.push(X), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, I)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, se));
        }
        if (e.bindFramebuffer(i.READ_FRAMEBUFFER, null), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), rt) for (let ht = 0; ht < _.length; ht++) {
          e.bindFramebuffer(i.FRAMEBUFFER, _t.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ht, i.RENDERBUFFER, _t.__webglColorRenderbuffer[ht]);
          const kt = n.get(_[ht]).__webglTexture;
          e.bindFramebuffer(i.FRAMEBUFFER, _t.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ht, i.TEXTURE_2D, kt, 0);
        }
        e.bindFramebuffer(i.DRAW_FRAMEBUFFER, _t.__webglMultisampledFramebuffer);
      } else if (E.depthBuffer && E.resolveDepthBuffer === false && l) {
        const _ = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [_]);
      }
    }
  }
  function Ft(E) {
    return Math.min(s.maxSamples, E.samples);
  }
  function Ot(E) {
    const _ = n.get(E);
    return E.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === true && _.__useRenderToTexture !== false;
  }
  function St(E) {
    const _ = a.render.frame;
    h.get(E) !== _ && (h.set(E, _), E.update());
  }
  function Qt(E, _) {
    const F = E.colorSpace, q = E.format, Z = E.type;
    return E.isCompressedTexture === true || E.isVideoTexture === true || F !== mi && F !== _n && (Ht.getTransfer(F) === qt ? (q !== ke || Z !== on) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", F)), _;
  }
  function Mt(E) {
    return typeof HTMLImageElement < "u" && E instanceof HTMLImageElement ? (c.width = E.naturalWidth || E.width, c.height = E.naturalHeight || E.height) : typeof VideoFrame < "u" && E instanceof VideoFrame ? (c.width = E.displayWidth, c.height = E.displayHeight) : (c.width = E.width, c.height = E.height), c;
  }
  this.allocateTextureUnit = z, this.resetTextureUnits = k, this.setTexture2D = j, this.setTexture2DArray = V, this.setTexture3D = K, this.setTextureCube = G, this.rebindTextures = Ut, this.setupRenderTarget = ne, this.updateRenderTargetMipmap = zt, this.updateMultisampleRenderTarget = Re, this.setupDepthRenderbuffer = wt, this.setupFrameBufferTexture = gt, this.useMultisampledRTT = Ot;
}
function Np(i, t) {
  function e(n, s = _n) {
    let r;
    const a = Ht.getTransfer(s);
    if (n === on) return i.UNSIGNED_BYTE;
    if (n === ra) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === aa) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === tl) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === Jo) return i.BYTE;
    if (n === Qo) return i.SHORT;
    if (n === Fi) return i.UNSIGNED_SHORT;
    if (n === sa) return i.INT;
    if (n === Un) return i.UNSIGNED_INT;
    if (n === Ye) return i.FLOAT;
    if (n === Oi) return i.HALF_FLOAT;
    if (n === el) return i.ALPHA;
    if (n === nl) return i.RGB;
    if (n === ke) return i.RGBA;
    if (n === il) return i.LUMINANCE;
    if (n === sl) return i.LUMINANCE_ALPHA;
    if (n === oi) return i.DEPTH_COMPONENT;
    if (n === fi) return i.DEPTH_STENCIL;
    if (n === oa) return i.RED;
    if (n === la) return i.RED_INTEGER;
    if (n === rl) return i.RG;
    if (n === ca) return i.RG_INTEGER;
    if (n === ha) return i.RGBA_INTEGER;
    if (n === _s || n === vs || n === xs || n === Ms) if (a === qt) if (r = t.get("WEBGL_compressed_texture_s3tc_srgb"), r !== null) {
      if (n === _s) return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;
      if (n === vs) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
      if (n === xs) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
      if (n === Ms) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
    } else return null;
    else if (r = t.get("WEBGL_compressed_texture_s3tc"), r !== null) {
      if (n === _s) return r.COMPRESSED_RGB_S3TC_DXT1_EXT;
      if (n === vs) return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;
      if (n === xs) return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;
      if (n === Ms) return r.COMPRESSED_RGBA_S3TC_DXT5_EXT;
    } else return null;
    if (n === wr || n === Cr || n === Rr || n === Pr) if (r = t.get("WEBGL_compressed_texture_pvrtc"), r !== null) {
      if (n === wr) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
      if (n === Cr) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
      if (n === Rr) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
      if (n === Pr) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
    } else return null;
    if (n === Dr || n === Lr || n === Ir) if (r = t.get("WEBGL_compressed_texture_etc"), r !== null) {
      if (n === Dr || n === Lr) return a === qt ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2;
      if (n === Ir) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : r.COMPRESSED_RGBA8_ETC2_EAC;
    } else return null;
    if (n === Ur || n === Nr || n === Fr || n === Or || n === Br || n === zr || n === kr || n === Hr || n === Gr || n === Vr || n === Wr || n === Xr || n === Yr || n === qr) if (r = t.get("WEBGL_compressed_texture_astc"), r !== null) {
      if (n === Ur) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : r.COMPRESSED_RGBA_ASTC_4x4_KHR;
      if (n === Nr) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : r.COMPRESSED_RGBA_ASTC_5x4_KHR;
      if (n === Fr) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : r.COMPRESSED_RGBA_ASTC_5x5_KHR;
      if (n === Or) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : r.COMPRESSED_RGBA_ASTC_6x5_KHR;
      if (n === Br) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : r.COMPRESSED_RGBA_ASTC_6x6_KHR;
      if (n === zr) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : r.COMPRESSED_RGBA_ASTC_8x5_KHR;
      if (n === kr) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : r.COMPRESSED_RGBA_ASTC_8x6_KHR;
      if (n === Hr) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : r.COMPRESSED_RGBA_ASTC_8x8_KHR;
      if (n === Gr) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : r.COMPRESSED_RGBA_ASTC_10x5_KHR;
      if (n === Vr) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : r.COMPRESSED_RGBA_ASTC_10x6_KHR;
      if (n === Wr) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : r.COMPRESSED_RGBA_ASTC_10x8_KHR;
      if (n === Xr) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : r.COMPRESSED_RGBA_ASTC_10x10_KHR;
      if (n === Yr) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : r.COMPRESSED_RGBA_ASTC_12x10_KHR;
      if (n === qr) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : r.COMPRESSED_RGBA_ASTC_12x12_KHR;
    } else return null;
    if (n === Ss || n === $r || n === jr) if (r = t.get("EXT_texture_compression_bptc"), r !== null) {
      if (n === Ss) return a === qt ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : r.COMPRESSED_RGBA_BPTC_UNORM_EXT;
      if (n === $r) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
      if (n === jr) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
    } else return null;
    if (n === al || n === Zr || n === Kr || n === Jr) if (r = t.get("EXT_texture_compression_rgtc"), r !== null) {
      if (n === Ss) return r.COMPRESSED_RED_RGTC1_EXT;
      if (n === Zr) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;
      if (n === Kr) return r.COMPRESSED_RED_GREEN_RGTC2_EXT;
      if (n === Jr) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
    } else return null;
    return n === di ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: e };
}
class Fp extends we {
  constructor(t = []) {
    super(), this.isArrayCamera = true, this.cameras = t;
  }
}
class cs extends he {
  constructor() {
    super(), this.isGroup = true, this.type = "Group";
  }
}
const Op = { type: "move" };
class or {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new cs(), this._hand.matrixAutoUpdate = false, this._hand.visible = false, this._hand.joints = {}, this._hand.inputState = { pinching: false }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new cs(), this._targetRay.matrixAutoUpdate = false, this._targetRay.visible = false, this._targetRay.hasLinearVelocity = false, this._targetRay.linearVelocity = new P(), this._targetRay.hasAngularVelocity = false, this._targetRay.angularVelocity = new P()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new cs(), this._grip.matrixAutoUpdate = false, this._grip.visible = false, this._grip.hasLinearVelocity = false, this._grip.linearVelocity = new P(), this._grip.hasAngularVelocity = false, this._grip.angularVelocity = new P()), this._grip;
  }
  dispatchEvent(t) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(t), this._grip !== null && this._grip.dispatchEvent(t), this._hand !== null && this._hand.dispatchEvent(t), this;
  }
  connect(t) {
    if (t && t.hand) {
      const e = this._hand;
      if (e) for (const n of t.hand.values()) this._getHandJoint(e, n);
    }
    return this.dispatchEvent({ type: "connected", data: t }), this;
  }
  disconnect(t) {
    return this.dispatchEvent({ type: "disconnected", data: t }), this._targetRay !== null && (this._targetRay.visible = false), this._grip !== null && (this._grip.visible = false), this._hand !== null && (this._hand.visible = false), this;
  }
  update(t, e, n) {
    let s = null, r = null, a = null;
    const o = this._targetRay, l = this._grip, c = this._hand;
    if (t && e.session.visibilityState !== "visible-blurred") {
      if (c && t.hand) {
        a = true;
        for (const v of t.hand.values()) {
          const p = e.getJointPose(v, n), u = this._getHandJoint(c, v);
          p !== null && (u.matrix.fromArray(p.transform.matrix), u.matrix.decompose(u.position, u.rotation, u.scale), u.matrixWorldNeedsUpdate = true, u.jointRadius = p.radius), u.visible = p !== null;
        }
        const h = c.joints["index-finger-tip"], f = c.joints["thumb-tip"], d = h.position.distanceTo(f.position), m = 0.02, g = 5e-3;
        c.inputState.pinching && d > m + g ? (c.inputState.pinching = false, this.dispatchEvent({ type: "pinchend", handedness: t.handedness, target: this })) : !c.inputState.pinching && d <= m - g && (c.inputState.pinching = true, this.dispatchEvent({ type: "pinchstart", handedness: t.handedness, target: this }));
      } else l !== null && t.gripSpace && (r = e.getPose(t.gripSpace, n), r !== null && (l.matrix.fromArray(r.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = true, r.linearVelocity ? (l.hasLinearVelocity = true, l.linearVelocity.copy(r.linearVelocity)) : l.hasLinearVelocity = false, r.angularVelocity ? (l.hasAngularVelocity = true, l.angularVelocity.copy(r.angularVelocity)) : l.hasAngularVelocity = false));
      o !== null && (s = e.getPose(t.targetRaySpace, n), s === null && r !== null && (s = r), s !== null && (o.matrix.fromArray(s.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = true, s.linearVelocity ? (o.hasLinearVelocity = true, o.linearVelocity.copy(s.linearVelocity)) : o.hasLinearVelocity = false, s.angularVelocity ? (o.hasAngularVelocity = true, o.angularVelocity.copy(s.angularVelocity)) : o.hasAngularVelocity = false, this.dispatchEvent(Op)));
    }
    return o !== null && (o.visible = s !== null), l !== null && (l.visible = r !== null), c !== null && (c.visible = a !== null), this;
  }
  _getHandJoint(t, e) {
    if (t.joints[e.jointName] === void 0) {
      const n = new cs();
      n.matrixAutoUpdate = false, n.visible = false, t.joints[e.jointName] = n, t.add(n);
    }
    return t.joints[e.jointName];
  }
}
const Bp = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, zp = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class kp {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(t, e, n) {
    if (this.texture === null) {
      const s = new _e(), r = t.properties.get(s);
      r.__webglTexture = e.texture, (e.depthNear != n.depthNear || e.depthFar != n.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = s;
    }
  }
  getMesh(t) {
    if (this.texture !== null && this.mesh === null) {
      const e = t.cameras[0].viewport, n = new Sn({ vertexShader: Bp, fragmentShader: zp, uniforms: { depthColor: { value: this.texture }, depthWidth: { value: e.z }, depthHeight: { value: e.w } } });
      this.mesh = new Ue(new Ps(20, 20), n);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}
class Hp extends Bn {
  constructor(t, e) {
    super();
    const n = this;
    let s = null, r = 1, a = null, o = "local-floor", l = 1, c = null, h = null, f = null, d = null, m = null, g = null;
    const v = new kp(), p = e.getContextAttributes();
    let u = null, T = null;
    const b = [], S = [], N = new At();
    let w = null;
    const A = new we();
    A.viewport = new jt();
    const U = new we();
    U.viewport = new jt();
    const y = [A, U], M = new Fp();
    let C = null, k = null;
    this.cameraAutoUpdate = true, this.enabled = false, this.isPresenting = false, this.getController = function(Y) {
      let tt = b[Y];
      return tt === void 0 && (tt = new or(), b[Y] = tt), tt.getTargetRaySpace();
    }, this.getControllerGrip = function(Y) {
      let tt = b[Y];
      return tt === void 0 && (tt = new or(), b[Y] = tt), tt.getGripSpace();
    }, this.getHand = function(Y) {
      let tt = b[Y];
      return tt === void 0 && (tt = new or(), b[Y] = tt), tt.getHandSpace();
    };
    function z(Y) {
      const tt = S.indexOf(Y.inputSource);
      if (tt === -1) return;
      const gt = b[tt];
      gt !== void 0 && (gt.update(Y.inputSource, Y.frame, c || a), gt.dispatchEvent({ type: Y.type, data: Y.inputSource }));
    }
    function W() {
      s.removeEventListener("select", z), s.removeEventListener("selectstart", z), s.removeEventListener("selectend", z), s.removeEventListener("squeeze", z), s.removeEventListener("squeezestart", z), s.removeEventListener("squeezeend", z), s.removeEventListener("end", W), s.removeEventListener("inputsourceschange", j);
      for (let Y = 0; Y < b.length; Y++) {
        const tt = S[Y];
        tt !== null && (S[Y] = null, b[Y].disconnect(tt));
      }
      C = null, k = null, v.reset(), t.setRenderTarget(u), m = null, d = null, f = null, s = null, T = null, Zt.stop(), n.isPresenting = false, t.setPixelRatio(w), t.setSize(N.width, N.height, false), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(Y) {
      r = Y, n.isPresenting === true && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(Y) {
      o = Y, n.isPresenting === true && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || a;
    }, this.setReferenceSpace = function(Y) {
      c = Y;
    }, this.getBaseLayer = function() {
      return d !== null ? d : m;
    }, this.getBinding = function() {
      return f;
    }, this.getFrame = function() {
      return g;
    }, this.getSession = function() {
      return s;
    }, this.setSession = async function(Y) {
      if (s = Y, s !== null) {
        if (u = t.getRenderTarget(), s.addEventListener("select", z), s.addEventListener("selectstart", z), s.addEventListener("selectend", z), s.addEventListener("squeeze", z), s.addEventListener("squeezestart", z), s.addEventListener("squeezeend", z), s.addEventListener("end", W), s.addEventListener("inputsourceschange", j), p.xrCompatible !== true && await e.makeXRCompatible(), w = t.getPixelRatio(), t.getSize(N), s.renderState.layers === void 0) {
          const tt = { antialias: p.antialias, alpha: true, depth: p.depth, stencil: p.stencil, framebufferScaleFactor: r };
          m = new XRWebGLLayer(s, e, tt), s.updateRenderState({ baseLayer: m }), t.setPixelRatio(1), t.setSize(m.framebufferWidth, m.framebufferHeight, false), T = new Nn(m.framebufferWidth, m.framebufferHeight, { format: ke, type: on, colorSpace: t.outputColorSpace, stencilBuffer: p.stencil });
        } else {
          let tt = null, gt = null, st = null;
          p.depth && (st = p.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24, tt = p.stencil ? fi : oi, gt = p.stencil ? di : Un);
          const Et = { colorFormat: e.RGBA8, depthFormat: st, scaleFactor: r };
          f = new XRWebGLBinding(s, e), d = f.createProjectionLayer(Et), s.updateRenderState({ layers: [d] }), t.setPixelRatio(1), t.setSize(d.textureWidth, d.textureHeight, false), T = new Nn(d.textureWidth, d.textureHeight, { format: ke, type: on, depthTexture: new Sl(d.textureWidth, d.textureHeight, gt, void 0, void 0, void 0, void 0, void 0, void 0, tt), stencilBuffer: p.stencil, colorSpace: t.outputColorSpace, samples: p.antialias ? 4 : 0, resolveDepthBuffer: d.ignoreDepthValues === false });
        }
        T.isXRRenderTarget = true, this.setFoveation(l), c = null, a = await s.requestReferenceSpace(o), Zt.setContext(s), Zt.start(), n.isPresenting = true, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (s !== null) return s.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return v.getDepthTexture();
    };
    function j(Y) {
      for (let tt = 0; tt < Y.removed.length; tt++) {
        const gt = Y.removed[tt], st = S.indexOf(gt);
        st >= 0 && (S[st] = null, b[st].disconnect(gt));
      }
      for (let tt = 0; tt < Y.added.length; tt++) {
        const gt = Y.added[tt];
        let st = S.indexOf(gt);
        if (st === -1) {
          for (let wt = 0; wt < b.length; wt++) if (wt >= S.length) {
            S.push(gt), st = wt;
            break;
          } else if (S[wt] === null) {
            S[wt] = gt, st = wt;
            break;
          }
          if (st === -1) break;
        }
        const Et = b[st];
        Et && Et.connect(gt);
      }
    }
    const V = new P(), K = new P();
    function G(Y, tt, gt) {
      V.setFromMatrixPosition(tt.matrixWorld), K.setFromMatrixPosition(gt.matrixWorld);
      const st = V.distanceTo(K), Et = tt.projectionMatrix.elements, wt = gt.projectionMatrix.elements, Ut = Et[14] / (Et[10] - 1), ne = Et[14] / (Et[10] + 1), zt = (Et[9] + 1) / Et[5], se = (Et[9] - 1) / Et[5], I = (Et[8] - 1) / Et[0], Re = (wt[8] + 1) / wt[0], Ft = Ut * I, Ot = Ut * Re, St = st / (-I + Re), Qt = St * -I;
      if (tt.matrixWorld.decompose(Y.position, Y.quaternion, Y.scale), Y.translateX(Qt), Y.translateZ(St), Y.matrixWorld.compose(Y.position, Y.quaternion, Y.scale), Y.matrixWorldInverse.copy(Y.matrixWorld).invert(), Et[10] === -1) Y.projectionMatrix.copy(tt.projectionMatrix), Y.projectionMatrixInverse.copy(tt.projectionMatrixInverse);
      else {
        const Mt = Ut + St, E = ne + St, _ = Ft - Qt, F = Ot + (st - Qt), q = zt * ne / E * Mt, Z = se * ne / E * Mt;
        Y.projectionMatrix.makePerspective(_, F, q, Z, Mt, E), Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert();
      }
    }
    function it(Y, tt) {
      tt === null ? Y.matrixWorld.copy(Y.matrix) : Y.matrixWorld.multiplyMatrices(tt.matrixWorld, Y.matrix), Y.matrixWorldInverse.copy(Y.matrixWorld).invert();
    }
    this.updateCamera = function(Y) {
      if (s === null) return;
      let tt = Y.near, gt = Y.far;
      v.texture !== null && (v.depthNear > 0 && (tt = v.depthNear), v.depthFar > 0 && (gt = v.depthFar)), M.near = U.near = A.near = tt, M.far = U.far = A.far = gt, (C !== M.near || k !== M.far) && (s.updateRenderState({ depthNear: M.near, depthFar: M.far }), C = M.near, k = M.far), A.layers.mask = Y.layers.mask | 2, U.layers.mask = Y.layers.mask | 4, M.layers.mask = A.layers.mask | U.layers.mask;
      const st = Y.parent, Et = M.cameras;
      it(M, st);
      for (let wt = 0; wt < Et.length; wt++) it(Et[wt], st);
      Et.length === 2 ? G(M, A, U) : M.projectionMatrix.copy(A.projectionMatrix), ct(Y, M, st);
    };
    function ct(Y, tt, gt) {
      gt === null ? Y.matrix.copy(tt.matrixWorld) : (Y.matrix.copy(gt.matrixWorld), Y.matrix.invert(), Y.matrix.multiply(tt.matrixWorld)), Y.matrix.decompose(Y.position, Y.quaternion, Y.scale), Y.updateMatrixWorld(true), Y.projectionMatrix.copy(tt.projectionMatrix), Y.projectionMatrixInverse.copy(tt.projectionMatrixInverse), Y.isPerspectiveCamera && (Y.fov = Qr * 2 * Math.atan(1 / Y.projectionMatrix.elements[5]), Y.zoom = 1);
    }
    this.getCamera = function() {
      return M;
    }, this.getFoveation = function() {
      if (!(d === null && m === null)) return l;
    }, this.setFoveation = function(Y) {
      l = Y, d !== null && (d.fixedFoveation = Y), m !== null && m.fixedFoveation !== void 0 && (m.fixedFoveation = Y);
    }, this.hasDepthSensing = function() {
      return v.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return v.getMesh(M);
    };
    let xt = null;
    function It(Y, tt) {
      if (h = tt.getViewerPose(c || a), g = tt, h !== null) {
        const gt = h.views;
        m !== null && (t.setRenderTargetFramebuffer(T, m.framebuffer), t.setRenderTarget(T));
        let st = false;
        gt.length !== M.cameras.length && (M.cameras.length = 0, st = true);
        for (let wt = 0; wt < gt.length; wt++) {
          const Ut = gt[wt];
          let ne = null;
          if (m !== null) ne = m.getViewport(Ut);
          else {
            const se = f.getViewSubImage(d, Ut);
            ne = se.viewport, wt === 0 && (t.setRenderTargetTextures(T, se.colorTexture, d.ignoreDepthValues ? void 0 : se.depthStencilTexture), t.setRenderTarget(T));
          }
          let zt = y[wt];
          zt === void 0 && (zt = new we(), zt.layers.enable(wt), zt.viewport = new jt(), y[wt] = zt), zt.matrix.fromArray(Ut.transform.matrix), zt.matrix.decompose(zt.position, zt.quaternion, zt.scale), zt.projectionMatrix.fromArray(Ut.projectionMatrix), zt.projectionMatrixInverse.copy(zt.projectionMatrix).invert(), zt.viewport.set(ne.x, ne.y, ne.width, ne.height), wt === 0 && (M.matrix.copy(zt.matrix), M.matrix.decompose(M.position, M.quaternion, M.scale)), st === true && M.cameras.push(zt);
        }
        const Et = s.enabledFeatures;
        if (Et && Et.includes("depth-sensing")) {
          const wt = f.getDepthInformation(gt[0]);
          wt && wt.isValid && wt.texture && v.init(t, wt, s.renderState);
        }
      }
      for (let gt = 0; gt < b.length; gt++) {
        const st = S[gt], Et = b[gt];
        st !== null && Et !== void 0 && Et.update(st, tt, c || a);
      }
      xt && xt(Y, tt), tt.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: tt }), g = null;
    }
    const Zt = new xl();
    Zt.setAnimationLoop(It), this.setAnimationLoop = function(Y) {
      xt = Y;
    }, this.dispose = function() {
    };
  }
}
const Cn = new $e(), Gp = new Yt();
function Vp(i, t) {
  function e(p, u) {
    p.matrixAutoUpdate === true && p.updateMatrix(), u.value.copy(p.matrix);
  }
  function n(p, u) {
    u.color.getRGB(p.fogColor.value, gl(i)), u.isFog ? (p.fogNear.value = u.near, p.fogFar.value = u.far) : u.isFogExp2 && (p.fogDensity.value = u.density);
  }
  function s(p, u, T, b, S) {
    u.isMeshBasicMaterial || u.isMeshLambertMaterial ? r(p, u) : u.isMeshToonMaterial ? (r(p, u), f(p, u)) : u.isMeshPhongMaterial ? (r(p, u), h(p, u)) : u.isMeshStandardMaterial ? (r(p, u), d(p, u), u.isMeshPhysicalMaterial && m(p, u, S)) : u.isMeshMatcapMaterial ? (r(p, u), g(p, u)) : u.isMeshDepthMaterial ? r(p, u) : u.isMeshDistanceMaterial ? (r(p, u), v(p, u)) : u.isMeshNormalMaterial ? r(p, u) : u.isLineBasicMaterial ? (a(p, u), u.isLineDashedMaterial && o(p, u)) : u.isPointsMaterial ? l(p, u, T, b) : u.isSpriteMaterial ? c(p, u) : u.isShadowMaterial ? (p.color.value.copy(u.color), p.opacity.value = u.opacity) : u.isShaderMaterial && (u.uniformsNeedUpdate = false);
  }
  function r(p, u) {
    p.opacity.value = u.opacity, u.color && p.diffuse.value.copy(u.color), u.emissive && p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity), u.map && (p.map.value = u.map, e(u.map, p.mapTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, e(u.alphaMap, p.alphaMapTransform)), u.bumpMap && (p.bumpMap.value = u.bumpMap, e(u.bumpMap, p.bumpMapTransform), p.bumpScale.value = u.bumpScale, u.side === ye && (p.bumpScale.value *= -1)), u.normalMap && (p.normalMap.value = u.normalMap, e(u.normalMap, p.normalMapTransform), p.normalScale.value.copy(u.normalScale), u.side === ye && p.normalScale.value.negate()), u.displacementMap && (p.displacementMap.value = u.displacementMap, e(u.displacementMap, p.displacementMapTransform), p.displacementScale.value = u.displacementScale, p.displacementBias.value = u.displacementBias), u.emissiveMap && (p.emissiveMap.value = u.emissiveMap, e(u.emissiveMap, p.emissiveMapTransform)), u.specularMap && (p.specularMap.value = u.specularMap, e(u.specularMap, p.specularMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
    const T = t.get(u), b = T.envMap, S = T.envMapRotation;
    b && (p.envMap.value = b, Cn.copy(S), Cn.x *= -1, Cn.y *= -1, Cn.z *= -1, b.isCubeTexture && b.isRenderTargetTexture === false && (Cn.y *= -1, Cn.z *= -1), p.envMapRotation.value.setFromMatrix4(Gp.makeRotationFromEuler(Cn)), p.flipEnvMap.value = b.isCubeTexture && b.isRenderTargetTexture === false ? -1 : 1, p.reflectivity.value = u.reflectivity, p.ior.value = u.ior, p.refractionRatio.value = u.refractionRatio), u.lightMap && (p.lightMap.value = u.lightMap, p.lightMapIntensity.value = u.lightMapIntensity, e(u.lightMap, p.lightMapTransform)), u.aoMap && (p.aoMap.value = u.aoMap, p.aoMapIntensity.value = u.aoMapIntensity, e(u.aoMap, p.aoMapTransform));
  }
  function a(p, u) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, u.map && (p.map.value = u.map, e(u.map, p.mapTransform));
  }
  function o(p, u) {
    p.dashSize.value = u.dashSize, p.totalSize.value = u.dashSize + u.gapSize, p.scale.value = u.scale;
  }
  function l(p, u, T, b) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, p.size.value = u.size * T, p.scale.value = b * 0.5, u.map && (p.map.value = u.map, e(u.map, p.uvTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, e(u.alphaMap, p.alphaMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
  }
  function c(p, u) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, p.rotation.value = u.rotation, u.map && (p.map.value = u.map, e(u.map, p.mapTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, e(u.alphaMap, p.alphaMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
  }
  function h(p, u) {
    p.specular.value.copy(u.specular), p.shininess.value = Math.max(u.shininess, 1e-4);
  }
  function f(p, u) {
    u.gradientMap && (p.gradientMap.value = u.gradientMap);
  }
  function d(p, u) {
    p.metalness.value = u.metalness, u.metalnessMap && (p.metalnessMap.value = u.metalnessMap, e(u.metalnessMap, p.metalnessMapTransform)), p.roughness.value = u.roughness, u.roughnessMap && (p.roughnessMap.value = u.roughnessMap, e(u.roughnessMap, p.roughnessMapTransform)), u.envMap && (p.envMapIntensity.value = u.envMapIntensity);
  }
  function m(p, u, T) {
    p.ior.value = u.ior, u.sheen > 0 && (p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen), p.sheenRoughness.value = u.sheenRoughness, u.sheenColorMap && (p.sheenColorMap.value = u.sheenColorMap, e(u.sheenColorMap, p.sheenColorMapTransform)), u.sheenRoughnessMap && (p.sheenRoughnessMap.value = u.sheenRoughnessMap, e(u.sheenRoughnessMap, p.sheenRoughnessMapTransform))), u.clearcoat > 0 && (p.clearcoat.value = u.clearcoat, p.clearcoatRoughness.value = u.clearcoatRoughness, u.clearcoatMap && (p.clearcoatMap.value = u.clearcoatMap, e(u.clearcoatMap, p.clearcoatMapTransform)), u.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = u.clearcoatRoughnessMap, e(u.clearcoatRoughnessMap, p.clearcoatRoughnessMapTransform)), u.clearcoatNormalMap && (p.clearcoatNormalMap.value = u.clearcoatNormalMap, e(u.clearcoatNormalMap, p.clearcoatNormalMapTransform), p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale), u.side === ye && p.clearcoatNormalScale.value.negate())), u.dispersion > 0 && (p.dispersion.value = u.dispersion), u.iridescence > 0 && (p.iridescence.value = u.iridescence, p.iridescenceIOR.value = u.iridescenceIOR, p.iridescenceThicknessMinimum.value = u.iridescenceThicknessRange[0], p.iridescenceThicknessMaximum.value = u.iridescenceThicknessRange[1], u.iridescenceMap && (p.iridescenceMap.value = u.iridescenceMap, e(u.iridescenceMap, p.iridescenceMapTransform)), u.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = u.iridescenceThicknessMap, e(u.iridescenceThicknessMap, p.iridescenceThicknessMapTransform))), u.transmission > 0 && (p.transmission.value = u.transmission, p.transmissionSamplerMap.value = T.texture, p.transmissionSamplerSize.value.set(T.width, T.height), u.transmissionMap && (p.transmissionMap.value = u.transmissionMap, e(u.transmissionMap, p.transmissionMapTransform)), p.thickness.value = u.thickness, u.thicknessMap && (p.thicknessMap.value = u.thicknessMap, e(u.thicknessMap, p.thicknessMapTransform)), p.attenuationDistance.value = u.attenuationDistance, p.attenuationColor.value.copy(u.attenuationColor)), u.anisotropy > 0 && (p.anisotropyVector.value.set(u.anisotropy * Math.cos(u.anisotropyRotation), u.anisotropy * Math.sin(u.anisotropyRotation)), u.anisotropyMap && (p.anisotropyMap.value = u.anisotropyMap, e(u.anisotropyMap, p.anisotropyMapTransform))), p.specularIntensity.value = u.specularIntensity, p.specularColor.value.copy(u.specularColor), u.specularColorMap && (p.specularColorMap.value = u.specularColorMap, e(u.specularColorMap, p.specularColorMapTransform)), u.specularIntensityMap && (p.specularIntensityMap.value = u.specularIntensityMap, e(u.specularIntensityMap, p.specularIntensityMapTransform));
  }
  function g(p, u) {
    u.matcap && (p.matcap.value = u.matcap);
  }
  function v(p, u) {
    const T = t.get(u).light;
    p.referencePosition.value.setFromMatrixPosition(T.matrixWorld), p.nearDistance.value = T.shadow.camera.near, p.farDistance.value = T.shadow.camera.far;
  }
  return { refreshFogUniforms: n, refreshMaterialUniforms: s };
}
function Wp(i, t, e, n) {
  let s = {}, r = {}, a = [];
  const o = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(T, b) {
    const S = b.program;
    n.uniformBlockBinding(T, S);
  }
  function c(T, b) {
    let S = s[T.id];
    S === void 0 && (g(T), S = h(T), s[T.id] = S, T.addEventListener("dispose", p));
    const N = b.program;
    n.updateUBOMapping(T, N);
    const w = t.render.frame;
    r[T.id] !== w && (d(T), r[T.id] = w);
  }
  function h(T) {
    const b = f();
    T.__bindingPointIndex = b;
    const S = i.createBuffer(), N = T.__size, w = T.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, S), i.bufferData(i.UNIFORM_BUFFER, N, w), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, b, S), S;
  }
  function f() {
    for (let T = 0; T < o; T++) if (a.indexOf(T) === -1) return a.push(T), T;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function d(T) {
    const b = s[T.id], S = T.uniforms, N = T.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, b);
    for (let w = 0, A = S.length; w < A; w++) {
      const U = Array.isArray(S[w]) ? S[w] : [S[w]];
      for (let y = 0, M = U.length; y < M; y++) {
        const C = U[y];
        if (m(C, w, y, N) === true) {
          const k = C.__offset, z = Array.isArray(C.value) ? C.value : [C.value];
          let W = 0;
          for (let j = 0; j < z.length; j++) {
            const V = z[j], K = v(V);
            typeof V == "number" || typeof V == "boolean" ? (C.__data[0] = V, i.bufferSubData(i.UNIFORM_BUFFER, k + W, C.__data)) : V.isMatrix3 ? (C.__data[0] = V.elements[0], C.__data[1] = V.elements[1], C.__data[2] = V.elements[2], C.__data[3] = 0, C.__data[4] = V.elements[3], C.__data[5] = V.elements[4], C.__data[6] = V.elements[5], C.__data[7] = 0, C.__data[8] = V.elements[6], C.__data[9] = V.elements[7], C.__data[10] = V.elements[8], C.__data[11] = 0) : (V.toArray(C.__data, W), W += K.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, k, C.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function m(T, b, S, N) {
    const w = T.value, A = b + "_" + S;
    if (N[A] === void 0) return typeof w == "number" || typeof w == "boolean" ? N[A] = w : N[A] = w.clone(), true;
    {
      const U = N[A];
      if (typeof w == "number" || typeof w == "boolean") {
        if (U !== w) return N[A] = w, true;
      } else if (U.equals(w) === false) return U.copy(w), true;
    }
    return false;
  }
  function g(T) {
    const b = T.uniforms;
    let S = 0;
    const N = 16;
    for (let A = 0, U = b.length; A < U; A++) {
      const y = Array.isArray(b[A]) ? b[A] : [b[A]];
      for (let M = 0, C = y.length; M < C; M++) {
        const k = y[M], z = Array.isArray(k.value) ? k.value : [k.value];
        for (let W = 0, j = z.length; W < j; W++) {
          const V = z[W], K = v(V), G = S % N, it = G % K.boundary, ct = G + it;
          S += it, ct !== 0 && N - ct < K.storage && (S += N - ct), k.__data = new Float32Array(K.storage / Float32Array.BYTES_PER_ELEMENT), k.__offset = S, S += K.storage;
        }
      }
    }
    const w = S % N;
    return w > 0 && (S += N - w), T.__size = S, T.__cache = {}, this;
  }
  function v(T) {
    const b = { boundary: 0, storage: 0 };
    return typeof T == "number" || typeof T == "boolean" ? (b.boundary = 4, b.storage = 4) : T.isVector2 ? (b.boundary = 8, b.storage = 8) : T.isVector3 || T.isColor ? (b.boundary = 16, b.storage = 12) : T.isVector4 ? (b.boundary = 16, b.storage = 16) : T.isMatrix3 ? (b.boundary = 48, b.storage = 48) : T.isMatrix4 ? (b.boundary = 64, b.storage = 64) : T.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", T), b;
  }
  function p(T) {
    const b = T.target;
    b.removeEventListener("dispose", p);
    const S = a.indexOf(b.__bindingPointIndex);
    a.splice(S, 1), i.deleteBuffer(s[b.id]), delete s[b.id], delete r[b.id];
  }
  function u() {
    for (const T in s) i.deleteBuffer(s[T]);
    a = [], s = {}, r = {};
  }
  return { bind: l, update: c, dispose: u };
}
class Xp {
  constructor(t = {}) {
    const { canvas: e = Lc(), context: n = null, depth: s = true, stencil: r = false, alpha: a = false, antialias: o = false, premultipliedAlpha: l = true, preserveDrawingBuffer: c = false, powerPreference: h = "default", failIfMajorPerformanceCaveat: f = false, reverseDepthBuffer: d = false } = t;
    this.isWebGLRenderer = true;
    let m;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext) throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      m = n.getContextAttributes().alpha;
    } else m = a;
    const g = new Uint32Array(4), v = new Int32Array(4);
    let p = null, u = null;
    const T = [], b = [];
    this.domElement = e, this.debug = { checkShaderErrors: true, onShaderError: null }, this.autoClear = true, this.autoClearColor = true, this.autoClearDepth = true, this.autoClearStencil = true, this.sortObjects = true, this.clippingPlanes = [], this.localClippingEnabled = false, this._outputColorSpace = Le, this.toneMapping = xn, this.toneMappingExposure = 1;
    const S = this;
    let N = false, w = 0, A = 0, U = null, y = -1, M = null;
    const C = new jt(), k = new jt();
    let z = null;
    const W = new Nt(0);
    let j = 0, V = e.width, K = e.height, G = 1, it = null, ct = null;
    const xt = new jt(0, 0, V, K), It = new jt(0, 0, V, K);
    let Zt = false;
    const Y = new fa();
    let tt = false, gt = false;
    const st = new Yt(), Et = new Yt(), wt = new P(), Ut = new jt(), ne = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: true };
    let zt = false;
    function se() {
      return U === null ? G : 1;
    }
    let I = n;
    function Re(x, D) {
      return e.getContext(x, D);
    }
    try {
      const x = { alpha: true, depth: s, stencil: r, antialias: o, premultipliedAlpha: l, preserveDrawingBuffer: c, powerPreference: h, failIfMajorPerformanceCaveat: f };
      if ("setAttribute" in e && e.setAttribute("data-engine", `three.js r${ia}`), e.addEventListener("webglcontextlost", $, false), e.addEventListener("webglcontextrestored", lt, false), e.addEventListener("webglcontextcreationerror", at, false), I === null) {
        const D = "webgl2";
        if (I = Re(D, x), I === null) throw Re(D) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (x) {
      throw console.error("THREE.WebGLRenderer: " + x.message), x;
    }
    let Ft, Ot, St, Qt, Mt, E, _, F, q, Z, X, _t, rt, ht, kt, J, ut, yt, bt, dt, Bt, Dt, Kt, R;
    function nt() {
      Ft = new jd(I), Ft.init(), Dt = new Np(I, Ft), Ot = new Vd(I, Ft, t, Dt), St = new Lp(I, Ft), Ot.reverseDepthBuffer && d && St.buffers.depth.setReversed(true), Qt = new Jd(I), Mt = new _p(), E = new Up(I, Ft, St, Mt, Ot, Dt, Qt), _ = new Xd(S), F = new $d(S), q = new rh(I), Kt = new Hd(I, q), Z = new Zd(I, q, Qt, Kt), X = new tf(I, Z, q, Qt), bt = new Qd(I, Ot, E), J = new Wd(Mt), _t = new gp(S, _, F, Ft, Ot, Kt, J), rt = new Vp(S, Mt), ht = new xp(), kt = new Tp(Ft), yt = new kd(S, _, F, St, X, m, l), ut = new Pp(S, X, Ot), R = new Wp(I, Qt, Ot, St), dt = new Gd(I, Ft, Qt), Bt = new Kd(I, Ft, Qt), Qt.programs = _t.programs, S.capabilities = Ot, S.extensions = Ft, S.properties = Mt, S.renderLists = ht, S.shadowMap = ut, S.state = St, S.info = Qt;
    }
    nt();
    const H = new Hp(S, I);
    this.xr = H, this.getContext = function() {
      return I;
    }, this.getContextAttributes = function() {
      return I.getContextAttributes();
    }, this.forceContextLoss = function() {
      const x = Ft.get("WEBGL_lose_context");
      x && x.loseContext();
    }, this.forceContextRestore = function() {
      const x = Ft.get("WEBGL_lose_context");
      x && x.restoreContext();
    }, this.getPixelRatio = function() {
      return G;
    }, this.setPixelRatio = function(x) {
      x !== void 0 && (G = x, this.setSize(V, K, false));
    }, this.getSize = function(x) {
      return x.set(V, K);
    }, this.setSize = function(x, D, O = true) {
      if (H.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      V = x, K = D, e.width = Math.floor(x * G), e.height = Math.floor(D * G), O === true && (e.style.width = x + "px", e.style.height = D + "px"), this.setViewport(0, 0, x, D);
    }, this.getDrawingBufferSize = function(x) {
      return x.set(V * G, K * G).floor();
    }, this.setDrawingBufferSize = function(x, D, O) {
      V = x, K = D, G = O, e.width = Math.floor(x * O), e.height = Math.floor(D * O), this.setViewport(0, 0, x, D);
    }, this.getCurrentViewport = function(x) {
      return x.copy(C);
    }, this.getViewport = function(x) {
      return x.copy(xt);
    }, this.setViewport = function(x, D, O, B) {
      x.isVector4 ? xt.set(x.x, x.y, x.z, x.w) : xt.set(x, D, O, B), St.viewport(C.copy(xt).multiplyScalar(G).round());
    }, this.getScissor = function(x) {
      return x.copy(It);
    }, this.setScissor = function(x, D, O, B) {
      x.isVector4 ? It.set(x.x, x.y, x.z, x.w) : It.set(x, D, O, B), St.scissor(k.copy(It).multiplyScalar(G).round());
    }, this.getScissorTest = function() {
      return Zt;
    }, this.setScissorTest = function(x) {
      St.setScissorTest(Zt = x);
    }, this.setOpaqueSort = function(x) {
      it = x;
    }, this.setTransparentSort = function(x) {
      ct = x;
    }, this.getClearColor = function(x) {
      return x.copy(yt.getClearColor());
    }, this.setClearColor = function() {
      yt.setClearColor.apply(yt, arguments);
    }, this.getClearAlpha = function() {
      return yt.getClearAlpha();
    }, this.setClearAlpha = function() {
      yt.setClearAlpha.apply(yt, arguments);
    }, this.clear = function(x = true, D = true, O = true) {
      let B = 0;
      if (x) {
        let L = false;
        if (U !== null) {
          const Q = U.texture.format;
          L = Q === ha || Q === ca || Q === la;
        }
        if (L) {
          const Q = U.texture.type, ot = Q === on || Q === Un || Q === Fi || Q === di || Q === ra || Q === aa, ft = yt.getClearColor(), pt = yt.getClearAlpha(), Tt = ft.r, Rt = ft.g, mt = ft.b;
          ot ? (g[0] = Tt, g[1] = Rt, g[2] = mt, g[3] = pt, I.clearBufferuiv(I.COLOR, 0, g)) : (v[0] = Tt, v[1] = Rt, v[2] = mt, v[3] = pt, I.clearBufferiv(I.COLOR, 0, v));
        } else B |= I.COLOR_BUFFER_BIT;
      }
      D && (B |= I.DEPTH_BUFFER_BIT), O && (B |= I.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), I.clear(B);
    }, this.clearColor = function() {
      this.clear(true, false, false);
    }, this.clearDepth = function() {
      this.clear(false, true, false);
    }, this.clearStencil = function() {
      this.clear(false, false, true);
    }, this.dispose = function() {
      e.removeEventListener("webglcontextlost", $, false), e.removeEventListener("webglcontextrestored", lt, false), e.removeEventListener("webglcontextcreationerror", at, false), ht.dispose(), kt.dispose(), Mt.dispose(), _.dispose(), F.dispose(), X.dispose(), Kt.dispose(), R.dispose(), _t.dispose(), H.dispose(), H.removeEventListener("sessionstart", ya), H.removeEventListener("sessionend", Ea), yn.stop();
    };
    function $(x) {
      x.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), N = true;
    }
    function lt() {
      console.log("THREE.WebGLRenderer: Context Restored."), N = false;
      const x = Qt.autoReset, D = ut.enabled, O = ut.autoUpdate, B = ut.needsUpdate, L = ut.type;
      nt(), Qt.autoReset = x, ut.enabled = D, ut.autoUpdate = O, ut.needsUpdate = B, ut.type = L;
    }
    function at(x) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", x.statusMessage);
    }
    function Ct(x) {
      const D = x.target;
      D.removeEventListener("dispose", Ct), ie(D);
    }
    function ie(x) {
      ue(x), Mt.remove(x);
    }
    function ue(x) {
      const D = Mt.get(x).programs;
      D !== void 0 && (D.forEach(function(O) {
        _t.releaseProgram(O);
      }), x.isShaderMaterial && _t.releaseShaderCache(x));
    }
    this.renderBufferDirect = function(x, D, O, B, L, Q) {
      D === null && (D = ne);
      const ot = L.isMesh && L.matrixWorld.determinant() < 0, ft = Dl(x, D, O, B, L);
      St.setMaterial(B, ot);
      let pt = O.index, Tt = 1;
      if (B.wireframe === true) {
        if (pt = Z.getWireframeAttribute(O), pt === void 0) return;
        Tt = 2;
      }
      const Rt = O.drawRange, mt = O.attributes.position;
      let Gt = Rt.start * Tt, Jt = (Rt.start + Rt.count) * Tt;
      Q !== null && (Gt = Math.max(Gt, Q.start * Tt), Jt = Math.min(Jt, (Q.start + Q.count) * Tt)), pt !== null ? (Gt = Math.max(Gt, 0), Jt = Math.min(Jt, pt.count)) : mt != null && (Gt = Math.max(Gt, 0), Jt = Math.min(Jt, mt.count));
      const te = Jt - Gt;
      if (te < 0 || te === 1 / 0) return;
      Kt.setup(L, B, ft, O, pt);
      let ve, Vt = dt;
      if (pt !== null && (ve = q.get(pt), Vt = Bt, Vt.setIndex(ve)), L.isMesh) B.wireframe === true ? (St.setLineWidth(B.wireframeLinewidth * se()), Vt.setMode(I.LINES)) : Vt.setMode(I.TRIANGLES);
      else if (L.isLine) {
        let vt = B.linewidth;
        vt === void 0 && (vt = 1), St.setLineWidth(vt * se()), L.isLineSegments ? Vt.setMode(I.LINES) : L.isLineLoop ? Vt.setMode(I.LINE_LOOP) : Vt.setMode(I.LINE_STRIP);
      } else L.isPoints ? Vt.setMode(I.POINTS) : L.isSprite && Vt.setMode(I.TRIANGLES);
      if (L.isBatchedMesh) if (L._multiDrawInstances !== null) Vt.renderMultiDrawInstances(L._multiDrawStarts, L._multiDrawCounts, L._multiDrawCount, L._multiDrawInstances);
      else if (Ft.get("WEBGL_multi_draw")) Vt.renderMultiDraw(L._multiDrawStarts, L._multiDrawCounts, L._multiDrawCount);
      else {
        const vt = L._multiDrawStarts, Ze = L._multiDrawCounts, Wt = L._multiDrawCount, Fe = pt ? q.get(pt).bytesPerElement : 1, kn = Mt.get(B).currentProgram.getUniforms();
        for (let Ee = 0; Ee < Wt; Ee++) kn.setValue(I, "_gl_DrawID", Ee), Vt.render(vt[Ee] / Fe, Ze[Ee]);
      }
      else if (L.isInstancedMesh) Vt.renderInstances(Gt, te, L.count);
      else if (O.isInstancedBufferGeometry) {
        const vt = O._maxInstanceCount !== void 0 ? O._maxInstanceCount : 1 / 0, Ze = Math.min(O.instanceCount, vt);
        Vt.renderInstances(Gt, te, Ze);
      } else Vt.render(Gt, te);
    };
    function Xt(x, D, O) {
      x.transparent === true && x.side === sn && x.forceSinglePass === false ? (x.side = ye, x.needsUpdate = true, ki(x, D, O), x.side = Mn, x.needsUpdate = true, ki(x, D, O), x.side = sn) : ki(x, D, O);
    }
    this.compile = function(x, D, O = null) {
      O === null && (O = x), u = kt.get(O), u.init(D), b.push(u), O.traverseVisible(function(L) {
        L.isLight && L.layers.test(D.layers) && (u.pushLight(L), L.castShadow && u.pushShadow(L));
      }), x !== O && x.traverseVisible(function(L) {
        L.isLight && L.layers.test(D.layers) && (u.pushLight(L), L.castShadow && u.pushShadow(L));
      }), u.setupLights();
      const B = /* @__PURE__ */ new Set();
      return x.traverse(function(L) {
        if (!(L.isMesh || L.isPoints || L.isLine || L.isSprite)) return;
        const Q = L.material;
        if (Q) if (Array.isArray(Q)) for (let ot = 0; ot < Q.length; ot++) {
          const ft = Q[ot];
          Xt(ft, O, L), B.add(ft);
        }
        else Xt(Q, O, L), B.add(Q);
      }), b.pop(), u = null, B;
    }, this.compileAsync = function(x, D, O = null) {
      const B = this.compile(x, D, O);
      return new Promise((L) => {
        function Q() {
          if (B.forEach(function(ot) {
            Mt.get(ot).currentProgram.isReady() && B.delete(ot);
          }), B.size === 0) {
            L(x);
            return;
          }
          setTimeout(Q, 10);
        }
        Ft.get("KHR_parallel_shader_compile") !== null ? Q() : setTimeout(Q, 10);
      });
    };
    let Ne = null;
    function je(x) {
      Ne && Ne(x);
    }
    function ya() {
      yn.stop();
    }
    function Ea() {
      yn.start();
    }
    const yn = new xl();
    yn.setAnimationLoop(je), typeof self < "u" && yn.setContext(self), this.setAnimationLoop = function(x) {
      Ne = x, H.setAnimationLoop(x), x === null ? yn.stop() : yn.start();
    }, H.addEventListener("sessionstart", ya), H.addEventListener("sessionend", Ea), this.render = function(x, D) {
      if (D !== void 0 && D.isCamera !== true) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (N === true) return;
      if (x.matrixWorldAutoUpdate === true && x.updateMatrixWorld(), D.parent === null && D.matrixWorldAutoUpdate === true && D.updateMatrixWorld(), H.enabled === true && H.isPresenting === true && (H.cameraAutoUpdate === true && H.updateCamera(D), D = H.getCamera()), x.isScene === true && x.onBeforeRender(S, x, D, U), u = kt.get(x, b.length), u.init(D), b.push(u), Et.multiplyMatrices(D.projectionMatrix, D.matrixWorldInverse), Y.setFromProjectionMatrix(Et), gt = this.localClippingEnabled, tt = J.init(this.clippingPlanes, gt), p = ht.get(x, T.length), p.init(), T.push(p), H.enabled === true && H.isPresenting === true) {
        const Q = S.xr.getDepthSensingMesh();
        Q !== null && Ls(Q, D, -1 / 0, S.sortObjects);
      }
      Ls(x, D, 0, S.sortObjects), p.finish(), S.sortObjects === true && p.sort(it, ct), zt = H.enabled === false || H.isPresenting === false || H.hasDepthSensing() === false, zt && yt.addToRenderList(p, x), this.info.render.frame++, tt === true && J.beginShadows();
      const O = u.state.shadowsArray;
      ut.render(O, x, D), tt === true && J.endShadows(), this.info.autoReset === true && this.info.reset();
      const B = p.opaque, L = p.transmissive;
      if (u.setupLights(), D.isArrayCamera) {
        const Q = D.cameras;
        if (L.length > 0) for (let ot = 0, ft = Q.length; ot < ft; ot++) {
          const pt = Q[ot];
          Ta(B, L, x, pt);
        }
        zt && yt.render(x);
        for (let ot = 0, ft = Q.length; ot < ft; ot++) {
          const pt = Q[ot];
          ba(p, x, pt, pt.viewport);
        }
      } else L.length > 0 && Ta(B, L, x, D), zt && yt.render(x), ba(p, x, D);
      U !== null && (E.updateMultisampleRenderTarget(U), E.updateRenderTargetMipmap(U)), x.isScene === true && x.onAfterRender(S, x, D), Kt.resetDefaultState(), y = -1, M = null, b.pop(), b.length > 0 ? (u = b[b.length - 1], tt === true && J.setGlobalState(S.clippingPlanes, u.state.camera)) : u = null, T.pop(), T.length > 0 ? p = T[T.length - 1] : p = null;
    };
    function Ls(x, D, O, B) {
      if (x.visible === false) return;
      if (x.layers.test(D.layers)) {
        if (x.isGroup) O = x.renderOrder;
        else if (x.isLOD) x.autoUpdate === true && x.update(D);
        else if (x.isLight) u.pushLight(x), x.castShadow && u.pushShadow(x);
        else if (x.isSprite) {
          if (!x.frustumCulled || Y.intersectsSprite(x)) {
            B && Ut.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Et);
            const ot = X.update(x), ft = x.material;
            ft.visible && p.push(x, ot, ft, O, Ut.z, null);
          }
        } else if ((x.isMesh || x.isLine || x.isPoints) && (!x.frustumCulled || Y.intersectsObject(x))) {
          const ot = X.update(x), ft = x.material;
          if (B && (x.boundingSphere !== void 0 ? (x.boundingSphere === null && x.computeBoundingSphere(), Ut.copy(x.boundingSphere.center)) : (ot.boundingSphere === null && ot.computeBoundingSphere(), Ut.copy(ot.boundingSphere.center)), Ut.applyMatrix4(x.matrixWorld).applyMatrix4(Et)), Array.isArray(ft)) {
            const pt = ot.groups;
            for (let Tt = 0, Rt = pt.length; Tt < Rt; Tt++) {
              const mt = pt[Tt], Gt = ft[mt.materialIndex];
              Gt && Gt.visible && p.push(x, ot, Gt, O, Ut.z, mt);
            }
          } else ft.visible && p.push(x, ot, ft, O, Ut.z, null);
        }
      }
      const Q = x.children;
      for (let ot = 0, ft = Q.length; ot < ft; ot++) Ls(Q[ot], D, O, B);
    }
    function ba(x, D, O, B) {
      const L = x.opaque, Q = x.transmissive, ot = x.transparent;
      u.setupLightsView(O), tt === true && J.setGlobalState(S.clippingPlanes, O), B && St.viewport(C.copy(B)), L.length > 0 && zi(L, D, O), Q.length > 0 && zi(Q, D, O), ot.length > 0 && zi(ot, D, O), St.buffers.depth.setTest(true), St.buffers.depth.setMask(true), St.buffers.color.setMask(true), St.setPolygonOffset(false);
    }
    function Ta(x, D, O, B) {
      if ((O.isScene === true ? O.overrideMaterial : null) !== null) return;
      u.state.transmissionRenderTarget[B.id] === void 0 && (u.state.transmissionRenderTarget[B.id] = new Nn(1, 1, { generateMipmaps: true, type: Ft.has("EXT_color_buffer_half_float") || Ft.has("EXT_color_buffer_float") ? Oi : on, minFilter: In, samples: 4, stencilBuffer: r, resolveDepthBuffer: false, resolveStencilBuffer: false, colorSpace: Ht.workingColorSpace }));
      const Q = u.state.transmissionRenderTarget[B.id], ot = B.viewport || C;
      Q.setSize(ot.z, ot.w);
      const ft = S.getRenderTarget();
      S.setRenderTarget(Q), S.getClearColor(W), j = S.getClearAlpha(), j < 1 && S.setClearColor(16777215, 0.5), S.clear(), zt && yt.render(O);
      const pt = S.toneMapping;
      S.toneMapping = xn;
      const Tt = B.viewport;
      if (B.viewport !== void 0 && (B.viewport = void 0), u.setupLightsView(B), tt === true && J.setGlobalState(S.clippingPlanes, B), zi(x, O, B), E.updateMultisampleRenderTarget(Q), E.updateRenderTargetMipmap(Q), Ft.has("WEBGL_multisampled_render_to_texture") === false) {
        let Rt = false;
        for (let mt = 0, Gt = D.length; mt < Gt; mt++) {
          const Jt = D[mt], te = Jt.object, ve = Jt.geometry, Vt = Jt.material, vt = Jt.group;
          if (Vt.side === sn && te.layers.test(B.layers)) {
            const Ze = Vt.side;
            Vt.side = ye, Vt.needsUpdate = true, Aa(te, O, B, ve, Vt, vt), Vt.side = Ze, Vt.needsUpdate = true, Rt = true;
          }
        }
        Rt === true && (E.updateMultisampleRenderTarget(Q), E.updateRenderTargetMipmap(Q));
      }
      S.setRenderTarget(ft), S.setClearColor(W, j), Tt !== void 0 && (B.viewport = Tt), S.toneMapping = pt;
    }
    function zi(x, D, O) {
      const B = D.isScene === true ? D.overrideMaterial : null;
      for (let L = 0, Q = x.length; L < Q; L++) {
        const ot = x[L], ft = ot.object, pt = ot.geometry, Tt = B === null ? ot.material : B, Rt = ot.group;
        ft.layers.test(O.layers) && Aa(ft, D, O, pt, Tt, Rt);
      }
    }
    function Aa(x, D, O, B, L, Q) {
      x.onBeforeRender(S, D, O, B, L, Q), x.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse, x.matrixWorld), x.normalMatrix.getNormalMatrix(x.modelViewMatrix), L.onBeforeRender(S, D, O, B, x, Q), L.transparent === true && L.side === sn && L.forceSinglePass === false ? (L.side = ye, L.needsUpdate = true, S.renderBufferDirect(O, D, B, L, x, Q), L.side = Mn, L.needsUpdate = true, S.renderBufferDirect(O, D, B, L, x, Q), L.side = sn) : S.renderBufferDirect(O, D, B, L, x, Q), x.onAfterRender(S, D, O, B, L, Q);
    }
    function ki(x, D, O) {
      D.isScene !== true && (D = ne);
      const B = Mt.get(x), L = u.state.lights, Q = u.state.shadowsArray, ot = L.state.version, ft = _t.getParameters(x, L.state, Q, D, O), pt = _t.getProgramCacheKey(ft);
      let Tt = B.programs;
      B.environment = x.isMeshStandardMaterial ? D.environment : null, B.fog = D.fog, B.envMap = (x.isMeshStandardMaterial ? F : _).get(x.envMap || B.environment), B.envMapRotation = B.environment !== null && x.envMap === null ? D.environmentRotation : x.envMapRotation, Tt === void 0 && (x.addEventListener("dispose", Ct), Tt = /* @__PURE__ */ new Map(), B.programs = Tt);
      let Rt = Tt.get(pt);
      if (Rt !== void 0) {
        if (B.currentProgram === Rt && B.lightsStateVersion === ot) return Ca(x, ft), Rt;
      } else ft.uniforms = _t.getUniforms(x), x.onBeforeCompile(ft, S), Rt = _t.acquireProgram(ft, pt), Tt.set(pt, Rt), B.uniforms = ft.uniforms;
      const mt = B.uniforms;
      return (!x.isShaderMaterial && !x.isRawShaderMaterial || x.clipping === true) && (mt.clippingPlanes = J.uniform), Ca(x, ft), B.needsLights = Il(x), B.lightsStateVersion = ot, B.needsLights && (mt.ambientLightColor.value = L.state.ambient, mt.lightProbe.value = L.state.probe, mt.directionalLights.value = L.state.directional, mt.directionalLightShadows.value = L.state.directionalShadow, mt.spotLights.value = L.state.spot, mt.spotLightShadows.value = L.state.spotShadow, mt.rectAreaLights.value = L.state.rectArea, mt.ltc_1.value = L.state.rectAreaLTC1, mt.ltc_2.value = L.state.rectAreaLTC2, mt.pointLights.value = L.state.point, mt.pointLightShadows.value = L.state.pointShadow, mt.hemisphereLights.value = L.state.hemi, mt.directionalShadowMap.value = L.state.directionalShadowMap, mt.directionalShadowMatrix.value = L.state.directionalShadowMatrix, mt.spotShadowMap.value = L.state.spotShadowMap, mt.spotLightMatrix.value = L.state.spotLightMatrix, mt.spotLightMap.value = L.state.spotLightMap, mt.pointShadowMap.value = L.state.pointShadowMap, mt.pointShadowMatrix.value = L.state.pointShadowMatrix), B.currentProgram = Rt, B.uniformsList = null, Rt;
    }
    function wa(x) {
      if (x.uniformsList === null) {
        const D = x.currentProgram.getUniforms();
        x.uniformsList = ys.seqWithValue(D.seq, x.uniforms);
      }
      return x.uniformsList;
    }
    function Ca(x, D) {
      const O = Mt.get(x);
      O.outputColorSpace = D.outputColorSpace, O.batching = D.batching, O.batchingColor = D.batchingColor, O.instancing = D.instancing, O.instancingColor = D.instancingColor, O.instancingMorph = D.instancingMorph, O.skinning = D.skinning, O.morphTargets = D.morphTargets, O.morphNormals = D.morphNormals, O.morphColors = D.morphColors, O.morphTargetsCount = D.morphTargetsCount, O.numClippingPlanes = D.numClippingPlanes, O.numIntersection = D.numClipIntersection, O.vertexAlphas = D.vertexAlphas, O.vertexTangents = D.vertexTangents, O.toneMapping = D.toneMapping;
    }
    function Dl(x, D, O, B, L) {
      D.isScene !== true && (D = ne), E.resetTextureUnits();
      const Q = D.fog, ot = B.isMeshStandardMaterial ? D.environment : null, ft = U === null ? S.outputColorSpace : U.isXRRenderTarget === true ? U.texture.colorSpace : mi, pt = (B.isMeshStandardMaterial ? F : _).get(B.envMap || ot), Tt = B.vertexColors === true && !!O.attributes.color && O.attributes.color.itemSize === 4, Rt = !!O.attributes.tangent && (!!B.normalMap || B.anisotropy > 0), mt = !!O.morphAttributes.position, Gt = !!O.morphAttributes.normal, Jt = !!O.morphAttributes.color;
      let te = xn;
      B.toneMapped && (U === null || U.isXRRenderTarget === true) && (te = S.toneMapping);
      const ve = O.morphAttributes.position || O.morphAttributes.normal || O.morphAttributes.color, Vt = ve !== void 0 ? ve.length : 0, vt = Mt.get(B), Ze = u.state.lights;
      if (tt === true && (gt === true || x !== M)) {
        const Pe = x === M && B.id === y;
        J.setState(B, x, Pe);
      }
      let Wt = false;
      B.version === vt.__version ? (vt.needsLights && vt.lightsStateVersion !== Ze.state.version || vt.outputColorSpace !== ft || L.isBatchedMesh && vt.batching === false || !L.isBatchedMesh && vt.batching === true || L.isBatchedMesh && vt.batchingColor === true && L.colorTexture === null || L.isBatchedMesh && vt.batchingColor === false && L.colorTexture !== null || L.isInstancedMesh && vt.instancing === false || !L.isInstancedMesh && vt.instancing === true || L.isSkinnedMesh && vt.skinning === false || !L.isSkinnedMesh && vt.skinning === true || L.isInstancedMesh && vt.instancingColor === true && L.instanceColor === null || L.isInstancedMesh && vt.instancingColor === false && L.instanceColor !== null || L.isInstancedMesh && vt.instancingMorph === true && L.morphTexture === null || L.isInstancedMesh && vt.instancingMorph === false && L.morphTexture !== null || vt.envMap !== pt || B.fog === true && vt.fog !== Q || vt.numClippingPlanes !== void 0 && (vt.numClippingPlanes !== J.numPlanes || vt.numIntersection !== J.numIntersection) || vt.vertexAlphas !== Tt || vt.vertexTangents !== Rt || vt.morphTargets !== mt || vt.morphNormals !== Gt || vt.morphColors !== Jt || vt.toneMapping !== te || vt.morphTargetsCount !== Vt) && (Wt = true) : (Wt = true, vt.__version = B.version);
      let Fe = vt.currentProgram;
      Wt === true && (Fe = ki(B, D, L));
      let kn = false, Ee = false, xi = false;
      const ee = Fe.getUniforms(), Ve = vt.uniforms;
      if (St.useProgram(Fe.program) && (kn = true, Ee = true, xi = true), B.id !== y && (y = B.id, Ee = true), kn || M !== x) {
        St.buffers.depth.getReversed() ? (st.copy(x.projectionMatrix), Uc(st), Nc(st), ee.setValue(I, "projectionMatrix", st)) : ee.setValue(I, "projectionMatrix", x.projectionMatrix), ee.setValue(I, "viewMatrix", x.matrixWorldInverse);
        const ln = ee.map.cameraPosition;
        ln !== void 0 && ln.setValue(I, wt.setFromMatrixPosition(x.matrixWorld)), Ot.logarithmicDepthBuffer && ee.setValue(I, "logDepthBufFC", 2 / (Math.log(x.far + 1) / Math.LN2)), (B.isMeshPhongMaterial || B.isMeshToonMaterial || B.isMeshLambertMaterial || B.isMeshBasicMaterial || B.isMeshStandardMaterial || B.isShaderMaterial) && ee.setValue(I, "isOrthographic", x.isOrthographicCamera === true), M !== x && (M = x, Ee = true, xi = true);
      }
      if (L.isSkinnedMesh) {
        ee.setOptional(I, L, "bindMatrix"), ee.setOptional(I, L, "bindMatrixInverse");
        const Pe = L.skeleton;
        Pe && (Pe.boneTexture === null && Pe.computeBoneTexture(), ee.setValue(I, "boneTexture", Pe.boneTexture, E));
      }
      L.isBatchedMesh && (ee.setOptional(I, L, "batchingTexture"), ee.setValue(I, "batchingTexture", L._matricesTexture, E), ee.setOptional(I, L, "batchingIdTexture"), ee.setValue(I, "batchingIdTexture", L._indirectTexture, E), ee.setOptional(I, L, "batchingColorTexture"), L._colorsTexture !== null && ee.setValue(I, "batchingColorTexture", L._colorsTexture, E));
      const Mi = O.morphAttributes;
      if ((Mi.position !== void 0 || Mi.normal !== void 0 || Mi.color !== void 0) && bt.update(L, O, Fe), (Ee || vt.receiveShadow !== L.receiveShadow) && (vt.receiveShadow = L.receiveShadow, ee.setValue(I, "receiveShadow", L.receiveShadow)), B.isMeshGouraudMaterial && B.envMap !== null && (Ve.envMap.value = pt, Ve.flipEnvMap.value = pt.isCubeTexture && pt.isRenderTargetTexture === false ? -1 : 1), B.isMeshStandardMaterial && B.envMap === null && D.environment !== null && (Ve.envMapIntensity.value = D.environmentIntensity), Ee && (ee.setValue(I, "toneMappingExposure", S.toneMappingExposure), vt.needsLights && Ll(Ve, xi), Q && B.fog === true && rt.refreshFogUniforms(Ve, Q), rt.refreshMaterialUniforms(Ve, B, G, K, u.state.transmissionRenderTarget[x.id]), ys.upload(I, wa(vt), Ve, E)), B.isShaderMaterial && B.uniformsNeedUpdate === true && (ys.upload(I, wa(vt), Ve, E), B.uniformsNeedUpdate = false), B.isSpriteMaterial && ee.setValue(I, "center", L.center), ee.setValue(I, "modelViewMatrix", L.modelViewMatrix), ee.setValue(I, "normalMatrix", L.normalMatrix), ee.setValue(I, "modelMatrix", L.matrixWorld), B.isShaderMaterial || B.isRawShaderMaterial) {
        const Pe = B.uniformsGroups;
        for (let ln = 0, cn = Pe.length; ln < cn; ln++) {
          const Ra = Pe[ln];
          R.update(Ra, Fe), R.bind(Ra, Fe);
        }
      }
      return Fe;
    }
    function Ll(x, D) {
      x.ambientLightColor.needsUpdate = D, x.lightProbe.needsUpdate = D, x.directionalLights.needsUpdate = D, x.directionalLightShadows.needsUpdate = D, x.pointLights.needsUpdate = D, x.pointLightShadows.needsUpdate = D, x.spotLights.needsUpdate = D, x.spotLightShadows.needsUpdate = D, x.rectAreaLights.needsUpdate = D, x.hemisphereLights.needsUpdate = D;
    }
    function Il(x) {
      return x.isMeshLambertMaterial || x.isMeshToonMaterial || x.isMeshPhongMaterial || x.isMeshStandardMaterial || x.isShadowMaterial || x.isShaderMaterial && x.lights === true;
    }
    this.getActiveCubeFace = function() {
      return w;
    }, this.getActiveMipmapLevel = function() {
      return A;
    }, this.getRenderTarget = function() {
      return U;
    }, this.setRenderTargetTextures = function(x, D, O) {
      Mt.get(x.texture).__webglTexture = D, Mt.get(x.depthTexture).__webglTexture = O;
      const B = Mt.get(x);
      B.__hasExternalTextures = true, B.__autoAllocateDepthBuffer = O === void 0, B.__autoAllocateDepthBuffer || Ft.has("WEBGL_multisampled_render_to_texture") === true && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), B.__useRenderToTexture = false);
    }, this.setRenderTargetFramebuffer = function(x, D) {
      const O = Mt.get(x);
      O.__webglFramebuffer = D, O.__useDefaultFramebuffer = D === void 0;
    }, this.setRenderTarget = function(x, D = 0, O = 0) {
      U = x, w = D, A = O;
      let B = true, L = null, Q = false, ot = false;
      if (x) {
        const pt = Mt.get(x);
        if (pt.__useDefaultFramebuffer !== void 0) St.bindFramebuffer(I.FRAMEBUFFER, null), B = false;
        else if (pt.__webglFramebuffer === void 0) E.setupRenderTarget(x);
        else if (pt.__hasExternalTextures) E.rebindTextures(x, Mt.get(x.texture).__webglTexture, Mt.get(x.depthTexture).__webglTexture);
        else if (x.depthBuffer) {
          const mt = x.depthTexture;
          if (pt.__boundDepthTexture !== mt) {
            if (mt !== null && Mt.has(mt) && (x.width !== mt.image.width || x.height !== mt.image.height)) throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            E.setupDepthRenderbuffer(x);
          }
        }
        const Tt = x.texture;
        (Tt.isData3DTexture || Tt.isDataArrayTexture || Tt.isCompressedArrayTexture) && (ot = true);
        const Rt = Mt.get(x).__webglFramebuffer;
        x.isWebGLCubeRenderTarget ? (Array.isArray(Rt[D]) ? L = Rt[D][O] : L = Rt[D], Q = true) : x.samples > 0 && E.useMultisampledRTT(x) === false ? L = Mt.get(x).__webglMultisampledFramebuffer : Array.isArray(Rt) ? L = Rt[O] : L = Rt, C.copy(x.viewport), k.copy(x.scissor), z = x.scissorTest;
      } else C.copy(xt).multiplyScalar(G).floor(), k.copy(It).multiplyScalar(G).floor(), z = Zt;
      if (St.bindFramebuffer(I.FRAMEBUFFER, L) && B && St.drawBuffers(x, L), St.viewport(C), St.scissor(k), St.setScissorTest(z), Q) {
        const pt = Mt.get(x.texture);
        I.framebufferTexture2D(I.FRAMEBUFFER, I.COLOR_ATTACHMENT0, I.TEXTURE_CUBE_MAP_POSITIVE_X + D, pt.__webglTexture, O);
      } else if (ot) {
        const pt = Mt.get(x.texture), Tt = D || 0;
        I.framebufferTextureLayer(I.FRAMEBUFFER, I.COLOR_ATTACHMENT0, pt.__webglTexture, O || 0, Tt);
      }
      y = -1;
    }, this.readRenderTargetPixels = function(x, D, O, B, L, Q, ot) {
      if (!(x && x.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let ft = Mt.get(x).__webglFramebuffer;
      if (x.isWebGLCubeRenderTarget && ot !== void 0 && (ft = ft[ot]), ft) {
        St.bindFramebuffer(I.FRAMEBUFFER, ft);
        try {
          const pt = x.texture, Tt = pt.format, Rt = pt.type;
          if (!Ot.textureFormatReadable(Tt)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!Ot.textureTypeReadable(Rt)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          D >= 0 && D <= x.width - B && O >= 0 && O <= x.height - L && I.readPixels(D, O, B, L, Dt.convert(Tt), Dt.convert(Rt), Q);
        } finally {
          const pt = U !== null ? Mt.get(U).__webglFramebuffer : null;
          St.bindFramebuffer(I.FRAMEBUFFER, pt);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(x, D, O, B, L, Q, ot) {
      if (!(x && x.isWebGLRenderTarget)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let ft = Mt.get(x).__webglFramebuffer;
      if (x.isWebGLCubeRenderTarget && ot !== void 0 && (ft = ft[ot]), ft) {
        const pt = x.texture, Tt = pt.format, Rt = pt.type;
        if (!Ot.textureFormatReadable(Tt)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!Ot.textureTypeReadable(Rt)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        if (D >= 0 && D <= x.width - B && O >= 0 && O <= x.height - L) {
          St.bindFramebuffer(I.FRAMEBUFFER, ft);
          const mt = I.createBuffer();
          I.bindBuffer(I.PIXEL_PACK_BUFFER, mt), I.bufferData(I.PIXEL_PACK_BUFFER, Q.byteLength, I.STREAM_READ), I.readPixels(D, O, B, L, Dt.convert(Tt), Dt.convert(Rt), 0);
          const Gt = U !== null ? Mt.get(U).__webglFramebuffer : null;
          St.bindFramebuffer(I.FRAMEBUFFER, Gt);
          const Jt = I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return I.flush(), await Ic(I, Jt, 4), I.bindBuffer(I.PIXEL_PACK_BUFFER, mt), I.getBufferSubData(I.PIXEL_PACK_BUFFER, 0, Q), I.deleteBuffer(mt), I.deleteSync(Jt), Q;
        } else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
      }
    }, this.copyFramebufferToTexture = function(x, D = null, O = 0) {
      x.isTexture !== true && (Pi("WebGLRenderer: copyFramebufferToTexture function signature has changed."), D = arguments[0] || null, x = arguments[1]);
      const B = Math.pow(2, -O), L = Math.floor(x.image.width * B), Q = Math.floor(x.image.height * B), ot = D !== null ? D.x : 0, ft = D !== null ? D.y : 0;
      E.setTexture2D(x, 0), I.copyTexSubImage2D(I.TEXTURE_2D, O, 0, 0, ot, ft, L, Q), St.unbindTexture();
    }, this.copyTextureToTexture = function(x, D, O = null, B = null, L = 0) {
      x.isTexture !== true && (Pi("WebGLRenderer: copyTextureToTexture function signature has changed."), B = arguments[0] || null, x = arguments[1], D = arguments[2], L = arguments[3] || 0, O = null);
      let Q, ot, ft, pt, Tt, Rt, mt, Gt, Jt;
      const te = x.isCompressedTexture ? x.mipmaps[L] : x.image;
      O !== null ? (Q = O.max.x - O.min.x, ot = O.max.y - O.min.y, ft = O.isBox3 ? O.max.z - O.min.z : 1, pt = O.min.x, Tt = O.min.y, Rt = O.isBox3 ? O.min.z : 0) : (Q = te.width, ot = te.height, ft = te.depth || 1, pt = 0, Tt = 0, Rt = 0), B !== null ? (mt = B.x, Gt = B.y, Jt = B.z) : (mt = 0, Gt = 0, Jt = 0);
      const ve = Dt.convert(D.format), Vt = Dt.convert(D.type);
      let vt;
      D.isData3DTexture ? (E.setTexture3D(D, 0), vt = I.TEXTURE_3D) : D.isDataArrayTexture || D.isCompressedArrayTexture ? (E.setTexture2DArray(D, 0), vt = I.TEXTURE_2D_ARRAY) : (E.setTexture2D(D, 0), vt = I.TEXTURE_2D), I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL, D.flipY), I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL, D.premultiplyAlpha), I.pixelStorei(I.UNPACK_ALIGNMENT, D.unpackAlignment);
      const Ze = I.getParameter(I.UNPACK_ROW_LENGTH), Wt = I.getParameter(I.UNPACK_IMAGE_HEIGHT), Fe = I.getParameter(I.UNPACK_SKIP_PIXELS), kn = I.getParameter(I.UNPACK_SKIP_ROWS), Ee = I.getParameter(I.UNPACK_SKIP_IMAGES);
      I.pixelStorei(I.UNPACK_ROW_LENGTH, te.width), I.pixelStorei(I.UNPACK_IMAGE_HEIGHT, te.height), I.pixelStorei(I.UNPACK_SKIP_PIXELS, pt), I.pixelStorei(I.UNPACK_SKIP_ROWS, Tt), I.pixelStorei(I.UNPACK_SKIP_IMAGES, Rt);
      const xi = x.isDataArrayTexture || x.isData3DTexture, ee = D.isDataArrayTexture || D.isData3DTexture;
      if (x.isRenderTargetTexture || x.isDepthTexture) {
        const Ve = Mt.get(x), Mi = Mt.get(D), Pe = Mt.get(Ve.__renderTarget), ln = Mt.get(Mi.__renderTarget);
        St.bindFramebuffer(I.READ_FRAMEBUFFER, Pe.__webglFramebuffer), St.bindFramebuffer(I.DRAW_FRAMEBUFFER, ln.__webglFramebuffer);
        for (let cn = 0; cn < ft; cn++) xi && I.framebufferTextureLayer(I.READ_FRAMEBUFFER, I.COLOR_ATTACHMENT0, Mt.get(x).__webglTexture, L, Rt + cn), x.isDepthTexture ? (ee && I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER, I.COLOR_ATTACHMENT0, Mt.get(D).__webglTexture, L, Jt + cn), I.blitFramebuffer(pt, Tt, Q, ot, mt, Gt, Q, ot, I.DEPTH_BUFFER_BIT, I.NEAREST)) : ee ? I.copyTexSubImage3D(vt, L, mt, Gt, Jt + cn, pt, Tt, Q, ot) : I.copyTexSubImage2D(vt, L, mt, Gt, Jt + cn, pt, Tt, Q, ot);
        St.bindFramebuffer(I.READ_FRAMEBUFFER, null), St.bindFramebuffer(I.DRAW_FRAMEBUFFER, null);
      } else ee ? x.isDataTexture || x.isData3DTexture ? I.texSubImage3D(vt, L, mt, Gt, Jt, Q, ot, ft, ve, Vt, te.data) : D.isCompressedArrayTexture ? I.compressedTexSubImage3D(vt, L, mt, Gt, Jt, Q, ot, ft, ve, te.data) : I.texSubImage3D(vt, L, mt, Gt, Jt, Q, ot, ft, ve, Vt, te) : x.isDataTexture ? I.texSubImage2D(I.TEXTURE_2D, L, mt, Gt, Q, ot, ve, Vt, te.data) : x.isCompressedTexture ? I.compressedTexSubImage2D(I.TEXTURE_2D, L, mt, Gt, te.width, te.height, ve, te.data) : I.texSubImage2D(I.TEXTURE_2D, L, mt, Gt, Q, ot, ve, Vt, te);
      I.pixelStorei(I.UNPACK_ROW_LENGTH, Ze), I.pixelStorei(I.UNPACK_IMAGE_HEIGHT, Wt), I.pixelStorei(I.UNPACK_SKIP_PIXELS, Fe), I.pixelStorei(I.UNPACK_SKIP_ROWS, kn), I.pixelStorei(I.UNPACK_SKIP_IMAGES, Ee), L === 0 && D.generateMipmaps && I.generateMipmap(vt), St.unbindTexture();
    }, this.copyTextureToTexture3D = function(x, D, O = null, B = null, L = 0) {
      return x.isTexture !== true && (Pi("WebGLRenderer: copyTextureToTexture3D function signature has changed."), O = arguments[0] || null, B = arguments[1] || null, x = arguments[2], D = arguments[3], L = arguments[4] || 0), Pi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'), this.copyTextureToTexture(x, D, O, B, L);
    }, this.initRenderTarget = function(x) {
      Mt.get(x).__webglFramebuffer === void 0 && E.setupRenderTarget(x);
    }, this.initTexture = function(x) {
      x.isCubeTexture ? E.setTextureCube(x, 0) : x.isData3DTexture ? E.setTexture3D(x, 0) : x.isDataArrayTexture || x.isCompressedArrayTexture ? E.setTexture2DArray(x, 0) : E.setTexture2D(x, 0), St.unbindTexture();
    }, this.resetState = function() {
      w = 0, A = 0, U = null, St.reset(), Kt.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return rn;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(t) {
    this._outputColorSpace = t;
    const e = this.getContext();
    e.drawingBufferColorspace = Ht._getDrawingBufferColorSpace(t), e.unpackColorSpace = Ht._getUnpackColorSpace();
  }
}
class ma {
  constructor(t, e = 25e-5) {
    this.isFogExp2 = true, this.name = "", this.color = new Nt(t), this.density = e;
  }
  clone() {
    return new ma(this.color, this.density);
  }
  toJSON() {
    return { type: "FogExp2", name: this.name, color: this.color.getHex(), density: this.density };
  }
}
class Yp extends he {
  constructor() {
    super(), this.isScene = true, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new $e(), this.environmentIntensity = 1, this.environmentRotation = new $e(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(t, e) {
    return super.copy(t, e), t.background !== null && (this.background = t.background.clone()), t.environment !== null && (this.environment = t.environment.clone()), t.fog !== null && (this.fog = t.fog.clone()), this.backgroundBlurriness = t.backgroundBlurriness, this.backgroundIntensity = t.backgroundIntensity, this.backgroundRotation.copy(t.backgroundRotation), this.environmentIntensity = t.environmentIntensity, this.environmentRotation.copy(t.environmentRotation), t.overrideMaterial !== null && (this.overrideMaterial = t.overrideMaterial.clone()), this.matrixAutoUpdate = t.matrixAutoUpdate, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.fog !== null && (e.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (e.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (e.object.backgroundIntensity = this.backgroundIntensity), e.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (e.object.environmentIntensity = this.environmentIntensity), e.object.environmentRotation = this.environmentRotation.toArray(), e;
  }
}
class qp extends _e {
  constructor(t = null, e = 1, n = 1, s, r, a, o, l, c = Ce, h = Ce, f, d) {
    super(null, a, o, l, c, h, s, r, f, d), this.isDataTexture = true, this.image = { data: t, width: e, height: n }, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1;
  }
}
class Lo extends He {
  constructor(t, e, n, s = 1) {
    super(t, e, n), this.isInstancedBufferAttribute = true, this.meshPerAttribute = s;
  }
  copy(t) {
    return super.copy(t), this.meshPerAttribute = t.meshPerAttribute, this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.meshPerAttribute = this.meshPerAttribute, t.isInstancedBufferAttribute = true, t;
  }
}
const ni = new Yt(), Io = new Yt(), hs = [], Uo = new zn(), $p = new Yt(), Ai = new Ue(), wi = new gi();
class jp extends Ue {
  constructor(t, e, n) {
    super(t, e), this.isInstancedMesh = true, this.instanceMatrix = new Lo(new Float32Array(n * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null;
    for (let s = 0; s < n; s++) this.setMatrixAt(s, $p);
  }
  computeBoundingBox() {
    const t = this.geometry, e = this.count;
    this.boundingBox === null && (this.boundingBox = new zn()), t.boundingBox === null && t.computeBoundingBox(), this.boundingBox.makeEmpty();
    for (let n = 0; n < e; n++) this.getMatrixAt(n, ni), Uo.copy(t.boundingBox).applyMatrix4(ni), this.boundingBox.union(Uo);
  }
  computeBoundingSphere() {
    const t = this.geometry, e = this.count;
    this.boundingSphere === null && (this.boundingSphere = new gi()), t.boundingSphere === null && t.computeBoundingSphere(), this.boundingSphere.makeEmpty();
    for (let n = 0; n < e; n++) this.getMatrixAt(n, ni), wi.copy(t.boundingSphere).applyMatrix4(ni), this.boundingSphere.union(wi);
  }
  copy(t, e) {
    return super.copy(t, e), this.instanceMatrix.copy(t.instanceMatrix), t.morphTexture !== null && (this.morphTexture = t.morphTexture.clone()), t.instanceColor !== null && (this.instanceColor = t.instanceColor.clone()), this.count = t.count, t.boundingBox !== null && (this.boundingBox = t.boundingBox.clone()), t.boundingSphere !== null && (this.boundingSphere = t.boundingSphere.clone()), this;
  }
  getColorAt(t, e) {
    e.fromArray(this.instanceColor.array, t * 3);
  }
  getMatrixAt(t, e) {
    e.fromArray(this.instanceMatrix.array, t * 16);
  }
  getMorphAt(t, e) {
    const n = e.morphTargetInfluences, s = this.morphTexture.source.data.data, r = n.length + 1, a = t * r + 1;
    for (let o = 0; o < n.length; o++) n[o] = s[a + o];
  }
  raycast(t, e) {
    const n = this.matrixWorld, s = this.count;
    if (Ai.geometry = this.geometry, Ai.material = this.material, Ai.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), wi.copy(this.boundingSphere), wi.applyMatrix4(n), t.ray.intersectsSphere(wi) !== false)) for (let r = 0; r < s; r++) {
      this.getMatrixAt(r, ni), Io.multiplyMatrices(n, ni), Ai.matrixWorld = Io, Ai.raycast(t, hs);
      for (let a = 0, o = hs.length; a < o; a++) {
        const l = hs[a];
        l.instanceId = r, l.object = this, e.push(l);
      }
      hs.length = 0;
    }
  }
  setColorAt(t, e) {
    this.instanceColor === null && (this.instanceColor = new Lo(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), e.toArray(this.instanceColor.array, t * 3);
  }
  setMatrixAt(t, e) {
    e.toArray(this.instanceMatrix.array, t * 16);
  }
  setMorphAt(t, e) {
    const n = e.morphTargetInfluences, s = n.length + 1;
    this.morphTexture === null && (this.morphTexture = new qp(new Float32Array(s * this.count), s, this.count, oa, Ye));
    const r = this.morphTexture.source.data.data;
    let a = 0;
    for (let c = 0; c < n.length; c++) a += n[c];
    const o = this.geometry.morphTargetsRelative ? 1 : 1 - a, l = s * t;
    r[l] = o, r.set(n, l + 1);
  }
  updateMorphTargets() {
  }
  dispose() {
    return this.dispatchEvent({ type: "dispose" }), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null), this;
  }
}
class Al extends _i {
  static get type() {
    return "LineBasicMaterial";
  }
  constructor(t) {
    super(), this.isLineBasicMaterial = true, this.color = new Nt(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = true, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.linewidth = t.linewidth, this.linecap = t.linecap, this.linejoin = t.linejoin, this.fog = t.fog, this;
  }
}
const As = new P(), ws = new P(), No = new Yt(), Ci = new ua(), us = new gi(), lr = new P(), Fo = new P();
class Zp extends he {
  constructor(t = new Ge(), e = new Al()) {
    super(), this.isLine = true, this.type = "Line", this.geometry = t, this.material = e, this.updateMorphTargets();
  }
  copy(t, e) {
    return super.copy(t, e), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
  }
  computeLineDistances() {
    const t = this.geometry;
    if (t.index === null) {
      const e = t.attributes.position, n = [0];
      for (let s = 1, r = e.count; s < r; s++) As.fromBufferAttribute(e, s - 1), ws.fromBufferAttribute(e, s), n[s] = n[s - 1], n[s] += As.distanceTo(ws);
      t.setAttribute("lineDistance", new pe(n, 1));
    } else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(t, e) {
    const n = this.geometry, s = this.matrixWorld, r = t.params.Line.threshold, a = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), us.copy(n.boundingSphere), us.applyMatrix4(s), us.radius += r, t.ray.intersectsSphere(us) === false) return;
    No.copy(s).invert(), Ci.copy(t.ray).applyMatrix4(No);
    const o = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = o * o, c = this.isLineSegments ? 2 : 1, h = n.index, d = n.attributes.position;
    if (h !== null) {
      const m = Math.max(0, a.start), g = Math.min(h.count, a.start + a.count);
      for (let v = m, p = g - 1; v < p; v += c) {
        const u = h.getX(v), T = h.getX(v + 1), b = ds(this, t, Ci, l, u, T);
        b && e.push(b);
      }
      if (this.isLineLoop) {
        const v = h.getX(g - 1), p = h.getX(m), u = ds(this, t, Ci, l, v, p);
        u && e.push(u);
      }
    } else {
      const m = Math.max(0, a.start), g = Math.min(d.count, a.start + a.count);
      for (let v = m, p = g - 1; v < p; v += c) {
        const u = ds(this, t, Ci, l, v, v + 1);
        u && e.push(u);
      }
      if (this.isLineLoop) {
        const v = ds(this, t, Ci, l, g - 1, m);
        v && e.push(v);
      }
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, n = Object.keys(e);
    if (n.length > 0) {
      const s = e[n[0]];
      if (s !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let r = 0, a = s.length; r < a; r++) {
          const o = s[r].name || String(r);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = r;
        }
      }
    }
  }
}
function ds(i, t, e, n, s, r) {
  const a = i.geometry.attributes.position;
  if (As.fromBufferAttribute(a, s), ws.fromBufferAttribute(a, r), e.distanceSqToSegment(As, ws, lr, Fo) > n) return;
  lr.applyMatrix4(i.matrixWorld);
  const l = t.ray.origin.distanceTo(lr);
  if (!(l < t.near || l > t.far)) return { distance: l, point: Fo.clone().applyMatrix4(i.matrixWorld), index: s, face: null, faceIndex: null, barycoord: null, object: i };
}
const Oo = new P(), Bo = new P();
class Kp extends Zp {
  constructor(t, e) {
    super(t, e), this.isLineSegments = true, this.type = "LineSegments";
  }
  computeLineDistances() {
    const t = this.geometry;
    if (t.index === null) {
      const e = t.attributes.position, n = [];
      for (let s = 0, r = e.count; s < r; s += 2) Oo.fromBufferAttribute(e, s), Bo.fromBufferAttribute(e, s + 1), n[s] = s === 0 ? 0 : n[s - 1], n[s + 1] = n[s] + Oo.distanceTo(Bo);
      t.setAttribute("lineDistance", new pe(n, 1));
    } else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class ga extends Ge {
  constructor(t = 1, e = 1, n = 1, s = 32, r = 1, a = false, o = 0, l = Math.PI * 2) {
    super(), this.type = "CylinderGeometry", this.parameters = { radiusTop: t, radiusBottom: e, height: n, radialSegments: s, heightSegments: r, openEnded: a, thetaStart: o, thetaLength: l };
    const c = this;
    s = Math.floor(s), r = Math.floor(r);
    const h = [], f = [], d = [], m = [];
    let g = 0;
    const v = [], p = n / 2;
    let u = 0;
    T(), a === false && (t > 0 && b(true), e > 0 && b(false)), this.setIndex(h), this.setAttribute("position", new pe(f, 3)), this.setAttribute("normal", new pe(d, 3)), this.setAttribute("uv", new pe(m, 2));
    function T() {
      const S = new P(), N = new P();
      let w = 0;
      const A = (e - t) / n;
      for (let U = 0; U <= r; U++) {
        const y = [], M = U / r, C = M * (e - t) + t;
        for (let k = 0; k <= s; k++) {
          const z = k / s, W = z * l + o, j = Math.sin(W), V = Math.cos(W);
          N.x = C * j, N.y = -M * n + p, N.z = C * V, f.push(N.x, N.y, N.z), S.set(j, A, V).normalize(), d.push(S.x, S.y, S.z), m.push(z, 1 - M), y.push(g++);
        }
        v.push(y);
      }
      for (let U = 0; U < s; U++) for (let y = 0; y < r; y++) {
        const M = v[y][U], C = v[y + 1][U], k = v[y + 1][U + 1], z = v[y][U + 1];
        (t > 0 || y !== 0) && (h.push(M, C, z), w += 3), (e > 0 || y !== r - 1) && (h.push(C, k, z), w += 3);
      }
      c.addGroup(u, w, 0), u += w;
    }
    function b(S) {
      const N = g, w = new At(), A = new P();
      let U = 0;
      const y = S === true ? t : e, M = S === true ? 1 : -1;
      for (let k = 1; k <= s; k++) f.push(0, p * M, 0), d.push(0, M, 0), m.push(0.5, 0.5), g++;
      const C = g;
      for (let k = 0; k <= s; k++) {
        const W = k / s * l + o, j = Math.cos(W), V = Math.sin(W);
        A.x = y * V, A.y = p * M, A.z = y * j, f.push(A.x, A.y, A.z), d.push(0, M, 0), w.x = j * 0.5 + 0.5, w.y = V * 0.5 * M + 0.5, m.push(w.x, w.y), g++;
      }
      for (let k = 0; k < s; k++) {
        const z = N + k, W = C + k;
        S === true ? h.push(W, W + 1, z) : h.push(W + 1, W, z), U += 3;
      }
      c.addGroup(u, U, S === true ? 1 : 2), u += U;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new ga(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
  }
}
const fs = new P(), ps = new P(), cr = new P(), ms = new Ie();
class Jp extends Ge {
  constructor(t = null, e = 1) {
    if (super(), this.type = "EdgesGeometry", this.parameters = { geometry: t, thresholdAngle: e }, t !== null) {
      const s = Math.pow(10, 4), r = Math.cos(Ui * e), a = t.getIndex(), o = t.getAttribute("position"), l = a ? a.count : o.count, c = [0, 0, 0], h = ["a", "b", "c"], f = new Array(3), d = {}, m = [];
      for (let g = 0; g < l; g += 3) {
        a ? (c[0] = a.getX(g), c[1] = a.getX(g + 1), c[2] = a.getX(g + 2)) : (c[0] = g, c[1] = g + 1, c[2] = g + 2);
        const { a: v, b: p, c: u } = ms;
        if (v.fromBufferAttribute(o, c[0]), p.fromBufferAttribute(o, c[1]), u.fromBufferAttribute(o, c[2]), ms.getNormal(cr), f[0] = `${Math.round(v.x * s)},${Math.round(v.y * s)},${Math.round(v.z * s)}`, f[1] = `${Math.round(p.x * s)},${Math.round(p.y * s)},${Math.round(p.z * s)}`, f[2] = `${Math.round(u.x * s)},${Math.round(u.y * s)},${Math.round(u.z * s)}`, !(f[0] === f[1] || f[1] === f[2] || f[2] === f[0])) for (let T = 0; T < 3; T++) {
          const b = (T + 1) % 3, S = f[T], N = f[b], w = ms[h[T]], A = ms[h[b]], U = `${S}_${N}`, y = `${N}_${S}`;
          y in d && d[y] ? (cr.dot(d[y].normal) <= r && (m.push(w.x, w.y, w.z), m.push(A.x, A.y, A.z)), d[y] = null) : U in d || (d[U] = { index0: c[T], index1: c[b], normal: cr.clone() });
        }
      }
      for (const g in d) if (d[g]) {
        const { index0: v, index1: p } = d[g];
        fs.fromBufferAttribute(o, v), ps.fromBufferAttribute(o, p), m.push(fs.x, fs.y, fs.z), m.push(ps.x, ps.y, ps.z);
      }
      this.setAttribute("position", new pe(m, 3));
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
}
class _a extends Ge {
  constructor(t = 1, e = 32, n = 16, s = 0, r = Math.PI * 2, a = 0, o = Math.PI) {
    super(), this.type = "SphereGeometry", this.parameters = { radius: t, widthSegments: e, heightSegments: n, phiStart: s, phiLength: r, thetaStart: a, thetaLength: o }, e = Math.max(3, Math.floor(e)), n = Math.max(2, Math.floor(n));
    const l = Math.min(a + o, Math.PI);
    let c = 0;
    const h = [], f = new P(), d = new P(), m = [], g = [], v = [], p = [];
    for (let u = 0; u <= n; u++) {
      const T = [], b = u / n;
      let S = 0;
      u === 0 && a === 0 ? S = 0.5 / e : u === n && l === Math.PI && (S = -0.5 / e);
      for (let N = 0; N <= e; N++) {
        const w = N / e;
        f.x = -t * Math.cos(s + w * r) * Math.sin(a + b * o), f.y = t * Math.cos(a + b * o), f.z = t * Math.sin(s + w * r) * Math.sin(a + b * o), g.push(f.x, f.y, f.z), d.copy(f).normalize(), v.push(d.x, d.y, d.z), p.push(w + S, 1 - b), T.push(c++);
      }
      h.push(T);
    }
    for (let u = 0; u < n; u++) for (let T = 0; T < e; T++) {
      const b = h[u][T + 1], S = h[u][T], N = h[u + 1][T], w = h[u + 1][T + 1];
      (u !== 0 || a > 0) && m.push(b, S, w), (u !== n - 1 || l < Math.PI) && m.push(S, N, w);
    }
    this.setIndex(m), this.setAttribute("position", new pe(g, 3)), this.setAttribute("normal", new pe(v, 3)), this.setAttribute("uv", new pe(p, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new _a(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
  }
}
class Qp extends _i {
  static get type() {
    return "MeshStandardMaterial";
  }
  constructor(t) {
    super(), this.isMeshStandardMaterial = true, this.defines = { STANDARD: "" }, this.color = new Nt(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Nt(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = ol, this.normalScale = new At(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new $e(), this.envMapIntensity = 1, this.wireframe = false, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = false, this.fog = true, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.defines = { STANDARD: "" }, this.color.copy(t.color), this.roughness = t.roughness, this.metalness = t.metalness, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.roughnessMap = t.roughnessMap, this.metalnessMap = t.metalnessMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.envMapIntensity = t.envMapIntensity, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this.fog = t.fog, this;
  }
}
class va extends he {
  constructor(t, e = 1) {
    super(), this.isLight = true, this.type = "Light", this.color = new Nt(t), this.intensity = e;
  }
  dispose() {
  }
  copy(t, e) {
    return super.copy(t, e), this.color.copy(t.color), this.intensity = t.intensity, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.color = this.color.getHex(), e.object.intensity = this.intensity, this.groundColor !== void 0 && (e.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (e.object.distance = this.distance), this.angle !== void 0 && (e.object.angle = this.angle), this.decay !== void 0 && (e.object.decay = this.decay), this.penumbra !== void 0 && (e.object.penumbra = this.penumbra), this.shadow !== void 0 && (e.object.shadow = this.shadow.toJSON()), this.target !== void 0 && (e.object.target = this.target.uuid), e;
  }
}
const hr = new Yt(), zo = new P(), ko = new P();
class wl {
  constructor(t) {
    this.camera = t, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new At(512, 512), this.map = null, this.mapPass = null, this.matrix = new Yt(), this.autoUpdate = true, this.needsUpdate = false, this._frustum = new fa(), this._frameExtents = new At(1, 1), this._viewportCount = 1, this._viewports = [new jt(0, 0, 1, 1)];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(t) {
    const e = this.camera, n = this.matrix;
    zo.setFromMatrixPosition(t.matrixWorld), e.position.copy(zo), ko.setFromMatrixPosition(t.target.matrixWorld), e.lookAt(ko), e.updateMatrixWorld(), hr.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), this._frustum.setFromProjectionMatrix(hr), n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1), n.multiply(hr);
  }
  getViewport(t) {
    return this._viewports[t];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(t) {
    return this.camera = t.camera.clone(), this.intensity = t.intensity, this.bias = t.bias, this.radius = t.radius, this.mapSize.copy(t.mapSize), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const t = {};
    return this.intensity !== 1 && (t.intensity = this.intensity), this.bias !== 0 && (t.bias = this.bias), this.normalBias !== 0 && (t.normalBias = this.normalBias), this.radius !== 1 && (t.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (t.mapSize = this.mapSize.toArray()), t.camera = this.camera.toJSON(false).object, delete t.camera.matrix, t;
  }
}
const Ho = new Yt(), Ri = new P(), ur = new P();
class tm extends wl {
  constructor() {
    super(new we(90, 1, 0.5, 500)), this.isPointLightShadow = true, this._frameExtents = new At(4, 2), this._viewportCount = 6, this._viewports = [new jt(2, 1, 1, 1), new jt(0, 1, 1, 1), new jt(3, 1, 1, 1), new jt(1, 1, 1, 1), new jt(3, 0, 1, 1), new jt(1, 0, 1, 1)], this._cubeDirections = [new P(1, 0, 0), new P(-1, 0, 0), new P(0, 0, 1), new P(0, 0, -1), new P(0, 1, 0), new P(0, -1, 0)], this._cubeUps = [new P(0, 1, 0), new P(0, 1, 0), new P(0, 1, 0), new P(0, 1, 0), new P(0, 0, 1), new P(0, 0, -1)];
  }
  updateMatrices(t, e = 0) {
    const n = this.camera, s = this.matrix, r = t.distance || n.far;
    r !== n.far && (n.far = r, n.updateProjectionMatrix()), Ri.setFromMatrixPosition(t.matrixWorld), n.position.copy(Ri), ur.copy(n.position), ur.add(this._cubeDirections[e]), n.up.copy(this._cubeUps[e]), n.lookAt(ur), n.updateMatrixWorld(), s.makeTranslation(-Ri.x, -Ri.y, -Ri.z), Ho.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Ho);
  }
}
class em extends va {
  constructor(t, e, n = 0, s = 2) {
    super(t, e), this.isPointLight = true, this.type = "PointLight", this.distance = n, this.decay = s, this.shadow = new tm();
  }
  get power() {
    return this.intensity * 4 * Math.PI;
  }
  set power(t) {
    this.intensity = t / (4 * Math.PI);
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t, e) {
    return super.copy(t, e), this.distance = t.distance, this.decay = t.decay, this.shadow = t.shadow.clone(), this;
  }
}
class nm extends wl {
  constructor() {
    super(new Ml(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = true;
  }
}
class im extends va {
  constructor(t, e) {
    super(t, e), this.isDirectionalLight = true, this.type = "DirectionalLight", this.position.copy(he.DEFAULT_UP), this.updateMatrix(), this.target = new he(), this.shadow = new nm();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t) {
    return super.copy(t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), this;
  }
}
class sm extends va {
  constructor(t, e) {
    super(t, e), this.isAmbientLight = true, this.type = "AmbientLight";
  }
}
class Go {
  constructor(t = 1, e = 0, n = 0) {
    return this.radius = t, this.phi = e, this.theta = n, this;
  }
  set(t, e, n) {
    return this.radius = t, this.phi = e, this.theta = n, this;
  }
  copy(t) {
    return this.radius = t.radius, this.phi = t.phi, this.theta = t.theta, this;
  }
  makeSafe() {
    return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)), this;
  }
  setFromVector3(t) {
    return this.setFromCartesianCoords(t.x, t.y, t.z);
  }
  setFromCartesianCoords(t, e, n) {
    return this.radius = Math.sqrt(t * t + e * e + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(t, n), this.phi = Math.acos(ge(e / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class rm extends Bn {
  constructor(t, e = null) {
    super(), this.object = t, this.domElement = e, this.enabled = true, this.state = -1, this.keys = {}, this.mouseButtons = { LEFT: null, MIDDLE: null, RIGHT: null }, this.touches = { ONE: null, TWO: null };
  }
  connect() {
  }
  disconnect() {
  }
  dispose() {
  }
  update() {
  }
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: ia } }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = ia);
const Vo = { type: "change" }, xa = { type: "start" }, Cl = { type: "end" }, gs = new ua(), Wo = new gn(), am = Math.cos(70 * Dc.DEG2RAD), ae = new P(), Se = 2 * Math.PI, $t = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_PAN: 4, TOUCH_DOLLY_PAN: 5, TOUCH_DOLLY_ROTATE: 6 }, dr = 1e-6;
class om extends rm {
  constructor(t, e = null) {
    super(t, e), this.state = $t.NONE, this.enabled = true, this.target = new P(), this.cursor = new P(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = false, this.dampingFactor = 0.05, this.enableZoom = true, this.zoomSpeed = 1, this.enableRotate = true, this.rotateSpeed = 1, this.enablePan = true, this.panSpeed = 1, this.screenSpacePanning = true, this.keyPanSpeed = 7, this.zoomToCursor = false, this.autoRotate = false, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: ri.ROTATE, MIDDLE: ri.DOLLY, RIGHT: ri.PAN }, this.touches = { ONE: ii.ROTATE, TWO: ii.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new P(), this._lastQuaternion = new Fn(), this._lastTargetPosition = new P(), this._quat = new Fn().setFromUnitVectors(t.up, new P(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Go(), this._sphericalDelta = new Go(), this._scale = 1, this._panOffset = new P(), this._rotateStart = new At(), this._rotateEnd = new At(), this._rotateDelta = new At(), this._panStart = new At(), this._panEnd = new At(), this._panDelta = new At(), this._dollyStart = new At(), this._dollyEnd = new At(), this._dollyDelta = new At(), this._dollyDirection = new P(), this._mouse = new At(), this._performCursorZoom = false, this._pointers = [], this._pointerPositions = {}, this._controlActive = false, this._onPointerMove = cm.bind(this), this._onPointerDown = lm.bind(this), this._onPointerUp = hm.bind(this), this._onContextMenu = _m.bind(this), this._onMouseWheel = fm.bind(this), this._onKeyDown = pm.bind(this), this._onTouchStart = mm.bind(this), this._onTouchMove = gm.bind(this), this._onMouseDown = um.bind(this), this._onMouseMove = dm.bind(this), this._interceptControlDown = vm.bind(this), this._interceptControlUp = xm.bind(this), this.domElement !== null && this.connect(), this.update();
  }
  connect() {
    this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: false }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, { passive: true, capture: true }), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: true }), this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  getPolarAngle() {
    return this._spherical.phi;
  }
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  listenToKeyEvents(t) {
    t.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = t;
  }
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Vo), this.update(), this.state = $t.NONE;
  }
  update(t = null) {
    const e = this.object.position;
    ae.copy(e).sub(this.target), ae.applyQuaternion(this._quat), this._spherical.setFromVector3(ae), this.autoRotate && this.state === $t.NONE && this._rotateLeft(this._getAutoRotationAngle(t)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let n = this.minAzimuthAngle, s = this.maxAzimuthAngle;
    isFinite(n) && isFinite(s) && (n < -Math.PI ? n += Se : n > Math.PI && (n -= Se), s < -Math.PI ? s += Se : s > Math.PI && (s -= Se), n <= s ? this._spherical.theta = Math.max(n, Math.min(s, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + s) / 2 ? Math.max(n, this._spherical.theta) : Math.min(s, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === true ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let r = false;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const a = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), r = a != this._spherical.radius;
    }
    if (ae.setFromSpherical(this._spherical), ae.applyQuaternion(this._quatInverse), e.copy(this.target).add(ae), this.object.lookAt(this.target), this.enableDamping === true ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let a = null;
      if (this.object.isPerspectiveCamera) {
        const o = ae.length();
        a = this._clampDistance(o * this._scale);
        const l = o - a;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), r = !!l;
      } else if (this.object.isOrthographicCamera) {
        const o = new P(this._mouse.x, this._mouse.y, 0);
        o.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), r = l !== this.object.zoom;
        const c = new P(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object), this.object.position.sub(c).add(o), this.object.updateMatrixWorld(), a = ae.length();
      } else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = false;
      a !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position) : (gs.origin.copy(this.object.position), gs.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(gs.direction)) < am ? this.object.lookAt(this.target) : (Wo.setFromNormalAndCoplanarPoint(this.object.up, this.target), gs.intersectPlane(Wo, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const a = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), a !== this.object.zoom && (this.object.updateProjectionMatrix(), r = true);
    }
    return this._scale = 1, this._performCursorZoom = false, r || this._lastPosition.distanceToSquared(this.object.position) > dr || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > dr || this._lastTargetPosition.distanceToSquared(this.target) > dr ? (this.dispatchEvent(Vo), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), true) : false;
  }
  _getAutoRotationAngle(t) {
    return t !== null ? Se / 60 * this.autoRotateSpeed * t : Se / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(t) {
    const e = Math.abs(t * 0.01);
    return Math.pow(0.95, this.zoomSpeed * e);
  }
  _rotateLeft(t) {
    this._sphericalDelta.theta -= t;
  }
  _rotateUp(t) {
    this._sphericalDelta.phi -= t;
  }
  _panLeft(t, e) {
    ae.setFromMatrixColumn(e, 0), ae.multiplyScalar(-t), this._panOffset.add(ae);
  }
  _panUp(t, e) {
    this.screenSpacePanning === true ? ae.setFromMatrixColumn(e, 1) : (ae.setFromMatrixColumn(e, 0), ae.crossVectors(this.object.up, ae)), ae.multiplyScalar(t), this._panOffset.add(ae);
  }
  _pan(t, e) {
    const n = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const s = this.object.position;
      ae.copy(s).sub(this.target);
      let r = ae.length();
      r *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * t * r / n.clientHeight, this.object.matrix), this._panUp(2 * e * r / n.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(t * (this.object.right - this.object.left) / this.object.zoom / n.clientWidth, this.object.matrix), this._panUp(e * (this.object.top - this.object.bottom) / this.object.zoom / n.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = false);
  }
  _dollyOut(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = false);
  }
  _dollyIn(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = false);
  }
  _updateZoomParameters(t, e) {
    if (!this.zoomToCursor) return;
    this._performCursorZoom = true;
    const n = this.domElement.getBoundingClientRect(), s = t - n.left, r = e - n.top, a = n.width, o = n.height;
    this._mouse.x = s / a * 2 - 1, this._mouse.y = -(r / o) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(t) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, t));
  }
  _handleMouseDownRotate(t) {
    this._rotateStart.set(t.clientX, t.clientY);
  }
  _handleMouseDownDolly(t) {
    this._updateZoomParameters(t.clientX, t.clientX), this._dollyStart.set(t.clientX, t.clientY);
  }
  _handleMouseDownPan(t) {
    this._panStart.set(t.clientX, t.clientY);
  }
  _handleMouseMoveRotate(t) {
    this._rotateEnd.set(t.clientX, t.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const e = this.domElement;
    this._rotateLeft(Se * this._rotateDelta.x / e.clientHeight), this._rotateUp(Se * this._rotateDelta.y / e.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(t) {
    this._dollyEnd.set(t.clientX, t.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(t) {
    this._panEnd.set(t.clientX, t.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(t) {
    this._updateZoomParameters(t.clientX, t.clientY), t.deltaY < 0 ? this._dollyIn(this._getZoomScale(t.deltaY)) : t.deltaY > 0 && this._dollyOut(this._getZoomScale(t.deltaY)), this.update();
  }
  _handleKeyDown(t) {
    let e = false;
    switch (t.code) {
      case this.keys.UP:
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateUp(Se * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, this.keyPanSpeed), e = true;
        break;
      case this.keys.BOTTOM:
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateUp(-Se * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, -this.keyPanSpeed), e = true;
        break;
      case this.keys.LEFT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateLeft(Se * this.rotateSpeed / this.domElement.clientHeight) : this._pan(this.keyPanSpeed, 0), e = true;
        break;
      case this.keys.RIGHT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateLeft(-Se * this.rotateSpeed / this.domElement.clientHeight) : this._pan(-this.keyPanSpeed, 0), e = true;
        break;
    }
    e && (t.preventDefault(), this.update());
  }
  _handleTouchStartRotate(t) {
    if (this._pointers.length === 1) this._rotateStart.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t), n = 0.5 * (t.pageX + e.x), s = 0.5 * (t.pageY + e.y);
      this._rotateStart.set(n, s);
    }
  }
  _handleTouchStartPan(t) {
    if (this._pointers.length === 1) this._panStart.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t), n = 0.5 * (t.pageX + e.x), s = 0.5 * (t.pageY + e.y);
      this._panStart.set(n, s);
    }
  }
  _handleTouchStartDolly(t) {
    const e = this._getSecondPointerPosition(t), n = t.pageX - e.x, s = t.pageY - e.y, r = Math.sqrt(n * n + s * s);
    this._dollyStart.set(0, r);
  }
  _handleTouchStartDollyPan(t) {
    this.enableZoom && this._handleTouchStartDolly(t), this.enablePan && this._handleTouchStartPan(t);
  }
  _handleTouchStartDollyRotate(t) {
    this.enableZoom && this._handleTouchStartDolly(t), this.enableRotate && this._handleTouchStartRotate(t);
  }
  _handleTouchMoveRotate(t) {
    if (this._pointers.length == 1) this._rotateEnd.set(t.pageX, t.pageY);
    else {
      const n = this._getSecondPointerPosition(t), s = 0.5 * (t.pageX + n.x), r = 0.5 * (t.pageY + n.y);
      this._rotateEnd.set(s, r);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const e = this.domElement;
    this._rotateLeft(Se * this._rotateDelta.x / e.clientHeight), this._rotateUp(Se * this._rotateDelta.y / e.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(t) {
    if (this._pointers.length === 1) this._panEnd.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t), n = 0.5 * (t.pageX + e.x), s = 0.5 * (t.pageY + e.y);
      this._panEnd.set(n, s);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(t) {
    const e = this._getSecondPointerPosition(t), n = t.pageX - e.x, s = t.pageY - e.y, r = Math.sqrt(n * n + s * s);
    this._dollyEnd.set(0, r), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const a = (t.pageX + e.x) * 0.5, o = (t.pageY + e.y) * 0.5;
    this._updateZoomParameters(a, o);
  }
  _handleTouchMoveDollyPan(t) {
    this.enableZoom && this._handleTouchMoveDolly(t), this.enablePan && this._handleTouchMovePan(t);
  }
  _handleTouchMoveDollyRotate(t) {
    this.enableZoom && this._handleTouchMoveDolly(t), this.enableRotate && this._handleTouchMoveRotate(t);
  }
  _addPointer(t) {
    this._pointers.push(t.pointerId);
  }
  _removePointer(t) {
    delete this._pointerPositions[t.pointerId];
    for (let e = 0; e < this._pointers.length; e++) if (this._pointers[e] == t.pointerId) {
      this._pointers.splice(e, 1);
      return;
    }
  }
  _isTrackingPointer(t) {
    for (let e = 0; e < this._pointers.length; e++) if (this._pointers[e] == t.pointerId) return true;
    return false;
  }
  _trackPointer(t) {
    let e = this._pointerPositions[t.pointerId];
    e === void 0 && (e = new At(), this._pointerPositions[t.pointerId] = e), e.set(t.pageX, t.pageY);
  }
  _getSecondPointerPosition(t) {
    const e = t.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[e];
  }
  _customWheelEvent(t) {
    const e = t.deltaMode, n = { clientX: t.clientX, clientY: t.clientY, deltaY: t.deltaY };
    switch (e) {
      case 1:
        n.deltaY *= 16;
        break;
      case 2:
        n.deltaY *= 100;
        break;
    }
    return t.ctrlKey && !this._controlActive && (n.deltaY *= 10), n;
  }
}
function lm(i) {
  this.enabled !== false && (this._pointers.length === 0 && (this.domElement.setPointerCapture(i.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(i) && (this._addPointer(i), i.pointerType === "touch" ? this._onTouchStart(i) : this._onMouseDown(i)));
}
function cm(i) {
  this.enabled !== false && (i.pointerType === "touch" ? this._onTouchMove(i) : this._onMouseMove(i));
}
function hm(i) {
  switch (this._removePointer(i), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(i.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Cl), this.state = $t.NONE;
      break;
    case 1:
      const t = this._pointers[0], e = this._pointerPositions[t];
      this._onTouchStart({ pointerId: t, pageX: e.x, pageY: e.y });
      break;
  }
}
function um(i) {
  let t;
  switch (i.button) {
    case 0:
      t = this.mouseButtons.LEFT;
      break;
    case 1:
      t = this.mouseButtons.MIDDLE;
      break;
    case 2:
      t = this.mouseButtons.RIGHT;
      break;
    default:
      t = -1;
  }
  switch (t) {
    case ri.DOLLY:
      if (this.enableZoom === false) return;
      this._handleMouseDownDolly(i), this.state = $t.DOLLY;
      break;
    case ri.ROTATE:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enablePan === false) return;
        this._handleMouseDownPan(i), this.state = $t.PAN;
      } else {
        if (this.enableRotate === false) return;
        this._handleMouseDownRotate(i), this.state = $t.ROTATE;
      }
      break;
    case ri.PAN:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enableRotate === false) return;
        this._handleMouseDownRotate(i), this.state = $t.ROTATE;
      } else {
        if (this.enablePan === false) return;
        this._handleMouseDownPan(i), this.state = $t.PAN;
      }
      break;
    default:
      this.state = $t.NONE;
  }
  this.state !== $t.NONE && this.dispatchEvent(xa);
}
function dm(i) {
  switch (this.state) {
    case $t.ROTATE:
      if (this.enableRotate === false) return;
      this._handleMouseMoveRotate(i);
      break;
    case $t.DOLLY:
      if (this.enableZoom === false) return;
      this._handleMouseMoveDolly(i);
      break;
    case $t.PAN:
      if (this.enablePan === false) return;
      this._handleMouseMovePan(i);
      break;
  }
}
function fm(i) {
  this.enabled === false || this.enableZoom === false || this.state !== $t.NONE || (i.preventDefault(), this.dispatchEvent(xa), this._handleMouseWheel(this._customWheelEvent(i)), this.dispatchEvent(Cl));
}
function pm(i) {
  this.enabled === false || this.enablePan === false || this._handleKeyDown(i);
}
function mm(i) {
  switch (this._trackPointer(i), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case ii.ROTATE:
          if (this.enableRotate === false) return;
          this._handleTouchStartRotate(i), this.state = $t.TOUCH_ROTATE;
          break;
        case ii.PAN:
          if (this.enablePan === false) return;
          this._handleTouchStartPan(i), this.state = $t.TOUCH_PAN;
          break;
        default:
          this.state = $t.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case ii.DOLLY_PAN:
          if (this.enableZoom === false && this.enablePan === false) return;
          this._handleTouchStartDollyPan(i), this.state = $t.TOUCH_DOLLY_PAN;
          break;
        case ii.DOLLY_ROTATE:
          if (this.enableZoom === false && this.enableRotate === false) return;
          this._handleTouchStartDollyRotate(i), this.state = $t.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = $t.NONE;
      }
      break;
    default:
      this.state = $t.NONE;
  }
  this.state !== $t.NONE && this.dispatchEvent(xa);
}
function gm(i) {
  switch (this._trackPointer(i), this.state) {
    case $t.TOUCH_ROTATE:
      if (this.enableRotate === false) return;
      this._handleTouchMoveRotate(i), this.update();
      break;
    case $t.TOUCH_PAN:
      if (this.enablePan === false) return;
      this._handleTouchMovePan(i), this.update();
      break;
    case $t.TOUCH_DOLLY_PAN:
      if (this.enableZoom === false && this.enablePan === false) return;
      this._handleTouchMoveDollyPan(i), this.update();
      break;
    case $t.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === false && this.enableRotate === false) return;
      this._handleTouchMoveDollyRotate(i), this.update();
      break;
    default:
      this.state = $t.NONE;
  }
}
function _m(i) {
  this.enabled !== false && i.preventDefault();
}
function vm(i) {
  i.key === "Control" && (this._controlActive = true, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: true, capture: true }));
}
function xm(i) {
  i.key === "Control" && (this._controlActive = false, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: true, capture: true }));
}
class Mm {
  constructor(t) {
    __publicField(this, "scene");
    __publicField(this, "camera");
    __publicField(this, "renderer");
    __publicField(this, "controls");
    __publicField(this, "container");
    __publicField(this, "instances", null);
    __publicField(this, "animFrameId", 0);
    __publicField(this, "currentCount", 0);
    __publicField(this, "targetCount", 0);
    __publicField(this, "positions", []);
    __publicField(this, "pourRate", 200);
    __publicField(this, "lastTime", 0);
    __publicField(this, "result", null);
    __publicField(this, "onResize", () => {
      const t = this.container.clientWidth, e = this.container.clientHeight;
      this.camera.aspect = t / e, this.camera.updateProjectionMatrix(), this.renderer.setSize(t, e);
    });
    __publicField(this, "animate", () => {
      this.animFrameId = requestAnimationFrame(this.animate);
      const t = performance.now(), e = (t - this.lastTime) / 1e3;
      if (this.lastTime = t, this.instances && this.currentCount < this.targetCount) {
        const n = Math.ceil(this.pourRate * e), s = Math.min(this.currentCount + n, this.targetCount);
        for (let r = this.currentCount; r < s; r++) this.positions[r] && this.instances.setMatrixAt(r, this.positions[r]);
        this.currentCount = s, this.instances.count = this.currentCount, this.instances.instanceMatrix.needsUpdate = true;
      }
      this.controls.update(), this.renderer.render(this.scene, this.camera);
    });
    this.container = t, this.scene = new Yp(), this.scene.background = new Nt(724247), this.scene.fog = new ma(724247, 0.015);
    const e = t.clientWidth, n = t.clientHeight;
    this.camera = new we(50, e / n, 0.01, 1e3), this.camera.position.set(3, 2.5, 4), this.renderer = new Xp({ antialias: true, alpha: true }), this.renderer.setSize(e, n), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.toneMapping = Zo, t.appendChild(this.renderer.domElement), this.controls = new om(this.camera, this.renderer.domElement), this.controls.enableDamping = true, this.controls.dampingFactor = 0.05, this.controls.autoRotate = true, this.controls.autoRotateSpeed = 0.5;
    const s = new sm(16777215, 0.4);
    this.scene.add(s);
    const r = new im(16777215, 0.8);
    r.position.set(5, 10, 5), this.scene.add(r);
    const a = new em(58879, 0.5, 20);
    a.position.set(-3, 5, -3), this.scene.add(a), window.addEventListener("resize", this.onResize);
  }
  createContainer(t) {
    const [e, n, s] = t.large.dimensions, a = 3 / Math.max(e, n, s), o = e * a, l = n * a, c = s * a, h = new On(o, l, c), f = new Ue(h, new da({ color: 58879, wireframe: true, transparent: true, opacity: 0.15 }));
    f.position.set(0, l / 2, 0), this.scene.add(f);
    const d = new Jp(h), m = new Kp(d, new Al({ color: 58879, transparent: true, opacity: 0.4 }));
    return m.position.copy(f.position), this.scene.add(m), { sw: o, sh: l, sd: c, scale: a };
  }
  generatePositions(t, e) {
    const { sw: n, sh: s, sd: r, scale: a } = e, [o, l, c] = t.small.dimensions.map((d) => d * a), h = [], f = Math.min(t.count, 5e3);
    if (t.small.shape === "sphere") {
      const d = Math.max(o, l, c) / 2, m = d * 2.05, g = Math.floor(n / m), v = Math.floor(s / m), p = Math.floor(r / m), u = -(g * m) / 2 + d, T = -(p * m) / 2 + d;
      for (let b = 0; b < v && h.length < f; b++) for (let S = 0; S < g && h.length < f; S++) for (let N = 0; N < p && h.length < f; N++) {
        const w = b % 2 * m * 0.5, A = new Yt();
        A.setPosition(u + S * m + w, d + b * m, T + N * m), h.push(A);
      }
    } else {
      const d = o * 1.02, m = l * 1.02, g = c * 1.02, v = Math.max(1, Math.floor(n / d)), p = Math.max(1, Math.floor(s / m)), u = Math.max(1, Math.floor(r / g)), T = -(v * d) / 2 + d / 2, b = -(u * g) / 2 + g / 2;
      for (let S = 0; S < p && h.length < f; S++) for (let N = 0; N < v && h.length < f; N++) for (let w = 0; w < u && h.length < f; w++) {
        const A = new Yt();
        A.setPosition(T + N * d, m / 2 + S * m, b + w * g), h.push(A);
      }
    }
    return h;
  }
  createInstances(t, e, n) {
    const [s, r, a] = t.small.dimensions.map((d) => d * n);
    let o;
    if (t.small.shape === "sphere") {
      const d = Math.max(s, r, a) / 2;
      o = new _a(d, 12, 8);
    } else t.small.shape === "cylinder" ? o = new ga(Math.max(s, a) / 2, Math.max(s, a) / 2, r, 12) : o = new On(s, r, a);
    const l = new Nt(t.small.color), c = new Qp({ color: l, roughness: 0.3, metalness: 0.1 }), h = new jp(o, c, e);
    if (h.count = 0, t.small.id === "mm_candy" || t.small.id === "lego_brick") {
      const d = [15022389, 2001125, 4431943, 16635957, 16748288, 9315498];
      for (let m = 0; m < e; m++) {
        const g = new Nt(d[m % d.length]);
        h.setColorAt(m, g);
      }
      h.instanceColor && (h.instanceColor.needsUpdate = true);
    }
    return this.scene.add(h), h;
  }
  start(t) {
    this.result = t, this.targetCount = Math.min(t.count, 5e3), this.currentCount = 0;
    const e = this.createContainer(t);
    this.positions = this.generatePositions(t, e), this.targetCount = Math.min(this.targetCount, this.positions.length), this.instances = this.createInstances(t, this.positions.length, e.scale), this.camera.position.set(e.sw * 1.5, e.sh * 1.2, e.sd * 1.5), this.camera.lookAt(0, e.sh / 2, 0), this.controls.target.set(0, e.sh / 2, 0), this.lastTime = performance.now(), this.pourRate = Math.max(50, Math.min(500, this.targetCount / 8)), this.animate();
  }
  destroy() {
    cancelAnimationFrame(this.animFrameId), window.removeEventListener("resize", this.onResize), this.controls.dispose(), this.renderer.dispose(), this.scene.clear(), this.renderer.domElement.parentElement && this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
  }
  getProgress() {
    return this.targetCount === 0 ? 1 : this.currentCount / this.targetCount;
  }
}
class Sm {
  constructor(t) {
    __publicField(this, "canvas");
    __publicField(this, "ctx");
    __publicField(this, "container");
    __publicField(this, "animFrameId", 0);
    __publicField(this, "currentCount", 0);
    __publicField(this, "targetCount", 0);
    __publicField(this, "fillRate", 2e3);
    __publicField(this, "lastTime", 0);
    __publicField(this, "result", null);
    __publicField(this, "cols", 0);
    __publicField(this, "rows", 0);
    __publicField(this, "cellSize", 0);
    __publicField(this, "offsetX", 0);
    __publicField(this, "offsetY", 0);
    __publicField(this, "color", "#ffffff");
    __publicField(this, "isSphere", false);
    __publicField(this, "isRainbow", false);
    __publicField(this, "rainbowColors", ["#e53935", "#1e88e5", "#43a047", "#fdd835", "#ff8f00", "#8e24aa"]);
    __publicField(this, "onResize", () => {
      this.result && (this.layoutGrid(), this.redraw());
    });
    __publicField(this, "animate", () => {
      this.animFrameId = requestAnimationFrame(this.animate);
      const t = performance.now(), e = (t - this.lastTime) / 1e3;
      if (this.lastTime = t, this.currentCount < this.targetCount) {
        const n = Math.ceil(this.fillRate * e);
        this.currentCount = Math.min(this.currentCount + n, this.targetCount), this.redraw();
      }
    });
    this.container = t, this.canvas = document.createElement("canvas"), this.canvas.className = "vis2d-canvas", t.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d"), window.addEventListener("resize", this.onResize);
  }
  layoutGrid() {
    const t = this.container.clientWidth, e = this.container.clientHeight;
    this.canvas.width = t * devicePixelRatio, this.canvas.height = e * devicePixelRatio, this.canvas.style.width = t + "px", this.canvas.style.height = e + "px", this.ctx.scale(devicePixelRatio, devicePixelRatio);
    const n = this.targetCount, s = t / e;
    this.cols = Math.ceil(Math.sqrt(n * s)), this.rows = Math.ceil(n / this.cols), this.cellSize = Math.min(t / this.cols, e / this.rows), this.cellSize = Math.max(1, Math.min(this.cellSize, 20)), this.cols = Math.floor(t / this.cellSize), this.rows = Math.ceil(this.targetCount / this.cols), this.offsetX = (t - this.cols * this.cellSize) / 2, this.offsetY = Math.max(0, (e - this.rows * this.cellSize) / 2);
  }
  redraw() {
    const t = this.container.clientWidth, e = this.container.clientHeight;
    this.ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0), this.ctx.fillStyle = "#0b0d17", this.ctx.fillRect(0, 0, t, e);
    const n = this.cellSize * 0.1, s = (this.cellSize - n) / 2;
    for (let r = 0; r < this.currentCount; r++) {
      const a = r % this.cols, o = Math.floor(r / this.cols), l = this.offsetX + a * this.cellSize + this.cellSize / 2, c = this.offsetY + o * this.cellSize + this.cellSize / 2;
      this.isRainbow ? this.ctx.fillStyle = this.rainbowColors[r % this.rainbowColors.length] : this.ctx.fillStyle = this.color, this.isSphere ? (this.ctx.beginPath(), this.ctx.arc(l, c, s, 0, Math.PI * 2), this.ctx.fill()) : this.ctx.fillRect(l - s, c - s, s * 2, s * 2);
    }
  }
  start(t) {
    this.result = t, this.targetCount = Math.min(t.count, 5e5), this.currentCount = 0, this.color = t.small.color, this.isSphere = t.small.shape === "sphere", this.isRainbow = t.small.id === "mm_candy" || t.small.id === "lego_brick", this.layoutGrid(), this.fillRate = Math.max(500, this.targetCount / 5), this.lastTime = performance.now(), this.animate();
  }
  destroy() {
    cancelAnimationFrame(this.animFrameId), window.removeEventListener("resize", this.onResize), this.canvas.parentElement && this.canvas.parentElement.removeChild(this.canvas);
  }
  getProgress() {
    return this.targetCount === 0 ? 1 : this.currentCount / this.targetCount;
  }
}
class ym {
  constructor(t) {
    __publicField(this, "container");
    __publicField(this, "animFrameId", 0);
    __publicField(this, "fillEl", null);
    __publicField(this, "startTime", 0);
    __publicField(this, "duration", 4e3);
    __publicField(this, "animate", () => {
      this.animFrameId = requestAnimationFrame(this.animate);
      const t = performance.now() - this.startTime, e = Math.min(t / this.duration, 1), n = 1 - Math.pow(1 - e, 3);
      this.fillEl && (this.fillEl.style.height = `${n * 100}%`);
    });
    this.container = t;
  }
  start(t) {
    this.container.innerHTML = "";
    const e = document.createElement("div");
    e.className = "vis-counter-wrap";
    const n = document.createElement("div");
    n.className = "vis-counter-silhouette";
    const s = document.createElement("div");
    s.className = "vis-counter-icon", s.textContent = t.large.icon, n.appendChild(s);
    const r = document.createElement("div");
    r.className = "vis-counter-fill", r.style.backgroundColor = t.small.color, r.style.height = "0%", n.appendChild(r), this.fillEl = r;
    const a = document.createElement("div");
    a.className = "vis-counter-label", a.textContent = t.large.name, n.appendChild(a), e.appendChild(n), this.container.appendChild(e), this.startTime = performance.now(), this.animate();
  }
  destroy() {
    cancelAnimationFrame(this.animFrameId), this.container.innerHTML = "";
  }
  getProgress() {
    const t = performance.now() - this.startTime;
    return Math.min(t / this.duration, 1);
  }
}
class Em {
  constructor(t) {
    __publicField(this, "container");
    __publicField(this, "el", null);
    __publicField(this, "counter", null);
    __publicField(this, "vis3d", null);
    __publicField(this, "vis2d", null);
    __publicField(this, "visCounter", null);
    __publicField(this, "pendingFrame", 0);
    this.container = t;
  }
  show(t, e) {
    if (this.destroy(), t.tooSmall) {
      this.showTooSmall(t, e);
      return;
    }
    const n = document.createElement("div");
    n.className = "results", this.el = n;
    const s = document.createElement("div");
    s.className = "results-top";
    const r = document.createElement("div");
    r.className = "results-counter-wrap", s.appendChild(r);
    const a = document.createElement("div");
    a.className = "results-subtitle", a.innerHTML = `<em>${t.small.icon} ${t.small.name}s</em> fit in a <em>${t.large.icon} ${t.large.name}</em>`, s.appendChild(a), n.appendChild(s);
    const o = document.createElement("div");
    o.className = "results-viz", n.appendChild(o);
    const l = document.createElement("div");
    l.className = "results-bottom";
    const c = La(t);
    if (c.length > 0) {
      const g = document.createElement("div");
      g.className = "comparisons";
      for (const v of c) {
        const p = document.createElement("p");
        p.className = "comparison-text", p.textContent = v, g.appendChild(p);
      }
      l.appendChild(g);
    }
    const h = document.createElement("div");
    h.className = "results-actions";
    const f = document.createElement("button");
    f.className = "btn-secondary", f.textContent = "\u2190 Try Another", f.addEventListener("click", e.onBack), h.appendChild(f);
    const d = document.createElement("button");
    d.className = "btn-secondary", d.textContent = "\u{1F504} Flip It!", d.addEventListener("click", () => {
      e.onFlip(t.large.id, t.small.id);
    }), h.appendChild(d);
    const m = document.createElement("button");
    m.className = "btn-secondary", m.textContent = "\u{1F4E4} Share", m.addEventListener("click", () => this.shareResult(t)), h.appendChild(m), l.appendChild(h), n.appendChild(l), this.container.appendChild(n), this.counter = new Vl(r, 2500), this.counter.animateTo(t.count), this.pendingFrame = requestAnimationFrame(() => {
      t.count <= 5e3 ? (this.vis3d = new Mm(o), this.vis3d.start(t)) : t.count <= 5e5 ? (this.vis2d = new Sm(o), this.vis2d.start(t)) : (this.visCounter = new ym(o), this.visCounter.start(t));
    });
  }
  showTooSmall(t, e) {
    const n = document.createElement("div");
    n.className = "too-small", this.el = n;
    const s = document.createElement("div");
    s.className = "too-small-emoji", s.textContent = "\u{1F605}", n.appendChild(s);
    const r = document.createElement("p");
    r.className = "too-small-msg", r.textContent = Gl(t), n.appendChild(r);
    const a = document.createElement("p");
    a.className = "too-small-msg", a.style.fontSize = "1rem", a.style.opacity = "0.5", a.textContent = `${t.small.icon} ${t.small.name} \u2192 ${t.large.icon} ${t.large.name}`, n.appendChild(a);
    const o = document.createElement("div");
    o.className = "results-actions", o.style.marginTop = "1rem";
    const l = document.createElement("button");
    l.className = "btn-secondary", l.textContent = "\u2190 Try Another", l.addEventListener("click", e.onBack), o.appendChild(l);
    const c = document.createElement("button");
    c.className = "btn-secondary", c.textContent = "\u{1F504} Flip It!", c.addEventListener("click", () => {
      e.onFlip(t.large.id, t.small.id);
    }), o.appendChild(c), n.appendChild(o), this.container.appendChild(n);
  }
  async shareResult(t) {
    const e = document.createElement("canvas");
    e.width = 1200, e.height = 630;
    const n = e.getContext("2d");
    n.fillStyle = "#0b0d17", n.fillRect(0, 0, 1200, 630);
    const s = n.createRadialGradient(600, 300, 0, 600, 300, 500);
    s.addColorStop(0, "rgba(0, 229, 255, 0.08)"), s.addColorStop(1, "transparent"), n.fillStyle = s, n.fillRect(0, 0, 1200, 630), n.font = "bold 36px Inter, system-ui, sans-serif", n.fillStyle = "#00e5ff", n.textAlign = "center", n.fillText("How Many?", 600, 60), n.font = "bold 80px JetBrains Mono, monospace", n.fillStyle = "#ffffff";
    const r = Ae(t.count);
    n.fillText(r, 600, 260), n.font = "36px sans-serif", n.fillText(`${t.small.icon} ${t.small.name}s  in  ${t.large.icon} ${t.large.name}`, 600, 340);
    const a = La(t);
    a.length > 0 && (n.font = "22px Inter, system-ui, sans-serif", n.fillStyle = "rgba(255, 255, 255, 0.6)", n.fillText(a[0], 600, 430)), n.font = "18px Inter, system-ui, sans-serif", n.fillStyle = "rgba(255, 255, 255, 0.3)", n.fillText("williamcfrancis.github.io/games/how_many", 600, 600);
    try {
      const o = await new Promise((l) => e.toBlob(l, "image/png"));
      if (!o) return;
      if (navigator.share) {
        const l = new File([o], "how-many.png", { type: "image/png" });
        await navigator.share({ title: "How Many?", text: `${Ae(t.count)} ${t.small.name}s fit in a ${t.large.name}!`, files: [l] });
      } else {
        const l = URL.createObjectURL(o), c = document.createElement("a");
        c.href = l, c.download = "how-many.png", c.click(), URL.revokeObjectURL(l);
      }
    } catch {
    }
  }
  destroy() {
    var _a2, _b, _c2, _d2, _e2;
    cancelAnimationFrame(this.pendingFrame), (_a2 = this.counter) == null ? void 0 : _a2.destroy(), (_b = this.vis3d) == null ? void 0 : _b.destroy(), (_c2 = this.vis2d) == null ? void 0 : _c2.destroy(), (_d2 = this.visCounter) == null ? void 0 : _d2.destroy(), this.counter = null, this.vis3d = null, this.vis2d = null, this.visCounter = null, ((_e2 = this.el) == null ? void 0 : _e2.parentElement) && this.el.parentElement.removeChild(this.el), this.el = null;
  }
}
const ea = document.getElementById("app");
let Ma = "landing", Li = null, Ni = null;
function Rl() {
  Ni == null ? void 0 : Ni.destroy(), Ni = null, ea.innerHTML = "", Ma = "landing", Li = Fl(ea, { onCalculate: bm, onSurprise: Pl });
}
function bm(i, t) {
  Sa(na(i, t));
}
function Sa(i) {
  (Li == null ? void 0 : Li.el.parentElement) && Li.el.parentElement.removeChild(Li.el), Li = null, Ni == null ? void 0 : Ni.destroy(), Ma = "results", Ni = new Em(ea), Ni.show(i, { onBack: Rl, onFlip: (t, e) => {
    const n = qe.find((r) => r.id === t), s = qe.find((r) => r.id === e);
    n && s && Sa(na(n, s));
  } });
}
function Pl() {
  const i = Xo.map((c) => c.id), t = Math.floor(Math.random() * 3), e = t + 1 + Math.floor(Math.random() * (i.length - t - 1)), n = i[Math.min(t, i.length - 1)], s = i[Math.min(e, i.length - 1)], r = qe.filter((c) => c.category === n), a = qe.filter((c) => c.category === s);
  if (r.length === 0 || a.length === 0) return;
  const o = r[Math.floor(Math.random() * r.length)], l = a[Math.floor(Math.random() * a.length)];
  Sa(na(o, l));
}
window.addEventListener("keydown", (i) => {
  i.code === "Space" && Ma === "landing" && (i.preventDefault(), Pl());
});
Rl();
