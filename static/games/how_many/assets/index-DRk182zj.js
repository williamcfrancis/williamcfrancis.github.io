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
const pl = [{ id: "tiny", label: "Tiny" }, { id: "small", label: "Small" }, { id: "medium", label: "Medium" }, { id: "large", label: "Large" }, { id: "huge", label: "Huge" }, { id: "cosmic", label: "Cosmic" }], ml = Math.PI, Se = (i) => ml / 6 * i ** 3, Yn = (i, t) => ml / 4 * i ** 2 * t, je = [{ id: "grain_of_sand", name: "Grain of Sand", category: "tiny", dimensions: [1e-3, 1e-3, 1e-3], volume: Se(1e-3), shape: "sphere", icon: "\u{1F3D6}\uFE0F", funFact: "More grains of sand on Earth than stars in the observable universe.", weight_kg: 67e-7, color: "#e8d5a3" }, { id: "grain_of_rice", name: "Grain of Rice", category: "tiny", dimensions: [7e-3, 2e-3, 2e-3], volume: 28e-9, shape: "box", icon: "\u{1F35A}", funFact: "Over half the world's population relies on rice as a staple food.", weight_kg: 3e-5, color: "#f5f0e1" }, { id: "sesame_seed", name: "Sesame Seed", category: "tiny", dimensions: [3e-3, 2e-3, 1e-3], volume: Se(2e-3), shape: "sphere", icon: "\u{1FAD8}", funFact: "Sesame is one of the oldest oilseed crops, domesticated over 3,000 years ago.", weight_kg: 4e-6, color: "#c4a862" }, { id: "ant", name: "Ant", category: "tiny", dimensions: [3e-3, 1e-3, 1e-3], volume: 3e-9, shape: "box", icon: "\u{1F41C}", funFact: "Ants can carry 10\u201350 times their own body weight.", weight_kg: 1e-6, color: "#2d1810" }, { id: "mm_candy", name: "M&M", category: "tiny", dimensions: [0.013, 9e-3, 0.013], volume: Se(0.013), shape: "sphere", icon: "\u{1F36C}", funFact: "M&Ms were created in 1941 so soldiers could enjoy chocolate without it melting.", weight_kg: 9e-4, color: "#e53935" }, { id: "lego_brick", name: "Lego Brick (2\xD74)", category: "tiny", dimensions: [0.032, 0.012, 0.016], volume: 0.032 * 0.012 * 0.016, shape: "box", icon: "\u{1F9F1}", funFact: "There are about 80 Lego bricks per person on Earth.", weight_kg: 23e-4, color: "#f44336" }, { id: "blueberry", name: "Blueberry", category: "tiny", dimensions: [0.015, 0.012, 0.015], volume: Se(0.014), shape: "sphere", icon: "\u{1FAD0}", funFact: "Blueberries are one of the only natural foods that are truly blue.", weight_kg: 15e-4, color: "#3949ab" }, { id: "postage_stamp", name: "Postage Stamp", category: "tiny", dimensions: [0.025, 3e-4, 0.021], volume: 0.025 * 3e-4 * 0.021, shape: "box", icon: "\u{1F4EE}", funFact: "The first adhesive postage stamp, the Penny Black, was issued in 1840.", weight_kg: 1e-3, color: "#1565c0" }, { id: "usb_c", name: "USB-C Connector", category: "tiny", dimensions: [9e-3, 3e-3, 7e-3], volume: 9e-3 * 3e-3 * 7e-3, shape: "box", icon: "\u{1F50C}", funFact: "USB-C can deliver up to 240 watts of power.", weight_kg: 1e-3, color: "#78909c" }, { id: "pill_capsule", name: "Pill Capsule", category: "tiny", dimensions: [7e-3, 0.02, 7e-3], volume: Yn(7e-3, 0.02), shape: "cylinder", icon: "\u{1F48A}", funFact: "The first gelatin capsule was patented in 1834.", weight_kg: 5e-4, color: "#ef5350" }, { id: "penny", name: "Penny", category: "tiny", dimensions: [0.019, 15e-4, 0.019], volume: Yn(0.019, 15e-4), shape: "cylinder", icon: "\u{1FA99}", funFact: "It costs about 2.7 cents to make a single penny.", weight_kg: 25e-4, color: "#bf6830" }, { id: "paperclip", name: "Paperclip", category: "tiny", dimensions: [0.033, 9e-3, 1e-3], volume: 297e-9, shape: "box", icon: "\u{1F4CE}", funFact: "Norwegians wore paperclips on their lapels as a symbol of resistance during WWII.", weight_kg: 1e-3, color: "#b0bec5" }, { id: "sd_card", name: "SD Card", category: "tiny", dimensions: [0.032, 2e-3, 0.024], volume: 0.032 * 2e-3 * 0.024, shape: "box", icon: "\u{1F4BE}", funFact: "A 1TB SD card can hold about 250,000 photos.", weight_kg: 2e-3, color: "#263238" }, { id: "cherry", name: "Cherry", category: "tiny", dimensions: [0.02, 0.02, 0.02], volume: Se(0.02), shape: "sphere", icon: "\u{1F352}", funFact: "There are over 1,000 varieties of cherries in the United States alone.", weight_kg: 8e-3, color: "#c62828" }, { id: "golf_ball", name: "Golf Ball", category: "small", dimensions: [0.043, 0.043, 0.043], volume: Se(0.043), shape: "sphere", icon: "\u26F3", funFact: "A golf ball has 300\u2013500 dimples that help it fly farther.", weight_kg: 0.046, color: "#fafafa" }, { id: "tennis_ball", name: "Tennis Ball", category: "small", dimensions: [0.067, 0.067, 0.067], volume: Se(0.067), shape: "sphere", icon: "\u{1F3BE}", funFact: "Tennis balls are pressurized to about 12 psi inside.", weight_kg: 0.057, color: "#cddc39" }, { id: "rubiks_cube", name: "Rubik's Cube", category: "small", dimensions: [0.057, 0.057, 0.057], volume: 0.057 ** 3, shape: "box", icon: "\u{1F3B2}", funFact: "There are 43 quintillion possible Rubik's Cube configurations.", weight_kg: 0.13, color: "#ff9800" }, { id: "iphone", name: "iPhone", category: "small", dimensions: [0.147, 8e-3, 0.071], volume: 0.147 * 8e-3 * 0.071, shape: "box", icon: "\u{1F4F1}", funFact: "The first iPhone had only 128MB of RAM.", weight_kg: 0.174, color: "#37474f" }, { id: "baseball", name: "Baseball", category: "small", dimensions: [0.074, 0.074, 0.074], volume: Se(0.074), shape: "sphere", icon: "\u26BE", funFact: "A baseball has exactly 108 double stitches.", weight_kg: 0.145, color: "#f5f5f0" }, { id: "coffee_mug", name: "Coffee Mug", category: "small", dimensions: [0.08, 0.095, 0.08], volume: Yn(0.08, 0.095), shape: "cylinder", icon: "\u2615", funFact: "Over 2.25 billion cups of coffee are consumed worldwide every day.", weight_kg: 0.35, color: "#5d4037" }, { id: "banana", name: "Banana", category: "small", dimensions: [0.035, 0.2, 0.035], volume: Yn(0.035, 0.2), shape: "cylinder", icon: "\u{1F34C}", funFact: "Bananas are naturally slightly radioactive due to their potassium content.", weight_kg: 0.12, color: "#fdd835" }, { id: "soda_can", name: "Can of Soda", category: "small", dimensions: [0.066, 0.122, 0.066], volume: Yn(0.066, 0.122), shape: "cylinder", icon: "\u{1F964}", funFact: "Americans consume about 12.4 billion gallons of soda per year.", weight_kg: 0.384, color: "#d32f2f" }, { id: "lightbulb", name: "Lightbulb", category: "small", dimensions: [0.06, 0.11, 0.06], volume: Se(0.06), shape: "sphere", icon: "\u{1F4A1}", funFact: "The longest-burning lightbulb has been on since 1901 in a California fire station.", weight_kg: 0.03, color: "#fff9c4" }, { id: "human_fist", name: "Human Fist", category: "small", dimensions: [0.1, 0.08, 0.07], volume: Se(0.09), shape: "sphere", icon: "\u270A", funFact: "The human hand has 27 bones.", weight_kg: 0.4, color: "#e8b89d" }, { id: "apple", name: "Apple", category: "small", dimensions: [0.08, 0.075, 0.08], volume: Se(0.08), shape: "sphere", icon: "\u{1F34E}", funFact: "There are over 7,500 varieties of apples grown worldwide.", weight_kg: 0.2, color: "#c62828" }, { id: "billiard_ball", name: "Billiard Ball", category: "small", dimensions: [0.057, 0.057, 0.057], volume: Se(0.057), shape: "sphere", icon: "\u{1F3B1}", funFact: "Billiard balls were once made from ivory.", weight_kg: 0.17, color: "#1a237e" }, { id: "computer_mouse", name: "Computer Mouse", category: "small", dimensions: [0.12, 0.04, 0.065], volume: 0.12 * 0.04 * 0.065, shape: "box", icon: "\u{1F5B1}\uFE0F", funFact: "The first computer mouse was made of wood in 1964.", weight_kg: 0.1, color: "#212121" }, { id: "tv_remote", name: "TV Remote", category: "small", dimensions: [0.2, 0.025, 0.05], volume: 0.2 * 0.025 * 0.05, shape: "box", icon: "\u{1F4FA}", funFact: "The average TV remote is pressed 500,000 times in its lifetime.", weight_kg: 0.12, color: "#424242" }, { id: "basketball", name: "Basketball", category: "medium", dimensions: [0.24, 0.24, 0.24], volume: Se(0.24), shape: "sphere", icon: "\u{1F3C0}", funFact: "The first basketball game used a soccer ball and peach baskets.", weight_kg: 0.62, color: "#e65100" }, { id: "watermelon", name: "Watermelon", category: "medium", dimensions: [0.3, 0.25, 0.3], volume: Se(0.28), shape: "sphere", icon: "\u{1F349}", funFact: "Watermelons are 92% water.", weight_kg: 9, color: "#2e7d32" }, { id: "microwave", name: "Microwave", category: "medium", dimensions: [0.5, 0.3, 0.4], volume: 0.06, shape: "box", icon: "\u{1F4E1}", funFact: "Microwaves were accidentally invented when a radar engineer's chocolate bar melted.", weight_kg: 13, color: "#546e7a" }, { id: "pc_tower", name: "Desktop PC Tower", category: "medium", dimensions: [0.2, 0.45, 0.45], volume: 0.0405, shape: "box", icon: "\u{1F5A5}\uFE0F", funFact: "The first personal computer weighed 55 pounds.", weight_kg: 10, color: "#212121" }, { id: "car_tire", name: "Car Tire", category: "medium", dimensions: [0.65, 0.2, 0.65], volume: Yn(0.65, 0.2), shape: "cylinder", icon: "\u{1F6DE}", funFact: "About 1 billion tires are produced globally each year.", weight_kg: 10, color: "#263238" }, { id: "suitcase", name: "Suitcase", category: "medium", dimensions: [0.7, 0.45, 0.25], volume: 0.07875, shape: "box", icon: "\u{1F9F3}", funFact: "Wheeled suitcases weren't invented until 1970.", weight_kg: 4, color: "#1565c0" }, { id: "guitar", name: "Guitar", category: "medium", dimensions: [0.37, 1, 0.12], volume: 0.0444, shape: "box", icon: "\u{1F3B8}", funFact: "The world's largest playable guitar is 13 meters long.", weight_kg: 2.5, color: "#6d4c41" }, { id: "office_chair", name: "Office Chair", category: "medium", dimensions: [0.65, 1.1, 0.65], volume: 0.46, shape: "box", icon: "\u{1FA91}", funFact: "Charles Darwin is credited with adding wheels to his office chair.", weight_kg: 15, color: "#37474f" }, { id: "mini_fridge", name: "Mini-Fridge", category: "medium", dimensions: [0.5, 0.5, 0.45], volume: 0.1125, shape: "box", icon: "\u{1F9CA}", funFact: "Mini-fridges use about 100 kWh of electricity per year.", weight_kg: 20, color: "#e0e0e0" }, { id: "bathtub", name: "Bathtub", category: "medium", dimensions: [1.5, 0.55, 0.7], volume: 0.5775, shape: "box", icon: "\u{1F6C1}", funFact: "The average bathtub holds about 300 liters of water.", weight_kg: 80, color: "#eceff1" }, { id: "dishwasher", name: "Dishwasher", category: "medium", dimensions: [0.6, 0.85, 0.6], volume: 0.306, shape: "box", icon: "\u{1F37D}\uFE0F", funFact: "The first dishwasher was patented by Josephine Cochrane in 1886.", weight_kg: 50, color: "#90a4ae" }, { id: "vending_machine", name: "Vending Machine", category: "medium", dimensions: [0.9, 1.83, 0.8], volume: 1.32, shape: "box", icon: "\u{1F3E7}", funFact: "Japan has about 5 million vending machines \u2014 one for every 23 people.", weight_kg: 200, color: "#b71c1c" }, { id: "park_bench", name: "Park Bench", category: "medium", dimensions: [1.5, 0.8, 0.6], volume: 0.72, shape: "box", icon: "\u{1FA91}", funFact: "Central Park has over 9,000 benches.", weight_kg: 60, color: "#4e342e" }, { id: "sedan", name: "Car (Sedan)", category: "large", dimensions: [4.5, 1.5, 1.8], volume: 8, shape: "box", icon: "\u{1F697}", funFact: "The average car has about 30,000 parts.", weight_kg: 1400, color: "#1565c0" }, { id: "grand_piano", name: "Grand Piano", category: "large", dimensions: [1.5, 1, 2.2], volume: 3.3, shape: "box", icon: "\u{1F3B9}", funFact: "A concert grand piano has about 12,000 individual parts.", weight_kg: 480, color: "#1a1a1a" }, { id: "elephant", name: "African Elephant", category: "large", dimensions: [3.5, 3.3, 6], volume: 5.5, shape: "box", icon: "\u{1F418}", funFact: "Elephants can't jump, but they can swim for up to 6 hours.", weight_kg: 5e3, color: "#78909c" }, { id: "hot_tub", name: "Hot Tub", category: "large", dimensions: [2.1, 0.9, 2.1], volume: 1.6, shape: "cylinder", icon: "\u2668\uFE0F", funFact: "The ancient Romans built public hot baths that could hold thousands.", weight_kg: 300, color: "#4fc3f7" }, { id: "shipping_container", name: "Shipping Container (20ft)", category: "large", dimensions: [6.06, 2.59, 2.44], volume: 33.2, shape: "box", icon: "\u{1F4E6}", funFact: "About 97% of all shipping containers are made in China.", weight_kg: 2300, color: "#ff6f00" }, { id: "school_bus", name: "School Bus", category: "large", dimensions: [10.7, 2.7, 2.4], volume: 41, shape: "box", icon: "\u{1F68C}", funFact: "About 480,000 school buses carry 26 million kids to school daily in the US.", weight_kg: 1e4, color: "#ffc107" }, { id: "t_rex", name: "T-Rex", category: "large", dimensions: [12, 3.7, 2], volume: 7, shape: "box", icon: "\u{1F996}", funFact: "T-Rex had a bite force of 12,800 pounds \u2014 enough to crush a car.", weight_kg: 7e3, color: "#5d4037" }, { id: "blue_whale", name: "Blue Whale", category: "large", dimensions: [30, 5, 6], volume: 100, shape: "cylinder", icon: "\u{1F40B}", funFact: "A blue whale's heart is the size of a small car.", weight_kg: 14e4, color: "#1565c0" }, { id: "studio_apartment", name: "Studio Apartment", category: "large", dimensions: [6.3, 2.7, 6.3], volume: 107, shape: "box", icon: "\u{1F3E0}", funFact: "The average studio apartment in Manhattan costs over $2,800/month.", weight_kg: 0, color: "#8d6e63" }, { id: "basketball_court", name: "Basketball Court", category: "large", dimensions: [28.65, 7, 15.24], volume: 3056, shape: "box", icon: "\u{1F3DF}\uFE0F", funFact: "An NBA basketball court is exactly 94 feet long.", weight_kg: 0, color: "#e65100" }, { id: "boeing_747", name: "Boeing 747", category: "large", dimensions: [70.7, 19.4, 64.4], volume: 876, shape: "cylinder", icon: "\u2708\uFE0F", funFact: "A 747 has 6 million parts, and half of them are fasteners.", weight_kg: 178756, color: "#e0e0e0" }, { id: "fire_truck", name: "Fire Truck", category: "large", dimensions: [10.5, 3.2, 2.5], volume: 50, shape: "box", icon: "\u{1F692}", funFact: "Fire trucks carry between 500 and 3,000 gallons of water.", weight_kg: 19e3, color: "#c62828" }, { id: "tiny_house", name: "Tiny House", category: "large", dimensions: [7.3, 3.7, 2.6], volume: 60, shape: "box", icon: "\u{1F3E1}", funFact: "The tiny house movement started in the US in the late 1990s.", weight_kg: 4500, color: "#795548" }, { id: "olympic_pool", name: "Olympic Swimming Pool", category: "huge", dimensions: [50, 2, 25], volume: 2500, shape: "box", icon: "\u{1F3CA}", funFact: "An Olympic pool holds 2.5 million liters (660,000 gallons) of water.", weight_kg: 25e5, color: "#0288d1" }, { id: "football_field", name: "Football Field", category: "huge", dimensions: [109.7, 10, 48.8], volume: 53534, shape: "box", icon: "\u{1F3C8}", funFact: "An NFL football field is exactly 100 yards long (plus two 10-yard end zones).", weight_kg: 0, color: "#2e7d32" }, { id: "statue_of_liberty", name: "Statue of Liberty", category: "huge", dimensions: [15, 93, 15], volume: 6540, shape: "cylinder", icon: "\u{1F5FD}", funFact: "Lady Liberty's nose is 4.5 feet long.", weight_kg: 204e3, color: "#4db6ac" }, { id: "great_pyramid", name: "Great Pyramid of Giza", category: "huge", dimensions: [230, 146, 230], volume: 2583283, shape: "box", icon: "\u{1F53A}", funFact: "The Great Pyramid was the tallest structure on Earth for 3,800 years.", weight_kg: 6e9, color: "#d4a843" }, { id: "titanic", name: "Titanic", category: "huge", dimensions: [269, 53, 28], volume: 131936, shape: "box", icon: "\u{1F6A2}", funFact: "The Titanic used 600 tons of coal per day.", weight_kg: 52e6, color: "#37474f" }, { id: "aircraft_carrier", name: "Aircraft Carrier", category: "huge", dimensions: [333, 77, 41], volume: 4e5, shape: "box", icon: "\u2693", funFact: "A Nimitz-class carrier carries enough food for 18,000 meals per day.", weight_kg: 1e8, color: "#455a64" }, { id: "iss", name: "International Space Station", category: "huge", dimensions: [108, 20, 73], volume: 916, shape: "box", icon: "\u{1F6F8}", funFact: "The ISS has been continuously inhabited since November 2000.", weight_kg: 42e4, color: "#b0bec5" }, { id: "central_park", name: "Central Park", category: "huge", dimensions: [4e3, 10, 800], volume: 32e6, shape: "box", icon: "\u{1F333}", funFact: "Central Park is visited by over 42 million people annually.", weight_kg: 0, color: "#388e3c" }, { id: "burj_khalifa", name: "Burj Khalifa", category: "huge", dimensions: [60, 828, 60], volume: 47e4, shape: "box", icon: "\u{1F3D9}\uFE0F", funFact: "The Burj Khalifa is so tall, you can watch two sunsets in one day from different floors.", weight_kg: 5e8, color: "#78909c" }, { id: "colosseum", name: "Colosseum", category: "huge", dimensions: [189, 48, 156], volume: 13e5, shape: "cylinder", icon: "\u{1F3DB}\uFE0F", funFact: "The Colosseum could hold 50,000\u201380,000 spectators.", weight_kg: 0, color: "#a1887f" }, { id: "empire_state", name: "Empire State Building", category: "huge", dimensions: [57, 443, 129], volume: 104e4, shape: "box", icon: "\u{1F3E2}", funFact: "The Empire State Building has its own zip code: 10118.", weight_kg: 331e6, color: "#9e9e9e" }, { id: "walmart", name: "Walmart Supercenter", category: "huge", dimensions: [180, 7, 100], volume: 126e3, shape: "box", icon: "\u{1F6D2}", funFact: "Walmart serves about 230 million customers per week.", weight_kg: 0, color: "#1565c0" }, { id: "moon", name: "The Moon", category: "cosmic", dimensions: [3474e3, 3474e3, 3474e3], volume: 21958e15, shape: "sphere", icon: "\u{1F319}", funFact: "The Moon is slowly drifting away from Earth at 3.8 cm per year.", weight_kg: 735e20, color: "#bdbdbd" }, { id: "mars", name: "Mars", category: "cosmic", dimensions: [6779e3, 6779e3, 6779e3], volume: 16318e16, shape: "sphere", icon: "\u{1F534}", funFact: "A day on Mars is only 37 minutes longer than a day on Earth.", weight_kg: 639e21, color: "#bf360c" }, { id: "earth", name: "Earth", category: "cosmic", dimensions: [12742e3, 12742e3, 12742e3], volume: 108321e16, shape: "sphere", icon: "\u{1F30D}", funFact: "Earth is the only planet not named after a Greek or Roman god.", weight_kg: 597e22, color: "#1565c0" }, { id: "jupiter", name: "Jupiter", category: "cosmic", dimensions: [13982e4, 13982e4, 13982e4], volume: 14313e20, shape: "sphere", icon: "\u{1F7E4}", funFact: "Jupiter's Great Red Spot is a storm bigger than Earth that has lasted 350+ years.", weight_kg: 1898e24, color: "#bf6830" }, { id: "saturn", name: "Saturn", category: "cosmic", dimensions: [11646e4, 11646e4, 11646e4], volume: 82713e19, shape: "sphere", icon: "\u{1FA90}", funFact: "Saturn is so light it would float in water (if you found a big enough bathtub).", weight_kg: 5683e23, color: "#d4a843" }, { id: "sun", name: "The Sun", category: "cosmic", dimensions: [13927e5, 13927e5, 13927e5], volume: 1412e24, shape: "sphere", icon: "\u2600\uFE0F", funFact: "The Sun accounts for 99.86% of all mass in our solar system.", weight_kg: 1989e27, color: "#ffab00" }, { id: "solar_system", name: "Solar System", category: "cosmic", dimensions: [9e12, 9e12, 9e12], volume: 381e36, shape: "sphere", icon: "\u{1F30C}", funFact: "Light from the Sun takes about 4.5 hours to reach Neptune.", weight_kg: 2e30, color: "#311b92" }, { id: "light_year_cube", name: "Light-Year Cube", category: "cosmic", dimensions: [9461e12, 9461e12, 9461e12], volume: 8468e44, shape: "box", icon: "\u2728", funFact: "A light-year is about 9.46 trillion kilometers.", weight_kg: 0, color: "#e8eaf6" }];
function Fn(i) {
  return je.find((t) => t.id === i);
}
function qa(i) {
  const t = i.toLowerCase().trim();
  return t ? je.filter((e) => e.name.toLowerCase().includes(t) || e.category.includes(t) || e.id.includes(t)) : je;
}
function dc(i, t) {
  let e;
  return i === "sphere" && t === "box" ? e = 0.64 : i === "box" && t === "box" ? e = 1 : i === "cylinder" && t === "box" ? e = 0.785 : i === "sphere" && t === "sphere" || i === "box" && t === "sphere" ? e = 0.64 : i === "cylinder" && t === "sphere" ? e = 0.6 : i === "box" && t === "cylinder" ? e = 0.785 : i === "sphere" && t === "cylinder" ? e = 0.6 : i === "cylinder" && t === "cylinder" ? e = 0.785 : e = 0.64, t === "sphere" && (e *= 0.85), e;
}
function fc(i, t) {
  const [e, n, s] = i.dimensions, [r, a, o] = t.dimensions;
  return Math.floor(r / e) * Math.floor(a / n) * Math.floor(o / s);
}
function Wi(i, t) {
  const e = t.volume / i.volume;
  if (t.volume <= i.volume) return { count: 0, packingEfficiency: 0, gridFit: null, small: i, large: t, tooSmall: true, sizeRatio: e };
  const n = dc(i.shape, t.shape);
  let s = Math.floor(t.volume * n / i.volume), r = null;
  return i.shape === "box" && t.shape === "box" && (r = fc(i, t), s = Math.min(s, r)), { count: Math.max(0, s), packingEfficiency: n, gridFit: r, small: i, large: t, tooSmall: false, sizeRatio: e };
}
class pc {
  constructor() {
    __publicField(this, "ctx", null);
    __publicField(this, "_muted", true);
    try {
      this._muted = localStorage.getItem("hm_sound") !== "1";
    } catch {
    }
  }
  get muted() {
    return this._muted;
  }
  set muted(t) {
    this._muted = t;
    try {
      localStorage.setItem("hm_sound", t ? "0" : "1");
    } catch {
    }
  }
  getCtx() {
    if (this._muted) return null;
    if (!this.ctx) try {
      this.ctx = new AudioContext();
    } catch {
      return null;
    }
    return this.ctx.state === "suspended" && this.ctx.resume(), this.ctx;
  }
  click() {
    const t = this.getCtx();
    if (!t) return;
    const e = t.createOscillator(), n = t.createGain();
    e.connect(n).connect(t.destination), e.frequency.setValueAtTime(800, t.currentTime), e.frequency.exponentialRampToValueAtTime(300, t.currentTime + 0.06), n.gain.setValueAtTime(0.06, t.currentTime), n.gain.exponentialRampToValueAtTime(1e-3, t.currentTime + 0.06), e.start(), e.stop(t.currentTime + 0.06);
  }
  whoosh() {
    const t = this.getCtx();
    if (!t) return;
    const e = 0.25, n = Math.ceil(t.sampleRate * e), s = t.createBuffer(1, n, t.sampleRate), r = s.getChannelData(0);
    for (let c = 0; c < n; c++) r[c] = Math.random() * 2 - 1;
    const a = t.createBufferSource();
    a.buffer = s;
    const o = t.createBiquadFilter();
    o.type = "bandpass", o.frequency.setValueAtTime(1200, t.currentTime), o.frequency.exponentialRampToValueAtTime(200, t.currentTime + e), o.Q.value = 1.5;
    const l = t.createGain();
    l.gain.setValueAtTime(0.12, t.currentTime), l.gain.exponentialRampToValueAtTime(1e-3, t.currentTime + e), a.connect(o).connect(l).connect(t.destination), a.start(), a.stop(t.currentTime + e);
  }
  celebrate() {
    const t = this.getCtx();
    if (!t) return;
    const e = [523.25, 659.25, 783.99, 1046.5];
    for (let n = 0; n < e.length; n++) {
      const s = t.createOscillator(), r = t.createGain();
      s.connect(r).connect(t.destination), s.type = "triangle";
      const a = t.currentTime + n * 0.08;
      s.frequency.setValueAtTime(e[n], a), r.gain.setValueAtTime(0, a), r.gain.linearRampToValueAtTime(0.05, a + 0.015), r.gain.exponentialRampToValueAtTime(1e-3, a + 0.25), s.start(a), s.stop(a + 0.25);
    }
  }
}
const re = new pc();
function gl(i) {
  const [t, e, n] = i.dimensions, s = (r) => r >= 946e13 ? `${(r / 9461e12).toFixed(1)} ly` : r >= 1e12 ? `${(r / 1e9).toFixed(0)}B km` : r >= 1e9 ? `${(r / 1e6).toLocaleString("en-US", { maximumFractionDigits: 0 })} km` : r >= 1e3 ? `${(r / 1e3).toLocaleString("en-US", { maximumFractionDigits: 1 })} km` : r >= 1 ? `${r.toFixed(2)} m` : r >= 0.01 ? `${(r * 100).toFixed(1)} cm` : r >= 1e-3 ? `${(r * 1e3).toFixed(1)} mm` : `${(r * 1e6).toFixed(0)} \u03BCm`;
  return `${s(t)} \xD7 ${s(e)} \xD7 ${s(n)}`;
}
function zi(i, t, e, n) {
  i.innerHTML = "";
  const s = /* @__PURE__ */ new Map();
  for (const r of t) {
    const a = s.get(r.category) ?? [];
    a.push(r), s.set(r.category, a);
  }
  for (const r of pl) {
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
          <div class="object-dims">${gl(l)}</div>
        </div>
      `, c.addEventListener("click", () => {
        re.click(), n(l);
      }), i.appendChild(c);
    }
  }
}
function Us(i, t) {
  if (!t) {
    i.style.display = "none";
    return;
  }
  i.style.display = "flex", i.innerHTML = `
    <span class="preview-icon">${t.icon}</span>
    <div class="preview-details">
      <h3>${t.name}</h3>
      <p>${gl(t)}</p>
      <p class="preview-fun-fact">${t.funFact}</p>
    </div>
  `;
}
function $a(i, t, e, n) {
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
  const c = { selected: e ? Fn(e) ?? null : null, searchEl: a, gridEl: o, previewEl: l, onSelect: () => {
  } }, h = (u) => {
    c.selected = u, zi(o, qa(a.value), c.selected, h), Us(l, u), n(u);
  };
  return c.onSelect = h, a.addEventListener("input", () => {
    const u = qa(a.value);
    zi(o, u, c.selected, h);
  }), zi(o, je, c.selected, h), Us(l, c.selected), { el: s, state: c };
}
const mc = [{ label: "\u{1F3C0} Basketballs \u2192 \u{1F68C} School Bus", small: "basketball", large: "school_bus" }, { label: "\u{1F36C} M&Ms \u2192 \u{1F3E1} Tiny House", small: "mm_candy", large: "tiny_house" }, { label: "\u26F3 Golf Balls \u2192 \u{1F418} Elephant", small: "golf_ball", large: "elephant" }, { label: "\u{1F9F1} Legos \u2192 \u{1F697} Car", small: "lego_brick", large: "sedan" }, { label: "\u{1F30D} Earths \u2192 \u2600\uFE0F Sun", small: "earth", large: "sun" }];
function gc(i, t) {
  const e = document.createElement("div");
  e.className = "landing screen-enter";
  const n = document.createElement("h1");
  n.className = "landing-title", n.textContent = "How Many?", e.appendChild(n);
  const s = document.createElement("p");
  s.className = "landing-subtitle", s.textContent = "Pick two objects and see how many of the smaller one fit inside the larger one.", e.appendChild(s);
  const r = document.createElement("div");
  r.className = "cards-row";
  let a = null, o = null;
  const l = () => {
    p.disabled = !(a && o);
  }, c = $a("\u{1F50D} How many...", "Search objects...", "golf_ball", (E) => {
    a = E, l();
  });
  a = c.state.selected;
  const h = $a("\u{1F4E6} ...fit in a...", "Search objects...", "boeing_747", (E) => {
    o = E, l();
  });
  o = h.state.selected, r.appendChild(c.el);
  const u = document.createElement("div");
  u.className = "flow-arrow", u.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>', r.appendChild(u), r.appendChild(h.el), e.appendChild(r);
  const d = document.createElement("div");
  d.className = "landing-controls";
  const p = document.createElement("button");
  p.className = "btn-calculate", p.textContent = "Calculate!", p.disabled = !(a && o), p.addEventListener("click", () => {
    a && o && t.onCalculate(a, o);
  }), d.appendChild(p);
  const g = document.createElement("button");
  g.className = "btn-surprise", g.textContent = "\u{1F3B2} Surprise Me", g.addEventListener("click", t.onSurprise), d.appendChild(g), e.appendChild(d);
  const _ = document.createElement("div");
  _.className = "popular-combos";
  const m = document.createElement("span");
  m.className = "popular-label", m.textContent = "Try:", _.appendChild(m);
  for (const E of mc) {
    const T = document.createElement("button");
    T.className = "combo-chip", T.textContent = E.label, T.addEventListener("click", () => {
      re.click();
      const y = Fn(E.small), N = Fn(E.large);
      y && N && t.onCalculate(y, N);
    }), _.appendChild(T);
  }
  return e.appendChild(_), i.appendChild(e), { el: e, getSmall: () => a, getLarge: () => o, setSelections: (E, T) => {
    const y = Fn(E), N = Fn(T);
    y && (a = y, c.state.selected = y, zi(c.state.gridEl, je, y, c.state.onSelect), Us(c.state.previewEl, y)), N && (o = N, h.state.selected = N, zi(h.state.gridEl, je, N, h.state.onSelect), Us(h.state.previewEl, N)), l();
  } };
}
const _c = [{ value: 600, label: "a small village" }, { value: 5e3, label: "a small town" }, { value: 36e3, label: "the city of Monaco" }, { value: 37e4, label: "the population of Iceland" }, { value: 58e4, label: "the population of Wyoming" }, { value: 87e4, label: "the population of San Francisco" }, { value: 5e6, label: "the population of New Zealand" }, { value: 88e5, label: "the population of Switzerland" }, { value: 14e6, label: "the population of Tokyo" }, { value: 28e6, label: "the population of Shanghai" }, { value: 67e6, label: "the population of France" }, { value: 331e6, label: "the population of the USA" }, { value: 14e8, label: "the population of India" }, { value: 8e9, label: "every person on Earth" }], vc = [{ value: 1.7, label: "an average person" }, { value: 8.84, label: "a three-story building" }, { value: 93, label: "the Statue of Liberty" }, { value: 330, label: "the Eiffel Tower" }, { value: 443, label: "the Empire State Building" }, { value: 828, label: "the Burj Khalifa" }, { value: 8849, label: "Mount Everest" }, { value: 12e3, label: "cruising altitude of a jet" }, { value: 1e5, label: "the edge of space" }, { value: 3844e5, label: "the distance to the Moon" }, { value: 1496e8, label: "the distance to the Sun" }], xc = [{ value: 400, label: "an athletics track" }, { value: 42195, label: "a marathon" }, { value: 3944e3, label: "New York to Los Angeles" }, { value: 8849e3, label: "the width of the USA" }, { value: 40075e3, label: "around the Earth" }, { value: 3844e5, label: "here to the Moon" }, { value: 1496e8, label: "here to the Sun" }], Mc = [{ value: 1e-3, label: "a paperclip" }, { value: 0.045, label: "a golf ball" }, { value: 0.15, label: "a baseball" }, { value: 1, label: "a liter of water" }, { value: 6.4, label: "a bowling ball" }, { value: 70, label: "an adult human" }, { value: 500, label: "a horse" }, { value: 1400, label: "a car" }, { value: 5e3, label: "an elephant" }, { value: 14e4, label: "a blue whale" }, { value: 735e3, label: "the International Space Station" }, { value: 52e6, label: "the Titanic" }, { value: 6e9, label: "the Great Pyramid of Giza" }];
function Ki(i, t) {
  if (i.length === 0) return null;
  let e = i[0], n = Math.abs(Math.log(t / e.value));
  for (const s of i) {
    const r = Math.abs(Math.log(t / s.value));
    r < n && (e = s, n = r);
  }
  return e;
}
function Ce(i) {
  return i >= 1e15 ? i.toExponential(1) : i >= 1e9 ? (i / 1e9).toFixed(1).replace(/\.0$/, "") + " billion" : i >= 1e6 ? (i / 1e6).toFixed(1).replace(/\.0$/, "") + " million" : i >= 1e4 ? i.toLocaleString("en-US", { maximumFractionDigits: 0 }) : i >= 100 ? i.toLocaleString("en-US", { maximumFractionDigits: 0 }) : i >= 1 ? i.toFixed(1).replace(/\.0$/, "") : i >= 0.01 ? i.toFixed(2) : i.toExponential(1);
}
function yc(i) {
  if (i < 60) return `${Math.round(i)} seconds`;
  if (i < 3600) return `${(i / 60).toFixed(1)} minutes`;
  if (i < 86400) return `${(i / 3600).toFixed(1)} hours`;
  if (i < 604800) return `${(i / 86400).toFixed(1)} days`;
  if (i < 31536e3) return `${(i / 604800).toFixed(1)} weeks`;
  const t = i / 31536e3;
  return t < 100 ? `${t.toFixed(1)} years` : t < 1e3 ? `${Math.round(t)} years` : `${Ce(t)} years`;
}
function Za(i) {
  const { count: t, small: e, large: n } = i, s = [];
  if (t <= 0) return s;
  const r = Ki(_c, t);
  if (r) {
    const h = t / r.value;
    h > 0.5 && h < 2 ? s.push(`That's roughly ${r.label}.`) : h >= 2 && s.push(`That's about ${Ce(h)}\xD7 ${r.label}.`);
  }
  const a = t;
  s.push(`At 1 per second, counting them would take ${yc(a)}.`);
  const o = Math.min(...e.dimensions);
  if (o > 0) {
    const h = t * o, u = Ki(vc, h);
    if (u) {
      const d = h / u.value;
      d > 0.3 && s.push(`Stacked up, they'd reach ${Ce(h)}m \u2014 ${Ce(d)}\xD7 the height of ${u.label}.`);
    }
  }
  const l = Math.max(...e.dimensions);
  if (l > 0) {
    const h = t * l, u = Ki(xc, h);
    if (u) {
      const d = h / u.value;
      d > 0.3 && s.push(`Laid end to end, they'd stretch ${Ce(h)}m \u2014 ${Ce(d)}\xD7 ${u.label}.`);
    }
  }
  if (e.weight_kg > 0) {
    const h = t * e.weight_kg, u = Ki(Mc, h);
    if (u) {
      const d = h / u.value;
      d > 0.5 && d < 2 ? s.push(`Total weight: ${Ce(h)} kg \u2014 about the same as ${u.label}.`) : d >= 2 && s.push(`Total weight: ${Ce(h)} kg \u2014 ${Ce(d)}\xD7 ${u.label}.`);
    }
  }
  const c = 2500;
  if (t * e.volume > c * 0.1) {
    const h = t * e.volume / c;
    s.push(`That's enough ${e.name}s to fill ${Ce(h)} Olympic swimming pools.`);
  }
  return s.slice(0, 4);
}
function Sc(i) {
  const t = i.large.volume / i.small.volume;
  return t <= 0 ? `The ${i.small.name} is infinitely larger! Not even close.` : `Not even close! The ${i.small.name} is ${Ce(1 / t)}\xD7 bigger than the ${i.large.name}.`;
}
class Ec {
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
const Ma = "170", hi = { ROTATE: 0, DOLLY: 1, PAN: 2 }, li = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 }, bc = 0, ja = 1, Tc = 2, _l = 1, vl = 2, ln = 3, Tn = 0, xe = 1, qe = 2, En = 0, ui = 1, Ka = 2, Ja = 3, Qa = 4, Ac = 5, Un = 100, wc = 101, Cc = 102, Rc = 103, Pc = 104, Lc = 200, Dc = 201, Ic = 202, Uc = 203, Lr = 204, Dr = 205, Nc = 206, Fc = 207, Oc = 208, Bc = 209, zc = 210, kc = 211, Hc = 212, Gc = 213, Vc = 214, Ir = 0, Ur = 1, Nr = 2, mi = 3, Fr = 4, Or = 5, Br = 6, zr = 7, xl = 0, Wc = 1, Xc = 2, bn = 0, Yc = 1, qc = 2, $c = 3, Ml = 4, Zc = 5, jc = 6, Kc = 7, yl = 300, gi = 301, _i = 302, kr = 303, Hr = 304, Hs = 306, Gr = 1e3, On = 1001, Vr = 1002, Pe = 1003, Jc = 1004, Ji = 1005, $e = 1006, qs = 1007, Bn = 1008, un = 1009, Sl = 1010, El = 1011, Vi = 1012, ya = 1013, kn = 1014, Ze = 1015, Xi = 1016, Sa = 1017, Ea = 1018, vi = 1020, bl = 35902, Tl = 1021, Al = 1022, We = 1023, wl = 1024, Cl = 1025, di = 1026, xi = 1027, ba = 1028, Ta = 1029, Rl = 1030, Aa = 1031, wa = 1033, Cs = 33776, Rs = 33777, Ps = 33778, Ls = 33779, Wr = 35840, Xr = 35841, Yr = 35842, qr = 35843, $r = 36196, Zr = 37492, jr = 37496, Kr = 37808, Jr = 37809, Qr = 37810, ta = 37811, ea = 37812, na = 37813, ia = 37814, sa = 37815, ra = 37816, aa = 37817, oa = 37818, la = 37819, ca = 37820, ha = 37821, Ds = 36492, ua = 36494, da = 36495, Pl = 36283, fa = 36284, pa = 36285, ma = 36286, Qc = 3200, th = 3201, Ll = 0, eh = 1, Sn = "", Fe = "srgb", yi = "srgb-linear", Gs = "linear", qt = "srgb", qn = 7680, to = 519, nh = 512, ih = 513, sh = 514, Dl = 515, rh = 516, ah = 517, oh = 518, lh = 519, eo = 35044, no = "300 es", cn = 2e3, Ns = 2001;
class Vn {
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
const me = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], ki = Math.PI / 180, ga = 180 / Math.PI;
function Yi() {
  const i = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (me[i & 255] + me[i >> 8 & 255] + me[i >> 16 & 255] + me[i >> 24 & 255] + "-" + me[t & 255] + me[t >> 8 & 255] + "-" + me[t >> 16 & 15 | 64] + me[t >> 24 & 255] + "-" + me[e & 63 | 128] + me[e >> 8 & 255] + "-" + me[e >> 16 & 255] + me[e >> 24 & 255] + me[n & 255] + me[n >> 8 & 255] + me[n >> 16 & 255] + me[n >> 24 & 255]).toLowerCase();
}
function le(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function ch(i, t) {
  return (i % t + t) % t;
}
function $s(i, t, e) {
  return (1 - e) * i + e * t;
}
function wi(i, t) {
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
function Ee(i, t) {
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
const hh = { DEG2RAD: ki };
class it {
  constructor(t = 0, e = 0) {
    it.prototype.isVector2 = true, this.x = t, this.y = e;
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
    return Math.acos(le(n, -1, 1));
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
    const n = t.elements, s = e.elements, r = this.elements, a = n[0], o = n[3], l = n[6], c = n[1], h = n[4], u = n[7], d = n[2], p = n[5], g = n[8], _ = s[0], m = s[3], f = s[6], E = s[1], T = s[4], y = s[7], N = s[2], w = s[5], A = s[8];
    return r[0] = a * _ + o * E + l * N, r[3] = a * m + o * T + l * w, r[6] = a * f + o * y + l * A, r[1] = c * _ + h * E + u * N, r[4] = c * m + h * T + u * w, r[7] = c * f + h * y + u * A, r[2] = d * _ + p * E + g * N, r[5] = d * m + p * T + g * w, r[8] = d * f + p * y + g * A, this;
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
    const t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8], u = h * a - o * c, d = o * l - h * r, p = c * r - a * l, g = e * u + n * d + s * p;
    if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const _ = 1 / g;
    return t[0] = u * _, t[1] = (s * c - h * n) * _, t[2] = (o * n - s * a) * _, t[3] = d * _, t[4] = (h * e - s * l) * _, t[5] = (s * r - o * e) * _, t[6] = p * _, t[7] = (n * l - c * e) * _, t[8] = (a * e - n * r) * _, this;
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
    return this.premultiply(Zs.makeScale(t, e)), this;
  }
  rotate(t) {
    return this.premultiply(Zs.makeRotation(-t)), this;
  }
  translate(t, e) {
    return this.premultiply(Zs.makeTranslation(t, e)), this;
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
const Zs = new Pt();
function Il(i) {
  for (let t = i.length - 1; t >= 0; --t) if (i[t] >= 65535) return true;
  return false;
}
function Fs(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function uh() {
  const i = Fs("canvas");
  return i.style.display = "block", i;
}
const io = {};
function Oi(i) {
  i in io || (io[i] = true, console.warn(i));
}
function dh(i, t, e) {
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
function fh(i) {
  const t = i.elements;
  t[2] = 0.5 * t[2] + 0.5 * t[3], t[6] = 0.5 * t[6] + 0.5 * t[7], t[10] = 0.5 * t[10] + 0.5 * t[11], t[14] = 0.5 * t[14] + 0.5 * t[15];
}
function ph(i) {
  const t = i.elements;
  t[11] === -1 ? (t[10] = -t[10] - 1, t[14] = -t[14]) : (t[10] = -t[10], t[14] = -t[14] + 1);
}
const Ht = { enabled: true, workingColorSpace: yi, spaces: {}, convert: function(i, t, e) {
  return this.enabled === false || t === e || !t || !e || (this.spaces[t].transfer === qt && (i.r = hn(i.r), i.g = hn(i.g), i.b = hn(i.b)), this.spaces[t].primaries !== this.spaces[e].primaries && (i.applyMatrix3(this.spaces[t].toXYZ), i.applyMatrix3(this.spaces[e].fromXYZ)), this.spaces[e].transfer === qt && (i.r = fi(i.r), i.g = fi(i.g), i.b = fi(i.b))), i;
}, fromWorkingColorSpace: function(i, t) {
  return this.convert(i, this.workingColorSpace, t);
}, toWorkingColorSpace: function(i, t) {
  return this.convert(i, t, this.workingColorSpace);
}, getPrimaries: function(i) {
  return this.spaces[i].primaries;
}, getTransfer: function(i) {
  return i === Sn ? Gs : this.spaces[i].transfer;
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
function hn(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function fi(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
const so = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], ro = [0.2126, 0.7152, 0.0722], ao = [0.3127, 0.329], oo = new Pt().set(0.4123908, 0.3575843, 0.1804808, 0.212639, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322), lo = new Pt().set(3.2409699, -1.5373832, -0.4986108, -0.9692436, 1.8759675, 0.0415551, 0.0556301, -0.203977, 1.0569715);
Ht.define({ [yi]: { primaries: so, whitePoint: ao, transfer: Gs, toXYZ: oo, fromXYZ: lo, luminanceCoefficients: ro, workingColorSpaceConfig: { unpackColorSpace: Fe }, outputColorSpaceConfig: { drawingBufferColorSpace: Fe } }, [Fe]: { primaries: so, whitePoint: ao, transfer: qt, toXYZ: oo, fromXYZ: lo, luminanceCoefficients: ro, outputColorSpaceConfig: { drawingBufferColorSpace: Fe } } });
let $n;
class mh {
  static getDataURL(t) {
    if (/^data:/i.test(t.src) || typeof HTMLCanvasElement > "u") return t.src;
    let e;
    if (t instanceof HTMLCanvasElement) e = t;
    else {
      $n === void 0 && ($n = Fs("canvas")), $n.width = t.width, $n.height = t.height;
      const n = $n.getContext("2d");
      t instanceof ImageData ? n.putImageData(t, 0, 0) : n.drawImage(t, 0, 0, t.width, t.height), e = $n;
    }
    return e.width > 2048 || e.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", t), e.toDataURL("image/jpeg", 0.6)) : e.toDataURL("image/png");
  }
  static sRGBToLinear(t) {
    if (typeof HTMLImageElement < "u" && t instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && t instanceof ImageBitmap) {
      const e = Fs("canvas");
      e.width = t.width, e.height = t.height;
      const n = e.getContext("2d");
      n.drawImage(t, 0, 0, t.width, t.height);
      const s = n.getImageData(0, 0, t.width, t.height), r = s.data;
      for (let a = 0; a < r.length; a++) r[a] = hn(r[a] / 255) * 255;
      return n.putImageData(s, 0, 0), e;
    } else if (t.data) {
      const e = t.data.slice(0);
      for (let n = 0; n < e.length; n++) e instanceof Uint8Array || e instanceof Uint8ClampedArray ? e[n] = Math.floor(hn(e[n] / 255) * 255) : e[n] = hn(e[n]);
      return { data: e, width: t.width, height: t.height };
    } else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), t;
  }
}
let gh = 0;
class Ul {
  constructor(t = null) {
    this.isSource = true, Object.defineProperty(this, "id", { value: gh++ }), this.uuid = Yi(), this.data = t, this.dataReady = true, this.version = 0;
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
        for (let a = 0, o = s.length; a < o; a++) s[a].isDataTexture ? r.push(js(s[a].image)) : r.push(js(s[a]));
      } else r = js(s);
      n.url = r;
    }
    return e || (t.images[this.uuid] = n), n;
  }
}
function js(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? mh.getDataURL(i) : i.data ? { data: Array.from(i.data), width: i.width, height: i.height, type: i.data.constructor.name } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let _h = 0;
class Me extends Vn {
  constructor(t = Me.DEFAULT_IMAGE, e = Me.DEFAULT_MAPPING, n = On, s = On, r = $e, a = Bn, o = We, l = un, c = Me.DEFAULT_ANISOTROPY, h = Sn) {
    super(), this.isTexture = true, Object.defineProperty(this, "id", { value: _h++ }), this.uuid = Yi(), this.name = "", this.source = new Ul(t), this.mipmaps = [], this.mapping = e, this.channel = 0, this.wrapS = n, this.wrapT = s, this.magFilter = r, this.minFilter = a, this.anisotropy = c, this.format = o, this.internalFormat = null, this.type = l, this.offset = new it(0, 0), this.repeat = new it(1, 1), this.center = new it(0, 0), this.rotation = 0, this.matrixAutoUpdate = true, this.matrix = new Pt(), this.generateMipmaps = true, this.premultiplyAlpha = false, this.flipY = true, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = false, this.pmremVersion = 0;
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
    if (this.mapping !== yl) return t;
    if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1) switch (this.wrapS) {
      case Gr:
        t.x = t.x - Math.floor(t.x);
        break;
      case On:
        t.x = t.x < 0 ? 0 : 1;
        break;
      case Vr:
        Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
        break;
    }
    if (t.y < 0 || t.y > 1) switch (this.wrapT) {
      case Gr:
        t.y = t.y - Math.floor(t.y);
        break;
      case On:
        t.y = t.y < 0 ? 0 : 1;
        break;
      case Vr:
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
Me.DEFAULT_IMAGE = null;
Me.DEFAULT_MAPPING = yl;
Me.DEFAULT_ANISOTROPY = 1;
class Zt {
  constructor(t = 0, e = 0, n = 0, s = 1) {
    Zt.prototype.isVector4 = true, this.x = t, this.y = e, this.z = n, this.w = s;
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
    const l = t.elements, c = l[0], h = l[4], u = l[8], d = l[1], p = l[5], g = l[9], _ = l[2], m = l[6], f = l[10];
    if (Math.abs(h - d) < 0.01 && Math.abs(u - _) < 0.01 && Math.abs(g - m) < 0.01) {
      if (Math.abs(h + d) < 0.1 && Math.abs(u + _) < 0.1 && Math.abs(g + m) < 0.1 && Math.abs(c + p + f - 3) < 0.1) return this.set(1, 0, 0, 0), this;
      e = Math.PI;
      const T = (c + 1) / 2, y = (p + 1) / 2, N = (f + 1) / 2, w = (h + d) / 4, A = (u + _) / 4, L = (g + m) / 4;
      return T > y && T > N ? T < 0.01 ? (n = 0, s = 0.707106781, r = 0.707106781) : (n = Math.sqrt(T), s = w / n, r = A / n) : y > N ? y < 0.01 ? (n = 0.707106781, s = 0, r = 0.707106781) : (s = Math.sqrt(y), n = w / s, r = L / s) : N < 0.01 ? (n = 0.707106781, s = 0.707106781, r = 0) : (r = Math.sqrt(N), n = A / r, s = L / r), this.set(n, s, r, e), this;
    }
    let E = Math.sqrt((m - g) * (m - g) + (u - _) * (u - _) + (d - h) * (d - h));
    return Math.abs(E) < 1e-3 && (E = 1), this.x = (m - g) / E, this.y = (u - _) / E, this.z = (d - h) / E, this.w = Math.acos((c + p + f - 1) / 2), this;
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
class vh extends Vn {
  constructor(t = 1, e = 1, n = {}) {
    super(), this.isRenderTarget = true, this.width = t, this.height = e, this.depth = 1, this.scissor = new Zt(0, 0, t, e), this.scissorTest = false, this.viewport = new Zt(0, 0, t, e);
    const s = { width: t, height: e, depth: 1 };
    n = Object.assign({ generateMipmaps: false, internalFormat: null, minFilter: $e, depthBuffer: true, stencilBuffer: false, resolveDepthBuffer: true, resolveStencilBuffer: true, depthTexture: null, samples: 0, count: 1 }, n);
    const r = new Me(s, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace);
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
    return this.texture.source = new Ul(e), this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.resolveDepthBuffer = t.resolveDepthBuffer, this.resolveStencilBuffer = t.resolveStencilBuffer, t.depthTexture !== null && (this.depthTexture = t.depthTexture.clone()), this.samples = t.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class Hn extends vh {
  constructor(t = 1, e = 1, n = {}) {
    super(t, e, n), this.isWebGLRenderTarget = true;
  }
}
class Nl extends Me {
  constructor(t = null, e = 1, n = 1, s = 1) {
    super(null), this.isDataArrayTexture = true, this.image = { data: t, width: e, height: n, depth: s }, this.magFilter = Pe, this.minFilter = Pe, this.wrapR = On, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(t) {
    this.layerUpdates.add(t);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class xh extends Me {
  constructor(t = null, e = 1, n = 1, s = 1) {
    super(null), this.isData3DTexture = true, this.image = { data: t, width: e, height: n, depth: s }, this.magFilter = Pe, this.minFilter = Pe, this.wrapR = On, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1;
  }
}
class Gn {
  constructor(t = 0, e = 0, n = 0, s = 1) {
    this.isQuaternion = true, this._x = t, this._y = e, this._z = n, this._w = s;
  }
  static slerpFlat(t, e, n, s, r, a, o) {
    let l = n[s + 0], c = n[s + 1], h = n[s + 2], u = n[s + 3];
    const d = r[a + 0], p = r[a + 1], g = r[a + 2], _ = r[a + 3];
    if (o === 0) {
      t[e + 0] = l, t[e + 1] = c, t[e + 2] = h, t[e + 3] = u;
      return;
    }
    if (o === 1) {
      t[e + 0] = d, t[e + 1] = p, t[e + 2] = g, t[e + 3] = _;
      return;
    }
    if (u !== _ || l !== d || c !== p || h !== g) {
      let m = 1 - o;
      const f = l * d + c * p + h * g + u * _, E = f >= 0 ? 1 : -1, T = 1 - f * f;
      if (T > Number.EPSILON) {
        const N = Math.sqrt(T), w = Math.atan2(N, f * E);
        m = Math.sin(m * w) / N, o = Math.sin(o * w) / N;
      }
      const y = o * E;
      if (l = l * m + d * y, c = c * m + p * y, h = h * m + g * y, u = u * m + _ * y, m === 1 - o) {
        const N = 1 / Math.sqrt(l * l + c * c + h * h + u * u);
        l *= N, c *= N, h *= N, u *= N;
      }
    }
    t[e] = l, t[e + 1] = c, t[e + 2] = h, t[e + 3] = u;
  }
  static multiplyQuaternionsFlat(t, e, n, s, r, a) {
    const o = n[s], l = n[s + 1], c = n[s + 2], h = n[s + 3], u = r[a], d = r[a + 1], p = r[a + 2], g = r[a + 3];
    return t[e] = o * g + h * u + l * p - c * d, t[e + 1] = l * g + h * d + c * u - o * p, t[e + 2] = c * g + h * p + o * d - l * u, t[e + 3] = h * g - o * u - l * d - c * p, t;
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
    const n = t._x, s = t._y, r = t._z, a = t._order, o = Math.cos, l = Math.sin, c = o(n / 2), h = o(s / 2), u = o(r / 2), d = l(n / 2), p = l(s / 2), g = l(r / 2);
    switch (a) {
      case "XYZ":
        this._x = d * h * u + c * p * g, this._y = c * p * u - d * h * g, this._z = c * h * g + d * p * u, this._w = c * h * u - d * p * g;
        break;
      case "YXZ":
        this._x = d * h * u + c * p * g, this._y = c * p * u - d * h * g, this._z = c * h * g - d * p * u, this._w = c * h * u + d * p * g;
        break;
      case "ZXY":
        this._x = d * h * u - c * p * g, this._y = c * p * u + d * h * g, this._z = c * h * g + d * p * u, this._w = c * h * u - d * p * g;
        break;
      case "ZYX":
        this._x = d * h * u - c * p * g, this._y = c * p * u + d * h * g, this._z = c * h * g - d * p * u, this._w = c * h * u + d * p * g;
        break;
      case "YZX":
        this._x = d * h * u + c * p * g, this._y = c * p * u + d * h * g, this._z = c * h * g - d * p * u, this._w = c * h * u - d * p * g;
        break;
      case "XZY":
        this._x = d * h * u - c * p * g, this._y = c * p * u - d * h * g, this._z = c * h * g + d * p * u, this._w = c * h * u + d * p * g;
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
    const e = t.elements, n = e[0], s = e[4], r = e[8], a = e[1], o = e[5], l = e[9], c = e[2], h = e[6], u = e[10], d = n + o + u;
    if (d > 0) {
      const p = 0.5 / Math.sqrt(d + 1);
      this._w = 0.25 / p, this._x = (h - l) * p, this._y = (r - c) * p, this._z = (a - s) * p;
    } else if (n > o && n > u) {
      const p = 2 * Math.sqrt(1 + n - o - u);
      this._w = (h - l) / p, this._x = 0.25 * p, this._y = (s + a) / p, this._z = (r + c) / p;
    } else if (o > u) {
      const p = 2 * Math.sqrt(1 + o - n - u);
      this._w = (r - c) / p, this._x = (s + a) / p, this._y = 0.25 * p, this._z = (l + h) / p;
    } else {
      const p = 2 * Math.sqrt(1 + u - n - o);
      this._w = (a - s) / p, this._x = (r + c) / p, this._y = (l + h) / p, this._z = 0.25 * p;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(t, e) {
    let n = t.dot(e) + 1;
    return n < Number.EPSILON ? (n = 0, Math.abs(t.x) > Math.abs(t.z) ? (this._x = -t.y, this._y = t.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -t.z, this._z = t.y, this._w = n)) : (this._x = t.y * e.z - t.z * e.y, this._y = t.z * e.x - t.x * e.z, this._z = t.x * e.y - t.y * e.x, this._w = n), this.normalize();
  }
  angleTo(t) {
    return 2 * Math.acos(Math.abs(le(this.dot(t), -1, 1)));
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
      const p = 1 - e;
      return this._w = p * a + e * this._w, this._x = p * n + e * this._x, this._y = p * s + e * this._y, this._z = p * r + e * this._z, this.normalize(), this;
    }
    const c = Math.sqrt(l), h = Math.atan2(c, o), u = Math.sin((1 - e) * h) / c, d = Math.sin(e * h) / c;
    return this._w = a * u + this._w * d, this._x = n * u + this._x * d, this._y = s * u + this._y * d, this._z = r * u + this._z * d, this._onChangeCallback(), this;
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
class C {
  constructor(t = 0, e = 0, n = 0) {
    C.prototype.isVector3 = true, this.x = t, this.y = e, this.z = n;
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
    return this.applyQuaternion(co.setFromEuler(t));
  }
  applyAxisAngle(t, e) {
    return this.applyQuaternion(co.setFromAxisAngle(t, e));
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
    const e = this.x, n = this.y, s = this.z, r = t.x, a = t.y, o = t.z, l = t.w, c = 2 * (a * s - o * n), h = 2 * (o * e - r * s), u = 2 * (r * n - a * e);
    return this.x = e + l * c + a * u - o * h, this.y = n + l * h + o * c - r * u, this.z = s + l * u + r * h - a * c, this;
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
    return Ks.copy(this).projectOnVector(t), this.sub(Ks);
  }
  reflect(t) {
    return this.sub(Ks.copy(t).multiplyScalar(2 * this.dot(t)));
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(le(n, -1, 1));
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
const Ks = new C(), co = new Gn();
class Wn {
  constructor(t = new C(1 / 0, 1 / 0, 1 / 0), e = new C(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = true, this.min = t, this.max = e;
  }
  set(t, e) {
    return this.min.copy(t), this.max.copy(e), this;
  }
  setFromArray(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e += 3) this.expandByPoint(He.fromArray(t, e));
    return this;
  }
  setFromBufferAttribute(t) {
    this.makeEmpty();
    for (let e = 0, n = t.count; e < n; e++) this.expandByPoint(He.fromBufferAttribute(t, e));
    return this;
  }
  setFromPoints(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e]);
    return this;
  }
  setFromCenterAndSize(t, e) {
    const n = He.copy(e).multiplyScalar(0.5);
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
      if (e === true && r !== void 0 && t.isInstancedMesh !== true) for (let a = 0, o = r.count; a < o; a++) t.isMesh === true ? t.getVertexPosition(a, He) : He.fromBufferAttribute(r, a), He.applyMatrix4(t.matrixWorld), this.expandByPoint(He);
      else t.boundingBox !== void 0 ? (t.boundingBox === null && t.computeBoundingBox(), Qi.copy(t.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), Qi.copy(n.boundingBox)), Qi.applyMatrix4(t.matrixWorld), this.union(Qi);
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
    return this.clampPoint(t.center, He), He.distanceToSquared(t.center) <= t.radius * t.radius;
  }
  intersectsPlane(t) {
    let e, n;
    return t.normal.x > 0 ? (e = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, n = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, n += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, n += t.normal.z * this.min.z), e <= -t.constant && n >= -t.constant;
  }
  intersectsTriangle(t) {
    if (this.isEmpty()) return false;
    this.getCenter(Ci), ts.subVectors(this.max, Ci), Zn.subVectors(t.a, Ci), jn.subVectors(t.b, Ci), Kn.subVectors(t.c, Ci), mn.subVectors(jn, Zn), gn.subVectors(Kn, jn), wn.subVectors(Zn, Kn);
    let e = [0, -mn.z, mn.y, 0, -gn.z, gn.y, 0, -wn.z, wn.y, mn.z, 0, -mn.x, gn.z, 0, -gn.x, wn.z, 0, -wn.x, -mn.y, mn.x, 0, -gn.y, gn.x, 0, -wn.y, wn.x, 0];
    return !Js(e, Zn, jn, Kn, ts) || (e = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Js(e, Zn, jn, Kn, ts)) ? false : (es.crossVectors(mn, gn), e = [es.x, es.y, es.z], Js(e, Zn, jn, Kn, ts));
  }
  clampPoint(t, e) {
    return e.copy(t).clamp(this.min, this.max);
  }
  distanceToPoint(t) {
    return this.clampPoint(t, He).distanceTo(t);
  }
  getBoundingSphere(t) {
    return this.isEmpty() ? t.makeEmpty() : (this.getCenter(t.center), t.radius = this.getSize(He).length() * 0.5), t;
  }
  intersect(t) {
    return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(t) {
    return this.min.min(t.min), this.max.max(t.max), this;
  }
  applyMatrix4(t) {
    return this.isEmpty() ? this : (nn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), nn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), nn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), nn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), nn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), nn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), nn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), nn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(nn), this);
  }
  translate(t) {
    return this.min.add(t), this.max.add(t), this;
  }
  equals(t) {
    return t.min.equals(this.min) && t.max.equals(this.max);
  }
}
const nn = [new C(), new C(), new C(), new C(), new C(), new C(), new C(), new C()], He = new C(), Qi = new Wn(), Zn = new C(), jn = new C(), Kn = new C(), mn = new C(), gn = new C(), wn = new C(), Ci = new C(), ts = new C(), es = new C(), Cn = new C();
function Js(i, t, e, n, s) {
  for (let r = 0, a = i.length - 3; r <= a; r += 3) {
    Cn.fromArray(i, r);
    const o = s.x * Math.abs(Cn.x) + s.y * Math.abs(Cn.y) + s.z * Math.abs(Cn.z), l = t.dot(Cn), c = e.dot(Cn), h = n.dot(Cn);
    if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > o) return false;
  }
  return true;
}
const Mh = new Wn(), Ri = new C(), Qs = new C();
class Si {
  constructor(t = new C(), e = -1) {
    this.isSphere = true, this.center = t, this.radius = e;
  }
  set(t, e) {
    return this.center.copy(t), this.radius = e, this;
  }
  setFromPoints(t, e) {
    const n = this.center;
    e !== void 0 ? n.copy(e) : Mh.setFromPoints(t).getCenter(n);
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
    Ri.subVectors(t, this.center);
    const e = Ri.lengthSq();
    if (e > this.radius * this.radius) {
      const n = Math.sqrt(e), s = (n - this.radius) * 0.5;
      this.center.addScaledVector(Ri, s / n), this.radius += s;
    }
    return this;
  }
  union(t) {
    return t.isEmpty() ? this : this.isEmpty() ? (this.copy(t), this) : (this.center.equals(t.center) === true ? this.radius = Math.max(this.radius, t.radius) : (Qs.subVectors(t.center, this.center).setLength(t.radius), this.expandByPoint(Ri.copy(t.center).add(Qs)), this.expandByPoint(Ri.copy(t.center).sub(Qs))), this);
  }
  equals(t) {
    return t.center.equals(this.center) && t.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const sn = new C(), tr = new C(), ns = new C(), _n = new C(), er = new C(), is = new C(), nr = new C();
class Ca {
  constructor(t = new C(), e = new C(0, 0, -1)) {
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
    return this.origin.copy(this.at(t, sn)), this;
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
    const e = sn.subVectors(t, this.origin).dot(this.direction);
    return e < 0 ? this.origin.distanceToSquared(t) : (sn.copy(this.origin).addScaledVector(this.direction, e), sn.distanceToSquared(t));
  }
  distanceSqToSegment(t, e, n, s) {
    tr.copy(t).add(e).multiplyScalar(0.5), ns.copy(e).sub(t).normalize(), _n.copy(this.origin).sub(tr);
    const r = t.distanceTo(e) * 0.5, a = -this.direction.dot(ns), o = _n.dot(this.direction), l = -_n.dot(ns), c = _n.lengthSq(), h = Math.abs(1 - a * a);
    let u, d, p, g;
    if (h > 0) if (u = a * l - o, d = a * o - l, g = r * h, u >= 0) if (d >= -g) if (d <= g) {
      const _ = 1 / h;
      u *= _, d *= _, p = u * (u + a * d + 2 * o) + d * (a * u + d + 2 * l) + c;
    } else d = r, u = Math.max(0, -(a * d + o)), p = -u * u + d * (d + 2 * l) + c;
    else d = -r, u = Math.max(0, -(a * d + o)), p = -u * u + d * (d + 2 * l) + c;
    else d <= -g ? (u = Math.max(0, -(-a * r + o)), d = u > 0 ? -r : Math.min(Math.max(-r, -l), r), p = -u * u + d * (d + 2 * l) + c) : d <= g ? (u = 0, d = Math.min(Math.max(-r, -l), r), p = d * (d + 2 * l) + c) : (u = Math.max(0, -(a * r + o)), d = u > 0 ? r : Math.min(Math.max(-r, -l), r), p = -u * u + d * (d + 2 * l) + c);
    else d = a > 0 ? -r : r, u = Math.max(0, -(a * d + o)), p = -u * u + d * (d + 2 * l) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, u), s && s.copy(tr).addScaledVector(ns, d), p;
  }
  intersectSphere(t, e) {
    sn.subVectors(t.center, this.origin);
    const n = sn.dot(this.direction), s = sn.dot(sn) - n * n, r = t.radius * t.radius;
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
    const c = 1 / this.direction.x, h = 1 / this.direction.y, u = 1 / this.direction.z, d = this.origin;
    return c >= 0 ? (n = (t.min.x - d.x) * c, s = (t.max.x - d.x) * c) : (n = (t.max.x - d.x) * c, s = (t.min.x - d.x) * c), h >= 0 ? (r = (t.min.y - d.y) * h, a = (t.max.y - d.y) * h) : (r = (t.max.y - d.y) * h, a = (t.min.y - d.y) * h), n > a || r > s || ((r > n || isNaN(n)) && (n = r), (a < s || isNaN(s)) && (s = a), u >= 0 ? (o = (t.min.z - d.z) * u, l = (t.max.z - d.z) * u) : (o = (t.max.z - d.z) * u, l = (t.min.z - d.z) * u), n > l || o > s) || ((o > n || n !== n) && (n = o), (l < s || s !== s) && (s = l), s < 0) ? null : this.at(n >= 0 ? n : s, e);
  }
  intersectsBox(t) {
    return this.intersectBox(t, sn) !== null;
  }
  intersectTriangle(t, e, n, s, r) {
    er.subVectors(e, t), is.subVectors(n, t), nr.crossVectors(er, is);
    let a = this.direction.dot(nr), o;
    if (a > 0) {
      if (s) return null;
      o = 1;
    } else if (a < 0) o = -1, a = -a;
    else return null;
    _n.subVectors(this.origin, t);
    const l = o * this.direction.dot(is.crossVectors(_n, is));
    if (l < 0) return null;
    const c = o * this.direction.dot(er.cross(_n));
    if (c < 0 || l + c > a) return null;
    const h = -o * _n.dot(nr);
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
class Xt {
  constructor(t, e, n, s, r, a, o, l, c, h, u, d, p, g, _, m) {
    Xt.prototype.isMatrix4 = true, this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], t !== void 0 && this.set(t, e, n, s, r, a, o, l, c, h, u, d, p, g, _, m);
  }
  set(t, e, n, s, r, a, o, l, c, h, u, d, p, g, _, m) {
    const f = this.elements;
    return f[0] = t, f[4] = e, f[8] = n, f[12] = s, f[1] = r, f[5] = a, f[9] = o, f[13] = l, f[2] = c, f[6] = h, f[10] = u, f[14] = d, f[3] = p, f[7] = g, f[11] = _, f[15] = m, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new Xt().fromArray(this.elements);
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
    const e = this.elements, n = t.elements, s = 1 / Jn.setFromMatrixColumn(t, 0).length(), r = 1 / Jn.setFromMatrixColumn(t, 1).length(), a = 1 / Jn.setFromMatrixColumn(t, 2).length();
    return e[0] = n[0] * s, e[1] = n[1] * s, e[2] = n[2] * s, e[3] = 0, e[4] = n[4] * r, e[5] = n[5] * r, e[6] = n[6] * r, e[7] = 0, e[8] = n[8] * a, e[9] = n[9] * a, e[10] = n[10] * a, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
  }
  makeRotationFromEuler(t) {
    const e = this.elements, n = t.x, s = t.y, r = t.z, a = Math.cos(n), o = Math.sin(n), l = Math.cos(s), c = Math.sin(s), h = Math.cos(r), u = Math.sin(r);
    if (t.order === "XYZ") {
      const d = a * h, p = a * u, g = o * h, _ = o * u;
      e[0] = l * h, e[4] = -l * u, e[8] = c, e[1] = p + g * c, e[5] = d - _ * c, e[9] = -o * l, e[2] = _ - d * c, e[6] = g + p * c, e[10] = a * l;
    } else if (t.order === "YXZ") {
      const d = l * h, p = l * u, g = c * h, _ = c * u;
      e[0] = d + _ * o, e[4] = g * o - p, e[8] = a * c, e[1] = a * u, e[5] = a * h, e[9] = -o, e[2] = p * o - g, e[6] = _ + d * o, e[10] = a * l;
    } else if (t.order === "ZXY") {
      const d = l * h, p = l * u, g = c * h, _ = c * u;
      e[0] = d - _ * o, e[4] = -a * u, e[8] = g + p * o, e[1] = p + g * o, e[5] = a * h, e[9] = _ - d * o, e[2] = -a * c, e[6] = o, e[10] = a * l;
    } else if (t.order === "ZYX") {
      const d = a * h, p = a * u, g = o * h, _ = o * u;
      e[0] = l * h, e[4] = g * c - p, e[8] = d * c + _, e[1] = l * u, e[5] = _ * c + d, e[9] = p * c - g, e[2] = -c, e[6] = o * l, e[10] = a * l;
    } else if (t.order === "YZX") {
      const d = a * l, p = a * c, g = o * l, _ = o * c;
      e[0] = l * h, e[4] = _ - d * u, e[8] = g * u + p, e[1] = u, e[5] = a * h, e[9] = -o * h, e[2] = -c * h, e[6] = p * u + g, e[10] = d - _ * u;
    } else if (t.order === "XZY") {
      const d = a * l, p = a * c, g = o * l, _ = o * c;
      e[0] = l * h, e[4] = -u, e[8] = c * h, e[1] = d * u + _, e[5] = a * h, e[9] = p * u - g, e[2] = g * u - p, e[6] = o * h, e[10] = _ * u + d;
    }
    return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
  }
  makeRotationFromQuaternion(t) {
    return this.compose(yh, t, Sh);
  }
  lookAt(t, e, n) {
    const s = this.elements;
    return Ae.subVectors(t, e), Ae.lengthSq() === 0 && (Ae.z = 1), Ae.normalize(), vn.crossVectors(n, Ae), vn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Ae.x += 1e-4 : Ae.z += 1e-4, Ae.normalize(), vn.crossVectors(n, Ae)), vn.normalize(), ss.crossVectors(Ae, vn), s[0] = vn.x, s[4] = ss.x, s[8] = Ae.x, s[1] = vn.y, s[5] = ss.y, s[9] = Ae.y, s[2] = vn.z, s[6] = ss.z, s[10] = Ae.z, this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements, s = e.elements, r = this.elements, a = n[0], o = n[4], l = n[8], c = n[12], h = n[1], u = n[5], d = n[9], p = n[13], g = n[2], _ = n[6], m = n[10], f = n[14], E = n[3], T = n[7], y = n[11], N = n[15], w = s[0], A = s[4], L = s[8], S = s[12], M = s[1], R = s[5], k = s[9], z = s[13], W = s[2], Z = s[6], V = s[10], K = s[14], G = s[3], st = s[7], ht = s[11], Mt = s[15];
    return r[0] = a * w + o * M + l * W + c * G, r[4] = a * A + o * R + l * Z + c * st, r[8] = a * L + o * k + l * V + c * ht, r[12] = a * S + o * z + l * K + c * Mt, r[1] = h * w + u * M + d * W + p * G, r[5] = h * A + u * R + d * Z + p * st, r[9] = h * L + u * k + d * V + p * ht, r[13] = h * S + u * z + d * K + p * Mt, r[2] = g * w + _ * M + m * W + f * G, r[6] = g * A + _ * R + m * Z + f * st, r[10] = g * L + _ * k + m * V + f * ht, r[14] = g * S + _ * z + m * K + f * Mt, r[3] = E * w + T * M + y * W + N * G, r[7] = E * A + T * R + y * Z + N * st, r[11] = E * L + T * k + y * V + N * ht, r[15] = E * S + T * z + y * K + N * Mt, this;
  }
  multiplyScalar(t) {
    const e = this.elements;
    return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this;
  }
  determinant() {
    const t = this.elements, e = t[0], n = t[4], s = t[8], r = t[12], a = t[1], o = t[5], l = t[9], c = t[13], h = t[2], u = t[6], d = t[10], p = t[14], g = t[3], _ = t[7], m = t[11], f = t[15];
    return g * (+r * l * u - s * c * u - r * o * d + n * c * d + s * o * p - n * l * p) + _ * (+e * l * p - e * c * d + r * a * d - s * a * p + s * c * h - r * l * h) + m * (+e * c * u - e * o * p - r * a * u + n * a * p + r * o * h - n * c * h) + f * (-s * o * h - e * l * u + e * o * d + s * a * u - n * a * d + n * l * h);
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
    const t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8], u = t[9], d = t[10], p = t[11], g = t[12], _ = t[13], m = t[14], f = t[15], E = u * m * c - _ * d * c + _ * l * p - o * m * p - u * l * f + o * d * f, T = g * d * c - h * m * c - g * l * p + a * m * p + h * l * f - a * d * f, y = h * _ * c - g * u * c + g * o * p - a * _ * p - h * o * f + a * u * f, N = g * u * l - h * _ * l - g * o * d + a * _ * d + h * o * m - a * u * m, w = e * E + n * T + s * y + r * N;
    if (w === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const A = 1 / w;
    return t[0] = E * A, t[1] = (_ * d * r - u * m * r - _ * s * p + n * m * p + u * s * f - n * d * f) * A, t[2] = (o * m * r - _ * l * r + _ * s * c - n * m * c - o * s * f + n * l * f) * A, t[3] = (u * l * r - o * d * r - u * s * c + n * d * c + o * s * p - n * l * p) * A, t[4] = T * A, t[5] = (h * m * r - g * d * r + g * s * p - e * m * p - h * s * f + e * d * f) * A, t[6] = (g * l * r - a * m * r - g * s * c + e * m * c + a * s * f - e * l * f) * A, t[7] = (a * d * r - h * l * r + h * s * c - e * d * c - a * s * p + e * l * p) * A, t[8] = y * A, t[9] = (g * u * r - h * _ * r - g * n * p + e * _ * p + h * n * f - e * u * f) * A, t[10] = (a * _ * r - g * o * r + g * n * c - e * _ * c - a * n * f + e * o * f) * A, t[11] = (h * o * r - a * u * r - h * n * c + e * u * c + a * n * p - e * o * p) * A, t[12] = N * A, t[13] = (h * _ * s - g * u * s + g * n * d - e * _ * d - h * n * m + e * u * m) * A, t[14] = (g * o * s - a * _ * s - g * n * l + e * _ * l + a * n * m - e * o * m) * A, t[15] = (a * u * s - h * o * s + h * n * l - e * u * l - a * n * d + e * o * d) * A, this;
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
    const s = this.elements, r = e._x, a = e._y, o = e._z, l = e._w, c = r + r, h = a + a, u = o + o, d = r * c, p = r * h, g = r * u, _ = a * h, m = a * u, f = o * u, E = l * c, T = l * h, y = l * u, N = n.x, w = n.y, A = n.z;
    return s[0] = (1 - (_ + f)) * N, s[1] = (p + y) * N, s[2] = (g - T) * N, s[3] = 0, s[4] = (p - y) * w, s[5] = (1 - (d + f)) * w, s[6] = (m + E) * w, s[7] = 0, s[8] = (g + T) * A, s[9] = (m - E) * A, s[10] = (1 - (d + _)) * A, s[11] = 0, s[12] = t.x, s[13] = t.y, s[14] = t.z, s[15] = 1, this;
  }
  decompose(t, e, n) {
    const s = this.elements;
    let r = Jn.set(s[0], s[1], s[2]).length();
    const a = Jn.set(s[4], s[5], s[6]).length(), o = Jn.set(s[8], s[9], s[10]).length();
    this.determinant() < 0 && (r = -r), t.x = s[12], t.y = s[13], t.z = s[14], Ge.copy(this);
    const c = 1 / r, h = 1 / a, u = 1 / o;
    return Ge.elements[0] *= c, Ge.elements[1] *= c, Ge.elements[2] *= c, Ge.elements[4] *= h, Ge.elements[5] *= h, Ge.elements[6] *= h, Ge.elements[8] *= u, Ge.elements[9] *= u, Ge.elements[10] *= u, e.setFromRotationMatrix(Ge), n.x = r, n.y = a, n.z = o, this;
  }
  makePerspective(t, e, n, s, r, a, o = cn) {
    const l = this.elements, c = 2 * r / (e - t), h = 2 * r / (n - s), u = (e + t) / (e - t), d = (n + s) / (n - s);
    let p, g;
    if (o === cn) p = -(a + r) / (a - r), g = -2 * a * r / (a - r);
    else if (o === Ns) p = -a / (a - r), g = -a * r / (a - r);
    else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return l[0] = c, l[4] = 0, l[8] = u, l[12] = 0, l[1] = 0, l[5] = h, l[9] = d, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = p, l[14] = g, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(t, e, n, s, r, a, o = cn) {
    const l = this.elements, c = 1 / (e - t), h = 1 / (n - s), u = 1 / (a - r), d = (e + t) * c, p = (n + s) * h;
    let g, _;
    if (o === cn) g = (a + r) * u, _ = -2 * u;
    else if (o === Ns) g = r * u, _ = -1 * u;
    else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return l[0] = 2 * c, l[4] = 0, l[8] = 0, l[12] = -d, l[1] = 0, l[5] = 2 * h, l[9] = 0, l[13] = -p, l[2] = 0, l[6] = 0, l[10] = _, l[14] = -g, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
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
const Jn = new C(), Ge = new Xt(), yh = new C(0, 0, 0), Sh = new C(1, 1, 1), vn = new C(), ss = new C(), Ae = new C(), ho = new Xt(), uo = new Gn();
class Ke {
  constructor(t = 0, e = 0, n = 0, s = Ke.DEFAULT_ORDER) {
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
    const s = t.elements, r = s[0], a = s[4], o = s[8], l = s[1], c = s[5], h = s[9], u = s[2], d = s[6], p = s[10];
    switch (e) {
      case "XYZ":
        this._y = Math.asin(le(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-h, p), this._z = Math.atan2(-a, r)) : (this._x = Math.atan2(d, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-le(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(o, p), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-u, r), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(le(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._y = Math.atan2(-u, p), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(l, r));
        break;
      case "ZYX":
        this._y = Math.asin(-le(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(d, p), this._z = Math.atan2(l, r)) : (this._x = 0, this._z = Math.atan2(-a, c));
        break;
      case "YZX":
        this._z = Math.asin(le(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-h, c), this._y = Math.atan2(-u, r)) : (this._x = 0, this._y = Math.atan2(o, p));
        break;
      case "XZY":
        this._z = Math.asin(-le(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(o, r)) : (this._x = Math.atan2(-h, p), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e);
    }
    return this._order = e, n === true && this._onChangeCallback(), this;
  }
  setFromQuaternion(t, e, n) {
    return ho.makeRotationFromQuaternion(t), this.setFromRotationMatrix(ho, e, n);
  }
  setFromVector3(t, e = this._order) {
    return this.set(t.x, t.y, t.z, e);
  }
  reorder(t) {
    return uo.setFromEuler(this), this.setFromQuaternion(uo, t);
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
Ke.DEFAULT_ORDER = "XYZ";
class Fl {
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
let Eh = 0;
const fo = new C(), Qn = new Gn(), rn = new Xt(), rs = new C(), Pi = new C(), bh = new C(), Th = new Gn(), po = new C(1, 0, 0), mo = new C(0, 1, 0), go = new C(0, 0, 1), _o = { type: "added" }, Ah = { type: "removed" }, ti = { type: "childadded", child: null }, ir = { type: "childremoved", child: null };
class fe extends Vn {
  constructor() {
    super(), this.isObject3D = true, Object.defineProperty(this, "id", { value: Eh++ }), this.uuid = Yi(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = fe.DEFAULT_UP.clone();
    const t = new C(), e = new Ke(), n = new Gn(), s = new C(1, 1, 1);
    function r() {
      n.setFromEuler(e, false);
    }
    function a() {
      e.setFromQuaternion(n, void 0, false);
    }
    e._onChange(r), n._onChange(a), Object.defineProperties(this, { position: { configurable: true, enumerable: true, value: t }, rotation: { configurable: true, enumerable: true, value: e }, quaternion: { configurable: true, enumerable: true, value: n }, scale: { configurable: true, enumerable: true, value: s }, modelViewMatrix: { value: new Xt() }, normalMatrix: { value: new Pt() } }), this.matrix = new Xt(), this.matrixWorld = new Xt(), this.matrixAutoUpdate = fe.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = false, this.layers = new Fl(), this.visible = true, this.castShadow = false, this.receiveShadow = false, this.frustumCulled = true, this.renderOrder = 0, this.animations = [], this.userData = {};
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
    return Qn.setFromAxisAngle(t, e), this.quaternion.multiply(Qn), this;
  }
  rotateOnWorldAxis(t, e) {
    return Qn.setFromAxisAngle(t, e), this.quaternion.premultiply(Qn), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(po, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(mo, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(go, t);
  }
  translateOnAxis(t, e) {
    return fo.copy(t).applyQuaternion(this.quaternion), this.position.add(fo.multiplyScalar(e)), this;
  }
  translateX(t) {
    return this.translateOnAxis(po, t);
  }
  translateY(t) {
    return this.translateOnAxis(mo, t);
  }
  translateZ(t) {
    return this.translateOnAxis(go, t);
  }
  localToWorld(t) {
    return this.updateWorldMatrix(true, false), t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return this.updateWorldMatrix(true, false), t.applyMatrix4(rn.copy(this.matrixWorld).invert());
  }
  lookAt(t, e, n) {
    t.isVector3 ? rs.copy(t) : rs.set(t, e, n);
    const s = this.parent;
    this.updateWorldMatrix(true, false), Pi.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? rn.lookAt(Pi, rs, this.up) : rn.lookAt(rs, Pi, this.up), this.quaternion.setFromRotationMatrix(rn), s && (rn.extractRotation(s.matrixWorld), Qn.setFromRotationMatrix(rn), this.quaternion.premultiply(Qn.invert()));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
      return this;
    }
    return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(_o), ti.child = t, this.dispatchEvent(ti), ti.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++) this.remove(arguments[n]);
      return this;
    }
    const e = this.children.indexOf(t);
    return e !== -1 && (t.parent = null, this.children.splice(e, 1), t.dispatchEvent(Ah), ir.child = t, this.dispatchEvent(ir), ir.child = null), this;
  }
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return this.updateWorldMatrix(true, false), rn.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(true, false), rn.multiply(t.parent.matrixWorld)), t.applyMatrix4(rn), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(false, true), t.dispatchEvent(_o), ti.child = t, this.dispatchEvent(ti), ti.child = null, this;
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
    return this.updateWorldMatrix(true, false), this.matrixWorld.decompose(Pi, t, bh), t;
  }
  getWorldScale(t) {
    return this.updateWorldMatrix(true, false), this.matrixWorld.decompose(Pi, Th, t), t;
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
          const u = l[c];
          r(t.shapes, u);
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
      const o = a(t.geometries), l = a(t.materials), c = a(t.textures), h = a(t.images), u = a(t.shapes), d = a(t.skeletons), p = a(t.animations), g = a(t.nodes);
      o.length > 0 && (n.geometries = o), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), h.length > 0 && (n.images = h), u.length > 0 && (n.shapes = u), d.length > 0 && (n.skeletons = d), p.length > 0 && (n.animations = p), g.length > 0 && (n.nodes = g);
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
fe.DEFAULT_UP = new C(0, 1, 0);
fe.DEFAULT_MATRIX_AUTO_UPDATE = true;
fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = true;
const Ve = new C(), an = new C(), sr = new C(), on = new C(), ei = new C(), ni = new C(), vo = new C(), rr = new C(), ar = new C(), or = new C(), lr = new Zt(), cr = new Zt(), hr = new Zt();
class Oe {
  constructor(t = new C(), e = new C(), n = new C()) {
    this.a = t, this.b = e, this.c = n;
  }
  static getNormal(t, e, n, s) {
    s.subVectors(n, e), Ve.subVectors(t, e), s.cross(Ve);
    const r = s.lengthSq();
    return r > 0 ? s.multiplyScalar(1 / Math.sqrt(r)) : s.set(0, 0, 0);
  }
  static getBarycoord(t, e, n, s, r) {
    Ve.subVectors(s, e), an.subVectors(n, e), sr.subVectors(t, e);
    const a = Ve.dot(Ve), o = Ve.dot(an), l = Ve.dot(sr), c = an.dot(an), h = an.dot(sr), u = a * c - o * o;
    if (u === 0) return r.set(0, 0, 0), null;
    const d = 1 / u, p = (c * l - o * h) * d, g = (a * h - o * l) * d;
    return r.set(1 - p - g, g, p);
  }
  static containsPoint(t, e, n, s) {
    return this.getBarycoord(t, e, n, s, on) === null ? false : on.x >= 0 && on.y >= 0 && on.x + on.y <= 1;
  }
  static getInterpolation(t, e, n, s, r, a, o, l) {
    return this.getBarycoord(t, e, n, s, on) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(r, on.x), l.addScaledVector(a, on.y), l.addScaledVector(o, on.z), l);
  }
  static getInterpolatedAttribute(t, e, n, s, r, a) {
    return lr.setScalar(0), cr.setScalar(0), hr.setScalar(0), lr.fromBufferAttribute(t, e), cr.fromBufferAttribute(t, n), hr.fromBufferAttribute(t, s), a.setScalar(0), a.addScaledVector(lr, r.x), a.addScaledVector(cr, r.y), a.addScaledVector(hr, r.z), a;
  }
  static isFrontFacing(t, e, n, s) {
    return Ve.subVectors(n, e), an.subVectors(t, e), Ve.cross(an).dot(s) < 0;
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
    return Ve.subVectors(this.c, this.b), an.subVectors(this.a, this.b), Ve.cross(an).length() * 0.5;
  }
  getMidpoint(t) {
    return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return Oe.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, e) {
    return Oe.getBarycoord(t, this.a, this.b, this.c, e);
  }
  getInterpolation(t, e, n, s, r) {
    return Oe.getInterpolation(t, this.a, this.b, this.c, e, n, s, r);
  }
  containsPoint(t) {
    return Oe.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return Oe.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, e) {
    const n = this.a, s = this.b, r = this.c;
    let a, o;
    ei.subVectors(s, n), ni.subVectors(r, n), rr.subVectors(t, n);
    const l = ei.dot(rr), c = ni.dot(rr);
    if (l <= 0 && c <= 0) return e.copy(n);
    ar.subVectors(t, s);
    const h = ei.dot(ar), u = ni.dot(ar);
    if (h >= 0 && u <= h) return e.copy(s);
    const d = l * u - h * c;
    if (d <= 0 && l >= 0 && h <= 0) return a = l / (l - h), e.copy(n).addScaledVector(ei, a);
    or.subVectors(t, r);
    const p = ei.dot(or), g = ni.dot(or);
    if (g >= 0 && p <= g) return e.copy(r);
    const _ = p * c - l * g;
    if (_ <= 0 && c >= 0 && g <= 0) return o = c / (c - g), e.copy(n).addScaledVector(ni, o);
    const m = h * g - p * u;
    if (m <= 0 && u - h >= 0 && p - g >= 0) return vo.subVectors(r, s), o = (u - h) / (u - h + (p - g)), e.copy(s).addScaledVector(vo, o);
    const f = 1 / (m + _ + d);
    return a = _ * f, o = d * f, e.copy(n).addScaledVector(ei, a).addScaledVector(ni, o);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}
const Ol = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 }, xn = { h: 0, s: 0, l: 0 }, as = { h: 0, s: 0, l: 0 };
function ur(i, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * 6 * (2 / 3 - e) : i;
}
class It {
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
  setHex(t, e = Fe) {
    return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (t & 255) / 255, Ht.toWorkingColorSpace(this, e), this;
  }
  setRGB(t, e, n, s = Ht.workingColorSpace) {
    return this.r = t, this.g = e, this.b = n, Ht.toWorkingColorSpace(this, s), this;
  }
  setHSL(t, e, n, s = Ht.workingColorSpace) {
    if (t = ch(t, 1), e = le(e, 0, 1), n = le(n, 0, 1), e === 0) this.r = this.g = this.b = n;
    else {
      const r = n <= 0.5 ? n * (1 + e) : n + e - n * e, a = 2 * n - r;
      this.r = ur(a, r, t + 1 / 3), this.g = ur(a, r, t), this.b = ur(a, r, t - 1 / 3);
    }
    return Ht.toWorkingColorSpace(this, s), this;
  }
  setStyle(t, e = Fe) {
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
  setColorName(t, e = Fe) {
    const n = Ol[t.toLowerCase()];
    return n !== void 0 ? this.setHex(n, e) : console.warn("THREE.Color: Unknown color " + t), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(t) {
    return this.r = t.r, this.g = t.g, this.b = t.b, this;
  }
  copySRGBToLinear(t) {
    return this.r = hn(t.r), this.g = hn(t.g), this.b = hn(t.b), this;
  }
  copyLinearToSRGB(t) {
    return this.r = fi(t.r), this.g = fi(t.g), this.b = fi(t.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(t = Fe) {
    return Ht.fromWorkingColorSpace(ge.copy(this), t), Math.round(le(ge.r * 255, 0, 255)) * 65536 + Math.round(le(ge.g * 255, 0, 255)) * 256 + Math.round(le(ge.b * 255, 0, 255));
  }
  getHexString(t = Fe) {
    return ("000000" + this.getHex(t).toString(16)).slice(-6);
  }
  getHSL(t, e = Ht.workingColorSpace) {
    Ht.fromWorkingColorSpace(ge.copy(this), e);
    const n = ge.r, s = ge.g, r = ge.b, a = Math.max(n, s, r), o = Math.min(n, s, r);
    let l, c;
    const h = (o + a) / 2;
    if (o === a) l = 0, c = 0;
    else {
      const u = a - o;
      switch (c = h <= 0.5 ? u / (a + o) : u / (2 - a - o), a) {
        case n:
          l = (s - r) / u + (s < r ? 6 : 0);
          break;
        case s:
          l = (r - n) / u + 2;
          break;
        case r:
          l = (n - s) / u + 4;
          break;
      }
      l /= 6;
    }
    return t.h = l, t.s = c, t.l = h, t;
  }
  getRGB(t, e = Ht.workingColorSpace) {
    return Ht.fromWorkingColorSpace(ge.copy(this), e), t.r = ge.r, t.g = ge.g, t.b = ge.b, t;
  }
  getStyle(t = Fe) {
    Ht.fromWorkingColorSpace(ge.copy(this), t);
    const e = ge.r, n = ge.g, s = ge.b;
    return t !== Fe ? `color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})` : `rgb(${Math.round(e * 255)},${Math.round(n * 255)},${Math.round(s * 255)})`;
  }
  offsetHSL(t, e, n) {
    return this.getHSL(xn), this.setHSL(xn.h + t, xn.s + e, xn.l + n);
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
    this.getHSL(xn), t.getHSL(as);
    const n = $s(xn.h, as.h, e), s = $s(xn.s, as.s, e), r = $s(xn.l, as.l, e);
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
const ge = new It();
It.NAMES = Ol;
let wh = 0;
class Ei extends Vn {
  static get type() {
    return "Material";
  }
  get type() {
    return this.constructor.type;
  }
  set type(t) {
  }
  constructor() {
    super(), this.isMaterial = true, Object.defineProperty(this, "id", { value: wh++ }), this.uuid = Yi(), this.name = "", this.blending = ui, this.side = Tn, this.vertexColors = false, this.opacity = 1, this.transparent = false, this.alphaHash = false, this.blendSrc = Lr, this.blendDst = Dr, this.blendEquation = Un, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new It(0, 0, 0), this.blendAlpha = 0, this.depthFunc = mi, this.depthTest = true, this.depthWrite = true, this.stencilWriteMask = 255, this.stencilFunc = to, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = qn, this.stencilZFail = qn, this.stencilZPass = qn, this.stencilWrite = false, this.clippingPlanes = null, this.clipIntersection = false, this.clipShadows = false, this.shadowSide = null, this.colorWrite = true, this.precision = null, this.polygonOffset = false, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = false, this.alphaToCoverage = false, this.premultipliedAlpha = false, this.forceSinglePass = false, this.visible = true, this.toneMapped = true, this.userData = {}, this.version = 0, this._alphaTest = 0;
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
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(t).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(t).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(t).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(t).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(t).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(t).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(t).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(t).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(t).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(t).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(t).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(t).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(t).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== ui && (n.blending = this.blending), this.side !== Tn && (n.side = this.side), this.vertexColors === true && (n.vertexColors = true), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === true && (n.transparent = true), this.blendSrc !== Lr && (n.blendSrc = this.blendSrc), this.blendDst !== Dr && (n.blendDst = this.blendDst), this.blendEquation !== Un && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== mi && (n.depthFunc = this.depthFunc), this.depthTest === false && (n.depthTest = this.depthTest), this.depthWrite === false && (n.depthWrite = this.depthWrite), this.colorWrite === false && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== to && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== qn && (n.stencilFail = this.stencilFail), this.stencilZFail !== qn && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== qn && (n.stencilZPass = this.stencilZPass), this.stencilWrite === true && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === true && (n.polygonOffset = true), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === true && (n.dithering = true), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === true && (n.alphaHash = true), this.alphaToCoverage === true && (n.alphaToCoverage = true), this.premultipliedAlpha === true && (n.premultipliedAlpha = true), this.forceSinglePass === true && (n.forceSinglePass = true), this.wireframe === true && (n.wireframe = true), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === true && (n.flatShading = true), this.visible === false && (n.visible = false), this.toneMapped === false && (n.toneMapped = false), this.fog === false && (n.fog = false), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
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
class Bl extends Ei {
  static get type() {
    return "MeshBasicMaterial";
  }
  constructor(t) {
    super(), this.isMeshBasicMaterial = true, this.color = new It(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Ke(), this.combine = xl, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = false, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = true, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.fog = t.fog, this;
  }
}
const ae = new C(), os = new it();
class Be {
  constructor(t, e, n = false) {
    if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = true, this.name = "", this.array = t, this.itemSize = e, this.count = t !== void 0 ? t.length / e : 0, this.normalized = n, this.usage = eo, this.updateRanges = [], this.gpuType = Ze, this.version = 0;
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
    if (this.itemSize === 2) for (let e = 0, n = this.count; e < n; e++) os.fromBufferAttribute(this, e), os.applyMatrix3(t), this.setXY(e, os.x, os.y);
    else if (this.itemSize === 3) for (let e = 0, n = this.count; e < n; e++) ae.fromBufferAttribute(this, e), ae.applyMatrix3(t), this.setXYZ(e, ae.x, ae.y, ae.z);
    return this;
  }
  applyMatrix4(t) {
    for (let e = 0, n = this.count; e < n; e++) ae.fromBufferAttribute(this, e), ae.applyMatrix4(t), this.setXYZ(e, ae.x, ae.y, ae.z);
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, n = this.count; e < n; e++) ae.fromBufferAttribute(this, e), ae.applyNormalMatrix(t), this.setXYZ(e, ae.x, ae.y, ae.z);
    return this;
  }
  transformDirection(t) {
    for (let e = 0, n = this.count; e < n; e++) ae.fromBufferAttribute(this, e), ae.transformDirection(t), this.setXYZ(e, ae.x, ae.y, ae.z);
    return this;
  }
  set(t, e = 0) {
    return this.array.set(t, e), this;
  }
  getComponent(t, e) {
    let n = this.array[t * this.itemSize + e];
    return this.normalized && (n = wi(n, this.array)), n;
  }
  setComponent(t, e, n) {
    return this.normalized && (n = Ee(n, this.array)), this.array[t * this.itemSize + e] = n, this;
  }
  getX(t) {
    let e = this.array[t * this.itemSize];
    return this.normalized && (e = wi(e, this.array)), e;
  }
  setX(t, e) {
    return this.normalized && (e = Ee(e, this.array)), this.array[t * this.itemSize] = e, this;
  }
  getY(t) {
    let e = this.array[t * this.itemSize + 1];
    return this.normalized && (e = wi(e, this.array)), e;
  }
  setY(t, e) {
    return this.normalized && (e = Ee(e, this.array)), this.array[t * this.itemSize + 1] = e, this;
  }
  getZ(t) {
    let e = this.array[t * this.itemSize + 2];
    return this.normalized && (e = wi(e, this.array)), e;
  }
  setZ(t, e) {
    return this.normalized && (e = Ee(e, this.array)), this.array[t * this.itemSize + 2] = e, this;
  }
  getW(t) {
    let e = this.array[t * this.itemSize + 3];
    return this.normalized && (e = wi(e, this.array)), e;
  }
  setW(t, e) {
    return this.normalized && (e = Ee(e, this.array)), this.array[t * this.itemSize + 3] = e, this;
  }
  setXY(t, e, n) {
    return t *= this.itemSize, this.normalized && (e = Ee(e, this.array), n = Ee(n, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this;
  }
  setXYZ(t, e, n, s) {
    return t *= this.itemSize, this.normalized && (e = Ee(e, this.array), n = Ee(n, this.array), s = Ee(s, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = s, this;
  }
  setXYZW(t, e, n, s, r) {
    return t *= this.itemSize, this.normalized && (e = Ee(e, this.array), n = Ee(n, this.array), s = Ee(s, this.array), r = Ee(r, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = s, this.array[t + 3] = r, this;
  }
  onUpload(t) {
    return this.onUploadCallback = t, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const t = { itemSize: this.itemSize, type: this.array.constructor.name, array: Array.from(this.array), normalized: this.normalized };
    return this.name !== "" && (t.name = this.name), this.usage !== eo && (t.usage = this.usage), t;
  }
}
class zl extends Be {
  constructor(t, e, n) {
    super(new Uint16Array(t), e, n);
  }
}
class kl extends Be {
  constructor(t, e, n) {
    super(new Uint32Array(t), e, n);
  }
}
class ce extends Be {
  constructor(t, e, n) {
    super(new Float32Array(t), e, n);
  }
}
let Ch = 0;
const Ue = new Xt(), dr = new fe(), ii = new C(), we = new Wn(), Li = new Wn(), de = new C();
class Le extends Vn {
  constructor() {
    super(), this.isBufferGeometry = true, Object.defineProperty(this, "id", { value: Ch++ }), this.uuid = Yi(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = false, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return Array.isArray(t) ? this.index = new (Il(t) ? kl : zl)(t, 1) : this.index = t, this;
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
    return Ue.makeRotationFromQuaternion(t), this.applyMatrix4(Ue), this;
  }
  rotateX(t) {
    return Ue.makeRotationX(t), this.applyMatrix4(Ue), this;
  }
  rotateY(t) {
    return Ue.makeRotationY(t), this.applyMatrix4(Ue), this;
  }
  rotateZ(t) {
    return Ue.makeRotationZ(t), this.applyMatrix4(Ue), this;
  }
  translate(t, e, n) {
    return Ue.makeTranslation(t, e, n), this.applyMatrix4(Ue), this;
  }
  scale(t, e, n) {
    return Ue.makeScale(t, e, n), this.applyMatrix4(Ue), this;
  }
  lookAt(t) {
    return dr.lookAt(t), dr.updateMatrix(), this.applyMatrix4(dr.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(ii).negate(), this.translate(ii.x, ii.y, ii.z), this;
  }
  setFromPoints(t) {
    const e = this.getAttribute("position");
    if (e === void 0) {
      const n = [];
      for (let s = 0, r = t.length; s < r; s++) {
        const a = t[s];
        n.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new ce(n, 3));
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
    this.boundingBox === null && (this.boundingBox = new Wn());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new C(-1 / 0, -1 / 0, -1 / 0), new C(1 / 0, 1 / 0, 1 / 0));
      return;
    }
    if (t !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(t), e) for (let n = 0, s = e.length; n < s; n++) {
        const r = e[n];
        we.setFromBufferAttribute(r), this.morphTargetsRelative ? (de.addVectors(this.boundingBox.min, we.min), this.boundingBox.expandByPoint(de), de.addVectors(this.boundingBox.max, we.max), this.boundingBox.expandByPoint(de)) : (this.boundingBox.expandByPoint(we.min), this.boundingBox.expandByPoint(we.max));
      }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Si());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new C(), 1 / 0);
      return;
    }
    if (t) {
      const n = this.boundingSphere.center;
      if (we.setFromBufferAttribute(t), e) for (let r = 0, a = e.length; r < a; r++) {
        const o = e[r];
        Li.setFromBufferAttribute(o), this.morphTargetsRelative ? (de.addVectors(we.min, Li.min), we.expandByPoint(de), de.addVectors(we.max, Li.max), we.expandByPoint(de)) : (we.expandByPoint(Li.min), we.expandByPoint(Li.max));
      }
      we.getCenter(n);
      let s = 0;
      for (let r = 0, a = t.count; r < a; r++) de.fromBufferAttribute(t, r), s = Math.max(s, n.distanceToSquared(de));
      if (e) for (let r = 0, a = e.length; r < a; r++) {
        const o = e[r], l = this.morphTargetsRelative;
        for (let c = 0, h = o.count; c < h; c++) de.fromBufferAttribute(o, c), l && (ii.fromBufferAttribute(t, c), de.add(ii)), s = Math.max(s, n.distanceToSquared(de));
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
    this.hasAttribute("tangent") === false && this.setAttribute("tangent", new Be(new Float32Array(4 * n.count), 4));
    const a = this.getAttribute("tangent"), o = [], l = [];
    for (let L = 0; L < n.count; L++) o[L] = new C(), l[L] = new C();
    const c = new C(), h = new C(), u = new C(), d = new it(), p = new it(), g = new it(), _ = new C(), m = new C();
    function f(L, S, M) {
      c.fromBufferAttribute(n, L), h.fromBufferAttribute(n, S), u.fromBufferAttribute(n, M), d.fromBufferAttribute(r, L), p.fromBufferAttribute(r, S), g.fromBufferAttribute(r, M), h.sub(c), u.sub(c), p.sub(d), g.sub(d);
      const R = 1 / (p.x * g.y - g.x * p.y);
      isFinite(R) && (_.copy(h).multiplyScalar(g.y).addScaledVector(u, -p.y).multiplyScalar(R), m.copy(u).multiplyScalar(p.x).addScaledVector(h, -g.x).multiplyScalar(R), o[L].add(_), o[S].add(_), o[M].add(_), l[L].add(m), l[S].add(m), l[M].add(m));
    }
    let E = this.groups;
    E.length === 0 && (E = [{ start: 0, count: t.count }]);
    for (let L = 0, S = E.length; L < S; ++L) {
      const M = E[L], R = M.start, k = M.count;
      for (let z = R, W = R + k; z < W; z += 3) f(t.getX(z + 0), t.getX(z + 1), t.getX(z + 2));
    }
    const T = new C(), y = new C(), N = new C(), w = new C();
    function A(L) {
      N.fromBufferAttribute(s, L), w.copy(N);
      const S = o[L];
      T.copy(S), T.sub(N.multiplyScalar(N.dot(S))).normalize(), y.crossVectors(w, S);
      const R = y.dot(l[L]) < 0 ? -1 : 1;
      a.setXYZW(L, T.x, T.y, T.z, R);
    }
    for (let L = 0, S = E.length; L < S; ++L) {
      const M = E[L], R = M.start, k = M.count;
      for (let z = R, W = R + k; z < W; z += 3) A(t.getX(z + 0)), A(t.getX(z + 1)), A(t.getX(z + 2));
    }
  }
  computeVertexNormals() {
    const t = this.index, e = this.getAttribute("position");
    if (e !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0) n = new Be(new Float32Array(e.count * 3), 3), this.setAttribute("normal", n);
      else for (let d = 0, p = n.count; d < p; d++) n.setXYZ(d, 0, 0, 0);
      const s = new C(), r = new C(), a = new C(), o = new C(), l = new C(), c = new C(), h = new C(), u = new C();
      if (t) for (let d = 0, p = t.count; d < p; d += 3) {
        const g = t.getX(d + 0), _ = t.getX(d + 1), m = t.getX(d + 2);
        s.fromBufferAttribute(e, g), r.fromBufferAttribute(e, _), a.fromBufferAttribute(e, m), h.subVectors(a, r), u.subVectors(s, r), h.cross(u), o.fromBufferAttribute(n, g), l.fromBufferAttribute(n, _), c.fromBufferAttribute(n, m), o.add(h), l.add(h), c.add(h), n.setXYZ(g, o.x, o.y, o.z), n.setXYZ(_, l.x, l.y, l.z), n.setXYZ(m, c.x, c.y, c.z);
      }
      else for (let d = 0, p = e.count; d < p; d += 3) s.fromBufferAttribute(e, d + 0), r.fromBufferAttribute(e, d + 1), a.fromBufferAttribute(e, d + 2), h.subVectors(a, r), u.subVectors(s, r), h.cross(u), n.setXYZ(d + 0, h.x, h.y, h.z), n.setXYZ(d + 1, h.x, h.y, h.z), n.setXYZ(d + 2, h.x, h.y, h.z);
      this.normalizeNormals(), n.needsUpdate = true;
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let e = 0, n = t.count; e < n; e++) de.fromBufferAttribute(t, e), de.normalize(), t.setXYZ(e, de.x, de.y, de.z);
  }
  toNonIndexed() {
    function t(o, l) {
      const c = o.array, h = o.itemSize, u = o.normalized, d = new c.constructor(l.length * h);
      let p = 0, g = 0;
      for (let _ = 0, m = l.length; _ < m; _++) {
        o.isInterleavedBufferAttribute ? p = l[_] * o.data.stride + o.offset : p = l[_] * h;
        for (let f = 0; f < h; f++) d[g++] = c[p++];
      }
      return new Be(d, h, u);
    }
    if (this.index === null) return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const e = new Le(), n = this.index.array, s = this.attributes;
    for (const o in s) {
      const l = s[o], c = t(l, n);
      e.setAttribute(o, c);
    }
    const r = this.morphAttributes;
    for (const o in r) {
      const l = [], c = r[o];
      for (let h = 0, u = c.length; h < u; h++) {
        const d = c[h], p = t(d, n);
        l.push(p);
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
      for (let u = 0, d = c.length; u < d; u++) {
        const p = c[u];
        h.push(p.toJSON(t.data));
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
      const h = [], u = r[c];
      for (let d = 0, p = u.length; d < p; d++) h.push(u[d].clone(e));
      this.morphAttributes[c] = h;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const a = t.groups;
    for (let c = 0, h = a.length; c < h; c++) {
      const u = a[c];
      this.addGroup(u.start, u.count, u.materialIndex);
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
const xo = new Xt(), Rn = new Ca(), ls = new Si(), Mo = new C(), cs = new C(), hs = new C(), us = new C(), fr = new C(), ds = new C(), yo = new C(), fs = new C();
class ve extends fe {
  constructor(t = new Le(), e = new Bl()) {
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
      ds.set(0, 0, 0);
      for (let l = 0, c = r.length; l < c; l++) {
        const h = o[l], u = r[l];
        h !== 0 && (fr.fromBufferAttribute(u, t), a ? ds.addScaledVector(fr, h) : ds.addScaledVector(fr.sub(e), h));
      }
      e.add(ds);
    }
    return e;
  }
  raycast(t, e) {
    const n = this.geometry, s = this.material, r = this.matrixWorld;
    s !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), ls.copy(n.boundingSphere), ls.applyMatrix4(r), Rn.copy(t.ray).recast(t.near), !(ls.containsPoint(Rn.origin) === false && (Rn.intersectSphere(ls, Mo) === null || Rn.origin.distanceToSquared(Mo) > (t.far - t.near) ** 2)) && (xo.copy(r).invert(), Rn.copy(t.ray).applyMatrix4(xo), !(n.boundingBox !== null && Rn.intersectsBox(n.boundingBox) === false) && this._computeIntersections(t, e, Rn)));
  }
  _computeIntersections(t, e, n) {
    let s;
    const r = this.geometry, a = this.material, o = r.index, l = r.attributes.position, c = r.attributes.uv, h = r.attributes.uv1, u = r.attributes.normal, d = r.groups, p = r.drawRange;
    if (o !== null) if (Array.isArray(a)) for (let g = 0, _ = d.length; g < _; g++) {
      const m = d[g], f = a[m.materialIndex], E = Math.max(m.start, p.start), T = Math.min(o.count, Math.min(m.start + m.count, p.start + p.count));
      for (let y = E, N = T; y < N; y += 3) {
        const w = o.getX(y), A = o.getX(y + 1), L = o.getX(y + 2);
        s = ps(this, f, t, n, c, h, u, w, A, L), s && (s.faceIndex = Math.floor(y / 3), s.face.materialIndex = m.materialIndex, e.push(s));
      }
    }
    else {
      const g = Math.max(0, p.start), _ = Math.min(o.count, p.start + p.count);
      for (let m = g, f = _; m < f; m += 3) {
        const E = o.getX(m), T = o.getX(m + 1), y = o.getX(m + 2);
        s = ps(this, a, t, n, c, h, u, E, T, y), s && (s.faceIndex = Math.floor(m / 3), e.push(s));
      }
    }
    else if (l !== void 0) if (Array.isArray(a)) for (let g = 0, _ = d.length; g < _; g++) {
      const m = d[g], f = a[m.materialIndex], E = Math.max(m.start, p.start), T = Math.min(l.count, Math.min(m.start + m.count, p.start + p.count));
      for (let y = E, N = T; y < N; y += 3) {
        const w = y, A = y + 1, L = y + 2;
        s = ps(this, f, t, n, c, h, u, w, A, L), s && (s.faceIndex = Math.floor(y / 3), s.face.materialIndex = m.materialIndex, e.push(s));
      }
    }
    else {
      const g = Math.max(0, p.start), _ = Math.min(l.count, p.start + p.count);
      for (let m = g, f = _; m < f; m += 3) {
        const E = m, T = m + 1, y = m + 2;
        s = ps(this, a, t, n, c, h, u, E, T, y), s && (s.faceIndex = Math.floor(m / 3), e.push(s));
      }
    }
  }
}
function Rh(i, t, e, n, s, r, a, o) {
  let l;
  if (t.side === xe ? l = n.intersectTriangle(a, r, s, true, o) : l = n.intersectTriangle(s, r, a, t.side === Tn, o), l === null) return null;
  fs.copy(o), fs.applyMatrix4(i.matrixWorld);
  const c = e.ray.origin.distanceTo(fs);
  return c < e.near || c > e.far ? null : { distance: c, point: fs.clone(), object: i };
}
function ps(i, t, e, n, s, r, a, o, l, c) {
  i.getVertexPosition(o, cs), i.getVertexPosition(l, hs), i.getVertexPosition(c, us);
  const h = Rh(i, t, e, n, cs, hs, us, yo);
  if (h) {
    const u = new C();
    Oe.getBarycoord(yo, cs, hs, us, u), s && (h.uv = Oe.getInterpolatedAttribute(s, o, l, c, u, new it())), r && (h.uv1 = Oe.getInterpolatedAttribute(r, o, l, c, u, new it())), a && (h.normal = Oe.getInterpolatedAttribute(a, o, l, c, u, new C()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const d = { a: o, b: l, c, normal: new C(), materialIndex: 0 };
    Oe.getNormal(cs, hs, us, d.normal), h.face = d, h.barycoord = u;
  }
  return h;
}
class Je extends Le {
  constructor(t = 1, e = 1, n = 1, s = 1, r = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = { width: t, height: e, depth: n, widthSegments: s, heightSegments: r, depthSegments: a };
    const o = this;
    s = Math.floor(s), r = Math.floor(r), a = Math.floor(a);
    const l = [], c = [], h = [], u = [];
    let d = 0, p = 0;
    g("z", "y", "x", -1, -1, n, e, t, a, r, 0), g("z", "y", "x", 1, -1, n, e, -t, a, r, 1), g("x", "z", "y", 1, 1, t, n, e, s, a, 2), g("x", "z", "y", 1, -1, t, n, -e, s, a, 3), g("x", "y", "z", 1, -1, t, e, n, s, r, 4), g("x", "y", "z", -1, -1, t, e, -n, s, r, 5), this.setIndex(l), this.setAttribute("position", new ce(c, 3)), this.setAttribute("normal", new ce(h, 3)), this.setAttribute("uv", new ce(u, 2));
    function g(_, m, f, E, T, y, N, w, A, L, S) {
      const M = y / A, R = N / L, k = y / 2, z = N / 2, W = w / 2, Z = A + 1, V = L + 1;
      let K = 0, G = 0;
      const st = new C();
      for (let ht = 0; ht < V; ht++) {
        const Mt = ht * R - z;
        for (let Ut = 0; Ut < Z; Ut++) {
          const jt = Ut * M - k;
          st[_] = jt * E, st[m] = Mt * T, st[f] = W, c.push(st.x, st.y, st.z), st[_] = 0, st[m] = 0, st[f] = w > 0 ? 1 : -1, h.push(st.x, st.y, st.z), u.push(Ut / A), u.push(1 - ht / L), K += 1;
        }
      }
      for (let ht = 0; ht < L; ht++) for (let Mt = 0; Mt < A; Mt++) {
        const Ut = d + Mt + Z * ht, jt = d + Mt + Z * (ht + 1), Y = d + (Mt + 1) + Z * (ht + 1), tt = d + (Mt + 1) + Z * ht;
        l.push(Ut, jt, tt), l.push(jt, Y, tt), G += 6;
      }
      o.addGroup(p, G, S), p += G, d += K;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Je(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}
function Mi(i) {
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
function _e(i) {
  const t = {};
  for (let e = 0; e < i.length; e++) {
    const n = Mi(i[e]);
    for (const s in n) t[s] = n[s];
  }
  return t;
}
function Ph(i) {
  const t = [];
  for (let e = 0; e < i.length; e++) t.push(i[e].clone());
  return t;
}
function Hl(i) {
  const t = i.getRenderTarget();
  return t === null ? i.outputColorSpace : t.isXRRenderTarget === true ? t.texture.colorSpace : Ht.workingColorSpace;
}
const Lh = { clone: Mi, merge: _e };
var Dh = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Ih = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class dn extends Ei {
  static get type() {
    return "ShaderMaterial";
  }
  constructor(t) {
    super(), this.isShaderMaterial = true, this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Dh, this.fragmentShader = Ih, this.linewidth = 1, this.wireframe = false, this.wireframeLinewidth = 1, this.fog = false, this.lights = false, this.clipping = false, this.forceSinglePass = true, this.extensions = { clipCullDistance: false, multiDraw: false }, this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv1: [0, 0] }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = false, this.glslVersion = null, t !== void 0 && this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = Mi(t.uniforms), this.uniformsGroups = Ph(t.uniformsGroups), this.defines = Object.assign({}, t.defines), this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.fog = t.fog, this.lights = t.lights, this.clipping = t.clipping, this.extensions = Object.assign({}, t.extensions), this.glslVersion = t.glslVersion, this;
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
class Gl extends fe {
  constructor() {
    super(), this.isCamera = true, this.type = "Camera", this.matrixWorldInverse = new Xt(), this.projectionMatrix = new Xt(), this.projectionMatrixInverse = new Xt(), this.coordinateSystem = cn;
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
const Mn = new C(), So = new it(), Eo = new it();
class Re extends Gl {
  constructor(t = 50, e = 1, n = 0.1, s = 2e3) {
    super(), this.isPerspectiveCamera = true, this.type = "PerspectiveCamera", this.fov = t, this.zoom = 1, this.near = n, this.far = s, this.focus = 10, this.aspect = e, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(t, e) {
    return super.copy(t, e), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = t.view === null ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this;
  }
  setFocalLength(t) {
    const e = 0.5 * this.getFilmHeight() / t;
    this.fov = ga * 2 * Math.atan(e), this.updateProjectionMatrix();
  }
  getFocalLength() {
    const t = Math.tan(ki * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / t;
  }
  getEffectiveFOV() {
    return ga * 2 * Math.atan(Math.tan(ki * 0.5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  getViewBounds(t, e, n) {
    Mn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), e.set(Mn.x, Mn.y).multiplyScalar(-t / Mn.z), Mn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(Mn.x, Mn.y).multiplyScalar(-t / Mn.z);
  }
  getViewSize(t, e) {
    return this.getViewBounds(t, So, Eo), e.subVectors(Eo, So);
  }
  setViewOffset(t, e, n, s, r, a) {
    this.aspect = t / e, this.view === null && (this.view = { enabled: true, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = true, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = s, this.view.width = r, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = false), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const t = this.near;
    let e = t * Math.tan(ki * 0.5 * this.fov) / this.zoom, n = 2 * e, s = this.aspect * n, r = -0.5 * s;
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
const si = -90, ri = 1;
class Uh extends fe {
  constructor(t, e, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const s = new Re(si, ri, t, e);
    s.layers = this.layers, this.add(s);
    const r = new Re(si, ri, t, e);
    r.layers = this.layers, this.add(r);
    const a = new Re(si, ri, t, e);
    a.layers = this.layers, this.add(a);
    const o = new Re(si, ri, t, e);
    o.layers = this.layers, this.add(o);
    const l = new Re(si, ri, t, e);
    l.layers = this.layers, this.add(l);
    const c = new Re(si, ri, t, e);
    c.layers = this.layers, this.add(c);
  }
  updateCoordinateSystem() {
    const t = this.coordinateSystem, e = this.children.concat(), [n, s, r, a, o, l] = e;
    for (const c of e) this.remove(c);
    if (t === cn) n.up.set(0, 1, 0), n.lookAt(1, 0, 0), s.up.set(0, 1, 0), s.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (t === Ns) n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), s.up.set(0, -1, 0), s.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);
    else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + t);
    for (const c of e) this.add(c), c.updateMatrixWorld();
  }
  update(t, e) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: s } = this;
    this.coordinateSystem !== t.coordinateSystem && (this.coordinateSystem = t.coordinateSystem, this.updateCoordinateSystem());
    const [r, a, o, l, c, h] = this.children, u = t.getRenderTarget(), d = t.getActiveCubeFace(), p = t.getActiveMipmapLevel(), g = t.xr.enabled;
    t.xr.enabled = false;
    const _ = n.texture.generateMipmaps;
    n.texture.generateMipmaps = false, t.setRenderTarget(n, 0, s), t.render(e, r), t.setRenderTarget(n, 1, s), t.render(e, a), t.setRenderTarget(n, 2, s), t.render(e, o), t.setRenderTarget(n, 3, s), t.render(e, l), t.setRenderTarget(n, 4, s), t.render(e, c), n.texture.generateMipmaps = _, t.setRenderTarget(n, 5, s), t.render(e, h), t.setRenderTarget(u, d, p), t.xr.enabled = g, n.texture.needsPMREMUpdate = true;
  }
}
class Vl extends Me {
  constructor(t, e, n, s, r, a, o, l, c, h) {
    t = t !== void 0 ? t : [], e = e !== void 0 ? e : gi, super(t, e, n, s, r, a, o, l, c, h), this.isCubeTexture = true, this.flipY = false;
  }
  get images() {
    return this.image;
  }
  set images(t) {
    this.image = t;
  }
}
class Nh extends Hn {
  constructor(t = 1, e = {}) {
    super(t, t, e), this.isWebGLCubeRenderTarget = true;
    const n = { width: t, height: t, depth: 1 }, s = [n, n, n, n, n, n];
    this.texture = new Vl(s, e.mapping, e.wrapS, e.wrapT, e.magFilter, e.minFilter, e.format, e.type, e.anisotropy, e.colorSpace), this.texture.isRenderTargetTexture = true, this.texture.generateMipmaps = e.generateMipmaps !== void 0 ? e.generateMipmaps : false, this.texture.minFilter = e.minFilter !== void 0 ? e.minFilter : $e;
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
			` }, s = new Je(5, 5, 5), r = new dn({ name: "CubemapFromEquirect", uniforms: Mi(n.uniforms), vertexShader: n.vertexShader, fragmentShader: n.fragmentShader, side: xe, blending: En });
    r.uniforms.tEquirect.value = e;
    const a = new ve(s, r), o = e.minFilter;
    return e.minFilter === Bn && (e.minFilter = $e), new Uh(1, 10, this).update(t, a), e.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
  }
  clear(t, e, n, s) {
    const r = t.getRenderTarget();
    for (let a = 0; a < 6; a++) t.setRenderTarget(this, a), t.clear(e, n, s);
    t.setRenderTarget(r);
  }
}
const pr = new C(), Fh = new C(), Oh = new Pt();
class yn {
  constructor(t = new C(1, 0, 0), e = 0) {
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
    const s = pr.subVectors(n, e).cross(Fh.subVectors(t, e)).normalize();
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
    const n = t.delta(pr), s = this.normal.dot(n);
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
    const n = e || Oh.getNormalMatrix(t), s = this.coplanarPoint(pr).applyMatrix4(t), r = this.normal.applyMatrix3(n).normalize();
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
const Pn = new Si(), ms = new C();
class Ra {
  constructor(t = new yn(), e = new yn(), n = new yn(), s = new yn(), r = new yn(), a = new yn()) {
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
  setFromProjectionMatrix(t, e = cn) {
    const n = this.planes, s = t.elements, r = s[0], a = s[1], o = s[2], l = s[3], c = s[4], h = s[5], u = s[6], d = s[7], p = s[8], g = s[9], _ = s[10], m = s[11], f = s[12], E = s[13], T = s[14], y = s[15];
    if (n[0].setComponents(l - r, d - c, m - p, y - f).normalize(), n[1].setComponents(l + r, d + c, m + p, y + f).normalize(), n[2].setComponents(l + a, d + h, m + g, y + E).normalize(), n[3].setComponents(l - a, d - h, m - g, y - E).normalize(), n[4].setComponents(l - o, d - u, m - _, y - T).normalize(), e === cn) n[5].setComponents(l + o, d + u, m + _, y + T).normalize();
    else if (e === Ns) n[5].setComponents(o, u, _, T).normalize();
    else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + e);
    return this;
  }
  intersectsObject(t) {
    if (t.boundingSphere !== void 0) t.boundingSphere === null && t.computeBoundingSphere(), Pn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);
    else {
      const e = t.geometry;
      e.boundingSphere === null && e.computeBoundingSphere(), Pn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld);
    }
    return this.intersectsSphere(Pn);
  }
  intersectsSprite(t) {
    return Pn.center.set(0, 0, 0), Pn.radius = 0.7071067811865476, Pn.applyMatrix4(t.matrixWorld), this.intersectsSphere(Pn);
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
      if (ms.x = s.normal.x > 0 ? t.max.x : t.min.x, ms.y = s.normal.y > 0 ? t.max.y : t.min.y, ms.z = s.normal.z > 0 ? t.max.z : t.min.z, s.distanceToPoint(ms) < 0) return false;
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
function Wl() {
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
function Bh(i) {
  const t = /* @__PURE__ */ new WeakMap();
  function e(o, l) {
    const c = o.array, h = o.usage, u = c.byteLength, d = i.createBuffer();
    i.bindBuffer(l, d), i.bufferData(l, c, h), o.onUploadCallback();
    let p;
    if (c instanceof Float32Array) p = i.FLOAT;
    else if (c instanceof Uint16Array) o.isFloat16BufferAttribute ? p = i.HALF_FLOAT : p = i.UNSIGNED_SHORT;
    else if (c instanceof Int16Array) p = i.SHORT;
    else if (c instanceof Uint32Array) p = i.UNSIGNED_INT;
    else if (c instanceof Int32Array) p = i.INT;
    else if (c instanceof Int8Array) p = i.BYTE;
    else if (c instanceof Uint8Array) p = i.UNSIGNED_BYTE;
    else if (c instanceof Uint8ClampedArray) p = i.UNSIGNED_BYTE;
    else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
    return { buffer: d, type: p, bytesPerElement: c.BYTES_PER_ELEMENT, version: o.version, size: u };
  }
  function n(o, l, c) {
    const h = l.array, u = l.updateRanges;
    if (i.bindBuffer(c, o), u.length === 0) i.bufferSubData(c, 0, h);
    else {
      u.sort((p, g) => p.start - g.start);
      let d = 0;
      for (let p = 1; p < u.length; p++) {
        const g = u[d], _ = u[p];
        _.start <= g.start + g.count + 1 ? g.count = Math.max(g.count, _.start + _.count - g.start) : (++d, u[d] = _);
      }
      u.length = d + 1;
      for (let p = 0, g = u.length; p < g; p++) {
        const _ = u[p];
        i.bufferSubData(c, _.start * h.BYTES_PER_ELEMENT, h, _.start, _.count);
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
class qi extends Le {
  constructor(t = 1, e = 1, n = 1, s = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = { width: t, height: e, widthSegments: n, heightSegments: s };
    const r = t / 2, a = e / 2, o = Math.floor(n), l = Math.floor(s), c = o + 1, h = l + 1, u = t / o, d = e / l, p = [], g = [], _ = [], m = [];
    for (let f = 0; f < h; f++) {
      const E = f * d - a;
      for (let T = 0; T < c; T++) {
        const y = T * u - r;
        g.push(y, -E, 0), _.push(0, 0, 1), m.push(T / o), m.push(1 - f / l);
      }
    }
    for (let f = 0; f < l; f++) for (let E = 0; E < o; E++) {
      const T = E + c * f, y = E + c * (f + 1), N = E + 1 + c * (f + 1), w = E + 1 + c * f;
      p.push(T, y, w), p.push(y, N, w);
    }
    this.setIndex(p), this.setAttribute("position", new ce(g, 3)), this.setAttribute("normal", new ce(_, 3)), this.setAttribute("uv", new ce(m, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new qi(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}
var zh = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, kh = `#ifdef USE_ALPHAHASH
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
#endif`, Hh = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, Gh = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Vh = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, Wh = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, Xh = `#ifdef USE_AOMAP
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
#endif`, Yh = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, qh = `#ifdef USE_BATCHING
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
#endif`, $h = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, Zh = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, jh = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, Kh = `float G_BlinnPhong_Implicit( ) {
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
} // validated`, Jh = `#ifdef USE_IRIDESCENCE
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
#endif`, Qh = `#ifdef USE_BUMPMAP
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
#endif`, tu = `#if NUM_CLIPPING_PLANES > 0
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
#endif`, eu = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, nu = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, iu = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, su = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, ru = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, au = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, ou = `#if defined( USE_COLOR_ALPHA )
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
#endif`, lu = `#define PI 3.141592653589793
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
} // validated`, cu = `#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`, hu = `vec3 transformedNormal = objectNormal;
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
#endif`, uu = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, du = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, fu = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, pu = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, mu = "gl_FragColor = linearToOutputTexel( gl_FragColor );", gu = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, _u = `#ifdef USE_ENVMAP
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
#endif`, vu = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, xu = `#ifdef USE_ENVMAP
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
#endif`, Mu = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, yu = `#ifdef USE_ENVMAP
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
#endif`, Su = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Eu = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, bu = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, Tu = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Au = `#ifdef USE_GRADIENTMAP
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
}`, wu = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, Cu = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Ru = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, Pu = `uniform bool receiveShadow;
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
#endif`, Lu = `#ifdef USE_ENVMAP
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
#endif`, Du = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, Iu = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, Uu = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, Nu = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, Fu = `PhysicalMaterial material;
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
#endif`, Ou = `struct PhysicalMaterial {
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
}`, Bu = `
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
#endif`, zu = `#if defined( RE_IndirectDiffuse )
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
#endif`, ku = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, Hu = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, Gu = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Vu = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Wu = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, Xu = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, Yu = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, qu = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`, $u = `#if defined( USE_POINTS_UV )
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
#endif`, Zu = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, ju = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, Ku = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, Ju = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, Qu = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, td = `#ifdef USE_MORPHTARGETS
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
#endif`, ed = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, nd = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`, id = `#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`, sd = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, rd = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, ad = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, od = `#ifdef USE_NORMALMAP
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
#endif`, ld = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, cd = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, hd = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, ud = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, dd = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, fd = `vec3 packNormalToRGB( const in vec3 normal ) {
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
}`, pd = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, md = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, gd = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, _d = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, vd = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, xd = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Md = `#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`, yd = `#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`, Sd = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`, Ed = `float getShadowMask() {
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
}`, bd = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, Td = `#ifdef USE_SKINNING
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
#endif`, Ad = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, wd = `#ifdef USE_SKINNING
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
#endif`, Cd = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, Rd = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, Pd = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, Ld = `#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`, Dd = `#ifdef USE_TRANSMISSION
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
#endif`, Id = `#ifdef USE_TRANSMISSION
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
#endif`, Ud = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, Nd = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, Fd = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, Od = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const Bd = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, zd = `uniform sampler2D t2D;
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
}`, kd = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Hd = `#ifdef ENVMAP_TYPE_CUBE
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
}`, Gd = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Vd = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Wd = `#include <common>
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
}`, Xd = `#if DEPTH_PACKING == 3200
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
}`, Yd = `#define DISTANCE
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
}`, qd = `#define DISTANCE
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
}`, $d = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, Zd = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, jd = `uniform float scale;
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
}`, Kd = `uniform vec3 diffuse;
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
}`, Jd = `#include <common>
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
}`, Qd = `uniform vec3 diffuse;
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
}`, tf = `#define LAMBERT
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
}`, ef = `#define LAMBERT
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
}`, nf = `#define MATCAP
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
}`, sf = `#define MATCAP
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
}`, rf = `#define NORMAL
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
}`, af = `#define NORMAL
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
}`, of = `#define PHONG
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
}`, lf = `#define PHONG
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
}`, cf = `#define STANDARD
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
}`, hf = `#define STANDARD
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
}`, uf = `#define TOON
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
}`, df = `#define TOON
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
}`, ff = `uniform float size;
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
}`, pf = `uniform vec3 diffuse;
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
}`, mf = `#include <common>
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
}`, gf = `uniform vec3 color;
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
}`, _f = `uniform float rotation;
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
}`, vf = `uniform vec3 diffuse;
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
}`, Dt = { alphahash_fragment: zh, alphahash_pars_fragment: kh, alphamap_fragment: Hh, alphamap_pars_fragment: Gh, alphatest_fragment: Vh, alphatest_pars_fragment: Wh, aomap_fragment: Xh, aomap_pars_fragment: Yh, batching_pars_vertex: qh, batching_vertex: $h, begin_vertex: Zh, beginnormal_vertex: jh, bsdfs: Kh, iridescence_fragment: Jh, bumpmap_pars_fragment: Qh, clipping_planes_fragment: tu, clipping_planes_pars_fragment: eu, clipping_planes_pars_vertex: nu, clipping_planes_vertex: iu, color_fragment: su, color_pars_fragment: ru, color_pars_vertex: au, color_vertex: ou, common: lu, cube_uv_reflection_fragment: cu, defaultnormal_vertex: hu, displacementmap_pars_vertex: uu, displacementmap_vertex: du, emissivemap_fragment: fu, emissivemap_pars_fragment: pu, colorspace_fragment: mu, colorspace_pars_fragment: gu, envmap_fragment: _u, envmap_common_pars_fragment: vu, envmap_pars_fragment: xu, envmap_pars_vertex: Mu, envmap_physical_pars_fragment: Lu, envmap_vertex: yu, fog_vertex: Su, fog_pars_vertex: Eu, fog_fragment: bu, fog_pars_fragment: Tu, gradientmap_pars_fragment: Au, lightmap_pars_fragment: wu, lights_lambert_fragment: Cu, lights_lambert_pars_fragment: Ru, lights_pars_begin: Pu, lights_toon_fragment: Du, lights_toon_pars_fragment: Iu, lights_phong_fragment: Uu, lights_phong_pars_fragment: Nu, lights_physical_fragment: Fu, lights_physical_pars_fragment: Ou, lights_fragment_begin: Bu, lights_fragment_maps: zu, lights_fragment_end: ku, logdepthbuf_fragment: Hu, logdepthbuf_pars_fragment: Gu, logdepthbuf_pars_vertex: Vu, logdepthbuf_vertex: Wu, map_fragment: Xu, map_pars_fragment: Yu, map_particle_fragment: qu, map_particle_pars_fragment: $u, metalnessmap_fragment: Zu, metalnessmap_pars_fragment: ju, morphinstance_vertex: Ku, morphcolor_vertex: Ju, morphnormal_vertex: Qu, morphtarget_pars_vertex: td, morphtarget_vertex: ed, normal_fragment_begin: nd, normal_fragment_maps: id, normal_pars_fragment: sd, normal_pars_vertex: rd, normal_vertex: ad, normalmap_pars_fragment: od, clearcoat_normal_fragment_begin: ld, clearcoat_normal_fragment_maps: cd, clearcoat_pars_fragment: hd, iridescence_pars_fragment: ud, opaque_fragment: dd, packing: fd, premultiplied_alpha_fragment: pd, project_vertex: md, dithering_fragment: gd, dithering_pars_fragment: _d, roughnessmap_fragment: vd, roughnessmap_pars_fragment: xd, shadowmap_pars_fragment: Md, shadowmap_pars_vertex: yd, shadowmap_vertex: Sd, shadowmask_pars_fragment: Ed, skinbase_vertex: bd, skinning_pars_vertex: Td, skinning_vertex: Ad, skinnormal_vertex: wd, specularmap_fragment: Cd, specularmap_pars_fragment: Rd, tonemapping_fragment: Pd, tonemapping_pars_fragment: Ld, transmission_fragment: Dd, transmission_pars_fragment: Id, uv_pars_fragment: Ud, uv_pars_vertex: Nd, uv_vertex: Fd, worldpos_vertex: Od, background_vert: Bd, background_frag: zd, backgroundCube_vert: kd, backgroundCube_frag: Hd, cube_vert: Gd, cube_frag: Vd, depth_vert: Wd, depth_frag: Xd, distanceRGBA_vert: Yd, distanceRGBA_frag: qd, equirect_vert: $d, equirect_frag: Zd, linedashed_vert: jd, linedashed_frag: Kd, meshbasic_vert: Jd, meshbasic_frag: Qd, meshlambert_vert: tf, meshlambert_frag: ef, meshmatcap_vert: nf, meshmatcap_frag: sf, meshnormal_vert: rf, meshnormal_frag: af, meshphong_vert: of, meshphong_frag: lf, meshphysical_vert: cf, meshphysical_frag: hf, meshtoon_vert: uf, meshtoon_frag: df, points_vert: ff, points_frag: pf, shadow_vert: mf, shadow_frag: gf, sprite_vert: _f, sprite_frag: vf }, et = { common: { diffuse: { value: new It(16777215) }, opacity: { value: 1 }, map: { value: null }, mapTransform: { value: new Pt() }, alphaMap: { value: null }, alphaMapTransform: { value: new Pt() }, alphaTest: { value: 0 } }, specularmap: { specularMap: { value: null }, specularMapTransform: { value: new Pt() } }, envmap: { envMap: { value: null }, envMapRotation: { value: new Pt() }, flipEnvMap: { value: -1 }, reflectivity: { value: 1 }, ior: { value: 1.5 }, refractionRatio: { value: 0.98 } }, aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 }, aoMapTransform: { value: new Pt() } }, lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 }, lightMapTransform: { value: new Pt() } }, bumpmap: { bumpMap: { value: null }, bumpMapTransform: { value: new Pt() }, bumpScale: { value: 1 } }, normalmap: { normalMap: { value: null }, normalMapTransform: { value: new Pt() }, normalScale: { value: new it(1, 1) } }, displacementmap: { displacementMap: { value: null }, displacementMapTransform: { value: new Pt() }, displacementScale: { value: 1 }, displacementBias: { value: 0 } }, emissivemap: { emissiveMap: { value: null }, emissiveMapTransform: { value: new Pt() } }, metalnessmap: { metalnessMap: { value: null }, metalnessMapTransform: { value: new Pt() } }, roughnessmap: { roughnessMap: { value: null }, roughnessMapTransform: { value: new Pt() } }, gradientmap: { gradientMap: { value: null } }, fog: { fogDensity: { value: 25e-5 }, fogNear: { value: 1 }, fogFar: { value: 2e3 }, fogColor: { value: new It(16777215) } }, lights: { ambientLightColor: { value: [] }, lightProbe: { value: [] }, directionalLights: { value: [], properties: { direction: {}, color: {} } }, directionalLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, directionalShadowMap: { value: [] }, directionalShadowMatrix: { value: [] }, spotLights: { value: [], properties: { color: {}, position: {}, direction: {}, distance: {}, coneCos: {}, penumbraCos: {}, decay: {} } }, spotLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, spotLightMap: { value: [] }, spotShadowMap: { value: [] }, spotLightMatrix: { value: [] }, pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } }, pointLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {}, shadowCameraNear: {}, shadowCameraFar: {} } }, pointShadowMap: { value: [] }, pointShadowMatrix: { value: [] }, hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } }, rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } }, ltc_1: { value: null }, ltc_2: { value: null } }, points: { diffuse: { value: new It(16777215) }, opacity: { value: 1 }, size: { value: 1 }, scale: { value: 1 }, map: { value: null }, alphaMap: { value: null }, alphaMapTransform: { value: new Pt() }, alphaTest: { value: 0 }, uvTransform: { value: new Pt() } }, sprite: { diffuse: { value: new It(16777215) }, opacity: { value: 1 }, center: { value: new it(0.5, 0.5) }, rotation: { value: 0 }, map: { value: null }, mapTransform: { value: new Pt() }, alphaMap: { value: null }, alphaMapTransform: { value: new Pt() }, alphaTest: { value: 0 } } }, Ye = { basic: { uniforms: _e([et.common, et.specularmap, et.envmap, et.aomap, et.lightmap, et.fog]), vertexShader: Dt.meshbasic_vert, fragmentShader: Dt.meshbasic_frag }, lambert: { uniforms: _e([et.common, et.specularmap, et.envmap, et.aomap, et.lightmap, et.emissivemap, et.bumpmap, et.normalmap, et.displacementmap, et.fog, et.lights, { emissive: { value: new It(0) } }]), vertexShader: Dt.meshlambert_vert, fragmentShader: Dt.meshlambert_frag }, phong: { uniforms: _e([et.common, et.specularmap, et.envmap, et.aomap, et.lightmap, et.emissivemap, et.bumpmap, et.normalmap, et.displacementmap, et.fog, et.lights, { emissive: { value: new It(0) }, specular: { value: new It(1118481) }, shininess: { value: 30 } }]), vertexShader: Dt.meshphong_vert, fragmentShader: Dt.meshphong_frag }, standard: { uniforms: _e([et.common, et.envmap, et.aomap, et.lightmap, et.emissivemap, et.bumpmap, et.normalmap, et.displacementmap, et.roughnessmap, et.metalnessmap, et.fog, et.lights, { emissive: { value: new It(0) }, roughness: { value: 1 }, metalness: { value: 0 }, envMapIntensity: { value: 1 } }]), vertexShader: Dt.meshphysical_vert, fragmentShader: Dt.meshphysical_frag }, toon: { uniforms: _e([et.common, et.aomap, et.lightmap, et.emissivemap, et.bumpmap, et.normalmap, et.displacementmap, et.gradientmap, et.fog, et.lights, { emissive: { value: new It(0) } }]), vertexShader: Dt.meshtoon_vert, fragmentShader: Dt.meshtoon_frag }, matcap: { uniforms: _e([et.common, et.bumpmap, et.normalmap, et.displacementmap, et.fog, { matcap: { value: null } }]), vertexShader: Dt.meshmatcap_vert, fragmentShader: Dt.meshmatcap_frag }, points: { uniforms: _e([et.points, et.fog]), vertexShader: Dt.points_vert, fragmentShader: Dt.points_frag }, dashed: { uniforms: _e([et.common, et.fog, { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } }]), vertexShader: Dt.linedashed_vert, fragmentShader: Dt.linedashed_frag }, depth: { uniforms: _e([et.common, et.displacementmap]), vertexShader: Dt.depth_vert, fragmentShader: Dt.depth_frag }, normal: { uniforms: _e([et.common, et.bumpmap, et.normalmap, et.displacementmap, { opacity: { value: 1 } }]), vertexShader: Dt.meshnormal_vert, fragmentShader: Dt.meshnormal_frag }, sprite: { uniforms: _e([et.sprite, et.fog]), vertexShader: Dt.sprite_vert, fragmentShader: Dt.sprite_frag }, background: { uniforms: { uvTransform: { value: new Pt() }, t2D: { value: null }, backgroundIntensity: { value: 1 } }, vertexShader: Dt.background_vert, fragmentShader: Dt.background_frag }, backgroundCube: { uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 }, backgroundBlurriness: { value: 0 }, backgroundIntensity: { value: 1 }, backgroundRotation: { value: new Pt() } }, vertexShader: Dt.backgroundCube_vert, fragmentShader: Dt.backgroundCube_frag }, cube: { uniforms: { tCube: { value: null }, tFlip: { value: -1 }, opacity: { value: 1 } }, vertexShader: Dt.cube_vert, fragmentShader: Dt.cube_frag }, equirect: { uniforms: { tEquirect: { value: null } }, vertexShader: Dt.equirect_vert, fragmentShader: Dt.equirect_frag }, distanceRGBA: { uniforms: _e([et.common, et.displacementmap, { referencePosition: { value: new C() }, nearDistance: { value: 1 }, farDistance: { value: 1e3 } }]), vertexShader: Dt.distanceRGBA_vert, fragmentShader: Dt.distanceRGBA_frag }, shadow: { uniforms: _e([et.lights, et.fog, { color: { value: new It(0) }, opacity: { value: 1 } }]), vertexShader: Dt.shadow_vert, fragmentShader: Dt.shadow_frag } };
Ye.physical = { uniforms: _e([Ye.standard.uniforms, { clearcoat: { value: 0 }, clearcoatMap: { value: null }, clearcoatMapTransform: { value: new Pt() }, clearcoatNormalMap: { value: null }, clearcoatNormalMapTransform: { value: new Pt() }, clearcoatNormalScale: { value: new it(1, 1) }, clearcoatRoughness: { value: 0 }, clearcoatRoughnessMap: { value: null }, clearcoatRoughnessMapTransform: { value: new Pt() }, dispersion: { value: 0 }, iridescence: { value: 0 }, iridescenceMap: { value: null }, iridescenceMapTransform: { value: new Pt() }, iridescenceIOR: { value: 1.3 }, iridescenceThicknessMinimum: { value: 100 }, iridescenceThicknessMaximum: { value: 400 }, iridescenceThicknessMap: { value: null }, iridescenceThicknessMapTransform: { value: new Pt() }, sheen: { value: 0 }, sheenColor: { value: new It(0) }, sheenColorMap: { value: null }, sheenColorMapTransform: { value: new Pt() }, sheenRoughness: { value: 1 }, sheenRoughnessMap: { value: null }, sheenRoughnessMapTransform: { value: new Pt() }, transmission: { value: 0 }, transmissionMap: { value: null }, transmissionMapTransform: { value: new Pt() }, transmissionSamplerSize: { value: new it() }, transmissionSamplerMap: { value: null }, thickness: { value: 0 }, thicknessMap: { value: null }, thicknessMapTransform: { value: new Pt() }, attenuationDistance: { value: 0 }, attenuationColor: { value: new It(0) }, specularColor: { value: new It(1, 1, 1) }, specularColorMap: { value: null }, specularColorMapTransform: { value: new Pt() }, specularIntensity: { value: 1 }, specularIntensityMap: { value: null }, specularIntensityMapTransform: { value: new Pt() }, anisotropyVector: { value: new it() }, anisotropyMap: { value: null }, anisotropyMapTransform: { value: new Pt() } }]), vertexShader: Dt.meshphysical_vert, fragmentShader: Dt.meshphysical_frag };
const gs = { r: 0, b: 0, g: 0 }, Ln = new Ke(), xf = new Xt();
function Mf(i, t, e, n, s, r, a) {
  const o = new It(0);
  let l = r === true ? 0 : 1, c, h, u = null, d = 0, p = null;
  function g(E) {
    let T = E.isScene === true ? E.background : null;
    return T && T.isTexture && (T = (E.backgroundBlurriness > 0 ? e : t).get(T)), T;
  }
  function _(E) {
    let T = false;
    const y = g(E);
    y === null ? f(o, l) : y && y.isColor && (f(y, 1), T = true);
    const N = i.xr.getEnvironmentBlendMode();
    N === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, a) : N === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, a), (i.autoClear || T) && (n.buffers.depth.setTest(true), n.buffers.depth.setMask(true), n.buffers.color.setMask(true), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function m(E, T) {
    const y = g(T);
    y && (y.isCubeTexture || y.mapping === Hs) ? (h === void 0 && (h = new ve(new Je(1, 1, 1), new dn({ name: "BackgroundCubeMaterial", uniforms: Mi(Ye.backgroundCube.uniforms), vertexShader: Ye.backgroundCube.vertexShader, fragmentShader: Ye.backgroundCube.fragmentShader, side: xe, depthTest: false, depthWrite: false, fog: false })), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(N, w, A) {
      this.matrixWorld.copyPosition(A.matrixWorld);
    }, Object.defineProperty(h.material, "envMap", { get: function() {
      return this.uniforms.envMap.value;
    } }), s.update(h)), Ln.copy(T.backgroundRotation), Ln.x *= -1, Ln.y *= -1, Ln.z *= -1, y.isCubeTexture && y.isRenderTargetTexture === false && (Ln.y *= -1, Ln.z *= -1), h.material.uniforms.envMap.value = y, h.material.uniforms.flipEnvMap.value = y.isCubeTexture && y.isRenderTargetTexture === false ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = T.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = T.backgroundIntensity, h.material.uniforms.backgroundRotation.value.setFromMatrix4(xf.makeRotationFromEuler(Ln)), h.material.toneMapped = Ht.getTransfer(y.colorSpace) !== qt, (u !== y || d !== y.version || p !== i.toneMapping) && (h.material.needsUpdate = true, u = y, d = y.version, p = i.toneMapping), h.layers.enableAll(), E.unshift(h, h.geometry, h.material, 0, 0, null)) : y && y.isTexture && (c === void 0 && (c = new ve(new qi(2, 2), new dn({ name: "BackgroundMaterial", uniforms: Mi(Ye.background.uniforms), vertexShader: Ye.background.vertexShader, fragmentShader: Ye.background.fragmentShader, side: Tn, depthTest: false, depthWrite: false, fog: false })), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", { get: function() {
      return this.uniforms.t2D.value;
    } }), s.update(c)), c.material.uniforms.t2D.value = y, c.material.uniforms.backgroundIntensity.value = T.backgroundIntensity, c.material.toneMapped = Ht.getTransfer(y.colorSpace) !== qt, y.matrixAutoUpdate === true && y.updateMatrix(), c.material.uniforms.uvTransform.value.copy(y.matrix), (u !== y || d !== y.version || p !== i.toneMapping) && (c.material.needsUpdate = true, u = y, d = y.version, p = i.toneMapping), c.layers.enableAll(), E.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function f(E, T) {
    E.getRGB(gs, Hl(i)), n.buffers.color.setClear(gs.r, gs.g, gs.b, T, a);
  }
  return { getClearColor: function() {
    return o;
  }, setClearColor: function(E, T = 1) {
    o.set(E), l = T, f(o, l);
  }, getClearAlpha: function() {
    return l;
  }, setClearAlpha: function(E) {
    l = E, f(o, l);
  }, render: _, addToRenderList: m };
}
function yf(i, t) {
  const e = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, s = d(null);
  let r = s, a = false;
  function o(M, R, k, z, W) {
    let Z = false;
    const V = u(z, k, R);
    r !== V && (r = V, c(r.object)), Z = p(M, z, k, W), Z && g(M, z, k, W), W !== null && t.update(W, i.ELEMENT_ARRAY_BUFFER), (Z || a) && (a = false, y(M, R, k, z), W !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, t.get(W).buffer));
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
  function u(M, R, k) {
    const z = k.wireframe === true;
    let W = n[M.id];
    W === void 0 && (W = {}, n[M.id] = W);
    let Z = W[R.id];
    Z === void 0 && (Z = {}, W[R.id] = Z);
    let V = Z[z];
    return V === void 0 && (V = d(l()), Z[z] = V), V;
  }
  function d(M) {
    const R = [], k = [], z = [];
    for (let W = 0; W < e; W++) R[W] = 0, k[W] = 0, z[W] = 0;
    return { geometry: null, program: null, wireframe: false, newAttributes: R, enabledAttributes: k, attributeDivisors: z, object: M, attributes: {}, index: null };
  }
  function p(M, R, k, z) {
    const W = r.attributes, Z = R.attributes;
    let V = 0;
    const K = k.getAttributes();
    for (const G in K) if (K[G].location >= 0) {
      const ht = W[G];
      let Mt = Z[G];
      if (Mt === void 0 && (G === "instanceMatrix" && M.instanceMatrix && (Mt = M.instanceMatrix), G === "instanceColor" && M.instanceColor && (Mt = M.instanceColor)), ht === void 0 || ht.attribute !== Mt || Mt && ht.data !== Mt.data) return true;
      V++;
    }
    return r.attributesNum !== V || r.index !== z;
  }
  function g(M, R, k, z) {
    const W = {}, Z = R.attributes;
    let V = 0;
    const K = k.getAttributes();
    for (const G in K) if (K[G].location >= 0) {
      let ht = Z[G];
      ht === void 0 && (G === "instanceMatrix" && M.instanceMatrix && (ht = M.instanceMatrix), G === "instanceColor" && M.instanceColor && (ht = M.instanceColor));
      const Mt = {};
      Mt.attribute = ht, ht && ht.data && (Mt.data = ht.data), W[G] = Mt, V++;
    }
    r.attributes = W, r.attributesNum = V, r.index = z;
  }
  function _() {
    const M = r.newAttributes;
    for (let R = 0, k = M.length; R < k; R++) M[R] = 0;
  }
  function m(M) {
    f(M, 0);
  }
  function f(M, R) {
    const k = r.newAttributes, z = r.enabledAttributes, W = r.attributeDivisors;
    k[M] = 1, z[M] === 0 && (i.enableVertexAttribArray(M), z[M] = 1), W[M] !== R && (i.vertexAttribDivisor(M, R), W[M] = R);
  }
  function E() {
    const M = r.newAttributes, R = r.enabledAttributes;
    for (let k = 0, z = R.length; k < z; k++) R[k] !== M[k] && (i.disableVertexAttribArray(k), R[k] = 0);
  }
  function T(M, R, k, z, W, Z, V) {
    V === true ? i.vertexAttribIPointer(M, R, k, W, Z) : i.vertexAttribPointer(M, R, k, z, W, Z);
  }
  function y(M, R, k, z) {
    _();
    const W = z.attributes, Z = k.getAttributes(), V = R.defaultAttributeValues;
    for (const K in Z) {
      const G = Z[K];
      if (G.location >= 0) {
        let st = W[K];
        if (st === void 0 && (K === "instanceMatrix" && M.instanceMatrix && (st = M.instanceMatrix), K === "instanceColor" && M.instanceColor && (st = M.instanceColor)), st !== void 0) {
          const ht = st.normalized, Mt = st.itemSize, Ut = t.get(st);
          if (Ut === void 0) continue;
          const jt = Ut.buffer, Y = Ut.type, tt = Ut.bytesPerElement, _t = Y === i.INT || Y === i.UNSIGNED_INT || st.gpuType === ya;
          if (st.isInterleavedBufferAttribute) {
            const rt = st.data, bt = rt.stride, wt = st.offset;
            if (rt.isInstancedInterleavedBuffer) {
              for (let Nt = 0; Nt < G.locationSize; Nt++) f(G.location + Nt, rt.meshPerAttribute);
              M.isInstancedMesh !== true && z._maxInstanceCount === void 0 && (z._maxInstanceCount = rt.meshPerAttribute * rt.count);
            } else for (let Nt = 0; Nt < G.locationSize; Nt++) m(G.location + Nt);
            i.bindBuffer(i.ARRAY_BUFFER, jt);
            for (let Nt = 0; Nt < G.locationSize; Nt++) T(G.location + Nt, Mt / G.locationSize, Y, ht, bt * tt, (wt + Mt / G.locationSize * Nt) * tt, _t);
          } else {
            if (st.isInstancedBufferAttribute) {
              for (let rt = 0; rt < G.locationSize; rt++) f(G.location + rt, st.meshPerAttribute);
              M.isInstancedMesh !== true && z._maxInstanceCount === void 0 && (z._maxInstanceCount = st.meshPerAttribute * st.count);
            } else for (let rt = 0; rt < G.locationSize; rt++) m(G.location + rt);
            i.bindBuffer(i.ARRAY_BUFFER, jt);
            for (let rt = 0; rt < G.locationSize; rt++) T(G.location + rt, Mt / G.locationSize, Y, ht, Mt * tt, Mt / G.locationSize * rt * tt, _t);
          }
        } else if (V !== void 0) {
          const ht = V[K];
          if (ht !== void 0) switch (ht.length) {
            case 2:
              i.vertexAttrib2fv(G.location, ht);
              break;
            case 3:
              i.vertexAttrib3fv(G.location, ht);
              break;
            case 4:
              i.vertexAttrib4fv(G.location, ht);
              break;
            default:
              i.vertexAttrib1fv(G.location, ht);
          }
        }
      }
    }
    E();
  }
  function N() {
    L();
    for (const M in n) {
      const R = n[M];
      for (const k in R) {
        const z = R[k];
        for (const W in z) h(z[W].object), delete z[W];
        delete R[k];
      }
      delete n[M];
    }
  }
  function w(M) {
    if (n[M.id] === void 0) return;
    const R = n[M.id];
    for (const k in R) {
      const z = R[k];
      for (const W in z) h(z[W].object), delete z[W];
      delete R[k];
    }
    delete n[M.id];
  }
  function A(M) {
    for (const R in n) {
      const k = n[R];
      if (k[M.id] === void 0) continue;
      const z = k[M.id];
      for (const W in z) h(z[W].object), delete z[W];
      delete k[M.id];
    }
  }
  function L() {
    S(), a = true, r !== s && (r = s, c(r.object));
  }
  function S() {
    s.geometry = null, s.program = null, s.wireframe = false;
  }
  return { setup: o, reset: L, resetDefaultState: S, dispose: N, releaseStatesOfGeometry: w, releaseStatesOfProgram: A, initAttributes: _, enableAttribute: m, disableUnusedAttributes: E };
}
function Sf(i, t, e) {
  let n;
  function s(c) {
    n = c;
  }
  function r(c, h) {
    i.drawArrays(n, c, h), e.update(h, n, 1);
  }
  function a(c, h, u) {
    u !== 0 && (i.drawArraysInstanced(n, c, h, u), e.update(h, n, u));
  }
  function o(c, h, u) {
    if (u === 0) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, c, 0, h, 0, u);
    let p = 0;
    for (let g = 0; g < u; g++) p += h[g];
    e.update(p, n, 1);
  }
  function l(c, h, u, d) {
    if (u === 0) return;
    const p = t.get("WEBGL_multi_draw");
    if (p === null) for (let g = 0; g < c.length; g++) a(c[g], h[g], d[g]);
    else {
      p.multiDrawArraysInstancedWEBGL(n, c, 0, h, 0, d, 0, u);
      let g = 0;
      for (let _ = 0; _ < u; _++) g += h[_] * d[_];
      e.update(g, n, 1);
    }
  }
  this.setMode = s, this.render = r, this.renderInstances = a, this.renderMultiDraw = o, this.renderMultiDrawInstances = l;
}
function Ef(i, t, e, n) {
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
    return !(A !== We && n.convert(A) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(A) {
    const L = A === Xi && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(A !== un && n.convert(A) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && A !== Ze && !L);
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
  const u = e.logarithmicDepthBuffer === true, d = e.reverseDepthBuffer === true && t.has("EXT_clip_control"), p = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), g = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), _ = i.getParameter(i.MAX_TEXTURE_SIZE), m = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), f = i.getParameter(i.MAX_VERTEX_ATTRIBS), E = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), T = i.getParameter(i.MAX_VARYING_VECTORS), y = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), N = g > 0, w = i.getParameter(i.MAX_SAMPLES);
  return { isWebGL2: true, getMaxAnisotropy: r, getMaxPrecision: l, textureFormatReadable: a, textureTypeReadable: o, precision: c, logarithmicDepthBuffer: u, reverseDepthBuffer: d, maxTextures: p, maxVertexTextures: g, maxTextureSize: _, maxCubemapSize: m, maxAttributes: f, maxVertexUniforms: E, maxVaryings: T, maxFragmentUniforms: y, vertexTextures: N, maxSamples: w };
}
function bf(i) {
  const t = this;
  let e = null, n = 0, s = false, r = false;
  const a = new yn(), o = new Pt(), l = { value: null, needsUpdate: false };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(u, d) {
    const p = u.length !== 0 || d || n !== 0 || s;
    return s = d, n = u.length, p;
  }, this.beginShadows = function() {
    r = true, h(null);
  }, this.endShadows = function() {
    r = false;
  }, this.setGlobalState = function(u, d) {
    e = h(u, d, 0);
  }, this.setState = function(u, d, p) {
    const g = u.clippingPlanes, _ = u.clipIntersection, m = u.clipShadows, f = i.get(u);
    if (!s || g === null || g.length === 0 || r && !m) r ? h(null) : c();
    else {
      const E = r ? 0 : n, T = E * 4;
      let y = f.clippingState || null;
      l.value = y, y = h(g, d, T, p);
      for (let N = 0; N !== T; ++N) y[N] = e[N];
      f.clippingState = y, this.numIntersection = _ ? this.numPlanes : 0, this.numPlanes += E;
    }
  };
  function c() {
    l.value !== e && (l.value = e, l.needsUpdate = n > 0), t.numPlanes = n, t.numIntersection = 0;
  }
  function h(u, d, p, g) {
    const _ = u !== null ? u.length : 0;
    let m = null;
    if (_ !== 0) {
      if (m = l.value, g !== true || m === null) {
        const f = p + _ * 4, E = d.matrixWorldInverse;
        o.getNormalMatrix(E), (m === null || m.length < f) && (m = new Float32Array(f));
        for (let T = 0, y = p; T !== _; ++T, y += 4) a.copy(u[T]).applyMatrix4(E, o), a.normal.toArray(m, y), m[y + 3] = a.constant;
      }
      l.value = m, l.needsUpdate = true;
    }
    return t.numPlanes = _, t.numIntersection = 0, m;
  }
}
function Tf(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(a, o) {
    return o === kr ? a.mapping = gi : o === Hr && (a.mapping = _i), a;
  }
  function n(a) {
    if (a && a.isTexture) {
      const o = a.mapping;
      if (o === kr || o === Hr) if (t.has(a)) {
        const l = t.get(a).texture;
        return e(l, a.mapping);
      } else {
        const l = a.image;
        if (l && l.height > 0) {
          const c = new Nh(l.height);
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
class Xl extends Gl {
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
const ci = 4, bo = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], Nn = 20, mr = new Xl(), To = new It();
let gr = null, _r = 0, vr = 0, xr = false;
const In = (1 + Math.sqrt(5)) / 2, ai = 1 / In, Ao = [new C(-In, ai, 0), new C(In, ai, 0), new C(-ai, 0, In), new C(ai, 0, In), new C(0, In, -ai), new C(0, In, ai), new C(-1, 1, -1), new C(1, 1, -1), new C(-1, 1, 1), new C(1, 1, 1)];
class _a {
  constructor(t) {
    this._renderer = t, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  fromScene(t, e = 0, n = 0.1, s = 100) {
    gr = this._renderer.getRenderTarget(), _r = this._renderer.getActiveCubeFace(), vr = this._renderer.getActiveMipmapLevel(), xr = this._renderer.xr.enabled, this._renderer.xr.enabled = false, this._setSize(256);
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
    this._cubemapMaterial === null && (this._cubemapMaterial = Ro(), this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = Co(), this._compileMaterial(this._equirectMaterial));
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
    this._renderer.setRenderTarget(gr, _r, vr), this._renderer.xr.enabled = xr, t.scissorTest = false, _s(t, 0, 0, t.width, t.height);
  }
  _fromTexture(t, e) {
    t.mapping === gi || t.mapping === _i ? this._setSize(t.image.length === 0 ? 16 : t.image[0].width || t.image[0].image.width) : this._setSize(t.image.width / 4), gr = this._renderer.getRenderTarget(), _r = this._renderer.getActiveCubeFace(), vr = this._renderer.getActiveMipmapLevel(), xr = this._renderer.xr.enabled, this._renderer.xr.enabled = false;
    const n = e || this._allocateTargets();
    return this._textureToCubeUV(t, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const t = 3 * Math.max(this._cubeSize, 112), e = 4 * this._cubeSize, n = { magFilter: $e, minFilter: $e, generateMipmaps: false, type: Xi, format: We, colorSpace: yi, depthBuffer: false }, s = wo(t, e, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== t || this._pingPongRenderTarget.height !== e) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = wo(t, e, n);
      const { _lodMax: r } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = Af(r)), this._blurMaterial = wf(r, t, e);
    }
    return s;
  }
  _compileMaterial(t) {
    const e = new ve(this._lodPlanes[0], t);
    this._renderer.compile(e, mr);
  }
  _sceneToCubeUV(t, e, n, s) {
    const o = new Re(90, 1, e, n), l = [1, -1, 1, 1, 1, 1], c = [1, 1, 1, -1, -1, -1], h = this._renderer, u = h.autoClear, d = h.toneMapping;
    h.getClearColor(To), h.toneMapping = bn, h.autoClear = false;
    const p = new Bl({ name: "PMREM.Background", side: xe, depthWrite: false, depthTest: false }), g = new ve(new Je(), p);
    let _ = false;
    const m = t.background;
    m ? m.isColor && (p.color.copy(m), t.background = null, _ = true) : (p.color.copy(To), _ = true);
    for (let f = 0; f < 6; f++) {
      const E = f % 3;
      E === 0 ? (o.up.set(0, l[f], 0), o.lookAt(c[f], 0, 0)) : E === 1 ? (o.up.set(0, 0, l[f]), o.lookAt(0, c[f], 0)) : (o.up.set(0, l[f], 0), o.lookAt(0, 0, c[f]));
      const T = this._cubeSize;
      _s(s, E * T, f > 2 ? T : 0, T, T), h.setRenderTarget(s), _ && h.render(g, o), h.render(t, o);
    }
    g.geometry.dispose(), g.material.dispose(), h.toneMapping = d, h.autoClear = u, t.background = m;
  }
  _textureToCubeUV(t, e) {
    const n = this._renderer, s = t.mapping === gi || t.mapping === _i;
    s ? (this._cubemapMaterial === null && (this._cubemapMaterial = Ro()), this._cubemapMaterial.uniforms.flipEnvMap.value = t.isRenderTargetTexture === false ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Co());
    const r = s ? this._cubemapMaterial : this._equirectMaterial, a = new ve(this._lodPlanes[0], r), o = r.uniforms;
    o.envMap.value = t;
    const l = this._cubeSize;
    _s(e, 0, 0, 3 * l, 2 * l), n.setRenderTarget(e), n.render(a, mr);
  }
  _applyPMREM(t) {
    const e = this._renderer, n = e.autoClear;
    e.autoClear = false;
    const s = this._lodPlanes.length;
    for (let r = 1; r < s; r++) {
      const a = Math.sqrt(this._sigmas[r] * this._sigmas[r] - this._sigmas[r - 1] * this._sigmas[r - 1]), o = Ao[(s - r - 1) % Ao.length];
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
    const h = 3, u = new ve(this._lodPlanes[s], c), d = c.uniforms, p = this._sizeLods[n] - 1, g = isFinite(r) ? Math.PI / (2 * p) : 2 * Math.PI / (2 * Nn - 1), _ = r / g, m = isFinite(r) ? 1 + Math.floor(h * _) : Nn;
    m > Nn && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Nn}`);
    const f = [];
    let E = 0;
    for (let A = 0; A < Nn; ++A) {
      const L = A / _, S = Math.exp(-L * L / 2);
      f.push(S), A === 0 ? E += S : A < m && (E += 2 * S);
    }
    for (let A = 0; A < f.length; A++) f[A] = f[A] / E;
    d.envMap.value = t.texture, d.samples.value = m, d.weights.value = f, d.latitudinal.value = a === "latitudinal", o && (d.poleAxis.value = o);
    const { _lodMax: T } = this;
    d.dTheta.value = g, d.mipInt.value = T - n;
    const y = this._sizeLods[s], N = 3 * y * (s > T - ci ? s - T + ci : 0), w = 4 * (this._cubeSize - y);
    _s(e, N, w, 3 * y, 2 * y), l.setRenderTarget(e), l.render(u, mr);
  }
}
function Af(i) {
  const t = [], e = [], n = [];
  let s = i;
  const r = i - ci + 1 + bo.length;
  for (let a = 0; a < r; a++) {
    const o = Math.pow(2, s);
    e.push(o);
    let l = 1 / o;
    a > i - ci ? l = bo[a - i + ci - 1] : a === 0 && (l = 0), n.push(l);
    const c = 1 / (o - 2), h = -c, u = 1 + c, d = [h, h, u, h, u, u, h, h, u, u, h, u], p = 6, g = 6, _ = 3, m = 2, f = 1, E = new Float32Array(_ * g * p), T = new Float32Array(m * g * p), y = new Float32Array(f * g * p);
    for (let w = 0; w < p; w++) {
      const A = w % 3 * 2 / 3 - 1, L = w > 2 ? 0 : -1, S = [A, L, 0, A + 2 / 3, L, 0, A + 2 / 3, L + 1, 0, A, L, 0, A + 2 / 3, L + 1, 0, A, L + 1, 0];
      E.set(S, _ * g * w), T.set(d, m * g * w);
      const M = [w, w, w, w, w, w];
      y.set(M, f * g * w);
    }
    const N = new Le();
    N.setAttribute("position", new Be(E, _)), N.setAttribute("uv", new Be(T, m)), N.setAttribute("faceIndex", new Be(y, f)), t.push(N), s > ci && s--;
  }
  return { lodPlanes: t, sizeLods: e, sigmas: n };
}
function wo(i, t, e) {
  const n = new Hn(i, t, e);
  return n.texture.mapping = Hs, n.texture.name = "PMREM.cubeUv", n.scissorTest = true, n;
}
function _s(i, t, e, n, s) {
  i.viewport.set(t, e, n, s), i.scissor.set(t, e, n, s);
}
function wf(i, t, e) {
  const n = new Float32Array(Nn), s = new C(0, 1, 0);
  return new dn({ name: "SphericalGaussianBlur", defines: { n: Nn, CUBEUV_TEXEL_WIDTH: 1 / t, CUBEUV_TEXEL_HEIGHT: 1 / e, CUBEUV_MAX_MIP: `${i}.0` }, uniforms: { envMap: { value: null }, samples: { value: 1 }, weights: { value: n }, latitudinal: { value: false }, dTheta: { value: 0 }, mipInt: { value: 0 }, poleAxis: { value: s } }, vertexShader: Pa(), fragmentShader: `

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
		`, blending: En, depthTest: false, depthWrite: false });
}
function Co() {
  return new dn({ name: "EquirectangularToCubeUV", uniforms: { envMap: { value: null } }, vertexShader: Pa(), fragmentShader: `

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
		`, blending: En, depthTest: false, depthWrite: false });
}
function Ro() {
  return new dn({ name: "CubemapToCubeUV", uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } }, vertexShader: Pa(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`, blending: En, depthTest: false, depthWrite: false });
}
function Pa() {
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
function Cf(i) {
  let t = /* @__PURE__ */ new WeakMap(), e = null;
  function n(o) {
    if (o && o.isTexture) {
      const l = o.mapping, c = l === kr || l === Hr, h = l === gi || l === _i;
      if (c || h) {
        let u = t.get(o);
        const d = u !== void 0 ? u.texture.pmremVersion : 0;
        if (o.isRenderTargetTexture && o.pmremVersion !== d) return e === null && (e = new _a(i)), u = c ? e.fromEquirectangular(o, u) : e.fromCubemap(o, u), u.texture.pmremVersion = o.pmremVersion, t.set(o, u), u.texture;
        if (u !== void 0) return u.texture;
        {
          const p = o.image;
          return c && p && p.height > 0 || h && p && s(p) ? (e === null && (e = new _a(i)), u = c ? e.fromEquirectangular(o) : e.fromCubemap(o), u.texture.pmremVersion = o.pmremVersion, t.set(o, u), o.addEventListener("dispose", r), u.texture) : null;
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
function Rf(i) {
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
    return s === null && Oi("THREE.WebGLRenderer: " + n + " extension not supported."), s;
  } };
}
function Pf(i, t, e, n) {
  const s = {}, r = /* @__PURE__ */ new WeakMap();
  function a(u) {
    const d = u.target;
    d.index !== null && t.remove(d.index);
    for (const g in d.attributes) t.remove(d.attributes[g]);
    for (const g in d.morphAttributes) {
      const _ = d.morphAttributes[g];
      for (let m = 0, f = _.length; m < f; m++) t.remove(_[m]);
    }
    d.removeEventListener("dispose", a), delete s[d.id];
    const p = r.get(d);
    p && (t.remove(p), r.delete(d)), n.releaseStatesOfGeometry(d), d.isInstancedBufferGeometry === true && delete d._maxInstanceCount, e.memory.geometries--;
  }
  function o(u, d) {
    return s[d.id] === true || (d.addEventListener("dispose", a), s[d.id] = true, e.memory.geometries++), d;
  }
  function l(u) {
    const d = u.attributes;
    for (const g in d) t.update(d[g], i.ARRAY_BUFFER);
    const p = u.morphAttributes;
    for (const g in p) {
      const _ = p[g];
      for (let m = 0, f = _.length; m < f; m++) t.update(_[m], i.ARRAY_BUFFER);
    }
  }
  function c(u) {
    const d = [], p = u.index, g = u.attributes.position;
    let _ = 0;
    if (p !== null) {
      const E = p.array;
      _ = p.version;
      for (let T = 0, y = E.length; T < y; T += 3) {
        const N = E[T + 0], w = E[T + 1], A = E[T + 2];
        d.push(N, w, w, A, A, N);
      }
    } else if (g !== void 0) {
      const E = g.array;
      _ = g.version;
      for (let T = 0, y = E.length / 3 - 1; T < y; T += 3) {
        const N = T + 0, w = T + 1, A = T + 2;
        d.push(N, w, w, A, A, N);
      }
    } else return;
    const m = new (Il(d) ? kl : zl)(d, 1);
    m.version = _;
    const f = r.get(u);
    f && t.remove(f), r.set(u, m);
  }
  function h(u) {
    const d = r.get(u);
    if (d) {
      const p = u.index;
      p !== null && d.version < p.version && c(u);
    } else c(u);
    return r.get(u);
  }
  return { get: o, update: l, getWireframeAttribute: h };
}
function Lf(i, t, e) {
  let n;
  function s(d) {
    n = d;
  }
  let r, a;
  function o(d) {
    r = d.type, a = d.bytesPerElement;
  }
  function l(d, p) {
    i.drawElements(n, p, r, d * a), e.update(p, n, 1);
  }
  function c(d, p, g) {
    g !== 0 && (i.drawElementsInstanced(n, p, r, d * a, g), e.update(p, n, g));
  }
  function h(d, p, g) {
    if (g === 0) return;
    t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, p, 0, r, d, 0, g);
    let m = 0;
    for (let f = 0; f < g; f++) m += p[f];
    e.update(m, n, 1);
  }
  function u(d, p, g, _) {
    if (g === 0) return;
    const m = t.get("WEBGL_multi_draw");
    if (m === null) for (let f = 0; f < d.length; f++) c(d[f] / a, p[f], _[f]);
    else {
      m.multiDrawElementsInstancedWEBGL(n, p, 0, r, d, 0, _, 0, g);
      let f = 0;
      for (let E = 0; E < g; E++) f += p[E] * _[E];
      e.update(f, n, 1);
    }
  }
  this.setMode = s, this.setIndex = o, this.render = l, this.renderInstances = c, this.renderMultiDraw = h, this.renderMultiDrawInstances = u;
}
function Df(i) {
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
function If(i, t, e) {
  const n = /* @__PURE__ */ new WeakMap(), s = new Zt();
  function r(a, o, l) {
    const c = a.morphTargetInfluences, h = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, u = h !== void 0 ? h.length : 0;
    let d = n.get(o);
    if (d === void 0 || d.count !== u) {
      let M = function() {
        L.dispose(), n.delete(o), o.removeEventListener("dispose", M);
      };
      var p = M;
      d !== void 0 && d.texture.dispose();
      const g = o.morphAttributes.position !== void 0, _ = o.morphAttributes.normal !== void 0, m = o.morphAttributes.color !== void 0, f = o.morphAttributes.position || [], E = o.morphAttributes.normal || [], T = o.morphAttributes.color || [];
      let y = 0;
      g === true && (y = 1), _ === true && (y = 2), m === true && (y = 3);
      let N = o.attributes.position.count * y, w = 1;
      N > t.maxTextureSize && (w = Math.ceil(N / t.maxTextureSize), N = t.maxTextureSize);
      const A = new Float32Array(N * w * 4 * u), L = new Nl(A, N, w, u);
      L.type = Ze, L.needsUpdate = true;
      const S = y * 4;
      for (let R = 0; R < u; R++) {
        const k = f[R], z = E[R], W = T[R], Z = N * w * 4 * R;
        for (let V = 0; V < k.count; V++) {
          const K = V * S;
          g === true && (s.fromBufferAttribute(k, V), A[Z + K + 0] = s.x, A[Z + K + 1] = s.y, A[Z + K + 2] = s.z, A[Z + K + 3] = 0), _ === true && (s.fromBufferAttribute(z, V), A[Z + K + 4] = s.x, A[Z + K + 5] = s.y, A[Z + K + 6] = s.z, A[Z + K + 7] = 0), m === true && (s.fromBufferAttribute(W, V), A[Z + K + 8] = s.x, A[Z + K + 9] = s.y, A[Z + K + 10] = s.z, A[Z + K + 11] = W.itemSize === 4 ? s.w : 1);
        }
      }
      d = { count: u, texture: L, size: new it(N, w) }, n.set(o, d), o.addEventListener("dispose", M);
    }
    if (a.isInstancedMesh === true && a.morphTexture !== null) l.getUniforms().setValue(i, "morphTexture", a.morphTexture, e);
    else {
      let g = 0;
      for (let m = 0; m < c.length; m++) g += c[m];
      const _ = o.morphTargetsRelative ? 1 : 1 - g;
      l.getUniforms().setValue(i, "morphTargetBaseInfluence", _), l.getUniforms().setValue(i, "morphTargetInfluences", c);
    }
    l.getUniforms().setValue(i, "morphTargetsTexture", d.texture, e), l.getUniforms().setValue(i, "morphTargetsTextureSize", d.size);
  }
  return { update: r };
}
function Uf(i, t, e, n) {
  let s = /* @__PURE__ */ new WeakMap();
  function r(l) {
    const c = n.render.frame, h = l.geometry, u = t.get(l, h);
    if (s.get(u) !== c && (t.update(u), s.set(u, c)), l.isInstancedMesh && (l.hasEventListener("dispose", o) === false && l.addEventListener("dispose", o), s.get(l) !== c && (e.update(l.instanceMatrix, i.ARRAY_BUFFER), l.instanceColor !== null && e.update(l.instanceColor, i.ARRAY_BUFFER), s.set(l, c))), l.isSkinnedMesh) {
      const d = l.skeleton;
      s.get(d) !== c && (d.update(), s.set(d, c));
    }
    return u;
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
class Yl extends Me {
  constructor(t, e, n, s, r, a, o, l, c, h = di) {
    if (h !== di && h !== xi) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && h === di && (n = kn), n === void 0 && h === xi && (n = vi), super(null, s, r, a, o, l, h, n, c), this.isDepthTexture = true, this.image = { width: t, height: e }, this.magFilter = o !== void 0 ? o : Pe, this.minFilter = l !== void 0 ? l : Pe, this.flipY = false, this.generateMipmaps = false, this.compareFunction = null;
  }
  copy(t) {
    return super.copy(t), this.compareFunction = t.compareFunction, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.compareFunction !== null && (e.compareFunction = this.compareFunction), e;
  }
}
const ql = new Me(), Po = new Yl(1, 1), $l = new Nl(), Zl = new xh(), jl = new Vl(), Lo = [], Do = [], Io = new Float32Array(16), Uo = new Float32Array(9), No = new Float32Array(4);
function bi(i, t, e) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const s = t * e;
  let r = Lo[s];
  if (r === void 0 && (r = new Float32Array(s), Lo[s] = r), t !== 0) {
    n.toArray(r, 0);
    for (let a = 1, o = 0; a !== t; ++a) o += e, i[a].toArray(r, o);
  }
  return r;
}
function he(i, t) {
  if (i.length !== t.length) return false;
  for (let e = 0, n = i.length; e < n; e++) if (i[e] !== t[e]) return false;
  return true;
}
function ue(i, t) {
  for (let e = 0, n = t.length; e < n; e++) i[e] = t[e];
}
function Vs(i, t) {
  let e = Do[t];
  e === void 0 && (e = new Int32Array(t), Do[t] = e);
  for (let n = 0; n !== t; ++n) e[n] = i.allocateTextureUnit();
  return e;
}
function Nf(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1f(this.addr, t), e[0] = t);
}
function Ff(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y) && (i.uniform2f(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (he(e, t)) return;
    i.uniform2fv(this.addr, t), ue(e, t);
  }
}
function Of(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3f(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else if (t.r !== void 0) (e[0] !== t.r || e[1] !== t.g || e[2] !== t.b) && (i.uniform3f(this.addr, t.r, t.g, t.b), e[0] = t.r, e[1] = t.g, e[2] = t.b);
  else {
    if (he(e, t)) return;
    i.uniform3fv(this.addr, t), ue(e, t);
  }
}
function Bf(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4f(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (he(e, t)) return;
    i.uniform4fv(this.addr, t), ue(e, t);
  }
}
function zf(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (he(e, t)) return;
    i.uniformMatrix2fv(this.addr, false, t), ue(e, t);
  } else {
    if (he(e, n)) return;
    No.set(n), i.uniformMatrix2fv(this.addr, false, No), ue(e, n);
  }
}
function kf(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (he(e, t)) return;
    i.uniformMatrix3fv(this.addr, false, t), ue(e, t);
  } else {
    if (he(e, n)) return;
    Uo.set(n), i.uniformMatrix3fv(this.addr, false, Uo), ue(e, n);
  }
}
function Hf(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (he(e, t)) return;
    i.uniformMatrix4fv(this.addr, false, t), ue(e, t);
  } else {
    if (he(e, n)) return;
    Io.set(n), i.uniformMatrix4fv(this.addr, false, Io), ue(e, n);
  }
}
function Gf(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1i(this.addr, t), e[0] = t);
}
function Vf(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y) && (i.uniform2i(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (he(e, t)) return;
    i.uniform2iv(this.addr, t), ue(e, t);
  }
}
function Wf(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3i(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (he(e, t)) return;
    i.uniform3iv(this.addr, t), ue(e, t);
  }
}
function Xf(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4i(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (he(e, t)) return;
    i.uniform4iv(this.addr, t), ue(e, t);
  }
}
function Yf(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1ui(this.addr, t), e[0] = t);
}
function qf(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y) && (i.uniform2ui(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (he(e, t)) return;
    i.uniform2uiv(this.addr, t), ue(e, t);
  }
}
function $f(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3ui(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (he(e, t)) return;
    i.uniform3uiv(this.addr, t), ue(e, t);
  }
}
function Zf(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4ui(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (he(e, t)) return;
    i.uniform4uiv(this.addr, t), ue(e, t);
  }
}
function jf(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s);
  let r;
  this.type === i.SAMPLER_2D_SHADOW ? (Po.compareFunction = Dl, r = Po) : r = ql, e.setTexture2D(t || r, s);
}
function Kf(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTexture3D(t || Zl, s);
}
function Jf(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTextureCube(t || jl, s);
}
function Qf(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTexture2DArray(t || $l, s);
}
function tp(i) {
  switch (i) {
    case 5126:
      return Nf;
    case 35664:
      return Ff;
    case 35665:
      return Of;
    case 35666:
      return Bf;
    case 35674:
      return zf;
    case 35675:
      return kf;
    case 35676:
      return Hf;
    case 5124:
    case 35670:
      return Gf;
    case 35667:
    case 35671:
      return Vf;
    case 35668:
    case 35672:
      return Wf;
    case 35669:
    case 35673:
      return Xf;
    case 5125:
      return Yf;
    case 36294:
      return qf;
    case 36295:
      return $f;
    case 36296:
      return Zf;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return jf;
    case 35679:
    case 36299:
    case 36307:
      return Kf;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Jf;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Qf;
  }
}
function ep(i, t) {
  i.uniform1fv(this.addr, t);
}
function np(i, t) {
  const e = bi(t, this.size, 2);
  i.uniform2fv(this.addr, e);
}
function ip(i, t) {
  const e = bi(t, this.size, 3);
  i.uniform3fv(this.addr, e);
}
function sp(i, t) {
  const e = bi(t, this.size, 4);
  i.uniform4fv(this.addr, e);
}
function rp(i, t) {
  const e = bi(t, this.size, 4);
  i.uniformMatrix2fv(this.addr, false, e);
}
function ap(i, t) {
  const e = bi(t, this.size, 9);
  i.uniformMatrix3fv(this.addr, false, e);
}
function op(i, t) {
  const e = bi(t, this.size, 16);
  i.uniformMatrix4fv(this.addr, false, e);
}
function lp(i, t) {
  i.uniform1iv(this.addr, t);
}
function cp(i, t) {
  i.uniform2iv(this.addr, t);
}
function hp(i, t) {
  i.uniform3iv(this.addr, t);
}
function up(i, t) {
  i.uniform4iv(this.addr, t);
}
function dp(i, t) {
  i.uniform1uiv(this.addr, t);
}
function fp(i, t) {
  i.uniform2uiv(this.addr, t);
}
function pp(i, t) {
  i.uniform3uiv(this.addr, t);
}
function mp(i, t) {
  i.uniform4uiv(this.addr, t);
}
function gp(i, t, e) {
  const n = this.cache, s = t.length, r = Vs(e, s);
  he(n, r) || (i.uniform1iv(this.addr, r), ue(n, r));
  for (let a = 0; a !== s; ++a) e.setTexture2D(t[a] || ql, r[a]);
}
function _p(i, t, e) {
  const n = this.cache, s = t.length, r = Vs(e, s);
  he(n, r) || (i.uniform1iv(this.addr, r), ue(n, r));
  for (let a = 0; a !== s; ++a) e.setTexture3D(t[a] || Zl, r[a]);
}
function vp(i, t, e) {
  const n = this.cache, s = t.length, r = Vs(e, s);
  he(n, r) || (i.uniform1iv(this.addr, r), ue(n, r));
  for (let a = 0; a !== s; ++a) e.setTextureCube(t[a] || jl, r[a]);
}
function xp(i, t, e) {
  const n = this.cache, s = t.length, r = Vs(e, s);
  he(n, r) || (i.uniform1iv(this.addr, r), ue(n, r));
  for (let a = 0; a !== s; ++a) e.setTexture2DArray(t[a] || $l, r[a]);
}
function Mp(i) {
  switch (i) {
    case 5126:
      return ep;
    case 35664:
      return np;
    case 35665:
      return ip;
    case 35666:
      return sp;
    case 35674:
      return rp;
    case 35675:
      return ap;
    case 35676:
      return op;
    case 5124:
    case 35670:
      return lp;
    case 35667:
    case 35671:
      return cp;
    case 35668:
    case 35672:
      return hp;
    case 35669:
    case 35673:
      return up;
    case 5125:
      return dp;
    case 36294:
      return fp;
    case 36295:
      return pp;
    case 36296:
      return mp;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return gp;
    case 35679:
    case 36299:
    case 36307:
      return _p;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return vp;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return xp;
  }
}
class yp {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.setValue = tp(e.type);
  }
}
class Sp {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.size = e.size, this.setValue = Mp(e.type);
  }
}
class Ep {
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
const Mr = /(\w+)(\])?(\[|\.)?/g;
function Fo(i, t) {
  i.seq.push(t), i.map[t.id] = t;
}
function bp(i, t, e) {
  const n = i.name, s = n.length;
  for (Mr.lastIndex = 0; ; ) {
    const r = Mr.exec(n), a = Mr.lastIndex;
    let o = r[1];
    const l = r[2] === "]", c = r[3];
    if (l && (o = o | 0), c === void 0 || c === "[" && a + 2 === s) {
      Fo(e, c === void 0 ? new yp(o, i, t) : new Sp(o, i, t));
      break;
    } else {
      let u = e.map[o];
      u === void 0 && (u = new Ep(o), Fo(e, u)), e = u;
    }
  }
}
class Is {
  constructor(t, e) {
    this.seq = [], this.map = {};
    const n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
    for (let s = 0; s < n; ++s) {
      const r = t.getActiveUniform(e, s), a = t.getUniformLocation(e, r.name);
      bp(r, a, this);
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
function Oo(i, t, e) {
  const n = i.createShader(t);
  return i.shaderSource(n, e), i.compileShader(n), n;
}
const Tp = 37297;
let Ap = 0;
function wp(i, t) {
  const e = i.split(`
`), n = [], s = Math.max(t - 6, 0), r = Math.min(t + 6, e.length);
  for (let a = s; a < r; a++) {
    const o = a + 1;
    n.push(`${o === t ? ">" : " "} ${o}: ${e[a]}`);
  }
  return n.join(`
`);
}
const Bo = new Pt();
function Cp(i) {
  Ht._getMatrix(Bo, Ht.workingColorSpace, i);
  const t = `mat3( ${Bo.elements.map((e) => e.toFixed(4))} )`;
  switch (Ht.getTransfer(i)) {
    case Gs:
      return [t, "LinearTransferOETF"];
    case qt:
      return [t, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space: ", i), [t, "LinearTransferOETF"];
  }
}
function zo(i, t, e) {
  const n = i.getShaderParameter(t, i.COMPILE_STATUS), s = i.getShaderInfoLog(t).trim();
  if (n && s === "") return "";
  const r = /ERROR: 0:(\d+)/.exec(s);
  if (r) {
    const a = parseInt(r[1]);
    return e.toUpperCase() + `

` + s + `

` + wp(i.getShaderSource(t), a);
  } else return s;
}
function Rp(i, t) {
  const e = Cp(t);
  return [`vec4 ${i}( vec4 value ) {`, `	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`, "}"].join(`
`);
}
function Pp(i, t) {
  let e;
  switch (t) {
    case Yc:
      e = "Linear";
      break;
    case qc:
      e = "Reinhard";
      break;
    case $c:
      e = "Cineon";
      break;
    case Ml:
      e = "ACESFilmic";
      break;
    case jc:
      e = "AgX";
      break;
    case Kc:
      e = "Neutral";
      break;
    case Zc:
      e = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t), e = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + e + "ToneMapping( color ); }";
}
const vs = new C();
function Lp() {
  Ht.getLuminanceCoefficients(vs);
  const i = vs.x.toFixed(4), t = vs.y.toFixed(4), e = vs.z.toFixed(4);
  return ["float luminance( const in vec3 rgb ) {", `	const vec3 weights = vec3( ${i}, ${t}, ${e} );`, "	return dot( weights, rgb );", "}"].join(`
`);
}
function Dp(i) {
  return [i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(Bi).join(`
`);
}
function Ip(i) {
  const t = [];
  for (const e in i) {
    const n = i[e];
    n !== false && t.push("#define " + e + " " + n);
  }
  return t.join(`
`);
}
function Up(i, t) {
  const e = {}, n = i.getProgramParameter(t, i.ACTIVE_ATTRIBUTES);
  for (let s = 0; s < n; s++) {
    const r = i.getActiveAttrib(t, s), a = r.name;
    let o = 1;
    r.type === i.FLOAT_MAT2 && (o = 2), r.type === i.FLOAT_MAT3 && (o = 3), r.type === i.FLOAT_MAT4 && (o = 4), e[a] = { type: r.type, location: i.getAttribLocation(t, a), locationSize: o };
  }
  return e;
}
function Bi(i) {
  return i !== "";
}
function ko(i, t) {
  const e = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, e).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function Ho(i, t) {
  return i.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
const Np = /^[ \t]*#include +<([\w\d./]+)>/gm;
function va(i) {
  return i.replace(Np, Op);
}
const Fp = /* @__PURE__ */ new Map();
function Op(i, t) {
  let e = Dt[t];
  if (e === void 0) {
    const n = Fp.get(t);
    if (n !== void 0) e = Dt[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, n);
    else throw new Error("Can not resolve #include <" + t + ">");
  }
  return va(e);
}
const Bp = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Go(i) {
  return i.replace(Bp, zp);
}
function zp(i, t, e, n) {
  let s = "";
  for (let r = parseInt(t); r < parseInt(e); r++) s += n.replace(/\[\s*i\s*\]/g, "[ " + r + " ]").replace(/UNROLLED_LOOP_INDEX/g, r);
  return s;
}
function Vo(i) {
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
function kp(i) {
  let t = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === _l ? t = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === vl ? t = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === ln && (t = "SHADOWMAP_TYPE_VSM"), t;
}
function Hp(i) {
  let t = "ENVMAP_TYPE_CUBE";
  if (i.envMap) switch (i.envMapMode) {
    case gi:
    case _i:
      t = "ENVMAP_TYPE_CUBE";
      break;
    case Hs:
      t = "ENVMAP_TYPE_CUBE_UV";
      break;
  }
  return t;
}
function Gp(i) {
  let t = "ENVMAP_MODE_REFLECTION";
  if (i.envMap) switch (i.envMapMode) {
    case _i:
      t = "ENVMAP_MODE_REFRACTION";
      break;
  }
  return t;
}
function Vp(i) {
  let t = "ENVMAP_BLENDING_NONE";
  if (i.envMap) switch (i.combine) {
    case xl:
      t = "ENVMAP_BLENDING_MULTIPLY";
      break;
    case Wc:
      t = "ENVMAP_BLENDING_MIX";
      break;
    case Xc:
      t = "ENVMAP_BLENDING_ADD";
      break;
  }
  return t;
}
function Wp(i) {
  const t = i.envMapCubeUVHeight;
  if (t === null) return null;
  const e = Math.log2(t) - 2, n = 1 / t;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, e), 112)), texelHeight: n, maxMip: e };
}
function Xp(i, t, e, n) {
  const s = i.getContext(), r = e.defines;
  let a = e.vertexShader, o = e.fragmentShader;
  const l = kp(e), c = Hp(e), h = Gp(e), u = Vp(e), d = Wp(e), p = Dp(e), g = Ip(r), _ = s.createProgram();
  let m, f, E = e.glslVersion ? "#version " + e.glslVersion + `
` : "";
  e.isRawShaderMaterial ? (m = ["#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, g].filter(Bi).join(`
`), m.length > 0 && (m += `
`), f = ["#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, g].filter(Bi).join(`
`), f.length > 0 && (f += `
`)) : (m = [Vo(e), "#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, g, e.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "", e.batching ? "#define USE_BATCHING" : "", e.batchingColor ? "#define USE_BATCHING_COLOR" : "", e.instancing ? "#define USE_INSTANCING" : "", e.instancingColor ? "#define USE_INSTANCING_COLOR" : "", e.instancingMorph ? "#define USE_INSTANCING_MORPH" : "", e.useFog && e.fog ? "#define USE_FOG" : "", e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "", e.map ? "#define USE_MAP" : "", e.envMap ? "#define USE_ENVMAP" : "", e.envMap ? "#define " + h : "", e.lightMap ? "#define USE_LIGHTMAP" : "", e.aoMap ? "#define USE_AOMAP" : "", e.bumpMap ? "#define USE_BUMPMAP" : "", e.normalMap ? "#define USE_NORMALMAP" : "", e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", e.displacementMap ? "#define USE_DISPLACEMENTMAP" : "", e.emissiveMap ? "#define USE_EMISSIVEMAP" : "", e.anisotropy ? "#define USE_ANISOTROPY" : "", e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", e.specularMap ? "#define USE_SPECULARMAP" : "", e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", e.metalnessMap ? "#define USE_METALNESSMAP" : "", e.alphaMap ? "#define USE_ALPHAMAP" : "", e.alphaHash ? "#define USE_ALPHAHASH" : "", e.transmission ? "#define USE_TRANSMISSION" : "", e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", e.thicknessMap ? "#define USE_THICKNESSMAP" : "", e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", e.mapUv ? "#define MAP_UV " + e.mapUv : "", e.alphaMapUv ? "#define ALPHAMAP_UV " + e.alphaMapUv : "", e.lightMapUv ? "#define LIGHTMAP_UV " + e.lightMapUv : "", e.aoMapUv ? "#define AOMAP_UV " + e.aoMapUv : "", e.emissiveMapUv ? "#define EMISSIVEMAP_UV " + e.emissiveMapUv : "", e.bumpMapUv ? "#define BUMPMAP_UV " + e.bumpMapUv : "", e.normalMapUv ? "#define NORMALMAP_UV " + e.normalMapUv : "", e.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + e.displacementMapUv : "", e.metalnessMapUv ? "#define METALNESSMAP_UV " + e.metalnessMapUv : "", e.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + e.roughnessMapUv : "", e.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + e.anisotropyMapUv : "", e.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + e.clearcoatMapUv : "", e.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + e.clearcoatNormalMapUv : "", e.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + e.clearcoatRoughnessMapUv : "", e.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + e.iridescenceMapUv : "", e.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + e.iridescenceThicknessMapUv : "", e.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + e.sheenColorMapUv : "", e.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + e.sheenRoughnessMapUv : "", e.specularMapUv ? "#define SPECULARMAP_UV " + e.specularMapUv : "", e.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + e.specularColorMapUv : "", e.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + e.specularIntensityMapUv : "", e.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + e.transmissionMapUv : "", e.thicknessMapUv ? "#define THICKNESSMAP_UV " + e.thicknessMapUv : "", e.vertexTangents && e.flatShading === false ? "#define USE_TANGENT" : "", e.vertexColors ? "#define USE_COLOR" : "", e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", e.vertexUv1s ? "#define USE_UV1" : "", e.vertexUv2s ? "#define USE_UV2" : "", e.vertexUv3s ? "#define USE_UV3" : "", e.pointsUvs ? "#define USE_POINTS_UV" : "", e.flatShading ? "#define FLAT_SHADED" : "", e.skinning ? "#define USE_SKINNING" : "", e.morphTargets ? "#define USE_MORPHTARGETS" : "", e.morphNormals && e.flatShading === false ? "#define USE_MORPHNORMALS" : "", e.morphColors ? "#define USE_MORPHCOLORS" : "", e.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + e.morphTextureStride : "", e.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + e.morphTargetsCount : "", e.doubleSided ? "#define DOUBLE_SIDED" : "", e.flipSided ? "#define FLIP_SIDED" : "", e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", e.shadowMapEnabled ? "#define " + l : "", e.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", e.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "	attribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "	attribute vec3 instanceColor;", "#endif", "#ifdef USE_INSTANCING_MORPH", "	uniform sampler2D morphTexture;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_UV1", "	attribute vec2 uv1;", "#endif", "#ifdef USE_UV2", "	attribute vec2 uv2;", "#endif", "#ifdef USE_UV3", "	attribute vec2 uv3;", "#endif", "#ifdef USE_TANGENT", "	attribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "	attribute vec4 color;", "#elif defined( USE_COLOR )", "	attribute vec3 color;", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", `
`].filter(Bi).join(`
`), f = [Vo(e), "#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, g, e.useFog && e.fog ? "#define USE_FOG" : "", e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "", e.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "", e.map ? "#define USE_MAP" : "", e.matcap ? "#define USE_MATCAP" : "", e.envMap ? "#define USE_ENVMAP" : "", e.envMap ? "#define " + c : "", e.envMap ? "#define " + h : "", e.envMap ? "#define " + u : "", d ? "#define CUBEUV_TEXEL_WIDTH " + d.texelWidth : "", d ? "#define CUBEUV_TEXEL_HEIGHT " + d.texelHeight : "", d ? "#define CUBEUV_MAX_MIP " + d.maxMip + ".0" : "", e.lightMap ? "#define USE_LIGHTMAP" : "", e.aoMap ? "#define USE_AOMAP" : "", e.bumpMap ? "#define USE_BUMPMAP" : "", e.normalMap ? "#define USE_NORMALMAP" : "", e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", e.emissiveMap ? "#define USE_EMISSIVEMAP" : "", e.anisotropy ? "#define USE_ANISOTROPY" : "", e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", e.clearcoat ? "#define USE_CLEARCOAT" : "", e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", e.dispersion ? "#define USE_DISPERSION" : "", e.iridescence ? "#define USE_IRIDESCENCE" : "", e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", e.specularMap ? "#define USE_SPECULARMAP" : "", e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", e.metalnessMap ? "#define USE_METALNESSMAP" : "", e.alphaMap ? "#define USE_ALPHAMAP" : "", e.alphaTest ? "#define USE_ALPHATEST" : "", e.alphaHash ? "#define USE_ALPHAHASH" : "", e.sheen ? "#define USE_SHEEN" : "", e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", e.transmission ? "#define USE_TRANSMISSION" : "", e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", e.thicknessMap ? "#define USE_THICKNESSMAP" : "", e.vertexTangents && e.flatShading === false ? "#define USE_TANGENT" : "", e.vertexColors || e.instancingColor || e.batchingColor ? "#define USE_COLOR" : "", e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", e.vertexUv1s ? "#define USE_UV1" : "", e.vertexUv2s ? "#define USE_UV2" : "", e.vertexUv3s ? "#define USE_UV3" : "", e.pointsUvs ? "#define USE_POINTS_UV" : "", e.gradientMap ? "#define USE_GRADIENTMAP" : "", e.flatShading ? "#define FLAT_SHADED" : "", e.doubleSided ? "#define DOUBLE_SIDED" : "", e.flipSided ? "#define FLIP_SIDED" : "", e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", e.shadowMapEnabled ? "#define " + l : "", e.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", e.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", e.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "", e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", e.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", e.toneMapping !== bn ? "#define TONE_MAPPING" : "", e.toneMapping !== bn ? Dt.tonemapping_pars_fragment : "", e.toneMapping !== bn ? Pp("toneMapping", e.toneMapping) : "", e.dithering ? "#define DITHERING" : "", e.opaque ? "#define OPAQUE" : "", Dt.colorspace_pars_fragment, Rp("linearToOutputTexel", e.outputColorSpace), Lp(), e.useDepthPacking ? "#define DEPTH_PACKING " + e.depthPacking : "", `
`].filter(Bi).join(`
`)), a = va(a), a = ko(a, e), a = Ho(a, e), o = va(o), o = ko(o, e), o = Ho(o, e), a = Go(a), o = Go(o), e.isRawShaderMaterial !== true && (E = `#version 300 es
`, m = [p, "#define attribute in", "#define varying out", "#define texture2D texture"].join(`
`) + `
` + m, f = ["#define varying in", e.glslVersion === no ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", e.glslVersion === no ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join(`
`) + `
` + f);
  const T = E + m + a, y = E + f + o, N = Oo(s, s.VERTEX_SHADER, T), w = Oo(s, s.FRAGMENT_SHADER, y);
  s.attachShader(_, N), s.attachShader(_, w), e.index0AttributeName !== void 0 ? s.bindAttribLocation(_, 0, e.index0AttributeName) : e.morphTargets === true && s.bindAttribLocation(_, 0, "position"), s.linkProgram(_);
  function A(R) {
    if (i.debug.checkShaderErrors) {
      const k = s.getProgramInfoLog(_).trim(), z = s.getShaderInfoLog(N).trim(), W = s.getShaderInfoLog(w).trim();
      let Z = true, V = true;
      if (s.getProgramParameter(_, s.LINK_STATUS) === false) if (Z = false, typeof i.debug.onShaderError == "function") i.debug.onShaderError(s, _, N, w);
      else {
        const K = zo(s, N, "vertex"), G = zo(s, w, "fragment");
        console.error("THREE.WebGLProgram: Shader Error " + s.getError() + " - VALIDATE_STATUS " + s.getProgramParameter(_, s.VALIDATE_STATUS) + `

Material Name: ` + R.name + `
Material Type: ` + R.type + `

Program Info Log: ` + k + `
` + K + `
` + G);
      }
      else k !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", k) : (z === "" || W === "") && (V = false);
      V && (R.diagnostics = { runnable: Z, programLog: k, vertexShader: { log: z, prefix: m }, fragmentShader: { log: W, prefix: f } });
    }
    s.deleteShader(N), s.deleteShader(w), L = new Is(s, _), S = Up(s, _);
  }
  let L;
  this.getUniforms = function() {
    return L === void 0 && A(this), L;
  };
  let S;
  this.getAttributes = function() {
    return S === void 0 && A(this), S;
  };
  let M = e.rendererExtensionParallelShaderCompile === false;
  return this.isReady = function() {
    return M === false && (M = s.getProgramParameter(_, Tp)), M;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), s.deleteProgram(_), this.program = void 0;
  }, this.type = e.shaderType, this.name = e.shaderName, this.id = Ap++, this.cacheKey = t, this.usedTimes = 1, this.program = _, this.vertexShader = N, this.fragmentShader = w, this;
}
let Yp = 0;
class qp {
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
    return n === void 0 && (n = new $p(t), e.set(t, n)), n;
  }
}
class $p {
  constructor(t) {
    this.id = Yp++, this.code = t, this.usedTimes = 0;
  }
}
function Zp(i, t, e, n, s, r, a) {
  const o = new Fl(), l = new qp(), c = /* @__PURE__ */ new Set(), h = [], u = s.logarithmicDepthBuffer, d = s.vertexTextures;
  let p = s.precision;
  const g = { MeshDepthMaterial: "depth", MeshDistanceMaterial: "distanceRGBA", MeshNormalMaterial: "normal", MeshBasicMaterial: "basic", MeshLambertMaterial: "lambert", MeshPhongMaterial: "phong", MeshToonMaterial: "toon", MeshStandardMaterial: "physical", MeshPhysicalMaterial: "physical", MeshMatcapMaterial: "matcap", LineBasicMaterial: "basic", LineDashedMaterial: "dashed", PointsMaterial: "points", ShadowMaterial: "shadow", SpriteMaterial: "sprite" };
  function _(S) {
    return c.add(S), S === 0 ? "uv" : `uv${S}`;
  }
  function m(S, M, R, k, z) {
    const W = k.fog, Z = z.geometry, V = S.isMeshStandardMaterial ? k.environment : null, K = (S.isMeshStandardMaterial ? e : t).get(S.envMap || V), G = K && K.mapping === Hs ? K.image.height : null, st = g[S.type];
    S.precision !== null && (p = s.getMaxPrecision(S.precision), p !== S.precision && console.warn("THREE.WebGLProgram.getParameters:", S.precision, "not supported, using", p, "instead."));
    const ht = Z.morphAttributes.position || Z.morphAttributes.normal || Z.morphAttributes.color, Mt = ht !== void 0 ? ht.length : 0;
    let Ut = 0;
    Z.morphAttributes.position !== void 0 && (Ut = 1), Z.morphAttributes.normal !== void 0 && (Ut = 2), Z.morphAttributes.color !== void 0 && (Ut = 3);
    let jt, Y, tt, _t;
    if (st) {
      const Yt = Ye[st];
      jt = Yt.vertexShader, Y = Yt.fragmentShader;
    } else jt = S.vertexShader, Y = S.fragmentShader, l.update(S), tt = l.getVertexShaderID(S), _t = l.getFragmentShaderID(S);
    const rt = i.getRenderTarget(), bt = i.state.buffers.depth.getReversed(), wt = z.isInstancedMesh === true, Nt = z.isBatchedMesh === true, ne = !!S.map, zt = !!S.matcap, se = !!K, U = !!S.aoMap, De = !!S.lightMap, Ft = !!S.bumpMap, Ot = !!S.normalMap, St = !!S.displacementMap, Qt = !!S.emissiveMap, yt = !!S.metalnessMap, b = !!S.roughnessMap, v = S.anisotropy > 0, F = S.clearcoat > 0, q = S.dispersion > 0, j = S.iridescence > 0, X = S.sheen > 0, vt = S.transmission > 0, at = v && !!S.anisotropyMap, ut = F && !!S.clearcoatMap, kt = F && !!S.clearcoatNormalMap, J = F && !!S.clearcoatRoughnessMap, dt = j && !!S.iridescenceMap, Et = j && !!S.iridescenceThicknessMap, Tt = X && !!S.sheenColorMap, ft = X && !!S.sheenRoughnessMap, Bt = !!S.specularMap, Lt = !!S.specularColorMap, Kt = !!S.specularIntensityMap, P = vt && !!S.transmissionMap, nt = vt && !!S.thicknessMap, H = !!S.gradientMap, $ = !!S.alphaMap, ct = S.alphaTest > 0, ot = !!S.alphaHash, Ct = !!S.extensions;
    let ie = bn;
    S.toneMapped && (rt === null || rt.isXRRenderTarget === true) && (ie = i.toneMapping);
    const pe = { shaderID: st, shaderType: S.type, shaderName: S.name, vertexShader: jt, fragmentShader: Y, defines: S.defines, customVertexShaderID: tt, customFragmentShaderID: _t, isRawShaderMaterial: S.isRawShaderMaterial === true, glslVersion: S.glslVersion, precision: p, batching: Nt, batchingColor: Nt && z._colorsTexture !== null, instancing: wt, instancingColor: wt && z.instanceColor !== null, instancingMorph: wt && z.morphTexture !== null, supportsVertexTextures: d, outputColorSpace: rt === null ? i.outputColorSpace : rt.isXRRenderTarget === true ? rt.texture.colorSpace : yi, alphaToCoverage: !!S.alphaToCoverage, map: ne, matcap: zt, envMap: se, envMapMode: se && K.mapping, envMapCubeUVHeight: G, aoMap: U, lightMap: De, bumpMap: Ft, normalMap: Ot, displacementMap: d && St, emissiveMap: Qt, normalMapObjectSpace: Ot && S.normalMapType === eh, normalMapTangentSpace: Ot && S.normalMapType === Ll, metalnessMap: yt, roughnessMap: b, anisotropy: v, anisotropyMap: at, clearcoat: F, clearcoatMap: ut, clearcoatNormalMap: kt, clearcoatRoughnessMap: J, dispersion: q, iridescence: j, iridescenceMap: dt, iridescenceThicknessMap: Et, sheen: X, sheenColorMap: Tt, sheenRoughnessMap: ft, specularMap: Bt, specularColorMap: Lt, specularIntensityMap: Kt, transmission: vt, transmissionMap: P, thicknessMap: nt, gradientMap: H, opaque: S.transparent === false && S.blending === ui && S.alphaToCoverage === false, alphaMap: $, alphaTest: ct, alphaHash: ot, combine: S.combine, mapUv: ne && _(S.map.channel), aoMapUv: U && _(S.aoMap.channel), lightMapUv: De && _(S.lightMap.channel), bumpMapUv: Ft && _(S.bumpMap.channel), normalMapUv: Ot && _(S.normalMap.channel), displacementMapUv: St && _(S.displacementMap.channel), emissiveMapUv: Qt && _(S.emissiveMap.channel), metalnessMapUv: yt && _(S.metalnessMap.channel), roughnessMapUv: b && _(S.roughnessMap.channel), anisotropyMapUv: at && _(S.anisotropyMap.channel), clearcoatMapUv: ut && _(S.clearcoatMap.channel), clearcoatNormalMapUv: kt && _(S.clearcoatNormalMap.channel), clearcoatRoughnessMapUv: J && _(S.clearcoatRoughnessMap.channel), iridescenceMapUv: dt && _(S.iridescenceMap.channel), iridescenceThicknessMapUv: Et && _(S.iridescenceThicknessMap.channel), sheenColorMapUv: Tt && _(S.sheenColorMap.channel), sheenRoughnessMapUv: ft && _(S.sheenRoughnessMap.channel), specularMapUv: Bt && _(S.specularMap.channel), specularColorMapUv: Lt && _(S.specularColorMap.channel), specularIntensityMapUv: Kt && _(S.specularIntensityMap.channel), transmissionMapUv: P && _(S.transmissionMap.channel), thicknessMapUv: nt && _(S.thicknessMap.channel), alphaMapUv: $ && _(S.alphaMap.channel), vertexTangents: !!Z.attributes.tangent && (Ot || v), vertexColors: S.vertexColors, vertexAlphas: S.vertexColors === true && !!Z.attributes.color && Z.attributes.color.itemSize === 4, pointsUvs: z.isPoints === true && !!Z.attributes.uv && (ne || $), fog: !!W, useFog: S.fog === true, fogExp2: !!W && W.isFogExp2, flatShading: S.flatShading === true, sizeAttenuation: S.sizeAttenuation === true, logarithmicDepthBuffer: u, reverseDepthBuffer: bt, skinning: z.isSkinnedMesh === true, morphTargets: Z.morphAttributes.position !== void 0, morphNormals: Z.morphAttributes.normal !== void 0, morphColors: Z.morphAttributes.color !== void 0, morphTargetsCount: Mt, morphTextureStride: Ut, numDirLights: M.directional.length, numPointLights: M.point.length, numSpotLights: M.spot.length, numSpotLightMaps: M.spotLightMap.length, numRectAreaLights: M.rectArea.length, numHemiLights: M.hemi.length, numDirLightShadows: M.directionalShadowMap.length, numPointLightShadows: M.pointShadowMap.length, numSpotLightShadows: M.spotShadowMap.length, numSpotLightShadowsWithMaps: M.numSpotLightShadowsWithMaps, numLightProbes: M.numLightProbes, numClippingPlanes: a.numPlanes, numClipIntersection: a.numIntersection, dithering: S.dithering, shadowMapEnabled: i.shadowMap.enabled && R.length > 0, shadowMapType: i.shadowMap.type, toneMapping: ie, decodeVideoTexture: ne && S.map.isVideoTexture === true && Ht.getTransfer(S.map.colorSpace) === qt, decodeVideoTextureEmissive: Qt && S.emissiveMap.isVideoTexture === true && Ht.getTransfer(S.emissiveMap.colorSpace) === qt, premultipliedAlpha: S.premultipliedAlpha, doubleSided: S.side === qe, flipSided: S.side === xe, useDepthPacking: S.depthPacking >= 0, depthPacking: S.depthPacking || 0, index0AttributeName: S.index0AttributeName, extensionClipCullDistance: Ct && S.extensions.clipCullDistance === true && n.has("WEBGL_clip_cull_distance"), extensionMultiDraw: (Ct && S.extensions.multiDraw === true || Nt) && n.has("WEBGL_multi_draw"), rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"), customProgramCacheKey: S.customProgramCacheKey() };
    return pe.vertexUv1s = c.has(1), pe.vertexUv2s = c.has(2), pe.vertexUv3s = c.has(3), c.clear(), pe;
  }
  function f(S) {
    const M = [];
    if (S.shaderID ? M.push(S.shaderID) : (M.push(S.customVertexShaderID), M.push(S.customFragmentShaderID)), S.defines !== void 0) for (const R in S.defines) M.push(R), M.push(S.defines[R]);
    return S.isRawShaderMaterial === false && (E(M, S), T(M, S), M.push(i.outputColorSpace)), M.push(S.customProgramCacheKey), M.join();
  }
  function E(S, M) {
    S.push(M.precision), S.push(M.outputColorSpace), S.push(M.envMapMode), S.push(M.envMapCubeUVHeight), S.push(M.mapUv), S.push(M.alphaMapUv), S.push(M.lightMapUv), S.push(M.aoMapUv), S.push(M.bumpMapUv), S.push(M.normalMapUv), S.push(M.displacementMapUv), S.push(M.emissiveMapUv), S.push(M.metalnessMapUv), S.push(M.roughnessMapUv), S.push(M.anisotropyMapUv), S.push(M.clearcoatMapUv), S.push(M.clearcoatNormalMapUv), S.push(M.clearcoatRoughnessMapUv), S.push(M.iridescenceMapUv), S.push(M.iridescenceThicknessMapUv), S.push(M.sheenColorMapUv), S.push(M.sheenRoughnessMapUv), S.push(M.specularMapUv), S.push(M.specularColorMapUv), S.push(M.specularIntensityMapUv), S.push(M.transmissionMapUv), S.push(M.thicknessMapUv), S.push(M.combine), S.push(M.fogExp2), S.push(M.sizeAttenuation), S.push(M.morphTargetsCount), S.push(M.morphAttributeCount), S.push(M.numDirLights), S.push(M.numPointLights), S.push(M.numSpotLights), S.push(M.numSpotLightMaps), S.push(M.numHemiLights), S.push(M.numRectAreaLights), S.push(M.numDirLightShadows), S.push(M.numPointLightShadows), S.push(M.numSpotLightShadows), S.push(M.numSpotLightShadowsWithMaps), S.push(M.numLightProbes), S.push(M.shadowMapType), S.push(M.toneMapping), S.push(M.numClippingPlanes), S.push(M.numClipIntersection), S.push(M.depthPacking);
  }
  function T(S, M) {
    o.disableAll(), M.supportsVertexTextures && o.enable(0), M.instancing && o.enable(1), M.instancingColor && o.enable(2), M.instancingMorph && o.enable(3), M.matcap && o.enable(4), M.envMap && o.enable(5), M.normalMapObjectSpace && o.enable(6), M.normalMapTangentSpace && o.enable(7), M.clearcoat && o.enable(8), M.iridescence && o.enable(9), M.alphaTest && o.enable(10), M.vertexColors && o.enable(11), M.vertexAlphas && o.enable(12), M.vertexUv1s && o.enable(13), M.vertexUv2s && o.enable(14), M.vertexUv3s && o.enable(15), M.vertexTangents && o.enable(16), M.anisotropy && o.enable(17), M.alphaHash && o.enable(18), M.batching && o.enable(19), M.dispersion && o.enable(20), M.batchingColor && o.enable(21), S.push(o.mask), o.disableAll(), M.fog && o.enable(0), M.useFog && o.enable(1), M.flatShading && o.enable(2), M.logarithmicDepthBuffer && o.enable(3), M.reverseDepthBuffer && o.enable(4), M.skinning && o.enable(5), M.morphTargets && o.enable(6), M.morphNormals && o.enable(7), M.morphColors && o.enable(8), M.premultipliedAlpha && o.enable(9), M.shadowMapEnabled && o.enable(10), M.doubleSided && o.enable(11), M.flipSided && o.enable(12), M.useDepthPacking && o.enable(13), M.dithering && o.enable(14), M.transmission && o.enable(15), M.sheen && o.enable(16), M.opaque && o.enable(17), M.pointsUvs && o.enable(18), M.decodeVideoTexture && o.enable(19), M.decodeVideoTextureEmissive && o.enable(20), M.alphaToCoverage && o.enable(21), S.push(o.mask);
  }
  function y(S) {
    const M = g[S.type];
    let R;
    if (M) {
      const k = Ye[M];
      R = Lh.clone(k.uniforms);
    } else R = S.uniforms;
    return R;
  }
  function N(S, M) {
    let R;
    for (let k = 0, z = h.length; k < z; k++) {
      const W = h[k];
      if (W.cacheKey === M) {
        R = W, ++R.usedTimes;
        break;
      }
    }
    return R === void 0 && (R = new Xp(i, M, S, r), h.push(R)), R;
  }
  function w(S) {
    if (--S.usedTimes === 0) {
      const M = h.indexOf(S);
      h[M] = h[h.length - 1], h.pop(), S.destroy();
    }
  }
  function A(S) {
    l.remove(S);
  }
  function L() {
    l.dispose();
  }
  return { getParameters: m, getProgramCacheKey: f, getUniforms: y, acquireProgram: N, releaseProgram: w, releaseShaderCache: A, programs: h, dispose: L };
}
function jp() {
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
function Kp(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.material.id !== t.material.id ? i.material.id - t.material.id : i.z !== t.z ? i.z - t.z : i.id - t.id;
}
function Wo(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.z !== t.z ? t.z - i.z : i.id - t.id;
}
function Xo() {
  const i = [];
  let t = 0;
  const e = [], n = [], s = [];
  function r() {
    t = 0, e.length = 0, n.length = 0, s.length = 0;
  }
  function a(u, d, p, g, _, m) {
    let f = i[t];
    return f === void 0 ? (f = { id: u.id, object: u, geometry: d, material: p, groupOrder: g, renderOrder: u.renderOrder, z: _, group: m }, i[t] = f) : (f.id = u.id, f.object = u, f.geometry = d, f.material = p, f.groupOrder = g, f.renderOrder = u.renderOrder, f.z = _, f.group = m), t++, f;
  }
  function o(u, d, p, g, _, m) {
    const f = a(u, d, p, g, _, m);
    p.transmission > 0 ? n.push(f) : p.transparent === true ? s.push(f) : e.push(f);
  }
  function l(u, d, p, g, _, m) {
    const f = a(u, d, p, g, _, m);
    p.transmission > 0 ? n.unshift(f) : p.transparent === true ? s.unshift(f) : e.unshift(f);
  }
  function c(u, d) {
    e.length > 1 && e.sort(u || Kp), n.length > 1 && n.sort(d || Wo), s.length > 1 && s.sort(d || Wo);
  }
  function h() {
    for (let u = t, d = i.length; u < d; u++) {
      const p = i[u];
      if (p.id === null) break;
      p.id = null, p.object = null, p.geometry = null, p.material = null, p.group = null;
    }
  }
  return { opaque: e, transmissive: n, transparent: s, init: r, push: o, unshift: l, finish: h, sort: c };
}
function Jp() {
  let i = /* @__PURE__ */ new WeakMap();
  function t(n, s) {
    const r = i.get(n);
    let a;
    return r === void 0 ? (a = new Xo(), i.set(n, [a])) : s >= r.length ? (a = new Xo(), r.push(a)) : a = r[s], a;
  }
  function e() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return { get: t, dispose: e };
}
function Qp() {
  const i = {};
  return { get: function(t) {
    if (i[t.id] !== void 0) return i[t.id];
    let e;
    switch (t.type) {
      case "DirectionalLight":
        e = { direction: new C(), color: new It() };
        break;
      case "SpotLight":
        e = { position: new C(), direction: new C(), color: new It(), distance: 0, coneCos: 0, penumbraCos: 0, decay: 0 };
        break;
      case "PointLight":
        e = { position: new C(), color: new It(), distance: 0, decay: 0 };
        break;
      case "HemisphereLight":
        e = { direction: new C(), skyColor: new It(), groundColor: new It() };
        break;
      case "RectAreaLight":
        e = { color: new It(), position: new C(), halfWidth: new C(), halfHeight: new C() };
        break;
    }
    return i[t.id] = e, e;
  } };
}
function tm() {
  const i = {};
  return { get: function(t) {
    if (i[t.id] !== void 0) return i[t.id];
    let e;
    switch (t.type) {
      case "DirectionalLight":
        e = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new it() };
        break;
      case "SpotLight":
        e = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new it() };
        break;
      case "PointLight":
        e = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new it(), shadowCameraNear: 1, shadowCameraFar: 1e3 };
        break;
    }
    return i[t.id] = e, e;
  } };
}
let em = 0;
function nm(i, t) {
  return (t.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (i.map ? 1 : 0);
}
function im(i) {
  const t = new Qp(), e = tm(), n = { version: 0, hash: { directionalLength: -1, pointLength: -1, spotLength: -1, rectAreaLength: -1, hemiLength: -1, numDirectionalShadows: -1, numPointShadows: -1, numSpotShadows: -1, numSpotMaps: -1, numLightProbes: -1 }, ambient: [0, 0, 0], probe: [], directional: [], directionalShadow: [], directionalShadowMap: [], directionalShadowMatrix: [], spot: [], spotLightMap: [], spotShadow: [], spotShadowMap: [], spotLightMatrix: [], rectArea: [], rectAreaLTC1: null, rectAreaLTC2: null, point: [], pointShadow: [], pointShadowMap: [], pointShadowMatrix: [], hemi: [], numSpotLightShadowsWithMaps: 0, numLightProbes: 0 };
  for (let c = 0; c < 9; c++) n.probe.push(new C());
  const s = new C(), r = new Xt(), a = new Xt();
  function o(c) {
    let h = 0, u = 0, d = 0;
    for (let S = 0; S < 9; S++) n.probe[S].set(0, 0, 0);
    let p = 0, g = 0, _ = 0, m = 0, f = 0, E = 0, T = 0, y = 0, N = 0, w = 0, A = 0;
    c.sort(nm);
    for (let S = 0, M = c.length; S < M; S++) {
      const R = c[S], k = R.color, z = R.intensity, W = R.distance, Z = R.shadow && R.shadow.map ? R.shadow.map.texture : null;
      if (R.isAmbientLight) h += k.r * z, u += k.g * z, d += k.b * z;
      else if (R.isLightProbe) {
        for (let V = 0; V < 9; V++) n.probe[V].addScaledVector(R.sh.coefficients[V], z);
        A++;
      } else if (R.isDirectionalLight) {
        const V = t.get(R);
        if (V.color.copy(R.color).multiplyScalar(R.intensity), R.castShadow) {
          const K = R.shadow, G = e.get(R);
          G.shadowIntensity = K.intensity, G.shadowBias = K.bias, G.shadowNormalBias = K.normalBias, G.shadowRadius = K.radius, G.shadowMapSize = K.mapSize, n.directionalShadow[p] = G, n.directionalShadowMap[p] = Z, n.directionalShadowMatrix[p] = R.shadow.matrix, E++;
        }
        n.directional[p] = V, p++;
      } else if (R.isSpotLight) {
        const V = t.get(R);
        V.position.setFromMatrixPosition(R.matrixWorld), V.color.copy(k).multiplyScalar(z), V.distance = W, V.coneCos = Math.cos(R.angle), V.penumbraCos = Math.cos(R.angle * (1 - R.penumbra)), V.decay = R.decay, n.spot[_] = V;
        const K = R.shadow;
        if (R.map && (n.spotLightMap[N] = R.map, N++, K.updateMatrices(R), R.castShadow && w++), n.spotLightMatrix[_] = K.matrix, R.castShadow) {
          const G = e.get(R);
          G.shadowIntensity = K.intensity, G.shadowBias = K.bias, G.shadowNormalBias = K.normalBias, G.shadowRadius = K.radius, G.shadowMapSize = K.mapSize, n.spotShadow[_] = G, n.spotShadowMap[_] = Z, y++;
        }
        _++;
      } else if (R.isRectAreaLight) {
        const V = t.get(R);
        V.color.copy(k).multiplyScalar(z), V.halfWidth.set(R.width * 0.5, 0, 0), V.halfHeight.set(0, R.height * 0.5, 0), n.rectArea[m] = V, m++;
      } else if (R.isPointLight) {
        const V = t.get(R);
        if (V.color.copy(R.color).multiplyScalar(R.intensity), V.distance = R.distance, V.decay = R.decay, R.castShadow) {
          const K = R.shadow, G = e.get(R);
          G.shadowIntensity = K.intensity, G.shadowBias = K.bias, G.shadowNormalBias = K.normalBias, G.shadowRadius = K.radius, G.shadowMapSize = K.mapSize, G.shadowCameraNear = K.camera.near, G.shadowCameraFar = K.camera.far, n.pointShadow[g] = G, n.pointShadowMap[g] = Z, n.pointShadowMatrix[g] = R.shadow.matrix, T++;
        }
        n.point[g] = V, g++;
      } else if (R.isHemisphereLight) {
        const V = t.get(R);
        V.skyColor.copy(R.color).multiplyScalar(z), V.groundColor.copy(R.groundColor).multiplyScalar(z), n.hemi[f] = V, f++;
      }
    }
    m > 0 && (i.has("OES_texture_float_linear") === true ? (n.rectAreaLTC1 = et.LTC_FLOAT_1, n.rectAreaLTC2 = et.LTC_FLOAT_2) : (n.rectAreaLTC1 = et.LTC_HALF_1, n.rectAreaLTC2 = et.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = u, n.ambient[2] = d;
    const L = n.hash;
    (L.directionalLength !== p || L.pointLength !== g || L.spotLength !== _ || L.rectAreaLength !== m || L.hemiLength !== f || L.numDirectionalShadows !== E || L.numPointShadows !== T || L.numSpotShadows !== y || L.numSpotMaps !== N || L.numLightProbes !== A) && (n.directional.length = p, n.spot.length = _, n.rectArea.length = m, n.point.length = g, n.hemi.length = f, n.directionalShadow.length = E, n.directionalShadowMap.length = E, n.pointShadow.length = T, n.pointShadowMap.length = T, n.spotShadow.length = y, n.spotShadowMap.length = y, n.directionalShadowMatrix.length = E, n.pointShadowMatrix.length = T, n.spotLightMatrix.length = y + N - w, n.spotLightMap.length = N, n.numSpotLightShadowsWithMaps = w, n.numLightProbes = A, L.directionalLength = p, L.pointLength = g, L.spotLength = _, L.rectAreaLength = m, L.hemiLength = f, L.numDirectionalShadows = E, L.numPointShadows = T, L.numSpotShadows = y, L.numSpotMaps = N, L.numLightProbes = A, n.version = em++);
  }
  function l(c, h) {
    let u = 0, d = 0, p = 0, g = 0, _ = 0;
    const m = h.matrixWorldInverse;
    for (let f = 0, E = c.length; f < E; f++) {
      const T = c[f];
      if (T.isDirectionalLight) {
        const y = n.directional[u];
        y.direction.setFromMatrixPosition(T.matrixWorld), s.setFromMatrixPosition(T.target.matrixWorld), y.direction.sub(s), y.direction.transformDirection(m), u++;
      } else if (T.isSpotLight) {
        const y = n.spot[p];
        y.position.setFromMatrixPosition(T.matrixWorld), y.position.applyMatrix4(m), y.direction.setFromMatrixPosition(T.matrixWorld), s.setFromMatrixPosition(T.target.matrixWorld), y.direction.sub(s), y.direction.transformDirection(m), p++;
      } else if (T.isRectAreaLight) {
        const y = n.rectArea[g];
        y.position.setFromMatrixPosition(T.matrixWorld), y.position.applyMatrix4(m), a.identity(), r.copy(T.matrixWorld), r.premultiply(m), a.extractRotation(r), y.halfWidth.set(T.width * 0.5, 0, 0), y.halfHeight.set(0, T.height * 0.5, 0), y.halfWidth.applyMatrix4(a), y.halfHeight.applyMatrix4(a), g++;
      } else if (T.isPointLight) {
        const y = n.point[d];
        y.position.setFromMatrixPosition(T.matrixWorld), y.position.applyMatrix4(m), d++;
      } else if (T.isHemisphereLight) {
        const y = n.hemi[_];
        y.direction.setFromMatrixPosition(T.matrixWorld), y.direction.transformDirection(m), _++;
      }
    }
  }
  return { setup: o, setupView: l, state: n };
}
function Yo(i) {
  const t = new im(i), e = [], n = [];
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
function sm(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(s, r = 0) {
    const a = t.get(s);
    let o;
    return a === void 0 ? (o = new Yo(i), t.set(s, [o])) : r >= a.length ? (o = new Yo(i), a.push(o)) : o = a[r], o;
  }
  function n() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return { get: e, dispose: n };
}
class rm extends Ei {
  static get type() {
    return "MeshDepthMaterial";
  }
  constructor(t) {
    super(), this.isMeshDepthMaterial = true, this.depthPacking = Qc, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = false, this.wireframeLinewidth = 1, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.depthPacking = t.depthPacking, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this;
  }
}
class am extends Ei {
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
const om = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, lm = `uniform sampler2D shadow_pass;
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
function cm(i, t, e) {
  let n = new Ra();
  const s = new it(), r = new it(), a = new Zt(), o = new rm({ depthPacking: th }), l = new am(), c = {}, h = e.maxTextureSize, u = { [Tn]: xe, [xe]: Tn, [qe]: qe }, d = new dn({ defines: { VSM_SAMPLES: 8 }, uniforms: { shadow_pass: { value: null }, resolution: { value: new it() }, radius: { value: 4 } }, vertexShader: om, fragmentShader: lm }), p = d.clone();
  p.defines.HORIZONTAL_PASS = 1;
  const g = new Le();
  g.setAttribute("position", new Be(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3));
  const _ = new ve(g, d), m = this;
  this.enabled = false, this.autoUpdate = true, this.needsUpdate = false, this.type = _l;
  let f = this.type;
  this.render = function(w, A, L) {
    if (m.enabled === false || m.autoUpdate === false && m.needsUpdate === false || w.length === 0) return;
    const S = i.getRenderTarget(), M = i.getActiveCubeFace(), R = i.getActiveMipmapLevel(), k = i.state;
    k.setBlending(En), k.buffers.color.setClear(1, 1, 1, 1), k.buffers.depth.setTest(true), k.setScissorTest(false);
    const z = f !== ln && this.type === ln, W = f === ln && this.type !== ln;
    for (let Z = 0, V = w.length; Z < V; Z++) {
      const K = w[Z], G = K.shadow;
      if (G === void 0) {
        console.warn("THREE.WebGLShadowMap:", K, "has no shadow.");
        continue;
      }
      if (G.autoUpdate === false && G.needsUpdate === false) continue;
      s.copy(G.mapSize);
      const st = G.getFrameExtents();
      if (s.multiply(st), r.copy(G.mapSize), (s.x > h || s.y > h) && (s.x > h && (r.x = Math.floor(h / st.x), s.x = r.x * st.x, G.mapSize.x = r.x), s.y > h && (r.y = Math.floor(h / st.y), s.y = r.y * st.y, G.mapSize.y = r.y)), G.map === null || z === true || W === true) {
        const Mt = this.type !== ln ? { minFilter: Pe, magFilter: Pe } : {};
        G.map !== null && G.map.dispose(), G.map = new Hn(s.x, s.y, Mt), G.map.texture.name = K.name + ".shadowMap", G.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(G.map), i.clear();
      const ht = G.getViewportCount();
      for (let Mt = 0; Mt < ht; Mt++) {
        const Ut = G.getViewport(Mt);
        a.set(r.x * Ut.x, r.y * Ut.y, r.x * Ut.z, r.y * Ut.w), k.viewport(a), G.updateMatrices(K, Mt), n = G.getFrustum(), y(A, L, G.camera, K, this.type);
      }
      G.isPointLightShadow !== true && this.type === ln && E(G, L), G.needsUpdate = false;
    }
    f = this.type, m.needsUpdate = false, i.setRenderTarget(S, M, R);
  };
  function E(w, A) {
    const L = t.update(_);
    d.defines.VSM_SAMPLES !== w.blurSamples && (d.defines.VSM_SAMPLES = w.blurSamples, p.defines.VSM_SAMPLES = w.blurSamples, d.needsUpdate = true, p.needsUpdate = true), w.mapPass === null && (w.mapPass = new Hn(s.x, s.y)), d.uniforms.shadow_pass.value = w.map.texture, d.uniforms.resolution.value = w.mapSize, d.uniforms.radius.value = w.radius, i.setRenderTarget(w.mapPass), i.clear(), i.renderBufferDirect(A, null, L, d, _, null), p.uniforms.shadow_pass.value = w.mapPass.texture, p.uniforms.resolution.value = w.mapSize, p.uniforms.radius.value = w.radius, i.setRenderTarget(w.map), i.clear(), i.renderBufferDirect(A, null, L, p, _, null);
  }
  function T(w, A, L, S) {
    let M = null;
    const R = L.isPointLight === true ? w.customDistanceMaterial : w.customDepthMaterial;
    if (R !== void 0) M = R;
    else if (M = L.isPointLight === true ? l : o, i.localClippingEnabled && A.clipShadows === true && Array.isArray(A.clippingPlanes) && A.clippingPlanes.length !== 0 || A.displacementMap && A.displacementScale !== 0 || A.alphaMap && A.alphaTest > 0 || A.map && A.alphaTest > 0) {
      const k = M.uuid, z = A.uuid;
      let W = c[k];
      W === void 0 && (W = {}, c[k] = W);
      let Z = W[z];
      Z === void 0 && (Z = M.clone(), W[z] = Z, A.addEventListener("dispose", N)), M = Z;
    }
    if (M.visible = A.visible, M.wireframe = A.wireframe, S === ln ? M.side = A.shadowSide !== null ? A.shadowSide : A.side : M.side = A.shadowSide !== null ? A.shadowSide : u[A.side], M.alphaMap = A.alphaMap, M.alphaTest = A.alphaTest, M.map = A.map, M.clipShadows = A.clipShadows, M.clippingPlanes = A.clippingPlanes, M.clipIntersection = A.clipIntersection, M.displacementMap = A.displacementMap, M.displacementScale = A.displacementScale, M.displacementBias = A.displacementBias, M.wireframeLinewidth = A.wireframeLinewidth, M.linewidth = A.linewidth, L.isPointLight === true && M.isMeshDistanceMaterial === true) {
      const k = i.properties.get(M);
      k.light = L;
    }
    return M;
  }
  function y(w, A, L, S, M) {
    if (w.visible === false) return;
    if (w.layers.test(A.layers) && (w.isMesh || w.isLine || w.isPoints) && (w.castShadow || w.receiveShadow && M === ln) && (!w.frustumCulled || n.intersectsObject(w))) {
      w.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse, w.matrixWorld);
      const z = t.update(w), W = w.material;
      if (Array.isArray(W)) {
        const Z = z.groups;
        for (let V = 0, K = Z.length; V < K; V++) {
          const G = Z[V], st = W[G.materialIndex];
          if (st && st.visible) {
            const ht = T(w, st, S, M);
            w.onBeforeShadow(i, w, A, L, z, ht, G), i.renderBufferDirect(L, null, z, ht, w, G), w.onAfterShadow(i, w, A, L, z, ht, G);
          }
        }
      } else if (W.visible) {
        const Z = T(w, W, S, M);
        w.onBeforeShadow(i, w, A, L, z, Z, null), i.renderBufferDirect(L, null, z, Z, w, null), w.onAfterShadow(i, w, A, L, z, Z, null);
      }
    }
    const k = w.children;
    for (let z = 0, W = k.length; z < W; z++) y(k[z], A, L, S, M);
  }
  function N(w) {
    w.target.removeEventListener("dispose", N);
    for (const L in c) {
      const S = c[L], M = w.target.uuid;
      M in S && (S[M].dispose(), delete S[M]);
    }
  }
}
const hm = { [Ir]: Ur, [Nr]: Br, [Fr]: zr, [mi]: Or, [Ur]: Ir, [Br]: Nr, [zr]: Fr, [Or]: mi };
function um(i, t) {
  function e() {
    let P = false;
    const nt = new Zt();
    let H = null;
    const $ = new Zt(0, 0, 0, 0);
    return { setMask: function(ct) {
      H !== ct && !P && (i.colorMask(ct, ct, ct, ct), H = ct);
    }, setLocked: function(ct) {
      P = ct;
    }, setClear: function(ct, ot, Ct, ie, pe) {
      pe === true && (ct *= ie, ot *= ie, Ct *= ie), nt.set(ct, ot, Ct, ie), $.equals(nt) === false && (i.clearColor(ct, ot, Ct, ie), $.copy(nt));
    }, reset: function() {
      P = false, H = null, $.set(-1, 0, 0, 0);
    } };
  }
  function n() {
    let P = false, nt = false, H = null, $ = null, ct = null;
    return { setReversed: function(ot) {
      if (nt !== ot) {
        const Ct = t.get("EXT_clip_control");
        nt ? Ct.clipControlEXT(Ct.LOWER_LEFT_EXT, Ct.ZERO_TO_ONE_EXT) : Ct.clipControlEXT(Ct.LOWER_LEFT_EXT, Ct.NEGATIVE_ONE_TO_ONE_EXT);
        const ie = ct;
        ct = null, this.setClear(ie);
      }
      nt = ot;
    }, getReversed: function() {
      return nt;
    }, setTest: function(ot) {
      ot ? rt(i.DEPTH_TEST) : bt(i.DEPTH_TEST);
    }, setMask: function(ot) {
      H !== ot && !P && (i.depthMask(ot), H = ot);
    }, setFunc: function(ot) {
      if (nt && (ot = hm[ot]), $ !== ot) {
        switch (ot) {
          case Ir:
            i.depthFunc(i.NEVER);
            break;
          case Ur:
            i.depthFunc(i.ALWAYS);
            break;
          case Nr:
            i.depthFunc(i.LESS);
            break;
          case mi:
            i.depthFunc(i.LEQUAL);
            break;
          case Fr:
            i.depthFunc(i.EQUAL);
            break;
          case Or:
            i.depthFunc(i.GEQUAL);
            break;
          case Br:
            i.depthFunc(i.GREATER);
            break;
          case zr:
            i.depthFunc(i.NOTEQUAL);
            break;
          default:
            i.depthFunc(i.LEQUAL);
        }
        $ = ot;
      }
    }, setLocked: function(ot) {
      P = ot;
    }, setClear: function(ot) {
      ct !== ot && (nt && (ot = 1 - ot), i.clearDepth(ot), ct = ot);
    }, reset: function() {
      P = false, H = null, $ = null, ct = null, nt = false;
    } };
  }
  function s() {
    let P = false, nt = null, H = null, $ = null, ct = null, ot = null, Ct = null, ie = null, pe = null;
    return { setTest: function(Yt) {
      P || (Yt ? rt(i.STENCIL_TEST) : bt(i.STENCIL_TEST));
    }, setMask: function(Yt) {
      nt !== Yt && !P && (i.stencilMask(Yt), nt = Yt);
    }, setFunc: function(Yt, ze, tn) {
      (H !== Yt || $ !== ze || ct !== tn) && (i.stencilFunc(Yt, ze, tn), H = Yt, $ = ze, ct = tn);
    }, setOp: function(Yt, ze, tn) {
      (ot !== Yt || Ct !== ze || ie !== tn) && (i.stencilOp(Yt, ze, tn), ot = Yt, Ct = ze, ie = tn);
    }, setLocked: function(Yt) {
      P = Yt;
    }, setClear: function(Yt) {
      pe !== Yt && (i.clearStencil(Yt), pe = Yt);
    }, reset: function() {
      P = false, nt = null, H = null, $ = null, ct = null, ot = null, Ct = null, ie = null, pe = null;
    } };
  }
  const r = new e(), a = new n(), o = new s(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let h = {}, u = {}, d = /* @__PURE__ */ new WeakMap(), p = [], g = null, _ = false, m = null, f = null, E = null, T = null, y = null, N = null, w = null, A = new It(0, 0, 0), L = 0, S = false, M = null, R = null, k = null, z = null, W = null;
  const Z = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let V = false, K = 0;
  const G = i.getParameter(i.VERSION);
  G.indexOf("WebGL") !== -1 ? (K = parseFloat(/^WebGL (\d)/.exec(G)[1]), V = K >= 1) : G.indexOf("OpenGL ES") !== -1 && (K = parseFloat(/^OpenGL ES (\d)/.exec(G)[1]), V = K >= 2);
  let st = null, ht = {};
  const Mt = i.getParameter(i.SCISSOR_BOX), Ut = i.getParameter(i.VIEWPORT), jt = new Zt().fromArray(Mt), Y = new Zt().fromArray(Ut);
  function tt(P, nt, H, $) {
    const ct = new Uint8Array(4), ot = i.createTexture();
    i.bindTexture(P, ot), i.texParameteri(P, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(P, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Ct = 0; Ct < H; Ct++) P === i.TEXTURE_3D || P === i.TEXTURE_2D_ARRAY ? i.texImage3D(nt, 0, i.RGBA, 1, 1, $, 0, i.RGBA, i.UNSIGNED_BYTE, ct) : i.texImage2D(nt + Ct, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, ct);
    return ot;
  }
  const _t = {};
  _t[i.TEXTURE_2D] = tt(i.TEXTURE_2D, i.TEXTURE_2D, 1), _t[i.TEXTURE_CUBE_MAP] = tt(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), _t[i.TEXTURE_2D_ARRAY] = tt(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), _t[i.TEXTURE_3D] = tt(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), r.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), rt(i.DEPTH_TEST), a.setFunc(mi), Ft(false), Ot(ja), rt(i.CULL_FACE), U(En);
  function rt(P) {
    h[P] !== true && (i.enable(P), h[P] = true);
  }
  function bt(P) {
    h[P] !== false && (i.disable(P), h[P] = false);
  }
  function wt(P, nt) {
    return u[P] !== nt ? (i.bindFramebuffer(P, nt), u[P] = nt, P === i.DRAW_FRAMEBUFFER && (u[i.FRAMEBUFFER] = nt), P === i.FRAMEBUFFER && (u[i.DRAW_FRAMEBUFFER] = nt), true) : false;
  }
  function Nt(P, nt) {
    let H = p, $ = false;
    if (P) {
      H = d.get(nt), H === void 0 && (H = [], d.set(nt, H));
      const ct = P.textures;
      if (H.length !== ct.length || H[0] !== i.COLOR_ATTACHMENT0) {
        for (let ot = 0, Ct = ct.length; ot < Ct; ot++) H[ot] = i.COLOR_ATTACHMENT0 + ot;
        H.length = ct.length, $ = true;
      }
    } else H[0] !== i.BACK && (H[0] = i.BACK, $ = true);
    $ && i.drawBuffers(H);
  }
  function ne(P) {
    return g !== P ? (i.useProgram(P), g = P, true) : false;
  }
  const zt = { [Un]: i.FUNC_ADD, [wc]: i.FUNC_SUBTRACT, [Cc]: i.FUNC_REVERSE_SUBTRACT };
  zt[Rc] = i.MIN, zt[Pc] = i.MAX;
  const se = { [Lc]: i.ZERO, [Dc]: i.ONE, [Ic]: i.SRC_COLOR, [Lr]: i.SRC_ALPHA, [zc]: i.SRC_ALPHA_SATURATE, [Oc]: i.DST_COLOR, [Nc]: i.DST_ALPHA, [Uc]: i.ONE_MINUS_SRC_COLOR, [Dr]: i.ONE_MINUS_SRC_ALPHA, [Bc]: i.ONE_MINUS_DST_COLOR, [Fc]: i.ONE_MINUS_DST_ALPHA, [kc]: i.CONSTANT_COLOR, [Hc]: i.ONE_MINUS_CONSTANT_COLOR, [Gc]: i.CONSTANT_ALPHA, [Vc]: i.ONE_MINUS_CONSTANT_ALPHA };
  function U(P, nt, H, $, ct, ot, Ct, ie, pe, Yt) {
    if (P === En) {
      _ === true && (bt(i.BLEND), _ = false);
      return;
    }
    if (_ === false && (rt(i.BLEND), _ = true), P !== Ac) {
      if (P !== m || Yt !== S) {
        if ((f !== Un || y !== Un) && (i.blendEquation(i.FUNC_ADD), f = Un, y = Un), Yt) switch (P) {
          case ui:
            i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
            break;
          case Ka:
            i.blendFunc(i.ONE, i.ONE);
            break;
          case Ja:
            i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
            break;
          case Qa:
            i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
            break;
          default:
            console.error("THREE.WebGLState: Invalid blending: ", P);
            break;
        }
        else switch (P) {
          case ui:
            i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
            break;
          case Ka:
            i.blendFunc(i.SRC_ALPHA, i.ONE);
            break;
          case Ja:
            i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
            break;
          case Qa:
            i.blendFunc(i.ZERO, i.SRC_COLOR);
            break;
          default:
            console.error("THREE.WebGLState: Invalid blending: ", P);
            break;
        }
        E = null, T = null, N = null, w = null, A.set(0, 0, 0), L = 0, m = P, S = Yt;
      }
      return;
    }
    ct = ct || nt, ot = ot || H, Ct = Ct || $, (nt !== f || ct !== y) && (i.blendEquationSeparate(zt[nt], zt[ct]), f = nt, y = ct), (H !== E || $ !== T || ot !== N || Ct !== w) && (i.blendFuncSeparate(se[H], se[$], se[ot], se[Ct]), E = H, T = $, N = ot, w = Ct), (ie.equals(A) === false || pe !== L) && (i.blendColor(ie.r, ie.g, ie.b, pe), A.copy(ie), L = pe), m = P, S = false;
  }
  function De(P, nt) {
    P.side === qe ? bt(i.CULL_FACE) : rt(i.CULL_FACE);
    let H = P.side === xe;
    nt && (H = !H), Ft(H), P.blending === ui && P.transparent === false ? U(En) : U(P.blending, P.blendEquation, P.blendSrc, P.blendDst, P.blendEquationAlpha, P.blendSrcAlpha, P.blendDstAlpha, P.blendColor, P.blendAlpha, P.premultipliedAlpha), a.setFunc(P.depthFunc), a.setTest(P.depthTest), a.setMask(P.depthWrite), r.setMask(P.colorWrite);
    const $ = P.stencilWrite;
    o.setTest($), $ && (o.setMask(P.stencilWriteMask), o.setFunc(P.stencilFunc, P.stencilRef, P.stencilFuncMask), o.setOp(P.stencilFail, P.stencilZFail, P.stencilZPass)), Qt(P.polygonOffset, P.polygonOffsetFactor, P.polygonOffsetUnits), P.alphaToCoverage === true ? rt(i.SAMPLE_ALPHA_TO_COVERAGE) : bt(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Ft(P) {
    M !== P && (P ? i.frontFace(i.CW) : i.frontFace(i.CCW), M = P);
  }
  function Ot(P) {
    P !== bc ? (rt(i.CULL_FACE), P !== R && (P === ja ? i.cullFace(i.BACK) : P === Tc ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : bt(i.CULL_FACE), R = P;
  }
  function St(P) {
    P !== k && (V && i.lineWidth(P), k = P);
  }
  function Qt(P, nt, H) {
    P ? (rt(i.POLYGON_OFFSET_FILL), (z !== nt || W !== H) && (i.polygonOffset(nt, H), z = nt, W = H)) : bt(i.POLYGON_OFFSET_FILL);
  }
  function yt(P) {
    P ? rt(i.SCISSOR_TEST) : bt(i.SCISSOR_TEST);
  }
  function b(P) {
    P === void 0 && (P = i.TEXTURE0 + Z - 1), st !== P && (i.activeTexture(P), st = P);
  }
  function v(P, nt, H) {
    H === void 0 && (st === null ? H = i.TEXTURE0 + Z - 1 : H = st);
    let $ = ht[H];
    $ === void 0 && ($ = { type: void 0, texture: void 0 }, ht[H] = $), ($.type !== P || $.texture !== nt) && (st !== H && (i.activeTexture(H), st = H), i.bindTexture(P, nt || _t[P]), $.type = P, $.texture = nt);
  }
  function F() {
    const P = ht[st];
    P !== void 0 && P.type !== void 0 && (i.bindTexture(P.type, null), P.type = void 0, P.texture = void 0);
  }
  function q() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function j() {
    try {
      i.compressedTexImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function X() {
    try {
      i.texSubImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function vt() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function at() {
    try {
      i.compressedTexSubImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function ut() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function kt() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function J() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function dt() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Et() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Tt(P) {
    jt.equals(P) === false && (i.scissor(P.x, P.y, P.z, P.w), jt.copy(P));
  }
  function ft(P) {
    Y.equals(P) === false && (i.viewport(P.x, P.y, P.z, P.w), Y.copy(P));
  }
  function Bt(P, nt) {
    let H = c.get(nt);
    H === void 0 && (H = /* @__PURE__ */ new WeakMap(), c.set(nt, H));
    let $ = H.get(P);
    $ === void 0 && ($ = i.getUniformBlockIndex(nt, P.name), H.set(P, $));
  }
  function Lt(P, nt) {
    const $ = c.get(nt).get(P);
    l.get(nt) !== $ && (i.uniformBlockBinding(nt, $, P.__bindingPointIndex), l.set(nt, $));
  }
  function Kt() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(true, true, true, true), i.clearColor(0, 0, 0, 0), i.depthMask(true), i.depthFunc(i.LESS), a.setReversed(false), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), h = {}, st = null, ht = {}, u = {}, d = /* @__PURE__ */ new WeakMap(), p = [], g = null, _ = false, m = null, f = null, E = null, T = null, y = null, N = null, w = null, A = new It(0, 0, 0), L = 0, S = false, M = null, R = null, k = null, z = null, W = null, jt.set(0, 0, i.canvas.width, i.canvas.height), Y.set(0, 0, i.canvas.width, i.canvas.height), r.reset(), a.reset(), o.reset();
  }
  return { buffers: { color: r, depth: a, stencil: o }, enable: rt, disable: bt, bindFramebuffer: wt, drawBuffers: Nt, useProgram: ne, setBlending: U, setMaterial: De, setFlipSided: Ft, setCullFace: Ot, setLineWidth: St, setPolygonOffset: Qt, setScissorTest: yt, activeTexture: b, bindTexture: v, unbindTexture: F, compressedTexImage2D: q, compressedTexImage3D: j, texImage2D: dt, texImage3D: Et, updateUBOMapping: Bt, uniformBlockBinding: Lt, texStorage2D: kt, texStorage3D: J, texSubImage2D: X, texSubImage3D: vt, compressedTexSubImage2D: at, compressedTexSubImage3D: ut, scissor: Tt, viewport: ft, reset: Kt };
}
function qo(i, t, e, n) {
  const s = dm(n);
  switch (e) {
    case Tl:
      return i * t;
    case wl:
      return i * t;
    case Cl:
      return i * t * 2;
    case ba:
      return i * t / s.components * s.byteLength;
    case Ta:
      return i * t / s.components * s.byteLength;
    case Rl:
      return i * t * 2 / s.components * s.byteLength;
    case Aa:
      return i * t * 2 / s.components * s.byteLength;
    case Al:
      return i * t * 3 / s.components * s.byteLength;
    case We:
      return i * t * 4 / s.components * s.byteLength;
    case wa:
      return i * t * 4 / s.components * s.byteLength;
    case Cs:
    case Rs:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case Ps:
    case Ls:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Xr:
    case qr:
      return Math.max(i, 16) * Math.max(t, 8) / 4;
    case Wr:
    case Yr:
      return Math.max(i, 8) * Math.max(t, 8) / 2;
    case $r:
    case Zr:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case jr:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Kr:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Jr:
      return Math.floor((i + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case Qr:
      return Math.floor((i + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case ta:
      return Math.floor((i + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case ea:
      return Math.floor((i + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case na:
      return Math.floor((i + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case ia:
      return Math.floor((i + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case sa:
      return Math.floor((i + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case ra:
      return Math.floor((i + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case aa:
      return Math.floor((i + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case oa:
      return Math.floor((i + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case la:
      return Math.floor((i + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case ca:
      return Math.floor((i + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case ha:
      return Math.floor((i + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case Ds:
    case ua:
    case da:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
    case Pl:
    case fa:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 8;
    case pa:
    case ma:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${e} format.`);
}
function dm(i) {
  switch (i) {
    case un:
    case Sl:
      return { byteLength: 1, components: 1 };
    case Vi:
    case El:
    case Xi:
      return { byteLength: 2, components: 1 };
    case Sa:
    case Ea:
      return { byteLength: 2, components: 4 };
    case kn:
    case ya:
    case Ze:
      return { byteLength: 4, components: 1 };
    case bl:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${i}.`);
}
function fm(i, t, e, n, s, r, a) {
  const o = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? false : /OculusBrowser/g.test(navigator.userAgent), c = new it(), h = /* @__PURE__ */ new WeakMap();
  let u;
  const d = /* @__PURE__ */ new WeakMap();
  let p = false;
  try {
    p = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function g(b, v) {
    return p ? new OffscreenCanvas(b, v) : Fs("canvas");
  }
  function _(b, v, F) {
    let q = 1;
    const j = yt(b);
    if ((j.width > F || j.height > F) && (q = F / Math.max(j.width, j.height)), q < 1) if (typeof HTMLImageElement < "u" && b instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && b instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && b instanceof ImageBitmap || typeof VideoFrame < "u" && b instanceof VideoFrame) {
      const X = Math.floor(q * j.width), vt = Math.floor(q * j.height);
      u === void 0 && (u = g(X, vt));
      const at = v ? g(X, vt) : u;
      return at.width = X, at.height = vt, at.getContext("2d").drawImage(b, 0, 0, X, vt), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + j.width + "x" + j.height + ") to (" + X + "x" + vt + ")."), at;
    } else return "data" in b && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + j.width + "x" + j.height + ")."), b;
    return b;
  }
  function m(b) {
    return b.generateMipmaps;
  }
  function f(b) {
    i.generateMipmap(b);
  }
  function E(b) {
    return b.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : b.isWebGL3DRenderTarget ? i.TEXTURE_3D : b.isWebGLArrayRenderTarget || b.isCompressedArrayTexture ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D;
  }
  function T(b, v, F, q, j = false) {
    if (b !== null) {
      if (i[b] !== void 0) return i[b];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + b + "'");
    }
    let X = v;
    if (v === i.RED && (F === i.FLOAT && (X = i.R32F), F === i.HALF_FLOAT && (X = i.R16F), F === i.UNSIGNED_BYTE && (X = i.R8)), v === i.RED_INTEGER && (F === i.UNSIGNED_BYTE && (X = i.R8UI), F === i.UNSIGNED_SHORT && (X = i.R16UI), F === i.UNSIGNED_INT && (X = i.R32UI), F === i.BYTE && (X = i.R8I), F === i.SHORT && (X = i.R16I), F === i.INT && (X = i.R32I)), v === i.RG && (F === i.FLOAT && (X = i.RG32F), F === i.HALF_FLOAT && (X = i.RG16F), F === i.UNSIGNED_BYTE && (X = i.RG8)), v === i.RG_INTEGER && (F === i.UNSIGNED_BYTE && (X = i.RG8UI), F === i.UNSIGNED_SHORT && (X = i.RG16UI), F === i.UNSIGNED_INT && (X = i.RG32UI), F === i.BYTE && (X = i.RG8I), F === i.SHORT && (X = i.RG16I), F === i.INT && (X = i.RG32I)), v === i.RGB_INTEGER && (F === i.UNSIGNED_BYTE && (X = i.RGB8UI), F === i.UNSIGNED_SHORT && (X = i.RGB16UI), F === i.UNSIGNED_INT && (X = i.RGB32UI), F === i.BYTE && (X = i.RGB8I), F === i.SHORT && (X = i.RGB16I), F === i.INT && (X = i.RGB32I)), v === i.RGBA_INTEGER && (F === i.UNSIGNED_BYTE && (X = i.RGBA8UI), F === i.UNSIGNED_SHORT && (X = i.RGBA16UI), F === i.UNSIGNED_INT && (X = i.RGBA32UI), F === i.BYTE && (X = i.RGBA8I), F === i.SHORT && (X = i.RGBA16I), F === i.INT && (X = i.RGBA32I)), v === i.RGB && F === i.UNSIGNED_INT_5_9_9_9_REV && (X = i.RGB9_E5), v === i.RGBA) {
      const vt = j ? Gs : Ht.getTransfer(q);
      F === i.FLOAT && (X = i.RGBA32F), F === i.HALF_FLOAT && (X = i.RGBA16F), F === i.UNSIGNED_BYTE && (X = vt === qt ? i.SRGB8_ALPHA8 : i.RGBA8), F === i.UNSIGNED_SHORT_4_4_4_4 && (X = i.RGBA4), F === i.UNSIGNED_SHORT_5_5_5_1 && (X = i.RGB5_A1);
    }
    return (X === i.R16F || X === i.R32F || X === i.RG16F || X === i.RG32F || X === i.RGBA16F || X === i.RGBA32F) && t.get("EXT_color_buffer_float"), X;
  }
  function y(b, v) {
    let F;
    return b ? v === null || v === kn || v === vi ? F = i.DEPTH24_STENCIL8 : v === Ze ? F = i.DEPTH32F_STENCIL8 : v === Vi && (F = i.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : v === null || v === kn || v === vi ? F = i.DEPTH_COMPONENT24 : v === Ze ? F = i.DEPTH_COMPONENT32F : v === Vi && (F = i.DEPTH_COMPONENT16), F;
  }
  function N(b, v) {
    return m(b) === true || b.isFramebufferTexture && b.minFilter !== Pe && b.minFilter !== $e ? Math.log2(Math.max(v.width, v.height)) + 1 : b.mipmaps !== void 0 && b.mipmaps.length > 0 ? b.mipmaps.length : b.isCompressedTexture && Array.isArray(b.image) ? v.mipmaps.length : 1;
  }
  function w(b) {
    const v = b.target;
    v.removeEventListener("dispose", w), L(v), v.isVideoTexture && h.delete(v);
  }
  function A(b) {
    const v = b.target;
    v.removeEventListener("dispose", A), M(v);
  }
  function L(b) {
    const v = n.get(b);
    if (v.__webglInit === void 0) return;
    const F = b.source, q = d.get(F);
    if (q) {
      const j = q[v.__cacheKey];
      j.usedTimes--, j.usedTimes === 0 && S(b), Object.keys(q).length === 0 && d.delete(F);
    }
    n.remove(b);
  }
  function S(b) {
    const v = n.get(b);
    i.deleteTexture(v.__webglTexture);
    const F = b.source, q = d.get(F);
    delete q[v.__cacheKey], a.memory.textures--;
  }
  function M(b) {
    const v = n.get(b);
    if (b.depthTexture && (b.depthTexture.dispose(), n.remove(b.depthTexture)), b.isWebGLCubeRenderTarget) for (let q = 0; q < 6; q++) {
      if (Array.isArray(v.__webglFramebuffer[q])) for (let j = 0; j < v.__webglFramebuffer[q].length; j++) i.deleteFramebuffer(v.__webglFramebuffer[q][j]);
      else i.deleteFramebuffer(v.__webglFramebuffer[q]);
      v.__webglDepthbuffer && i.deleteRenderbuffer(v.__webglDepthbuffer[q]);
    }
    else {
      if (Array.isArray(v.__webglFramebuffer)) for (let q = 0; q < v.__webglFramebuffer.length; q++) i.deleteFramebuffer(v.__webglFramebuffer[q]);
      else i.deleteFramebuffer(v.__webglFramebuffer);
      if (v.__webglDepthbuffer && i.deleteRenderbuffer(v.__webglDepthbuffer), v.__webglMultisampledFramebuffer && i.deleteFramebuffer(v.__webglMultisampledFramebuffer), v.__webglColorRenderbuffer) for (let q = 0; q < v.__webglColorRenderbuffer.length; q++) v.__webglColorRenderbuffer[q] && i.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);
      v.__webglDepthRenderbuffer && i.deleteRenderbuffer(v.__webglDepthRenderbuffer);
    }
    const F = b.textures;
    for (let q = 0, j = F.length; q < j; q++) {
      const X = n.get(F[q]);
      X.__webglTexture && (i.deleteTexture(X.__webglTexture), a.memory.textures--), n.remove(F[q]);
    }
    n.remove(b);
  }
  let R = 0;
  function k() {
    R = 0;
  }
  function z() {
    const b = R;
    return b >= s.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + b + " texture units while this GPU supports only " + s.maxTextures), R += 1, b;
  }
  function W(b) {
    const v = [];
    return v.push(b.wrapS), v.push(b.wrapT), v.push(b.wrapR || 0), v.push(b.magFilter), v.push(b.minFilter), v.push(b.anisotropy), v.push(b.internalFormat), v.push(b.format), v.push(b.type), v.push(b.generateMipmaps), v.push(b.premultiplyAlpha), v.push(b.flipY), v.push(b.unpackAlignment), v.push(b.colorSpace), v.join();
  }
  function Z(b, v) {
    const F = n.get(b);
    if (b.isVideoTexture && St(b), b.isRenderTargetTexture === false && b.version > 0 && F.__version !== b.version) {
      const q = b.image;
      if (q === null) console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (q.complete === false) console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        Y(F, b, v);
        return;
      }
    }
    e.bindTexture(i.TEXTURE_2D, F.__webglTexture, i.TEXTURE0 + v);
  }
  function V(b, v) {
    const F = n.get(b);
    if (b.version > 0 && F.__version !== b.version) {
      Y(F, b, v);
      return;
    }
    e.bindTexture(i.TEXTURE_2D_ARRAY, F.__webglTexture, i.TEXTURE0 + v);
  }
  function K(b, v) {
    const F = n.get(b);
    if (b.version > 0 && F.__version !== b.version) {
      Y(F, b, v);
      return;
    }
    e.bindTexture(i.TEXTURE_3D, F.__webglTexture, i.TEXTURE0 + v);
  }
  function G(b, v) {
    const F = n.get(b);
    if (b.version > 0 && F.__version !== b.version) {
      tt(F, b, v);
      return;
    }
    e.bindTexture(i.TEXTURE_CUBE_MAP, F.__webglTexture, i.TEXTURE0 + v);
  }
  const st = { [Gr]: i.REPEAT, [On]: i.CLAMP_TO_EDGE, [Vr]: i.MIRRORED_REPEAT }, ht = { [Pe]: i.NEAREST, [Jc]: i.NEAREST_MIPMAP_NEAREST, [Ji]: i.NEAREST_MIPMAP_LINEAR, [$e]: i.LINEAR, [qs]: i.LINEAR_MIPMAP_NEAREST, [Bn]: i.LINEAR_MIPMAP_LINEAR }, Mt = { [nh]: i.NEVER, [lh]: i.ALWAYS, [ih]: i.LESS, [Dl]: i.LEQUAL, [sh]: i.EQUAL, [oh]: i.GEQUAL, [rh]: i.GREATER, [ah]: i.NOTEQUAL };
  function Ut(b, v) {
    if (v.type === Ze && t.has("OES_texture_float_linear") === false && (v.magFilter === $e || v.magFilter === qs || v.magFilter === Ji || v.magFilter === Bn || v.minFilter === $e || v.minFilter === qs || v.minFilter === Ji || v.minFilter === Bn) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(b, i.TEXTURE_WRAP_S, st[v.wrapS]), i.texParameteri(b, i.TEXTURE_WRAP_T, st[v.wrapT]), (b === i.TEXTURE_3D || b === i.TEXTURE_2D_ARRAY) && i.texParameteri(b, i.TEXTURE_WRAP_R, st[v.wrapR]), i.texParameteri(b, i.TEXTURE_MAG_FILTER, ht[v.magFilter]), i.texParameteri(b, i.TEXTURE_MIN_FILTER, ht[v.minFilter]), v.compareFunction && (i.texParameteri(b, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(b, i.TEXTURE_COMPARE_FUNC, Mt[v.compareFunction])), t.has("EXT_texture_filter_anisotropic") === true) {
      if (v.magFilter === Pe || v.minFilter !== Ji && v.minFilter !== Bn || v.type === Ze && t.has("OES_texture_float_linear") === false) return;
      if (v.anisotropy > 1 || n.get(v).__currentAnisotropy) {
        const F = t.get("EXT_texture_filter_anisotropic");
        i.texParameterf(b, F.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(v.anisotropy, s.getMaxAnisotropy())), n.get(v).__currentAnisotropy = v.anisotropy;
      }
    }
  }
  function jt(b, v) {
    let F = false;
    b.__webglInit === void 0 && (b.__webglInit = true, v.addEventListener("dispose", w));
    const q = v.source;
    let j = d.get(q);
    j === void 0 && (j = {}, d.set(q, j));
    const X = W(v);
    if (X !== b.__cacheKey) {
      j[X] === void 0 && (j[X] = { texture: i.createTexture(), usedTimes: 0 }, a.memory.textures++, F = true), j[X].usedTimes++;
      const vt = j[b.__cacheKey];
      vt !== void 0 && (j[b.__cacheKey].usedTimes--, vt.usedTimes === 0 && S(v)), b.__cacheKey = X, b.__webglTexture = j[X].texture;
    }
    return F;
  }
  function Y(b, v, F) {
    let q = i.TEXTURE_2D;
    (v.isDataArrayTexture || v.isCompressedArrayTexture) && (q = i.TEXTURE_2D_ARRAY), v.isData3DTexture && (q = i.TEXTURE_3D);
    const j = jt(b, v), X = v.source;
    e.bindTexture(q, b.__webglTexture, i.TEXTURE0 + F);
    const vt = n.get(X);
    if (X.version !== vt.__version || j === true) {
      e.activeTexture(i.TEXTURE0 + F);
      const at = Ht.getPrimaries(Ht.workingColorSpace), ut = v.colorSpace === Sn ? null : Ht.getPrimaries(v.colorSpace), kt = v.colorSpace === Sn || at === ut ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, v.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, v.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, v.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, kt);
      let J = _(v.image, false, s.maxTextureSize);
      J = Qt(v, J);
      const dt = r.convert(v.format, v.colorSpace), Et = r.convert(v.type);
      let Tt = T(v.internalFormat, dt, Et, v.colorSpace, v.isVideoTexture);
      Ut(q, v);
      let ft;
      const Bt = v.mipmaps, Lt = v.isVideoTexture !== true, Kt = vt.__version === void 0 || j === true, P = X.dataReady, nt = N(v, J);
      if (v.isDepthTexture) Tt = y(v.format === xi, v.type), Kt && (Lt ? e.texStorage2D(i.TEXTURE_2D, 1, Tt, J.width, J.height) : e.texImage2D(i.TEXTURE_2D, 0, Tt, J.width, J.height, 0, dt, Et, null));
      else if (v.isDataTexture) if (Bt.length > 0) {
        Lt && Kt && e.texStorage2D(i.TEXTURE_2D, nt, Tt, Bt[0].width, Bt[0].height);
        for (let H = 0, $ = Bt.length; H < $; H++) ft = Bt[H], Lt ? P && e.texSubImage2D(i.TEXTURE_2D, H, 0, 0, ft.width, ft.height, dt, Et, ft.data) : e.texImage2D(i.TEXTURE_2D, H, Tt, ft.width, ft.height, 0, dt, Et, ft.data);
        v.generateMipmaps = false;
      } else Lt ? (Kt && e.texStorage2D(i.TEXTURE_2D, nt, Tt, J.width, J.height), P && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, J.width, J.height, dt, Et, J.data)) : e.texImage2D(i.TEXTURE_2D, 0, Tt, J.width, J.height, 0, dt, Et, J.data);
      else if (v.isCompressedTexture) if (v.isCompressedArrayTexture) {
        Lt && Kt && e.texStorage3D(i.TEXTURE_2D_ARRAY, nt, Tt, Bt[0].width, Bt[0].height, J.depth);
        for (let H = 0, $ = Bt.length; H < $; H++) if (ft = Bt[H], v.format !== We) if (dt !== null) if (Lt) {
          if (P) if (v.layerUpdates.size > 0) {
            const ct = qo(ft.width, ft.height, v.format, v.type);
            for (const ot of v.layerUpdates) {
              const Ct = ft.data.subarray(ot * ct / ft.data.BYTES_PER_ELEMENT, (ot + 1) * ct / ft.data.BYTES_PER_ELEMENT);
              e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, H, 0, 0, ot, ft.width, ft.height, 1, dt, Ct);
            }
            v.clearLayerUpdates();
          } else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, H, 0, 0, 0, ft.width, ft.height, J.depth, dt, ft.data);
        } else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY, H, Tt, ft.width, ft.height, J.depth, 0, ft.data, 0, 0);
        else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
        else Lt ? P && e.texSubImage3D(i.TEXTURE_2D_ARRAY, H, 0, 0, 0, ft.width, ft.height, J.depth, dt, Et, ft.data) : e.texImage3D(i.TEXTURE_2D_ARRAY, H, Tt, ft.width, ft.height, J.depth, 0, dt, Et, ft.data);
      } else {
        Lt && Kt && e.texStorage2D(i.TEXTURE_2D, nt, Tt, Bt[0].width, Bt[0].height);
        for (let H = 0, $ = Bt.length; H < $; H++) ft = Bt[H], v.format !== We ? dt !== null ? Lt ? P && e.compressedTexSubImage2D(i.TEXTURE_2D, H, 0, 0, ft.width, ft.height, dt, ft.data) : e.compressedTexImage2D(i.TEXTURE_2D, H, Tt, ft.width, ft.height, 0, ft.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Lt ? P && e.texSubImage2D(i.TEXTURE_2D, H, 0, 0, ft.width, ft.height, dt, Et, ft.data) : e.texImage2D(i.TEXTURE_2D, H, Tt, ft.width, ft.height, 0, dt, Et, ft.data);
      }
      else if (v.isDataArrayTexture) if (Lt) {
        if (Kt && e.texStorage3D(i.TEXTURE_2D_ARRAY, nt, Tt, J.width, J.height, J.depth), P) if (v.layerUpdates.size > 0) {
          const H = qo(J.width, J.height, v.format, v.type);
          for (const $ of v.layerUpdates) {
            const ct = J.data.subarray($ * H / J.data.BYTES_PER_ELEMENT, ($ + 1) * H / J.data.BYTES_PER_ELEMENT);
            e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, $, J.width, J.height, 1, dt, Et, ct);
          }
          v.clearLayerUpdates();
        } else e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, J.width, J.height, J.depth, dt, Et, J.data);
      } else e.texImage3D(i.TEXTURE_2D_ARRAY, 0, Tt, J.width, J.height, J.depth, 0, dt, Et, J.data);
      else if (v.isData3DTexture) Lt ? (Kt && e.texStorage3D(i.TEXTURE_3D, nt, Tt, J.width, J.height, J.depth), P && e.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, J.width, J.height, J.depth, dt, Et, J.data)) : e.texImage3D(i.TEXTURE_3D, 0, Tt, J.width, J.height, J.depth, 0, dt, Et, J.data);
      else if (v.isFramebufferTexture) {
        if (Kt) if (Lt) e.texStorage2D(i.TEXTURE_2D, nt, Tt, J.width, J.height);
        else {
          let H = J.width, $ = J.height;
          for (let ct = 0; ct < nt; ct++) e.texImage2D(i.TEXTURE_2D, ct, Tt, H, $, 0, dt, Et, null), H >>= 1, $ >>= 1;
        }
      } else if (Bt.length > 0) {
        if (Lt && Kt) {
          const H = yt(Bt[0]);
          e.texStorage2D(i.TEXTURE_2D, nt, Tt, H.width, H.height);
        }
        for (let H = 0, $ = Bt.length; H < $; H++) ft = Bt[H], Lt ? P && e.texSubImage2D(i.TEXTURE_2D, H, 0, 0, dt, Et, ft) : e.texImage2D(i.TEXTURE_2D, H, Tt, dt, Et, ft);
        v.generateMipmaps = false;
      } else if (Lt) {
        if (Kt) {
          const H = yt(J);
          e.texStorage2D(i.TEXTURE_2D, nt, Tt, H.width, H.height);
        }
        P && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, dt, Et, J);
      } else e.texImage2D(i.TEXTURE_2D, 0, Tt, dt, Et, J);
      m(v) && f(q), vt.__version = X.version, v.onUpdate && v.onUpdate(v);
    }
    b.__version = v.version;
  }
  function tt(b, v, F) {
    if (v.image.length !== 6) return;
    const q = jt(b, v), j = v.source;
    e.bindTexture(i.TEXTURE_CUBE_MAP, b.__webglTexture, i.TEXTURE0 + F);
    const X = n.get(j);
    if (j.version !== X.__version || q === true) {
      e.activeTexture(i.TEXTURE0 + F);
      const vt = Ht.getPrimaries(Ht.workingColorSpace), at = v.colorSpace === Sn ? null : Ht.getPrimaries(v.colorSpace), ut = v.colorSpace === Sn || vt === at ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, v.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, v.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, v.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, ut);
      const kt = v.isCompressedTexture || v.image[0].isCompressedTexture, J = v.image[0] && v.image[0].isDataTexture, dt = [];
      for (let $ = 0; $ < 6; $++) !kt && !J ? dt[$] = _(v.image[$], true, s.maxCubemapSize) : dt[$] = J ? v.image[$].image : v.image[$], dt[$] = Qt(v, dt[$]);
      const Et = dt[0], Tt = r.convert(v.format, v.colorSpace), ft = r.convert(v.type), Bt = T(v.internalFormat, Tt, ft, v.colorSpace), Lt = v.isVideoTexture !== true, Kt = X.__version === void 0 || q === true, P = j.dataReady;
      let nt = N(v, Et);
      Ut(i.TEXTURE_CUBE_MAP, v);
      let H;
      if (kt) {
        Lt && Kt && e.texStorage2D(i.TEXTURE_CUBE_MAP, nt, Bt, Et.width, Et.height);
        for (let $ = 0; $ < 6; $++) {
          H = dt[$].mipmaps;
          for (let ct = 0; ct < H.length; ct++) {
            const ot = H[ct];
            v.format !== We ? Tt !== null ? Lt ? P && e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, ct, 0, 0, ot.width, ot.height, Tt, ot.data) : e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, ct, Bt, ot.width, ot.height, 0, ot.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Lt ? P && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, ct, 0, 0, ot.width, ot.height, Tt, ft, ot.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, ct, Bt, ot.width, ot.height, 0, Tt, ft, ot.data);
          }
        }
      } else {
        if (H = v.mipmaps, Lt && Kt) {
          H.length > 0 && nt++;
          const $ = yt(dt[0]);
          e.texStorage2D(i.TEXTURE_CUBE_MAP, nt, Bt, $.width, $.height);
        }
        for (let $ = 0; $ < 6; $++) if (J) {
          Lt ? P && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, 0, 0, dt[$].width, dt[$].height, Tt, ft, dt[$].data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, Bt, dt[$].width, dt[$].height, 0, Tt, ft, dt[$].data);
          for (let ct = 0; ct < H.length; ct++) {
            const Ct = H[ct].image[$].image;
            Lt ? P && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, ct + 1, 0, 0, Ct.width, Ct.height, Tt, ft, Ct.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, ct + 1, Bt, Ct.width, Ct.height, 0, Tt, ft, Ct.data);
          }
        } else {
          Lt ? P && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, 0, 0, Tt, ft, dt[$]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, Bt, Tt, ft, dt[$]);
          for (let ct = 0; ct < H.length; ct++) {
            const ot = H[ct];
            Lt ? P && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, ct + 1, 0, 0, Tt, ft, ot.image[$]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, ct + 1, Bt, Tt, ft, ot.image[$]);
          }
        }
      }
      m(v) && f(i.TEXTURE_CUBE_MAP), X.__version = j.version, v.onUpdate && v.onUpdate(v);
    }
    b.__version = v.version;
  }
  function _t(b, v, F, q, j, X) {
    const vt = r.convert(F.format, F.colorSpace), at = r.convert(F.type), ut = T(F.internalFormat, vt, at, F.colorSpace), kt = n.get(v), J = n.get(F);
    if (J.__renderTarget = v, !kt.__hasExternalTextures) {
      const dt = Math.max(1, v.width >> X), Et = Math.max(1, v.height >> X);
      j === i.TEXTURE_3D || j === i.TEXTURE_2D_ARRAY ? e.texImage3D(j, X, ut, dt, Et, v.depth, 0, vt, at, null) : e.texImage2D(j, X, ut, dt, Et, 0, vt, at, null);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, b), Ot(v) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, q, j, J.__webglTexture, 0, Ft(v)) : (j === i.TEXTURE_2D || j >= i.TEXTURE_CUBE_MAP_POSITIVE_X && j <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, q, j, J.__webglTexture, X), e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function rt(b, v, F) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, b), v.depthBuffer) {
      const q = v.depthTexture, j = q && q.isDepthTexture ? q.type : null, X = y(v.stencilBuffer, j), vt = v.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, at = Ft(v);
      Ot(v) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, at, X, v.width, v.height) : F ? i.renderbufferStorageMultisample(i.RENDERBUFFER, at, X, v.width, v.height) : i.renderbufferStorage(i.RENDERBUFFER, X, v.width, v.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, vt, i.RENDERBUFFER, b);
    } else {
      const q = v.textures;
      for (let j = 0; j < q.length; j++) {
        const X = q[j], vt = r.convert(X.format, X.colorSpace), at = r.convert(X.type), ut = T(X.internalFormat, vt, at, X.colorSpace), kt = Ft(v);
        F && Ot(v) === false ? i.renderbufferStorageMultisample(i.RENDERBUFFER, kt, ut, v.width, v.height) : Ot(v) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, kt, ut, v.width, v.height) : i.renderbufferStorage(i.RENDERBUFFER, ut, v.width, v.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function bt(b, v) {
    if (v && v.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (e.bindFramebuffer(i.FRAMEBUFFER, b), !(v.depthTexture && v.depthTexture.isDepthTexture)) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const q = n.get(v.depthTexture);
    q.__renderTarget = v, (!q.__webglTexture || v.depthTexture.image.width !== v.width || v.depthTexture.image.height !== v.height) && (v.depthTexture.image.width = v.width, v.depthTexture.image.height = v.height, v.depthTexture.needsUpdate = true), Z(v.depthTexture, 0);
    const j = q.__webglTexture, X = Ft(v);
    if (v.depthTexture.format === di) Ot(v) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, j, 0, X) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, j, 0);
    else if (v.depthTexture.format === xi) Ot(v) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, j, 0, X) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, j, 0);
    else throw new Error("Unknown depthTexture format");
  }
  function wt(b) {
    const v = n.get(b), F = b.isWebGLCubeRenderTarget === true;
    if (v.__boundDepthTexture !== b.depthTexture) {
      const q = b.depthTexture;
      if (v.__depthDisposeCallback && v.__depthDisposeCallback(), q) {
        const j = () => {
          delete v.__boundDepthTexture, delete v.__depthDisposeCallback, q.removeEventListener("dispose", j);
        };
        q.addEventListener("dispose", j), v.__depthDisposeCallback = j;
      }
      v.__boundDepthTexture = q;
    }
    if (b.depthTexture && !v.__autoAllocateDepthBuffer) {
      if (F) throw new Error("target.depthTexture not supported in Cube render targets");
      bt(v.__webglFramebuffer, b);
    } else if (F) {
      v.__webglDepthbuffer = [];
      for (let q = 0; q < 6; q++) if (e.bindFramebuffer(i.FRAMEBUFFER, v.__webglFramebuffer[q]), v.__webglDepthbuffer[q] === void 0) v.__webglDepthbuffer[q] = i.createRenderbuffer(), rt(v.__webglDepthbuffer[q], b, false);
      else {
        const j = b.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, X = v.__webglDepthbuffer[q];
        i.bindRenderbuffer(i.RENDERBUFFER, X), i.framebufferRenderbuffer(i.FRAMEBUFFER, j, i.RENDERBUFFER, X);
      }
    } else if (e.bindFramebuffer(i.FRAMEBUFFER, v.__webglFramebuffer), v.__webglDepthbuffer === void 0) v.__webglDepthbuffer = i.createRenderbuffer(), rt(v.__webglDepthbuffer, b, false);
    else {
      const q = b.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, j = v.__webglDepthbuffer;
      i.bindRenderbuffer(i.RENDERBUFFER, j), i.framebufferRenderbuffer(i.FRAMEBUFFER, q, i.RENDERBUFFER, j);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Nt(b, v, F) {
    const q = n.get(b);
    v !== void 0 && _t(q.__webglFramebuffer, b, b.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), F !== void 0 && wt(b);
  }
  function ne(b) {
    const v = b.texture, F = n.get(b), q = n.get(v);
    b.addEventListener("dispose", A);
    const j = b.textures, X = b.isWebGLCubeRenderTarget === true, vt = j.length > 1;
    if (vt || (q.__webglTexture === void 0 && (q.__webglTexture = i.createTexture()), q.__version = v.version, a.memory.textures++), X) {
      F.__webglFramebuffer = [];
      for (let at = 0; at < 6; at++) if (v.mipmaps && v.mipmaps.length > 0) {
        F.__webglFramebuffer[at] = [];
        for (let ut = 0; ut < v.mipmaps.length; ut++) F.__webglFramebuffer[at][ut] = i.createFramebuffer();
      } else F.__webglFramebuffer[at] = i.createFramebuffer();
    } else {
      if (v.mipmaps && v.mipmaps.length > 0) {
        F.__webglFramebuffer = [];
        for (let at = 0; at < v.mipmaps.length; at++) F.__webglFramebuffer[at] = i.createFramebuffer();
      } else F.__webglFramebuffer = i.createFramebuffer();
      if (vt) for (let at = 0, ut = j.length; at < ut; at++) {
        const kt = n.get(j[at]);
        kt.__webglTexture === void 0 && (kt.__webglTexture = i.createTexture(), a.memory.textures++);
      }
      if (b.samples > 0 && Ot(b) === false) {
        F.__webglMultisampledFramebuffer = i.createFramebuffer(), F.__webglColorRenderbuffer = [], e.bindFramebuffer(i.FRAMEBUFFER, F.__webglMultisampledFramebuffer);
        for (let at = 0; at < j.length; at++) {
          const ut = j[at];
          F.__webglColorRenderbuffer[at] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, F.__webglColorRenderbuffer[at]);
          const kt = r.convert(ut.format, ut.colorSpace), J = r.convert(ut.type), dt = T(ut.internalFormat, kt, J, ut.colorSpace, b.isXRRenderTarget === true), Et = Ft(b);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, Et, dt, b.width, b.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + at, i.RENDERBUFFER, F.__webglColorRenderbuffer[at]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), b.depthBuffer && (F.__webglDepthRenderbuffer = i.createRenderbuffer(), rt(F.__webglDepthRenderbuffer, b, true)), e.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (X) {
      e.bindTexture(i.TEXTURE_CUBE_MAP, q.__webglTexture), Ut(i.TEXTURE_CUBE_MAP, v);
      for (let at = 0; at < 6; at++) if (v.mipmaps && v.mipmaps.length > 0) for (let ut = 0; ut < v.mipmaps.length; ut++) _t(F.__webglFramebuffer[at][ut], b, v, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + at, ut);
      else _t(F.__webglFramebuffer[at], b, v, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + at, 0);
      m(v) && f(i.TEXTURE_CUBE_MAP), e.unbindTexture();
    } else if (vt) {
      for (let at = 0, ut = j.length; at < ut; at++) {
        const kt = j[at], J = n.get(kt);
        e.bindTexture(i.TEXTURE_2D, J.__webglTexture), Ut(i.TEXTURE_2D, kt), _t(F.__webglFramebuffer, b, kt, i.COLOR_ATTACHMENT0 + at, i.TEXTURE_2D, 0), m(kt) && f(i.TEXTURE_2D);
      }
      e.unbindTexture();
    } else {
      let at = i.TEXTURE_2D;
      if ((b.isWebGL3DRenderTarget || b.isWebGLArrayRenderTarget) && (at = b.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), e.bindTexture(at, q.__webglTexture), Ut(at, v), v.mipmaps && v.mipmaps.length > 0) for (let ut = 0; ut < v.mipmaps.length; ut++) _t(F.__webglFramebuffer[ut], b, v, i.COLOR_ATTACHMENT0, at, ut);
      else _t(F.__webglFramebuffer, b, v, i.COLOR_ATTACHMENT0, at, 0);
      m(v) && f(at), e.unbindTexture();
    }
    b.depthBuffer && wt(b);
  }
  function zt(b) {
    const v = b.textures;
    for (let F = 0, q = v.length; F < q; F++) {
      const j = v[F];
      if (m(j)) {
        const X = E(b), vt = n.get(j).__webglTexture;
        e.bindTexture(X, vt), f(X), e.unbindTexture();
      }
    }
  }
  const se = [], U = [];
  function De(b) {
    if (b.samples > 0) {
      if (Ot(b) === false) {
        const v = b.textures, F = b.width, q = b.height;
        let j = i.COLOR_BUFFER_BIT;
        const X = b.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, vt = n.get(b), at = v.length > 1;
        if (at) for (let ut = 0; ut < v.length; ut++) e.bindFramebuffer(i.FRAMEBUFFER, vt.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ut, i.RENDERBUFFER, null), e.bindFramebuffer(i.FRAMEBUFFER, vt.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ut, i.TEXTURE_2D, null, 0);
        e.bindFramebuffer(i.READ_FRAMEBUFFER, vt.__webglMultisampledFramebuffer), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, vt.__webglFramebuffer);
        for (let ut = 0; ut < v.length; ut++) {
          if (b.resolveDepthBuffer && (b.depthBuffer && (j |= i.DEPTH_BUFFER_BIT), b.stencilBuffer && b.resolveStencilBuffer && (j |= i.STENCIL_BUFFER_BIT)), at) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, vt.__webglColorRenderbuffer[ut]);
            const kt = n.get(v[ut]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, kt, 0);
          }
          i.blitFramebuffer(0, 0, F, q, 0, 0, F, q, j, i.NEAREST), l === true && (se.length = 0, U.length = 0, se.push(i.COLOR_ATTACHMENT0 + ut), b.depthBuffer && b.resolveDepthBuffer === false && (se.push(X), U.push(X), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, U)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, se));
        }
        if (e.bindFramebuffer(i.READ_FRAMEBUFFER, null), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), at) for (let ut = 0; ut < v.length; ut++) {
          e.bindFramebuffer(i.FRAMEBUFFER, vt.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ut, i.RENDERBUFFER, vt.__webglColorRenderbuffer[ut]);
          const kt = n.get(v[ut]).__webglTexture;
          e.bindFramebuffer(i.FRAMEBUFFER, vt.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ut, i.TEXTURE_2D, kt, 0);
        }
        e.bindFramebuffer(i.DRAW_FRAMEBUFFER, vt.__webglMultisampledFramebuffer);
      } else if (b.depthBuffer && b.resolveDepthBuffer === false && l) {
        const v = b.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [v]);
      }
    }
  }
  function Ft(b) {
    return Math.min(s.maxSamples, b.samples);
  }
  function Ot(b) {
    const v = n.get(b);
    return b.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === true && v.__useRenderToTexture !== false;
  }
  function St(b) {
    const v = a.render.frame;
    h.get(b) !== v && (h.set(b, v), b.update());
  }
  function Qt(b, v) {
    const F = b.colorSpace, q = b.format, j = b.type;
    return b.isCompressedTexture === true || b.isVideoTexture === true || F !== yi && F !== Sn && (Ht.getTransfer(F) === qt ? (q !== We || j !== un) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", F)), v;
  }
  function yt(b) {
    return typeof HTMLImageElement < "u" && b instanceof HTMLImageElement ? (c.width = b.naturalWidth || b.width, c.height = b.naturalHeight || b.height) : typeof VideoFrame < "u" && b instanceof VideoFrame ? (c.width = b.displayWidth, c.height = b.displayHeight) : (c.width = b.width, c.height = b.height), c;
  }
  this.allocateTextureUnit = z, this.resetTextureUnits = k, this.setTexture2D = Z, this.setTexture2DArray = V, this.setTexture3D = K, this.setTextureCube = G, this.rebindTextures = Nt, this.setupRenderTarget = ne, this.updateRenderTargetMipmap = zt, this.updateMultisampleRenderTarget = De, this.setupDepthRenderbuffer = wt, this.setupFrameBufferTexture = _t, this.useMultisampledRTT = Ot;
}
function pm(i, t) {
  function e(n, s = Sn) {
    let r;
    const a = Ht.getTransfer(s);
    if (n === un) return i.UNSIGNED_BYTE;
    if (n === Sa) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === Ea) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === bl) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === Sl) return i.BYTE;
    if (n === El) return i.SHORT;
    if (n === Vi) return i.UNSIGNED_SHORT;
    if (n === ya) return i.INT;
    if (n === kn) return i.UNSIGNED_INT;
    if (n === Ze) return i.FLOAT;
    if (n === Xi) return i.HALF_FLOAT;
    if (n === Tl) return i.ALPHA;
    if (n === Al) return i.RGB;
    if (n === We) return i.RGBA;
    if (n === wl) return i.LUMINANCE;
    if (n === Cl) return i.LUMINANCE_ALPHA;
    if (n === di) return i.DEPTH_COMPONENT;
    if (n === xi) return i.DEPTH_STENCIL;
    if (n === ba) return i.RED;
    if (n === Ta) return i.RED_INTEGER;
    if (n === Rl) return i.RG;
    if (n === Aa) return i.RG_INTEGER;
    if (n === wa) return i.RGBA_INTEGER;
    if (n === Cs || n === Rs || n === Ps || n === Ls) if (a === qt) if (r = t.get("WEBGL_compressed_texture_s3tc_srgb"), r !== null) {
      if (n === Cs) return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;
      if (n === Rs) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
      if (n === Ps) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
      if (n === Ls) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
    } else return null;
    else if (r = t.get("WEBGL_compressed_texture_s3tc"), r !== null) {
      if (n === Cs) return r.COMPRESSED_RGB_S3TC_DXT1_EXT;
      if (n === Rs) return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;
      if (n === Ps) return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;
      if (n === Ls) return r.COMPRESSED_RGBA_S3TC_DXT5_EXT;
    } else return null;
    if (n === Wr || n === Xr || n === Yr || n === qr) if (r = t.get("WEBGL_compressed_texture_pvrtc"), r !== null) {
      if (n === Wr) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
      if (n === Xr) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
      if (n === Yr) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
      if (n === qr) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
    } else return null;
    if (n === $r || n === Zr || n === jr) if (r = t.get("WEBGL_compressed_texture_etc"), r !== null) {
      if (n === $r || n === Zr) return a === qt ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2;
      if (n === jr) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : r.COMPRESSED_RGBA8_ETC2_EAC;
    } else return null;
    if (n === Kr || n === Jr || n === Qr || n === ta || n === ea || n === na || n === ia || n === sa || n === ra || n === aa || n === oa || n === la || n === ca || n === ha) if (r = t.get("WEBGL_compressed_texture_astc"), r !== null) {
      if (n === Kr) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : r.COMPRESSED_RGBA_ASTC_4x4_KHR;
      if (n === Jr) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : r.COMPRESSED_RGBA_ASTC_5x4_KHR;
      if (n === Qr) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : r.COMPRESSED_RGBA_ASTC_5x5_KHR;
      if (n === ta) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : r.COMPRESSED_RGBA_ASTC_6x5_KHR;
      if (n === ea) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : r.COMPRESSED_RGBA_ASTC_6x6_KHR;
      if (n === na) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : r.COMPRESSED_RGBA_ASTC_8x5_KHR;
      if (n === ia) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : r.COMPRESSED_RGBA_ASTC_8x6_KHR;
      if (n === sa) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : r.COMPRESSED_RGBA_ASTC_8x8_KHR;
      if (n === ra) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : r.COMPRESSED_RGBA_ASTC_10x5_KHR;
      if (n === aa) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : r.COMPRESSED_RGBA_ASTC_10x6_KHR;
      if (n === oa) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : r.COMPRESSED_RGBA_ASTC_10x8_KHR;
      if (n === la) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : r.COMPRESSED_RGBA_ASTC_10x10_KHR;
      if (n === ca) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : r.COMPRESSED_RGBA_ASTC_12x10_KHR;
      if (n === ha) return a === qt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : r.COMPRESSED_RGBA_ASTC_12x12_KHR;
    } else return null;
    if (n === Ds || n === ua || n === da) if (r = t.get("EXT_texture_compression_bptc"), r !== null) {
      if (n === Ds) return a === qt ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : r.COMPRESSED_RGBA_BPTC_UNORM_EXT;
      if (n === ua) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
      if (n === da) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
    } else return null;
    if (n === Pl || n === fa || n === pa || n === ma) if (r = t.get("EXT_texture_compression_rgtc"), r !== null) {
      if (n === Ds) return r.COMPRESSED_RED_RGTC1_EXT;
      if (n === fa) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;
      if (n === pa) return r.COMPRESSED_RED_GREEN_RGTC2_EXT;
      if (n === ma) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
    } else return null;
    return n === vi ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: e };
}
class mm extends Re {
  constructor(t = []) {
    super(), this.isArrayCamera = true, this.cameras = t;
  }
}
class xs extends fe {
  constructor() {
    super(), this.isGroup = true, this.type = "Group";
  }
}
const gm = { type: "move" };
class yr {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new xs(), this._hand.matrixAutoUpdate = false, this._hand.visible = false, this._hand.joints = {}, this._hand.inputState = { pinching: false }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new xs(), this._targetRay.matrixAutoUpdate = false, this._targetRay.visible = false, this._targetRay.hasLinearVelocity = false, this._targetRay.linearVelocity = new C(), this._targetRay.hasAngularVelocity = false, this._targetRay.angularVelocity = new C()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new xs(), this._grip.matrixAutoUpdate = false, this._grip.visible = false, this._grip.hasLinearVelocity = false, this._grip.linearVelocity = new C(), this._grip.hasAngularVelocity = false, this._grip.angularVelocity = new C()), this._grip;
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
        for (const _ of t.hand.values()) {
          const m = e.getJointPose(_, n), f = this._getHandJoint(c, _);
          m !== null && (f.matrix.fromArray(m.transform.matrix), f.matrix.decompose(f.position, f.rotation, f.scale), f.matrixWorldNeedsUpdate = true, f.jointRadius = m.radius), f.visible = m !== null;
        }
        const h = c.joints["index-finger-tip"], u = c.joints["thumb-tip"], d = h.position.distanceTo(u.position), p = 0.02, g = 5e-3;
        c.inputState.pinching && d > p + g ? (c.inputState.pinching = false, this.dispatchEvent({ type: "pinchend", handedness: t.handedness, target: this })) : !c.inputState.pinching && d <= p - g && (c.inputState.pinching = true, this.dispatchEvent({ type: "pinchstart", handedness: t.handedness, target: this }));
      } else l !== null && t.gripSpace && (r = e.getPose(t.gripSpace, n), r !== null && (l.matrix.fromArray(r.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = true, r.linearVelocity ? (l.hasLinearVelocity = true, l.linearVelocity.copy(r.linearVelocity)) : l.hasLinearVelocity = false, r.angularVelocity ? (l.hasAngularVelocity = true, l.angularVelocity.copy(r.angularVelocity)) : l.hasAngularVelocity = false));
      o !== null && (s = e.getPose(t.targetRaySpace, n), s === null && r !== null && (s = r), s !== null && (o.matrix.fromArray(s.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = true, s.linearVelocity ? (o.hasLinearVelocity = true, o.linearVelocity.copy(s.linearVelocity)) : o.hasLinearVelocity = false, s.angularVelocity ? (o.hasAngularVelocity = true, o.angularVelocity.copy(s.angularVelocity)) : o.hasAngularVelocity = false, this.dispatchEvent(gm)));
    }
    return o !== null && (o.visible = s !== null), l !== null && (l.visible = r !== null), c !== null && (c.visible = a !== null), this;
  }
  _getHandJoint(t, e) {
    if (t.joints[e.jointName] === void 0) {
      const n = new xs();
      n.matrixAutoUpdate = false, n.visible = false, t.joints[e.jointName] = n, t.add(n);
    }
    return t.joints[e.jointName];
  }
}
const _m = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, vm = `
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
class xm {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(t, e, n) {
    if (this.texture === null) {
      const s = new Me(), r = t.properties.get(s);
      r.__webglTexture = e.texture, (e.depthNear != n.depthNear || e.depthFar != n.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = s;
    }
  }
  getMesh(t) {
    if (this.texture !== null && this.mesh === null) {
      const e = t.cameras[0].viewport, n = new dn({ vertexShader: _m, fragmentShader: vm, uniforms: { depthColor: { value: this.texture }, depthWidth: { value: e.z }, depthHeight: { value: e.w } } });
      this.mesh = new ve(new qi(20, 20), n);
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
class Mm extends Vn {
  constructor(t, e) {
    super();
    const n = this;
    let s = null, r = 1, a = null, o = "local-floor", l = 1, c = null, h = null, u = null, d = null, p = null, g = null;
    const _ = new xm(), m = e.getContextAttributes();
    let f = null, E = null;
    const T = [], y = [], N = new it();
    let w = null;
    const A = new Re();
    A.viewport = new Zt();
    const L = new Re();
    L.viewport = new Zt();
    const S = [A, L], M = new mm();
    let R = null, k = null;
    this.cameraAutoUpdate = true, this.enabled = false, this.isPresenting = false, this.getController = function(Y) {
      let tt = T[Y];
      return tt === void 0 && (tt = new yr(), T[Y] = tt), tt.getTargetRaySpace();
    }, this.getControllerGrip = function(Y) {
      let tt = T[Y];
      return tt === void 0 && (tt = new yr(), T[Y] = tt), tt.getGripSpace();
    }, this.getHand = function(Y) {
      let tt = T[Y];
      return tt === void 0 && (tt = new yr(), T[Y] = tt), tt.getHandSpace();
    };
    function z(Y) {
      const tt = y.indexOf(Y.inputSource);
      if (tt === -1) return;
      const _t = T[tt];
      _t !== void 0 && (_t.update(Y.inputSource, Y.frame, c || a), _t.dispatchEvent({ type: Y.type, data: Y.inputSource }));
    }
    function W() {
      s.removeEventListener("select", z), s.removeEventListener("selectstart", z), s.removeEventListener("selectend", z), s.removeEventListener("squeeze", z), s.removeEventListener("squeezestart", z), s.removeEventListener("squeezeend", z), s.removeEventListener("end", W), s.removeEventListener("inputsourceschange", Z);
      for (let Y = 0; Y < T.length; Y++) {
        const tt = y[Y];
        tt !== null && (y[Y] = null, T[Y].disconnect(tt));
      }
      R = null, k = null, _.reset(), t.setRenderTarget(f), p = null, d = null, u = null, s = null, E = null, jt.stop(), n.isPresenting = false, t.setPixelRatio(w), t.setSize(N.width, N.height, false), n.dispatchEvent({ type: "sessionend" });
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
      return d !== null ? d : p;
    }, this.getBinding = function() {
      return u;
    }, this.getFrame = function() {
      return g;
    }, this.getSession = function() {
      return s;
    }, this.setSession = async function(Y) {
      if (s = Y, s !== null) {
        if (f = t.getRenderTarget(), s.addEventListener("select", z), s.addEventListener("selectstart", z), s.addEventListener("selectend", z), s.addEventListener("squeeze", z), s.addEventListener("squeezestart", z), s.addEventListener("squeezeend", z), s.addEventListener("end", W), s.addEventListener("inputsourceschange", Z), m.xrCompatible !== true && await e.makeXRCompatible(), w = t.getPixelRatio(), t.getSize(N), s.renderState.layers === void 0) {
          const tt = { antialias: m.antialias, alpha: true, depth: m.depth, stencil: m.stencil, framebufferScaleFactor: r };
          p = new XRWebGLLayer(s, e, tt), s.updateRenderState({ baseLayer: p }), t.setPixelRatio(1), t.setSize(p.framebufferWidth, p.framebufferHeight, false), E = new Hn(p.framebufferWidth, p.framebufferHeight, { format: We, type: un, colorSpace: t.outputColorSpace, stencilBuffer: m.stencil });
        } else {
          let tt = null, _t = null, rt = null;
          m.depth && (rt = m.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24, tt = m.stencil ? xi : di, _t = m.stencil ? vi : kn);
          const bt = { colorFormat: e.RGBA8, depthFormat: rt, scaleFactor: r };
          u = new XRWebGLBinding(s, e), d = u.createProjectionLayer(bt), s.updateRenderState({ layers: [d] }), t.setPixelRatio(1), t.setSize(d.textureWidth, d.textureHeight, false), E = new Hn(d.textureWidth, d.textureHeight, { format: We, type: un, depthTexture: new Yl(d.textureWidth, d.textureHeight, _t, void 0, void 0, void 0, void 0, void 0, void 0, tt), stencilBuffer: m.stencil, colorSpace: t.outputColorSpace, samples: m.antialias ? 4 : 0, resolveDepthBuffer: d.ignoreDepthValues === false });
        }
        E.isXRRenderTarget = true, this.setFoveation(l), c = null, a = await s.requestReferenceSpace(o), jt.setContext(s), jt.start(), n.isPresenting = true, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (s !== null) return s.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return _.getDepthTexture();
    };
    function Z(Y) {
      for (let tt = 0; tt < Y.removed.length; tt++) {
        const _t = Y.removed[tt], rt = y.indexOf(_t);
        rt >= 0 && (y[rt] = null, T[rt].disconnect(_t));
      }
      for (let tt = 0; tt < Y.added.length; tt++) {
        const _t = Y.added[tt];
        let rt = y.indexOf(_t);
        if (rt === -1) {
          for (let wt = 0; wt < T.length; wt++) if (wt >= y.length) {
            y.push(_t), rt = wt;
            break;
          } else if (y[wt] === null) {
            y[wt] = _t, rt = wt;
            break;
          }
          if (rt === -1) break;
        }
        const bt = T[rt];
        bt && bt.connect(_t);
      }
    }
    const V = new C(), K = new C();
    function G(Y, tt, _t) {
      V.setFromMatrixPosition(tt.matrixWorld), K.setFromMatrixPosition(_t.matrixWorld);
      const rt = V.distanceTo(K), bt = tt.projectionMatrix.elements, wt = _t.projectionMatrix.elements, Nt = bt[14] / (bt[10] - 1), ne = bt[14] / (bt[10] + 1), zt = (bt[9] + 1) / bt[5], se = (bt[9] - 1) / bt[5], U = (bt[8] - 1) / bt[0], De = (wt[8] + 1) / wt[0], Ft = Nt * U, Ot = Nt * De, St = rt / (-U + De), Qt = St * -U;
      if (tt.matrixWorld.decompose(Y.position, Y.quaternion, Y.scale), Y.translateX(Qt), Y.translateZ(St), Y.matrixWorld.compose(Y.position, Y.quaternion, Y.scale), Y.matrixWorldInverse.copy(Y.matrixWorld).invert(), bt[10] === -1) Y.projectionMatrix.copy(tt.projectionMatrix), Y.projectionMatrixInverse.copy(tt.projectionMatrixInverse);
      else {
        const yt = Nt + St, b = ne + St, v = Ft - Qt, F = Ot + (rt - Qt), q = zt * ne / b * yt, j = se * ne / b * yt;
        Y.projectionMatrix.makePerspective(v, F, q, j, yt, b), Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert();
      }
    }
    function st(Y, tt) {
      tt === null ? Y.matrixWorld.copy(Y.matrix) : Y.matrixWorld.multiplyMatrices(tt.matrixWorld, Y.matrix), Y.matrixWorldInverse.copy(Y.matrixWorld).invert();
    }
    this.updateCamera = function(Y) {
      if (s === null) return;
      let tt = Y.near, _t = Y.far;
      _.texture !== null && (_.depthNear > 0 && (tt = _.depthNear), _.depthFar > 0 && (_t = _.depthFar)), M.near = L.near = A.near = tt, M.far = L.far = A.far = _t, (R !== M.near || k !== M.far) && (s.updateRenderState({ depthNear: M.near, depthFar: M.far }), R = M.near, k = M.far), A.layers.mask = Y.layers.mask | 2, L.layers.mask = Y.layers.mask | 4, M.layers.mask = A.layers.mask | L.layers.mask;
      const rt = Y.parent, bt = M.cameras;
      st(M, rt);
      for (let wt = 0; wt < bt.length; wt++) st(bt[wt], rt);
      bt.length === 2 ? G(M, A, L) : M.projectionMatrix.copy(A.projectionMatrix), ht(Y, M, rt);
    };
    function ht(Y, tt, _t) {
      _t === null ? Y.matrix.copy(tt.matrixWorld) : (Y.matrix.copy(_t.matrixWorld), Y.matrix.invert(), Y.matrix.multiply(tt.matrixWorld)), Y.matrix.decompose(Y.position, Y.quaternion, Y.scale), Y.updateMatrixWorld(true), Y.projectionMatrix.copy(tt.projectionMatrix), Y.projectionMatrixInverse.copy(tt.projectionMatrixInverse), Y.isPerspectiveCamera && (Y.fov = ga * 2 * Math.atan(1 / Y.projectionMatrix.elements[5]), Y.zoom = 1);
    }
    this.getCamera = function() {
      return M;
    }, this.getFoveation = function() {
      if (!(d === null && p === null)) return l;
    }, this.setFoveation = function(Y) {
      l = Y, d !== null && (d.fixedFoveation = Y), p !== null && p.fixedFoveation !== void 0 && (p.fixedFoveation = Y);
    }, this.hasDepthSensing = function() {
      return _.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return _.getMesh(M);
    };
    let Mt = null;
    function Ut(Y, tt) {
      if (h = tt.getViewerPose(c || a), g = tt, h !== null) {
        const _t = h.views;
        p !== null && (t.setRenderTargetFramebuffer(E, p.framebuffer), t.setRenderTarget(E));
        let rt = false;
        _t.length !== M.cameras.length && (M.cameras.length = 0, rt = true);
        for (let wt = 0; wt < _t.length; wt++) {
          const Nt = _t[wt];
          let ne = null;
          if (p !== null) ne = p.getViewport(Nt);
          else {
            const se = u.getViewSubImage(d, Nt);
            ne = se.viewport, wt === 0 && (t.setRenderTargetTextures(E, se.colorTexture, d.ignoreDepthValues ? void 0 : se.depthStencilTexture), t.setRenderTarget(E));
          }
          let zt = S[wt];
          zt === void 0 && (zt = new Re(), zt.layers.enable(wt), zt.viewport = new Zt(), S[wt] = zt), zt.matrix.fromArray(Nt.transform.matrix), zt.matrix.decompose(zt.position, zt.quaternion, zt.scale), zt.projectionMatrix.fromArray(Nt.projectionMatrix), zt.projectionMatrixInverse.copy(zt.projectionMatrix).invert(), zt.viewport.set(ne.x, ne.y, ne.width, ne.height), wt === 0 && (M.matrix.copy(zt.matrix), M.matrix.decompose(M.position, M.quaternion, M.scale)), rt === true && M.cameras.push(zt);
        }
        const bt = s.enabledFeatures;
        if (bt && bt.includes("depth-sensing")) {
          const wt = u.getDepthInformation(_t[0]);
          wt && wt.isValid && wt.texture && _.init(t, wt, s.renderState);
        }
      }
      for (let _t = 0; _t < T.length; _t++) {
        const rt = y[_t], bt = T[_t];
        rt !== null && bt !== void 0 && bt.update(rt, tt, c || a);
      }
      Mt && Mt(Y, tt), tt.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: tt }), g = null;
    }
    const jt = new Wl();
    jt.setAnimationLoop(Ut), this.setAnimationLoop = function(Y) {
      Mt = Y;
    }, this.dispose = function() {
    };
  }
}
const Dn = new Ke(), ym = new Xt();
function Sm(i, t) {
  function e(m, f) {
    m.matrixAutoUpdate === true && m.updateMatrix(), f.value.copy(m.matrix);
  }
  function n(m, f) {
    f.color.getRGB(m.fogColor.value, Hl(i)), f.isFog ? (m.fogNear.value = f.near, m.fogFar.value = f.far) : f.isFogExp2 && (m.fogDensity.value = f.density);
  }
  function s(m, f, E, T, y) {
    f.isMeshBasicMaterial || f.isMeshLambertMaterial ? r(m, f) : f.isMeshToonMaterial ? (r(m, f), u(m, f)) : f.isMeshPhongMaterial ? (r(m, f), h(m, f)) : f.isMeshStandardMaterial ? (r(m, f), d(m, f), f.isMeshPhysicalMaterial && p(m, f, y)) : f.isMeshMatcapMaterial ? (r(m, f), g(m, f)) : f.isMeshDepthMaterial ? r(m, f) : f.isMeshDistanceMaterial ? (r(m, f), _(m, f)) : f.isMeshNormalMaterial ? r(m, f) : f.isLineBasicMaterial ? (a(m, f), f.isLineDashedMaterial && o(m, f)) : f.isPointsMaterial ? l(m, f, E, T) : f.isSpriteMaterial ? c(m, f) : f.isShadowMaterial ? (m.color.value.copy(f.color), m.opacity.value = f.opacity) : f.isShaderMaterial && (f.uniformsNeedUpdate = false);
  }
  function r(m, f) {
    m.opacity.value = f.opacity, f.color && m.diffuse.value.copy(f.color), f.emissive && m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity), f.map && (m.map.value = f.map, e(f.map, m.mapTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, e(f.alphaMap, m.alphaMapTransform)), f.bumpMap && (m.bumpMap.value = f.bumpMap, e(f.bumpMap, m.bumpMapTransform), m.bumpScale.value = f.bumpScale, f.side === xe && (m.bumpScale.value *= -1)), f.normalMap && (m.normalMap.value = f.normalMap, e(f.normalMap, m.normalMapTransform), m.normalScale.value.copy(f.normalScale), f.side === xe && m.normalScale.value.negate()), f.displacementMap && (m.displacementMap.value = f.displacementMap, e(f.displacementMap, m.displacementMapTransform), m.displacementScale.value = f.displacementScale, m.displacementBias.value = f.displacementBias), f.emissiveMap && (m.emissiveMap.value = f.emissiveMap, e(f.emissiveMap, m.emissiveMapTransform)), f.specularMap && (m.specularMap.value = f.specularMap, e(f.specularMap, m.specularMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
    const E = t.get(f), T = E.envMap, y = E.envMapRotation;
    T && (m.envMap.value = T, Dn.copy(y), Dn.x *= -1, Dn.y *= -1, Dn.z *= -1, T.isCubeTexture && T.isRenderTargetTexture === false && (Dn.y *= -1, Dn.z *= -1), m.envMapRotation.value.setFromMatrix4(ym.makeRotationFromEuler(Dn)), m.flipEnvMap.value = T.isCubeTexture && T.isRenderTargetTexture === false ? -1 : 1, m.reflectivity.value = f.reflectivity, m.ior.value = f.ior, m.refractionRatio.value = f.refractionRatio), f.lightMap && (m.lightMap.value = f.lightMap, m.lightMapIntensity.value = f.lightMapIntensity, e(f.lightMap, m.lightMapTransform)), f.aoMap && (m.aoMap.value = f.aoMap, m.aoMapIntensity.value = f.aoMapIntensity, e(f.aoMap, m.aoMapTransform));
  }
  function a(m, f) {
    m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, f.map && (m.map.value = f.map, e(f.map, m.mapTransform));
  }
  function o(m, f) {
    m.dashSize.value = f.dashSize, m.totalSize.value = f.dashSize + f.gapSize, m.scale.value = f.scale;
  }
  function l(m, f, E, T) {
    m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, m.size.value = f.size * E, m.scale.value = T * 0.5, f.map && (m.map.value = f.map, e(f.map, m.uvTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, e(f.alphaMap, m.alphaMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
  }
  function c(m, f) {
    m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, m.rotation.value = f.rotation, f.map && (m.map.value = f.map, e(f.map, m.mapTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, e(f.alphaMap, m.alphaMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
  }
  function h(m, f) {
    m.specular.value.copy(f.specular), m.shininess.value = Math.max(f.shininess, 1e-4);
  }
  function u(m, f) {
    f.gradientMap && (m.gradientMap.value = f.gradientMap);
  }
  function d(m, f) {
    m.metalness.value = f.metalness, f.metalnessMap && (m.metalnessMap.value = f.metalnessMap, e(f.metalnessMap, m.metalnessMapTransform)), m.roughness.value = f.roughness, f.roughnessMap && (m.roughnessMap.value = f.roughnessMap, e(f.roughnessMap, m.roughnessMapTransform)), f.envMap && (m.envMapIntensity.value = f.envMapIntensity);
  }
  function p(m, f, E) {
    m.ior.value = f.ior, f.sheen > 0 && (m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen), m.sheenRoughness.value = f.sheenRoughness, f.sheenColorMap && (m.sheenColorMap.value = f.sheenColorMap, e(f.sheenColorMap, m.sheenColorMapTransform)), f.sheenRoughnessMap && (m.sheenRoughnessMap.value = f.sheenRoughnessMap, e(f.sheenRoughnessMap, m.sheenRoughnessMapTransform))), f.clearcoat > 0 && (m.clearcoat.value = f.clearcoat, m.clearcoatRoughness.value = f.clearcoatRoughness, f.clearcoatMap && (m.clearcoatMap.value = f.clearcoatMap, e(f.clearcoatMap, m.clearcoatMapTransform)), f.clearcoatRoughnessMap && (m.clearcoatRoughnessMap.value = f.clearcoatRoughnessMap, e(f.clearcoatRoughnessMap, m.clearcoatRoughnessMapTransform)), f.clearcoatNormalMap && (m.clearcoatNormalMap.value = f.clearcoatNormalMap, e(f.clearcoatNormalMap, m.clearcoatNormalMapTransform), m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale), f.side === xe && m.clearcoatNormalScale.value.negate())), f.dispersion > 0 && (m.dispersion.value = f.dispersion), f.iridescence > 0 && (m.iridescence.value = f.iridescence, m.iridescenceIOR.value = f.iridescenceIOR, m.iridescenceThicknessMinimum.value = f.iridescenceThicknessRange[0], m.iridescenceThicknessMaximum.value = f.iridescenceThicknessRange[1], f.iridescenceMap && (m.iridescenceMap.value = f.iridescenceMap, e(f.iridescenceMap, m.iridescenceMapTransform)), f.iridescenceThicknessMap && (m.iridescenceThicknessMap.value = f.iridescenceThicknessMap, e(f.iridescenceThicknessMap, m.iridescenceThicknessMapTransform))), f.transmission > 0 && (m.transmission.value = f.transmission, m.transmissionSamplerMap.value = E.texture, m.transmissionSamplerSize.value.set(E.width, E.height), f.transmissionMap && (m.transmissionMap.value = f.transmissionMap, e(f.transmissionMap, m.transmissionMapTransform)), m.thickness.value = f.thickness, f.thicknessMap && (m.thicknessMap.value = f.thicknessMap, e(f.thicknessMap, m.thicknessMapTransform)), m.attenuationDistance.value = f.attenuationDistance, m.attenuationColor.value.copy(f.attenuationColor)), f.anisotropy > 0 && (m.anisotropyVector.value.set(f.anisotropy * Math.cos(f.anisotropyRotation), f.anisotropy * Math.sin(f.anisotropyRotation)), f.anisotropyMap && (m.anisotropyMap.value = f.anisotropyMap, e(f.anisotropyMap, m.anisotropyMapTransform))), m.specularIntensity.value = f.specularIntensity, m.specularColor.value.copy(f.specularColor), f.specularColorMap && (m.specularColorMap.value = f.specularColorMap, e(f.specularColorMap, m.specularColorMapTransform)), f.specularIntensityMap && (m.specularIntensityMap.value = f.specularIntensityMap, e(f.specularIntensityMap, m.specularIntensityMapTransform));
  }
  function g(m, f) {
    f.matcap && (m.matcap.value = f.matcap);
  }
  function _(m, f) {
    const E = t.get(f).light;
    m.referencePosition.value.setFromMatrixPosition(E.matrixWorld), m.nearDistance.value = E.shadow.camera.near, m.farDistance.value = E.shadow.camera.far;
  }
  return { refreshFogUniforms: n, refreshMaterialUniforms: s };
}
function Em(i, t, e, n) {
  let s = {}, r = {}, a = [];
  const o = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(E, T) {
    const y = T.program;
    n.uniformBlockBinding(E, y);
  }
  function c(E, T) {
    let y = s[E.id];
    y === void 0 && (g(E), y = h(E), s[E.id] = y, E.addEventListener("dispose", m));
    const N = T.program;
    n.updateUBOMapping(E, N);
    const w = t.render.frame;
    r[E.id] !== w && (d(E), r[E.id] = w);
  }
  function h(E) {
    const T = u();
    E.__bindingPointIndex = T;
    const y = i.createBuffer(), N = E.__size, w = E.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, y), i.bufferData(i.UNIFORM_BUFFER, N, w), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, T, y), y;
  }
  function u() {
    for (let E = 0; E < o; E++) if (a.indexOf(E) === -1) return a.push(E), E;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function d(E) {
    const T = s[E.id], y = E.uniforms, N = E.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, T);
    for (let w = 0, A = y.length; w < A; w++) {
      const L = Array.isArray(y[w]) ? y[w] : [y[w]];
      for (let S = 0, M = L.length; S < M; S++) {
        const R = L[S];
        if (p(R, w, S, N) === true) {
          const k = R.__offset, z = Array.isArray(R.value) ? R.value : [R.value];
          let W = 0;
          for (let Z = 0; Z < z.length; Z++) {
            const V = z[Z], K = _(V);
            typeof V == "number" || typeof V == "boolean" ? (R.__data[0] = V, i.bufferSubData(i.UNIFORM_BUFFER, k + W, R.__data)) : V.isMatrix3 ? (R.__data[0] = V.elements[0], R.__data[1] = V.elements[1], R.__data[2] = V.elements[2], R.__data[3] = 0, R.__data[4] = V.elements[3], R.__data[5] = V.elements[4], R.__data[6] = V.elements[5], R.__data[7] = 0, R.__data[8] = V.elements[6], R.__data[9] = V.elements[7], R.__data[10] = V.elements[8], R.__data[11] = 0) : (V.toArray(R.__data, W), W += K.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, k, R.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function p(E, T, y, N) {
    const w = E.value, A = T + "_" + y;
    if (N[A] === void 0) return typeof w == "number" || typeof w == "boolean" ? N[A] = w : N[A] = w.clone(), true;
    {
      const L = N[A];
      if (typeof w == "number" || typeof w == "boolean") {
        if (L !== w) return N[A] = w, true;
      } else if (L.equals(w) === false) return L.copy(w), true;
    }
    return false;
  }
  function g(E) {
    const T = E.uniforms;
    let y = 0;
    const N = 16;
    for (let A = 0, L = T.length; A < L; A++) {
      const S = Array.isArray(T[A]) ? T[A] : [T[A]];
      for (let M = 0, R = S.length; M < R; M++) {
        const k = S[M], z = Array.isArray(k.value) ? k.value : [k.value];
        for (let W = 0, Z = z.length; W < Z; W++) {
          const V = z[W], K = _(V), G = y % N, st = G % K.boundary, ht = G + st;
          y += st, ht !== 0 && N - ht < K.storage && (y += N - ht), k.__data = new Float32Array(K.storage / Float32Array.BYTES_PER_ELEMENT), k.__offset = y, y += K.storage;
        }
      }
    }
    const w = y % N;
    return w > 0 && (y += N - w), E.__size = y, E.__cache = {}, this;
  }
  function _(E) {
    const T = { boundary: 0, storage: 0 };
    return typeof E == "number" || typeof E == "boolean" ? (T.boundary = 4, T.storage = 4) : E.isVector2 ? (T.boundary = 8, T.storage = 8) : E.isVector3 || E.isColor ? (T.boundary = 16, T.storage = 12) : E.isVector4 ? (T.boundary = 16, T.storage = 16) : E.isMatrix3 ? (T.boundary = 48, T.storage = 48) : E.isMatrix4 ? (T.boundary = 64, T.storage = 64) : E.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", E), T;
  }
  function m(E) {
    const T = E.target;
    T.removeEventListener("dispose", m);
    const y = a.indexOf(T.__bindingPointIndex);
    a.splice(y, 1), i.deleteBuffer(s[T.id]), delete s[T.id], delete r[T.id];
  }
  function f() {
    for (const E in s) i.deleteBuffer(s[E]);
    a = [], s = {}, r = {};
  }
  return { bind: l, update: c, dispose: f };
}
class bm {
  constructor(t = {}) {
    const { canvas: e = uh(), context: n = null, depth: s = true, stencil: r = false, alpha: a = false, antialias: o = false, premultipliedAlpha: l = true, preserveDrawingBuffer: c = false, powerPreference: h = "default", failIfMajorPerformanceCaveat: u = false, reverseDepthBuffer: d = false } = t;
    this.isWebGLRenderer = true;
    let p;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext) throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      p = n.getContextAttributes().alpha;
    } else p = a;
    const g = new Uint32Array(4), _ = new Int32Array(4);
    let m = null, f = null;
    const E = [], T = [];
    this.domElement = e, this.debug = { checkShaderErrors: true, onShaderError: null }, this.autoClear = true, this.autoClearColor = true, this.autoClearDepth = true, this.autoClearStencil = true, this.sortObjects = true, this.clippingPlanes = [], this.localClippingEnabled = false, this._outputColorSpace = Fe, this.toneMapping = bn, this.toneMappingExposure = 1;
    const y = this;
    let N = false, w = 0, A = 0, L = null, S = -1, M = null;
    const R = new Zt(), k = new Zt();
    let z = null;
    const W = new It(0);
    let Z = 0, V = e.width, K = e.height, G = 1, st = null, ht = null;
    const Mt = new Zt(0, 0, V, K), Ut = new Zt(0, 0, V, K);
    let jt = false;
    const Y = new Ra();
    let tt = false, _t = false;
    const rt = new Xt(), bt = new Xt(), wt = new C(), Nt = new Zt(), ne = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: true };
    let zt = false;
    function se() {
      return L === null ? G : 1;
    }
    let U = n;
    function De(x, D) {
      return e.getContext(x, D);
    }
    try {
      const x = { alpha: true, depth: s, stencil: r, antialias: o, premultipliedAlpha: l, preserveDrawingBuffer: c, powerPreference: h, failIfMajorPerformanceCaveat: u };
      if ("setAttribute" in e && e.setAttribute("data-engine", `three.js r${Ma}`), e.addEventListener("webglcontextlost", $, false), e.addEventListener("webglcontextrestored", ct, false), e.addEventListener("webglcontextcreationerror", ot, false), U === null) {
        const D = "webgl2";
        if (U = De(D, x), U === null) throw De(D) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (x) {
      throw console.error("THREE.WebGLRenderer: " + x.message), x;
    }
    let Ft, Ot, St, Qt, yt, b, v, F, q, j, X, vt, at, ut, kt, J, dt, Et, Tt, ft, Bt, Lt, Kt, P;
    function nt() {
      Ft = new Rf(U), Ft.init(), Lt = new pm(U, Ft), Ot = new Ef(U, Ft, t, Lt), St = new um(U, Ft), Ot.reverseDepthBuffer && d && St.buffers.depth.setReversed(true), Qt = new Df(U), yt = new jp(), b = new fm(U, Ft, St, yt, Ot, Lt, Qt), v = new Tf(y), F = new Cf(y), q = new Bh(U), Kt = new yf(U, q), j = new Pf(U, q, Qt, Kt), X = new Uf(U, j, q, Qt), Tt = new If(U, Ot, b), J = new bf(yt), vt = new Zp(y, v, F, Ft, Ot, Kt, J), at = new Sm(y, yt), ut = new Jp(), kt = new sm(Ft), Et = new Mf(y, v, F, St, X, p, l), dt = new cm(y, X, Ot), P = new Em(U, Qt, Ot, St), ft = new Sf(U, Ft, Qt), Bt = new Lf(U, Ft, Qt), Qt.programs = vt.programs, y.capabilities = Ot, y.extensions = Ft, y.properties = yt, y.renderLists = ut, y.shadowMap = dt, y.state = St, y.info = Qt;
    }
    nt();
    const H = new Mm(y, U);
    this.xr = H, this.getContext = function() {
      return U;
    }, this.getContextAttributes = function() {
      return U.getContextAttributes();
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
      return x.copy(R);
    }, this.getViewport = function(x) {
      return x.copy(Mt);
    }, this.setViewport = function(x, D, O, B) {
      x.isVector4 ? Mt.set(x.x, x.y, x.z, x.w) : Mt.set(x, D, O, B), St.viewport(R.copy(Mt).multiplyScalar(G).round());
    }, this.getScissor = function(x) {
      return x.copy(Ut);
    }, this.setScissor = function(x, D, O, B) {
      x.isVector4 ? Ut.set(x.x, x.y, x.z, x.w) : Ut.set(x, D, O, B), St.scissor(k.copy(Ut).multiplyScalar(G).round());
    }, this.getScissorTest = function() {
      return jt;
    }, this.setScissorTest = function(x) {
      St.setScissorTest(jt = x);
    }, this.setOpaqueSort = function(x) {
      st = x;
    }, this.setTransparentSort = function(x) {
      ht = x;
    }, this.getClearColor = function(x) {
      return x.copy(Et.getClearColor());
    }, this.setClearColor = function() {
      Et.setClearColor.apply(Et, arguments);
    }, this.getClearAlpha = function() {
      return Et.getClearAlpha();
    }, this.setClearAlpha = function() {
      Et.setClearAlpha.apply(Et, arguments);
    }, this.clear = function(x = true, D = true, O = true) {
      let B = 0;
      if (x) {
        let I = false;
        if (L !== null) {
          const Q = L.texture.format;
          I = Q === wa || Q === Aa || Q === Ta;
        }
        if (I) {
          const Q = L.texture.type, lt = Q === un || Q === kn || Q === Vi || Q === vi || Q === Sa || Q === Ea, pt = Et.getClearColor(), mt = Et.getClearAlpha(), At = pt.r, Rt = pt.g, gt = pt.b;
          lt ? (g[0] = At, g[1] = Rt, g[2] = gt, g[3] = mt, U.clearBufferuiv(U.COLOR, 0, g)) : (_[0] = At, _[1] = Rt, _[2] = gt, _[3] = mt, U.clearBufferiv(U.COLOR, 0, _));
        } else B |= U.COLOR_BUFFER_BIT;
      }
      D && (B |= U.DEPTH_BUFFER_BIT), O && (B |= U.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), U.clear(B);
    }, this.clearColor = function() {
      this.clear(true, false, false);
    }, this.clearDepth = function() {
      this.clear(false, true, false);
    }, this.clearStencil = function() {
      this.clear(false, false, true);
    }, this.dispose = function() {
      e.removeEventListener("webglcontextlost", $, false), e.removeEventListener("webglcontextrestored", ct, false), e.removeEventListener("webglcontextcreationerror", ot, false), ut.dispose(), kt.dispose(), yt.dispose(), v.dispose(), F.dispose(), X.dispose(), Kt.dispose(), P.dispose(), vt.dispose(), H.dispose(), H.removeEventListener("sessionstart", za), H.removeEventListener("sessionend", ka), An.stop();
    };
    function $(x) {
      x.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), N = true;
    }
    function ct() {
      console.log("THREE.WebGLRenderer: Context Restored."), N = false;
      const x = Qt.autoReset, D = dt.enabled, O = dt.autoUpdate, B = dt.needsUpdate, I = dt.type;
      nt(), Qt.autoReset = x, dt.enabled = D, dt.autoUpdate = O, dt.needsUpdate = B, dt.type = I;
    }
    function ot(x) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", x.statusMessage);
    }
    function Ct(x) {
      const D = x.target;
      D.removeEventListener("dispose", Ct), ie(D);
    }
    function ie(x) {
      pe(x), yt.remove(x);
    }
    function pe(x) {
      const D = yt.get(x).programs;
      D !== void 0 && (D.forEach(function(O) {
        vt.releaseProgram(O);
      }), x.isShaderMaterial && vt.releaseShaderCache(x));
    }
    this.renderBufferDirect = function(x, D, O, B, I, Q) {
      D === null && (D = ne);
      const lt = I.isMesh && I.matrixWorld.determinant() < 0, pt = cc(x, D, O, B, I);
      St.setMaterial(B, lt);
      let mt = O.index, At = 1;
      if (B.wireframe === true) {
        if (mt = j.getWireframeAttribute(O), mt === void 0) return;
        At = 2;
      }
      const Rt = O.drawRange, gt = O.attributes.position;
      let Gt = Rt.start * At, Jt = (Rt.start + Rt.count) * At;
      Q !== null && (Gt = Math.max(Gt, Q.start * At), Jt = Math.min(Jt, (Q.start + Q.count) * At)), mt !== null ? (Gt = Math.max(Gt, 0), Jt = Math.min(Jt, mt.count)) : gt != null && (Gt = Math.max(Gt, 0), Jt = Math.min(Jt, gt.count));
      const te = Jt - Gt;
      if (te < 0 || te === 1 / 0) return;
      Kt.setup(I, B, pt, O, mt);
      let ye, Vt = ft;
      if (mt !== null && (ye = q.get(mt), Vt = Bt, Vt.setIndex(ye)), I.isMesh) B.wireframe === true ? (St.setLineWidth(B.wireframeLinewidth * se()), Vt.setMode(U.LINES)) : Vt.setMode(U.TRIANGLES);
      else if (I.isLine) {
        let xt = B.linewidth;
        xt === void 0 && (xt = 1), St.setLineWidth(xt * se()), I.isLineSegments ? Vt.setMode(U.LINES) : I.isLineLoop ? Vt.setMode(U.LINE_LOOP) : Vt.setMode(U.LINE_STRIP);
      } else I.isPoints ? Vt.setMode(U.POINTS) : I.isSprite && Vt.setMode(U.TRIANGLES);
      if (I.isBatchedMesh) if (I._multiDrawInstances !== null) Vt.renderMultiDrawInstances(I._multiDrawStarts, I._multiDrawCounts, I._multiDrawCount, I._multiDrawInstances);
      else if (Ft.get("WEBGL_multi_draw")) Vt.renderMultiDraw(I._multiDrawStarts, I._multiDrawCounts, I._multiDrawCount);
      else {
        const xt = I._multiDrawStarts, en = I._multiDrawCounts, Wt = I._multiDrawCount, ke = mt ? q.get(mt).bytesPerElement : 1, Xn = yt.get(B).currentProgram.getUniforms();
        for (let Te = 0; Te < Wt; Te++) Xn.setValue(U, "_gl_DrawID", Te), Vt.render(xt[Te] / ke, en[Te]);
      }
      else if (I.isInstancedMesh) Vt.renderInstances(Gt, te, I.count);
      else if (O.isInstancedBufferGeometry) {
        const xt = O._maxInstanceCount !== void 0 ? O._maxInstanceCount : 1 / 0, en = Math.min(O.instanceCount, xt);
        Vt.renderInstances(Gt, te, en);
      } else Vt.render(Gt, te);
    };
    function Yt(x, D, O) {
      x.transparent === true && x.side === qe && x.forceSinglePass === false ? (x.side = xe, x.needsUpdate = true, ji(x, D, O), x.side = Tn, x.needsUpdate = true, ji(x, D, O), x.side = qe) : ji(x, D, O);
    }
    this.compile = function(x, D, O = null) {
      O === null && (O = x), f = kt.get(O), f.init(D), T.push(f), O.traverseVisible(function(I) {
        I.isLight && I.layers.test(D.layers) && (f.pushLight(I), I.castShadow && f.pushShadow(I));
      }), x !== O && x.traverseVisible(function(I) {
        I.isLight && I.layers.test(D.layers) && (f.pushLight(I), I.castShadow && f.pushShadow(I));
      }), f.setupLights();
      const B = /* @__PURE__ */ new Set();
      return x.traverse(function(I) {
        if (!(I.isMesh || I.isPoints || I.isLine || I.isSprite)) return;
        const Q = I.material;
        if (Q) if (Array.isArray(Q)) for (let lt = 0; lt < Q.length; lt++) {
          const pt = Q[lt];
          Yt(pt, O, I), B.add(pt);
        }
        else Yt(Q, O, I), B.add(Q);
      }), T.pop(), f = null, B;
    }, this.compileAsync = function(x, D, O = null) {
      const B = this.compile(x, D, O);
      return new Promise((I) => {
        function Q() {
          if (B.forEach(function(lt) {
            yt.get(lt).currentProgram.isReady() && B.delete(lt);
          }), B.size === 0) {
            I(x);
            return;
          }
          setTimeout(Q, 10);
        }
        Ft.get("KHR_parallel_shader_compile") !== null ? Q() : setTimeout(Q, 10);
      });
    };
    let ze = null;
    function tn(x) {
      ze && ze(x);
    }
    function za() {
      An.stop();
    }
    function ka() {
      An.start();
    }
    const An = new Wl();
    An.setAnimationLoop(tn), typeof self < "u" && An.setContext(self), this.setAnimationLoop = function(x) {
      ze = x, H.setAnimationLoop(x), x === null ? An.stop() : An.start();
    }, H.addEventListener("sessionstart", za), H.addEventListener("sessionend", ka), this.render = function(x, D) {
      if (D !== void 0 && D.isCamera !== true) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (N === true) return;
      if (x.matrixWorldAutoUpdate === true && x.updateMatrixWorld(), D.parent === null && D.matrixWorldAutoUpdate === true && D.updateMatrixWorld(), H.enabled === true && H.isPresenting === true && (H.cameraAutoUpdate === true && H.updateCamera(D), D = H.getCamera()), x.isScene === true && x.onBeforeRender(y, x, D, L), f = kt.get(x, T.length), f.init(D), T.push(f), bt.multiplyMatrices(D.projectionMatrix, D.matrixWorldInverse), Y.setFromProjectionMatrix(bt), _t = this.localClippingEnabled, tt = J.init(this.clippingPlanes, _t), m = ut.get(x, E.length), m.init(), E.push(m), H.enabled === true && H.isPresenting === true) {
        const Q = y.xr.getDepthSensingMesh();
        Q !== null && Ys(Q, D, -1 / 0, y.sortObjects);
      }
      Ys(x, D, 0, y.sortObjects), m.finish(), y.sortObjects === true && m.sort(st, ht), zt = H.enabled === false || H.isPresenting === false || H.hasDepthSensing() === false, zt && Et.addToRenderList(m, x), this.info.render.frame++, tt === true && J.beginShadows();
      const O = f.state.shadowsArray;
      dt.render(O, x, D), tt === true && J.endShadows(), this.info.autoReset === true && this.info.reset();
      const B = m.opaque, I = m.transmissive;
      if (f.setupLights(), D.isArrayCamera) {
        const Q = D.cameras;
        if (I.length > 0) for (let lt = 0, pt = Q.length; lt < pt; lt++) {
          const mt = Q[lt];
          Ga(B, I, x, mt);
        }
        zt && Et.render(x);
        for (let lt = 0, pt = Q.length; lt < pt; lt++) {
          const mt = Q[lt];
          Ha(m, x, mt, mt.viewport);
        }
      } else I.length > 0 && Ga(B, I, x, D), zt && Et.render(x), Ha(m, x, D);
      L !== null && (b.updateMultisampleRenderTarget(L), b.updateRenderTargetMipmap(L)), x.isScene === true && x.onAfterRender(y, x, D), Kt.resetDefaultState(), S = -1, M = null, T.pop(), T.length > 0 ? (f = T[T.length - 1], tt === true && J.setGlobalState(y.clippingPlanes, f.state.camera)) : f = null, E.pop(), E.length > 0 ? m = E[E.length - 1] : m = null;
    };
    function Ys(x, D, O, B) {
      if (x.visible === false) return;
      if (x.layers.test(D.layers)) {
        if (x.isGroup) O = x.renderOrder;
        else if (x.isLOD) x.autoUpdate === true && x.update(D);
        else if (x.isLight) f.pushLight(x), x.castShadow && f.pushShadow(x);
        else if (x.isSprite) {
          if (!x.frustumCulled || Y.intersectsSprite(x)) {
            B && Nt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(bt);
            const lt = X.update(x), pt = x.material;
            pt.visible && m.push(x, lt, pt, O, Nt.z, null);
          }
        } else if ((x.isMesh || x.isLine || x.isPoints) && (!x.frustumCulled || Y.intersectsObject(x))) {
          const lt = X.update(x), pt = x.material;
          if (B && (x.boundingSphere !== void 0 ? (x.boundingSphere === null && x.computeBoundingSphere(), Nt.copy(x.boundingSphere.center)) : (lt.boundingSphere === null && lt.computeBoundingSphere(), Nt.copy(lt.boundingSphere.center)), Nt.applyMatrix4(x.matrixWorld).applyMatrix4(bt)), Array.isArray(pt)) {
            const mt = lt.groups;
            for (let At = 0, Rt = mt.length; At < Rt; At++) {
              const gt = mt[At], Gt = pt[gt.materialIndex];
              Gt && Gt.visible && m.push(x, lt, Gt, O, Nt.z, gt);
            }
          } else pt.visible && m.push(x, lt, pt, O, Nt.z, null);
        }
      }
      const Q = x.children;
      for (let lt = 0, pt = Q.length; lt < pt; lt++) Ys(Q[lt], D, O, B);
    }
    function Ha(x, D, O, B) {
      const I = x.opaque, Q = x.transmissive, lt = x.transparent;
      f.setupLightsView(O), tt === true && J.setGlobalState(y.clippingPlanes, O), B && St.viewport(R.copy(B)), I.length > 0 && Zi(I, D, O), Q.length > 0 && Zi(Q, D, O), lt.length > 0 && Zi(lt, D, O), St.buffers.depth.setTest(true), St.buffers.depth.setMask(true), St.buffers.color.setMask(true), St.setPolygonOffset(false);
    }
    function Ga(x, D, O, B) {
      if ((O.isScene === true ? O.overrideMaterial : null) !== null) return;
      f.state.transmissionRenderTarget[B.id] === void 0 && (f.state.transmissionRenderTarget[B.id] = new Hn(1, 1, { generateMipmaps: true, type: Ft.has("EXT_color_buffer_half_float") || Ft.has("EXT_color_buffer_float") ? Xi : un, minFilter: Bn, samples: 4, stencilBuffer: r, resolveDepthBuffer: false, resolveStencilBuffer: false, colorSpace: Ht.workingColorSpace }));
      const Q = f.state.transmissionRenderTarget[B.id], lt = B.viewport || R;
      Q.setSize(lt.z, lt.w);
      const pt = y.getRenderTarget();
      y.setRenderTarget(Q), y.getClearColor(W), Z = y.getClearAlpha(), Z < 1 && y.setClearColor(16777215, 0.5), y.clear(), zt && Et.render(O);
      const mt = y.toneMapping;
      y.toneMapping = bn;
      const At = B.viewport;
      if (B.viewport !== void 0 && (B.viewport = void 0), f.setupLightsView(B), tt === true && J.setGlobalState(y.clippingPlanes, B), Zi(x, O, B), b.updateMultisampleRenderTarget(Q), b.updateRenderTargetMipmap(Q), Ft.has("WEBGL_multisampled_render_to_texture") === false) {
        let Rt = false;
        for (let gt = 0, Gt = D.length; gt < Gt; gt++) {
          const Jt = D[gt], te = Jt.object, ye = Jt.geometry, Vt = Jt.material, xt = Jt.group;
          if (Vt.side === qe && te.layers.test(B.layers)) {
            const en = Vt.side;
            Vt.side = xe, Vt.needsUpdate = true, Va(te, O, B, ye, Vt, xt), Vt.side = en, Vt.needsUpdate = true, Rt = true;
          }
        }
        Rt === true && (b.updateMultisampleRenderTarget(Q), b.updateRenderTargetMipmap(Q));
      }
      y.setRenderTarget(pt), y.setClearColor(W, Z), At !== void 0 && (B.viewport = At), y.toneMapping = mt;
    }
    function Zi(x, D, O) {
      const B = D.isScene === true ? D.overrideMaterial : null;
      for (let I = 0, Q = x.length; I < Q; I++) {
        const lt = x[I], pt = lt.object, mt = lt.geometry, At = B === null ? lt.material : B, Rt = lt.group;
        pt.layers.test(O.layers) && Va(pt, D, O, mt, At, Rt);
      }
    }
    function Va(x, D, O, B, I, Q) {
      x.onBeforeRender(y, D, O, B, I, Q), x.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse, x.matrixWorld), x.normalMatrix.getNormalMatrix(x.modelViewMatrix), I.onBeforeRender(y, D, O, B, x, Q), I.transparent === true && I.side === qe && I.forceSinglePass === false ? (I.side = xe, I.needsUpdate = true, y.renderBufferDirect(O, D, B, I, x, Q), I.side = Tn, I.needsUpdate = true, y.renderBufferDirect(O, D, B, I, x, Q), I.side = qe) : y.renderBufferDirect(O, D, B, I, x, Q), x.onAfterRender(y, D, O, B, I, Q);
    }
    function ji(x, D, O) {
      D.isScene !== true && (D = ne);
      const B = yt.get(x), I = f.state.lights, Q = f.state.shadowsArray, lt = I.state.version, pt = vt.getParameters(x, I.state, Q, D, O), mt = vt.getProgramCacheKey(pt);
      let At = B.programs;
      B.environment = x.isMeshStandardMaterial ? D.environment : null, B.fog = D.fog, B.envMap = (x.isMeshStandardMaterial ? F : v).get(x.envMap || B.environment), B.envMapRotation = B.environment !== null && x.envMap === null ? D.environmentRotation : x.envMapRotation, At === void 0 && (x.addEventListener("dispose", Ct), At = /* @__PURE__ */ new Map(), B.programs = At);
      let Rt = At.get(mt);
      if (Rt !== void 0) {
        if (B.currentProgram === Rt && B.lightsStateVersion === lt) return Xa(x, pt), Rt;
      } else pt.uniforms = vt.getUniforms(x), x.onBeforeCompile(pt, y), Rt = vt.acquireProgram(pt, mt), At.set(mt, Rt), B.uniforms = pt.uniforms;
      const gt = B.uniforms;
      return (!x.isShaderMaterial && !x.isRawShaderMaterial || x.clipping === true) && (gt.clippingPlanes = J.uniform), Xa(x, pt), B.needsLights = uc(x), B.lightsStateVersion = lt, B.needsLights && (gt.ambientLightColor.value = I.state.ambient, gt.lightProbe.value = I.state.probe, gt.directionalLights.value = I.state.directional, gt.directionalLightShadows.value = I.state.directionalShadow, gt.spotLights.value = I.state.spot, gt.spotLightShadows.value = I.state.spotShadow, gt.rectAreaLights.value = I.state.rectArea, gt.ltc_1.value = I.state.rectAreaLTC1, gt.ltc_2.value = I.state.rectAreaLTC2, gt.pointLights.value = I.state.point, gt.pointLightShadows.value = I.state.pointShadow, gt.hemisphereLights.value = I.state.hemi, gt.directionalShadowMap.value = I.state.directionalShadowMap, gt.directionalShadowMatrix.value = I.state.directionalShadowMatrix, gt.spotShadowMap.value = I.state.spotShadowMap, gt.spotLightMatrix.value = I.state.spotLightMatrix, gt.spotLightMap.value = I.state.spotLightMap, gt.pointShadowMap.value = I.state.pointShadowMap, gt.pointShadowMatrix.value = I.state.pointShadowMatrix), B.currentProgram = Rt, B.uniformsList = null, Rt;
    }
    function Wa(x) {
      if (x.uniformsList === null) {
        const D = x.currentProgram.getUniforms();
        x.uniformsList = Is.seqWithValue(D.seq, x.uniforms);
      }
      return x.uniformsList;
    }
    function Xa(x, D) {
      const O = yt.get(x);
      O.outputColorSpace = D.outputColorSpace, O.batching = D.batching, O.batchingColor = D.batchingColor, O.instancing = D.instancing, O.instancingColor = D.instancingColor, O.instancingMorph = D.instancingMorph, O.skinning = D.skinning, O.morphTargets = D.morphTargets, O.morphNormals = D.morphNormals, O.morphColors = D.morphColors, O.morphTargetsCount = D.morphTargetsCount, O.numClippingPlanes = D.numClippingPlanes, O.numIntersection = D.numClipIntersection, O.vertexAlphas = D.vertexAlphas, O.vertexTangents = D.vertexTangents, O.toneMapping = D.toneMapping;
    }
    function cc(x, D, O, B, I) {
      D.isScene !== true && (D = ne), b.resetTextureUnits();
      const Q = D.fog, lt = B.isMeshStandardMaterial ? D.environment : null, pt = L === null ? y.outputColorSpace : L.isXRRenderTarget === true ? L.texture.colorSpace : yi, mt = (B.isMeshStandardMaterial ? F : v).get(B.envMap || lt), At = B.vertexColors === true && !!O.attributes.color && O.attributes.color.itemSize === 4, Rt = !!O.attributes.tangent && (!!B.normalMap || B.anisotropy > 0), gt = !!O.morphAttributes.position, Gt = !!O.morphAttributes.normal, Jt = !!O.morphAttributes.color;
      let te = bn;
      B.toneMapped && (L === null || L.isXRRenderTarget === true) && (te = y.toneMapping);
      const ye = O.morphAttributes.position || O.morphAttributes.normal || O.morphAttributes.color, Vt = ye !== void 0 ? ye.length : 0, xt = yt.get(B), en = f.state.lights;
      if (tt === true && (_t === true || x !== M)) {
        const Ie = x === M && B.id === S;
        J.setState(B, x, Ie);
      }
      let Wt = false;
      B.version === xt.__version ? (xt.needsLights && xt.lightsStateVersion !== en.state.version || xt.outputColorSpace !== pt || I.isBatchedMesh && xt.batching === false || !I.isBatchedMesh && xt.batching === true || I.isBatchedMesh && xt.batchingColor === true && I.colorTexture === null || I.isBatchedMesh && xt.batchingColor === false && I.colorTexture !== null || I.isInstancedMesh && xt.instancing === false || !I.isInstancedMesh && xt.instancing === true || I.isSkinnedMesh && xt.skinning === false || !I.isSkinnedMesh && xt.skinning === true || I.isInstancedMesh && xt.instancingColor === true && I.instanceColor === null || I.isInstancedMesh && xt.instancingColor === false && I.instanceColor !== null || I.isInstancedMesh && xt.instancingMorph === true && I.morphTexture === null || I.isInstancedMesh && xt.instancingMorph === false && I.morphTexture !== null || xt.envMap !== mt || B.fog === true && xt.fog !== Q || xt.numClippingPlanes !== void 0 && (xt.numClippingPlanes !== J.numPlanes || xt.numIntersection !== J.numIntersection) || xt.vertexAlphas !== At || xt.vertexTangents !== Rt || xt.morphTargets !== gt || xt.morphNormals !== Gt || xt.morphColors !== Jt || xt.toneMapping !== te || xt.morphTargetsCount !== Vt) && (Wt = true) : (Wt = true, xt.__version = B.version);
      let ke = xt.currentProgram;
      Wt === true && (ke = ji(B, D, I));
      let Xn = false, Te = false, Ti = false;
      const ee = ke.getUniforms(), Xe = xt.uniforms;
      if (St.useProgram(ke.program) && (Xn = true, Te = true, Ti = true), B.id !== S && (S = B.id, Te = true), Xn || M !== x) {
        St.buffers.depth.getReversed() ? (rt.copy(x.projectionMatrix), fh(rt), ph(rt), ee.setValue(U, "projectionMatrix", rt)) : ee.setValue(U, "projectionMatrix", x.projectionMatrix), ee.setValue(U, "viewMatrix", x.matrixWorldInverse);
        const fn = ee.map.cameraPosition;
        fn !== void 0 && fn.setValue(U, wt.setFromMatrixPosition(x.matrixWorld)), Ot.logarithmicDepthBuffer && ee.setValue(U, "logDepthBufFC", 2 / (Math.log(x.far + 1) / Math.LN2)), (B.isMeshPhongMaterial || B.isMeshToonMaterial || B.isMeshLambertMaterial || B.isMeshBasicMaterial || B.isMeshStandardMaterial || B.isShaderMaterial) && ee.setValue(U, "isOrthographic", x.isOrthographicCamera === true), M !== x && (M = x, Te = true, Ti = true);
      }
      if (I.isSkinnedMesh) {
        ee.setOptional(U, I, "bindMatrix"), ee.setOptional(U, I, "bindMatrixInverse");
        const Ie = I.skeleton;
        Ie && (Ie.boneTexture === null && Ie.computeBoneTexture(), ee.setValue(U, "boneTexture", Ie.boneTexture, b));
      }
      I.isBatchedMesh && (ee.setOptional(U, I, "batchingTexture"), ee.setValue(U, "batchingTexture", I._matricesTexture, b), ee.setOptional(U, I, "batchingIdTexture"), ee.setValue(U, "batchingIdTexture", I._indirectTexture, b), ee.setOptional(U, I, "batchingColorTexture"), I._colorsTexture !== null && ee.setValue(U, "batchingColorTexture", I._colorsTexture, b));
      const Ai = O.morphAttributes;
      if ((Ai.position !== void 0 || Ai.normal !== void 0 || Ai.color !== void 0) && Tt.update(I, O, ke), (Te || xt.receiveShadow !== I.receiveShadow) && (xt.receiveShadow = I.receiveShadow, ee.setValue(U, "receiveShadow", I.receiveShadow)), B.isMeshGouraudMaterial && B.envMap !== null && (Xe.envMap.value = mt, Xe.flipEnvMap.value = mt.isCubeTexture && mt.isRenderTargetTexture === false ? -1 : 1), B.isMeshStandardMaterial && B.envMap === null && D.environment !== null && (Xe.envMapIntensity.value = D.environmentIntensity), Te && (ee.setValue(U, "toneMappingExposure", y.toneMappingExposure), xt.needsLights && hc(Xe, Ti), Q && B.fog === true && at.refreshFogUniforms(Xe, Q), at.refreshMaterialUniforms(Xe, B, G, K, f.state.transmissionRenderTarget[x.id]), Is.upload(U, Wa(xt), Xe, b)), B.isShaderMaterial && B.uniformsNeedUpdate === true && (Is.upload(U, Wa(xt), Xe, b), B.uniformsNeedUpdate = false), B.isSpriteMaterial && ee.setValue(U, "center", I.center), ee.setValue(U, "modelViewMatrix", I.modelViewMatrix), ee.setValue(U, "normalMatrix", I.normalMatrix), ee.setValue(U, "modelMatrix", I.matrixWorld), B.isShaderMaterial || B.isRawShaderMaterial) {
        const Ie = B.uniformsGroups;
        for (let fn = 0, pn = Ie.length; fn < pn; fn++) {
          const Ya = Ie[fn];
          P.update(Ya, ke), P.bind(Ya, ke);
        }
      }
      return ke;
    }
    function hc(x, D) {
      x.ambientLightColor.needsUpdate = D, x.lightProbe.needsUpdate = D, x.directionalLights.needsUpdate = D, x.directionalLightShadows.needsUpdate = D, x.pointLights.needsUpdate = D, x.pointLightShadows.needsUpdate = D, x.spotLights.needsUpdate = D, x.spotLightShadows.needsUpdate = D, x.rectAreaLights.needsUpdate = D, x.hemisphereLights.needsUpdate = D;
    }
    function uc(x) {
      return x.isMeshLambertMaterial || x.isMeshToonMaterial || x.isMeshPhongMaterial || x.isMeshStandardMaterial || x.isShadowMaterial || x.isShaderMaterial && x.lights === true;
    }
    this.getActiveCubeFace = function() {
      return w;
    }, this.getActiveMipmapLevel = function() {
      return A;
    }, this.getRenderTarget = function() {
      return L;
    }, this.setRenderTargetTextures = function(x, D, O) {
      yt.get(x.texture).__webglTexture = D, yt.get(x.depthTexture).__webglTexture = O;
      const B = yt.get(x);
      B.__hasExternalTextures = true, B.__autoAllocateDepthBuffer = O === void 0, B.__autoAllocateDepthBuffer || Ft.has("WEBGL_multisampled_render_to_texture") === true && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), B.__useRenderToTexture = false);
    }, this.setRenderTargetFramebuffer = function(x, D) {
      const O = yt.get(x);
      O.__webglFramebuffer = D, O.__useDefaultFramebuffer = D === void 0;
    }, this.setRenderTarget = function(x, D = 0, O = 0) {
      L = x, w = D, A = O;
      let B = true, I = null, Q = false, lt = false;
      if (x) {
        const mt = yt.get(x);
        if (mt.__useDefaultFramebuffer !== void 0) St.bindFramebuffer(U.FRAMEBUFFER, null), B = false;
        else if (mt.__webglFramebuffer === void 0) b.setupRenderTarget(x);
        else if (mt.__hasExternalTextures) b.rebindTextures(x, yt.get(x.texture).__webglTexture, yt.get(x.depthTexture).__webglTexture);
        else if (x.depthBuffer) {
          const gt = x.depthTexture;
          if (mt.__boundDepthTexture !== gt) {
            if (gt !== null && yt.has(gt) && (x.width !== gt.image.width || x.height !== gt.image.height)) throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            b.setupDepthRenderbuffer(x);
          }
        }
        const At = x.texture;
        (At.isData3DTexture || At.isDataArrayTexture || At.isCompressedArrayTexture) && (lt = true);
        const Rt = yt.get(x).__webglFramebuffer;
        x.isWebGLCubeRenderTarget ? (Array.isArray(Rt[D]) ? I = Rt[D][O] : I = Rt[D], Q = true) : x.samples > 0 && b.useMultisampledRTT(x) === false ? I = yt.get(x).__webglMultisampledFramebuffer : Array.isArray(Rt) ? I = Rt[O] : I = Rt, R.copy(x.viewport), k.copy(x.scissor), z = x.scissorTest;
      } else R.copy(Mt).multiplyScalar(G).floor(), k.copy(Ut).multiplyScalar(G).floor(), z = jt;
      if (St.bindFramebuffer(U.FRAMEBUFFER, I) && B && St.drawBuffers(x, I), St.viewport(R), St.scissor(k), St.setScissorTest(z), Q) {
        const mt = yt.get(x.texture);
        U.framebufferTexture2D(U.FRAMEBUFFER, U.COLOR_ATTACHMENT0, U.TEXTURE_CUBE_MAP_POSITIVE_X + D, mt.__webglTexture, O);
      } else if (lt) {
        const mt = yt.get(x.texture), At = D || 0;
        U.framebufferTextureLayer(U.FRAMEBUFFER, U.COLOR_ATTACHMENT0, mt.__webglTexture, O || 0, At);
      }
      S = -1;
    }, this.readRenderTargetPixels = function(x, D, O, B, I, Q, lt) {
      if (!(x && x.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let pt = yt.get(x).__webglFramebuffer;
      if (x.isWebGLCubeRenderTarget && lt !== void 0 && (pt = pt[lt]), pt) {
        St.bindFramebuffer(U.FRAMEBUFFER, pt);
        try {
          const mt = x.texture, At = mt.format, Rt = mt.type;
          if (!Ot.textureFormatReadable(At)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!Ot.textureTypeReadable(Rt)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          D >= 0 && D <= x.width - B && O >= 0 && O <= x.height - I && U.readPixels(D, O, B, I, Lt.convert(At), Lt.convert(Rt), Q);
        } finally {
          const mt = L !== null ? yt.get(L).__webglFramebuffer : null;
          St.bindFramebuffer(U.FRAMEBUFFER, mt);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(x, D, O, B, I, Q, lt) {
      if (!(x && x.isWebGLRenderTarget)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let pt = yt.get(x).__webglFramebuffer;
      if (x.isWebGLCubeRenderTarget && lt !== void 0 && (pt = pt[lt]), pt) {
        const mt = x.texture, At = mt.format, Rt = mt.type;
        if (!Ot.textureFormatReadable(At)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!Ot.textureTypeReadable(Rt)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        if (D >= 0 && D <= x.width - B && O >= 0 && O <= x.height - I) {
          St.bindFramebuffer(U.FRAMEBUFFER, pt);
          const gt = U.createBuffer();
          U.bindBuffer(U.PIXEL_PACK_BUFFER, gt), U.bufferData(U.PIXEL_PACK_BUFFER, Q.byteLength, U.STREAM_READ), U.readPixels(D, O, B, I, Lt.convert(At), Lt.convert(Rt), 0);
          const Gt = L !== null ? yt.get(L).__webglFramebuffer : null;
          St.bindFramebuffer(U.FRAMEBUFFER, Gt);
          const Jt = U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return U.flush(), await dh(U, Jt, 4), U.bindBuffer(U.PIXEL_PACK_BUFFER, gt), U.getBufferSubData(U.PIXEL_PACK_BUFFER, 0, Q), U.deleteBuffer(gt), U.deleteSync(Jt), Q;
        } else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
      }
    }, this.copyFramebufferToTexture = function(x, D = null, O = 0) {
      x.isTexture !== true && (Oi("WebGLRenderer: copyFramebufferToTexture function signature has changed."), D = arguments[0] || null, x = arguments[1]);
      const B = Math.pow(2, -O), I = Math.floor(x.image.width * B), Q = Math.floor(x.image.height * B), lt = D !== null ? D.x : 0, pt = D !== null ? D.y : 0;
      b.setTexture2D(x, 0), U.copyTexSubImage2D(U.TEXTURE_2D, O, 0, 0, lt, pt, I, Q), St.unbindTexture();
    }, this.copyTextureToTexture = function(x, D, O = null, B = null, I = 0) {
      x.isTexture !== true && (Oi("WebGLRenderer: copyTextureToTexture function signature has changed."), B = arguments[0] || null, x = arguments[1], D = arguments[2], I = arguments[3] || 0, O = null);
      let Q, lt, pt, mt, At, Rt, gt, Gt, Jt;
      const te = x.isCompressedTexture ? x.mipmaps[I] : x.image;
      O !== null ? (Q = O.max.x - O.min.x, lt = O.max.y - O.min.y, pt = O.isBox3 ? O.max.z - O.min.z : 1, mt = O.min.x, At = O.min.y, Rt = O.isBox3 ? O.min.z : 0) : (Q = te.width, lt = te.height, pt = te.depth || 1, mt = 0, At = 0, Rt = 0), B !== null ? (gt = B.x, Gt = B.y, Jt = B.z) : (gt = 0, Gt = 0, Jt = 0);
      const ye = Lt.convert(D.format), Vt = Lt.convert(D.type);
      let xt;
      D.isData3DTexture ? (b.setTexture3D(D, 0), xt = U.TEXTURE_3D) : D.isDataArrayTexture || D.isCompressedArrayTexture ? (b.setTexture2DArray(D, 0), xt = U.TEXTURE_2D_ARRAY) : (b.setTexture2D(D, 0), xt = U.TEXTURE_2D), U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL, D.flipY), U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL, D.premultiplyAlpha), U.pixelStorei(U.UNPACK_ALIGNMENT, D.unpackAlignment);
      const en = U.getParameter(U.UNPACK_ROW_LENGTH), Wt = U.getParameter(U.UNPACK_IMAGE_HEIGHT), ke = U.getParameter(U.UNPACK_SKIP_PIXELS), Xn = U.getParameter(U.UNPACK_SKIP_ROWS), Te = U.getParameter(U.UNPACK_SKIP_IMAGES);
      U.pixelStorei(U.UNPACK_ROW_LENGTH, te.width), U.pixelStorei(U.UNPACK_IMAGE_HEIGHT, te.height), U.pixelStorei(U.UNPACK_SKIP_PIXELS, mt), U.pixelStorei(U.UNPACK_SKIP_ROWS, At), U.pixelStorei(U.UNPACK_SKIP_IMAGES, Rt);
      const Ti = x.isDataArrayTexture || x.isData3DTexture, ee = D.isDataArrayTexture || D.isData3DTexture;
      if (x.isRenderTargetTexture || x.isDepthTexture) {
        const Xe = yt.get(x), Ai = yt.get(D), Ie = yt.get(Xe.__renderTarget), fn = yt.get(Ai.__renderTarget);
        St.bindFramebuffer(U.READ_FRAMEBUFFER, Ie.__webglFramebuffer), St.bindFramebuffer(U.DRAW_FRAMEBUFFER, fn.__webglFramebuffer);
        for (let pn = 0; pn < pt; pn++) Ti && U.framebufferTextureLayer(U.READ_FRAMEBUFFER, U.COLOR_ATTACHMENT0, yt.get(x).__webglTexture, I, Rt + pn), x.isDepthTexture ? (ee && U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER, U.COLOR_ATTACHMENT0, yt.get(D).__webglTexture, I, Jt + pn), U.blitFramebuffer(mt, At, Q, lt, gt, Gt, Q, lt, U.DEPTH_BUFFER_BIT, U.NEAREST)) : ee ? U.copyTexSubImage3D(xt, I, gt, Gt, Jt + pn, mt, At, Q, lt) : U.copyTexSubImage2D(xt, I, gt, Gt, Jt + pn, mt, At, Q, lt);
        St.bindFramebuffer(U.READ_FRAMEBUFFER, null), St.bindFramebuffer(U.DRAW_FRAMEBUFFER, null);
      } else ee ? x.isDataTexture || x.isData3DTexture ? U.texSubImage3D(xt, I, gt, Gt, Jt, Q, lt, pt, ye, Vt, te.data) : D.isCompressedArrayTexture ? U.compressedTexSubImage3D(xt, I, gt, Gt, Jt, Q, lt, pt, ye, te.data) : U.texSubImage3D(xt, I, gt, Gt, Jt, Q, lt, pt, ye, Vt, te) : x.isDataTexture ? U.texSubImage2D(U.TEXTURE_2D, I, gt, Gt, Q, lt, ye, Vt, te.data) : x.isCompressedTexture ? U.compressedTexSubImage2D(U.TEXTURE_2D, I, gt, Gt, te.width, te.height, ye, te.data) : U.texSubImage2D(U.TEXTURE_2D, I, gt, Gt, Q, lt, ye, Vt, te);
      U.pixelStorei(U.UNPACK_ROW_LENGTH, en), U.pixelStorei(U.UNPACK_IMAGE_HEIGHT, Wt), U.pixelStorei(U.UNPACK_SKIP_PIXELS, ke), U.pixelStorei(U.UNPACK_SKIP_ROWS, Xn), U.pixelStorei(U.UNPACK_SKIP_IMAGES, Te), I === 0 && D.generateMipmaps && U.generateMipmap(xt), St.unbindTexture();
    }, this.copyTextureToTexture3D = function(x, D, O = null, B = null, I = 0) {
      return x.isTexture !== true && (Oi("WebGLRenderer: copyTextureToTexture3D function signature has changed."), O = arguments[0] || null, B = arguments[1] || null, x = arguments[2], D = arguments[3], I = arguments[4] || 0), Oi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'), this.copyTextureToTexture(x, D, O, B, I);
    }, this.initRenderTarget = function(x) {
      yt.get(x).__webglFramebuffer === void 0 && b.setupRenderTarget(x);
    }, this.initTexture = function(x) {
      x.isCubeTexture ? b.setTextureCube(x, 0) : x.isData3DTexture ? b.setTexture3D(x, 0) : x.isDataArrayTexture || x.isCompressedArrayTexture ? b.setTexture2DArray(x, 0) : b.setTexture2D(x, 0), St.unbindTexture();
    }, this.resetState = function() {
      w = 0, A = 0, L = null, St.reset(), Kt.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return cn;
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
class La {
  constructor(t, e = 25e-5) {
    this.isFogExp2 = true, this.name = "", this.color = new It(t), this.density = e;
  }
  clone() {
    return new La(this.color, this.density);
  }
  toJSON() {
    return { type: "FogExp2", name: this.name, color: this.color.getHex(), density: this.density };
  }
}
class Kl extends fe {
  constructor() {
    super(), this.isScene = true, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Ke(), this.environmentIntensity = 1, this.environmentRotation = new Ke(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(t, e) {
    return super.copy(t, e), t.background !== null && (this.background = t.background.clone()), t.environment !== null && (this.environment = t.environment.clone()), t.fog !== null && (this.fog = t.fog.clone()), this.backgroundBlurriness = t.backgroundBlurriness, this.backgroundIntensity = t.backgroundIntensity, this.backgroundRotation.copy(t.backgroundRotation), this.environmentIntensity = t.environmentIntensity, this.environmentRotation.copy(t.environmentRotation), t.overrideMaterial !== null && (this.overrideMaterial = t.overrideMaterial.clone()), this.matrixAutoUpdate = t.matrixAutoUpdate, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.fog !== null && (e.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (e.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (e.object.backgroundIntensity = this.backgroundIntensity), e.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (e.object.environmentIntensity = this.environmentIntensity), e.object.environmentRotation = this.environmentRotation.toArray(), e;
  }
}
class Tm extends Me {
  constructor(t = null, e = 1, n = 1, s, r, a, o, l, c = Pe, h = Pe, u, d) {
    super(null, a, o, l, c, h, s, r, u, d), this.isDataTexture = true, this.image = { data: t, width: e, height: n }, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1;
  }
}
class $o extends Be {
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
const oi = new Xt(), Zo = new Xt(), Ms = [], jo = new Wn(), Am = new Xt(), Di = new ve(), Ii = new Si();
class wm extends ve {
  constructor(t, e, n) {
    super(t, e), this.isInstancedMesh = true, this.instanceMatrix = new $o(new Float32Array(n * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null;
    for (let s = 0; s < n; s++) this.setMatrixAt(s, Am);
  }
  computeBoundingBox() {
    const t = this.geometry, e = this.count;
    this.boundingBox === null && (this.boundingBox = new Wn()), t.boundingBox === null && t.computeBoundingBox(), this.boundingBox.makeEmpty();
    for (let n = 0; n < e; n++) this.getMatrixAt(n, oi), jo.copy(t.boundingBox).applyMatrix4(oi), this.boundingBox.union(jo);
  }
  computeBoundingSphere() {
    const t = this.geometry, e = this.count;
    this.boundingSphere === null && (this.boundingSphere = new Si()), t.boundingSphere === null && t.computeBoundingSphere(), this.boundingSphere.makeEmpty();
    for (let n = 0; n < e; n++) this.getMatrixAt(n, oi), Ii.copy(t.boundingSphere).applyMatrix4(oi), this.boundingSphere.union(Ii);
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
    if (Di.geometry = this.geometry, Di.material = this.material, Di.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), Ii.copy(this.boundingSphere), Ii.applyMatrix4(n), t.ray.intersectsSphere(Ii) !== false)) for (let r = 0; r < s; r++) {
      this.getMatrixAt(r, oi), Zo.multiplyMatrices(n, oi), Di.matrixWorld = Zo, Di.raycast(t, Ms);
      for (let a = 0, o = Ms.length; a < o; a++) {
        const l = Ms[a];
        l.instanceId = r, l.object = this, e.push(l);
      }
      Ms.length = 0;
    }
  }
  setColorAt(t, e) {
    this.instanceColor === null && (this.instanceColor = new $o(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), e.toArray(this.instanceColor.array, t * 3);
  }
  setMatrixAt(t, e) {
    e.toArray(this.instanceMatrix.array, t * 16);
  }
  setMorphAt(t, e) {
    const n = e.morphTargetInfluences, s = n.length + 1;
    this.morphTexture === null && (this.morphTexture = new Tm(new Float32Array(s * this.count), s, this.count, ba, Ze));
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
class Jl extends Ei {
  static get type() {
    return "LineBasicMaterial";
  }
  constructor(t) {
    super(), this.isLineBasicMaterial = true, this.color = new It(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = true, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.linewidth = t.linewidth, this.linecap = t.linecap, this.linejoin = t.linejoin, this.fog = t.fog, this;
  }
}
const Os = new C(), Bs = new C(), Ko = new Xt(), Ui = new Ca(), ys = new Si(), Sr = new C(), Jo = new C();
class Cm extends fe {
  constructor(t = new Le(), e = new Jl()) {
    super(), this.isLine = true, this.type = "Line", this.geometry = t, this.material = e, this.updateMorphTargets();
  }
  copy(t, e) {
    return super.copy(t, e), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
  }
  computeLineDistances() {
    const t = this.geometry;
    if (t.index === null) {
      const e = t.attributes.position, n = [0];
      for (let s = 1, r = e.count; s < r; s++) Os.fromBufferAttribute(e, s - 1), Bs.fromBufferAttribute(e, s), n[s] = n[s - 1], n[s] += Os.distanceTo(Bs);
      t.setAttribute("lineDistance", new ce(n, 1));
    } else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(t, e) {
    const n = this.geometry, s = this.matrixWorld, r = t.params.Line.threshold, a = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), ys.copy(n.boundingSphere), ys.applyMatrix4(s), ys.radius += r, t.ray.intersectsSphere(ys) === false) return;
    Ko.copy(s).invert(), Ui.copy(t.ray).applyMatrix4(Ko);
    const o = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = o * o, c = this.isLineSegments ? 2 : 1, h = n.index, d = n.attributes.position;
    if (h !== null) {
      const p = Math.max(0, a.start), g = Math.min(h.count, a.start + a.count);
      for (let _ = p, m = g - 1; _ < m; _ += c) {
        const f = h.getX(_), E = h.getX(_ + 1), T = Ss(this, t, Ui, l, f, E);
        T && e.push(T);
      }
      if (this.isLineLoop) {
        const _ = h.getX(g - 1), m = h.getX(p), f = Ss(this, t, Ui, l, _, m);
        f && e.push(f);
      }
    } else {
      const p = Math.max(0, a.start), g = Math.min(d.count, a.start + a.count);
      for (let _ = p, m = g - 1; _ < m; _ += c) {
        const f = Ss(this, t, Ui, l, _, _ + 1);
        f && e.push(f);
      }
      if (this.isLineLoop) {
        const _ = Ss(this, t, Ui, l, g - 1, p);
        _ && e.push(_);
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
function Ss(i, t, e, n, s, r) {
  const a = i.geometry.attributes.position;
  if (Os.fromBufferAttribute(a, s), Bs.fromBufferAttribute(a, r), e.distanceSqToSegment(Os, Bs, Sr, Jo) > n) return;
  Sr.applyMatrix4(i.matrixWorld);
  const l = t.ray.origin.distanceTo(Sr);
  if (!(l < t.near || l > t.far)) return { distance: l, point: Jo.clone().applyMatrix4(i.matrixWorld), index: s, face: null, faceIndex: null, barycoord: null, object: i };
}
const Qo = new C(), tl = new C();
class el extends Cm {
  constructor(t, e) {
    super(t, e), this.isLineSegments = true, this.type = "LineSegments";
  }
  computeLineDistances() {
    const t = this.geometry;
    if (t.index === null) {
      const e = t.attributes.position, n = [];
      for (let s = 0, r = e.count; s < r; s += 2) Qo.fromBufferAttribute(e, s), tl.fromBufferAttribute(e, s + 1), n[s] = s === 0 ? 0 : n[s - 1], n[s + 1] = n[s] + Qo.distanceTo(tl);
      t.setAttribute("lineDistance", new ce(n, 1));
    } else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class Qe {
  constructor() {
    this.type = "Curve", this.arcLengthDivisions = 200;
  }
  getPoint() {
    return console.warn("THREE.Curve: .getPoint() not implemented."), null;
  }
  getPointAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getPoint(n, e);
  }
  getPoints(t = 5) {
    const e = [];
    for (let n = 0; n <= t; n++) e.push(this.getPoint(n / t));
    return e;
  }
  getSpacedPoints(t = 5) {
    const e = [];
    for (let n = 0; n <= t; n++) e.push(this.getPointAt(n / t));
    return e;
  }
  getLength() {
    const t = this.getLengths();
    return t[t.length - 1];
  }
  getLengths(t = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate) return this.cacheArcLengths;
    this.needsUpdate = false;
    const e = [];
    let n, s = this.getPoint(0), r = 0;
    e.push(0);
    for (let a = 1; a <= t; a++) n = this.getPoint(a / t), r += n.distanceTo(s), e.push(r), s = n;
    return this.cacheArcLengths = e, e;
  }
  updateArcLengths() {
    this.needsUpdate = true, this.getLengths();
  }
  getUtoTmapping(t, e) {
    const n = this.getLengths();
    let s = 0;
    const r = n.length;
    let a;
    e ? a = e : a = t * n[r - 1];
    let o = 0, l = r - 1, c;
    for (; o <= l; ) if (s = Math.floor(o + (l - o) / 2), c = n[s] - a, c < 0) o = s + 1;
    else if (c > 0) l = s - 1;
    else {
      l = s;
      break;
    }
    if (s = l, n[s] === a) return s / (r - 1);
    const h = n[s], d = n[s + 1] - h, p = (a - h) / d;
    return (s + p) / (r - 1);
  }
  getTangent(t, e) {
    let s = t - 1e-4, r = t + 1e-4;
    s < 0 && (s = 0), r > 1 && (r = 1);
    const a = this.getPoint(s), o = this.getPoint(r), l = e || (a.isVector2 ? new it() : new C());
    return l.copy(o).sub(a).normalize(), l;
  }
  getTangentAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getTangent(n, e);
  }
  computeFrenetFrames(t, e) {
    const n = new C(), s = [], r = [], a = [], o = new C(), l = new Xt();
    for (let p = 0; p <= t; p++) {
      const g = p / t;
      s[p] = this.getTangentAt(g, new C());
    }
    r[0] = new C(), a[0] = new C();
    let c = Number.MAX_VALUE;
    const h = Math.abs(s[0].x), u = Math.abs(s[0].y), d = Math.abs(s[0].z);
    h <= c && (c = h, n.set(1, 0, 0)), u <= c && (c = u, n.set(0, 1, 0)), d <= c && n.set(0, 0, 1), o.crossVectors(s[0], n).normalize(), r[0].crossVectors(s[0], o), a[0].crossVectors(s[0], r[0]);
    for (let p = 1; p <= t; p++) {
      if (r[p] = r[p - 1].clone(), a[p] = a[p - 1].clone(), o.crossVectors(s[p - 1], s[p]), o.length() > Number.EPSILON) {
        o.normalize();
        const g = Math.acos(le(s[p - 1].dot(s[p]), -1, 1));
        r[p].applyMatrix4(l.makeRotationAxis(o, g));
      }
      a[p].crossVectors(s[p], r[p]);
    }
    if (e === true) {
      let p = Math.acos(le(r[0].dot(r[t]), -1, 1));
      p /= t, s[0].dot(o.crossVectors(r[0], r[t])) > 0 && (p = -p);
      for (let g = 1; g <= t; g++) r[g].applyMatrix4(l.makeRotationAxis(s[g], p * g)), a[g].crossVectors(s[g], r[g]);
    }
    return { tangents: s, normals: r, binormals: a };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.arcLengthDivisions = t.arcLengthDivisions, this;
  }
  toJSON() {
    const t = { metadata: { version: 4.6, type: "Curve", generator: "Curve.toJSON" } };
    return t.arcLengthDivisions = this.arcLengthDivisions, t.type = this.type, t;
  }
  fromJSON(t) {
    return this.arcLengthDivisions = t.arcLengthDivisions, this;
  }
}
class Da extends Qe {
  constructor(t = 0, e = 0, n = 1, s = 1, r = 0, a = Math.PI * 2, o = false, l = 0) {
    super(), this.isEllipseCurve = true, this.type = "EllipseCurve", this.aX = t, this.aY = e, this.xRadius = n, this.yRadius = s, this.aStartAngle = r, this.aEndAngle = a, this.aClockwise = o, this.aRotation = l;
  }
  getPoint(t, e = new it()) {
    const n = e, s = Math.PI * 2;
    let r = this.aEndAngle - this.aStartAngle;
    const a = Math.abs(r) < Number.EPSILON;
    for (; r < 0; ) r += s;
    for (; r > s; ) r -= s;
    r < Number.EPSILON && (a ? r = 0 : r = s), this.aClockwise === true && !a && (r === s ? r = -s : r = r - s);
    const o = this.aStartAngle + t * r;
    let l = this.aX + this.xRadius * Math.cos(o), c = this.aY + this.yRadius * Math.sin(o);
    if (this.aRotation !== 0) {
      const h = Math.cos(this.aRotation), u = Math.sin(this.aRotation), d = l - this.aX, p = c - this.aY;
      l = d * h - p * u + this.aX, c = d * u + p * h + this.aY;
    }
    return n.set(l, c);
  }
  copy(t) {
    return super.copy(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.aX = this.aX, t.aY = this.aY, t.xRadius = this.xRadius, t.yRadius = this.yRadius, t.aStartAngle = this.aStartAngle, t.aEndAngle = this.aEndAngle, t.aClockwise = this.aClockwise, t.aRotation = this.aRotation, t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this;
  }
}
class Rm extends Da {
  constructor(t, e, n, s, r, a) {
    super(t, e, n, n, s, r, a), this.isArcCurve = true, this.type = "ArcCurve";
  }
}
function Ia() {
  let i = 0, t = 0, e = 0, n = 0;
  function s(r, a, o, l) {
    i = r, t = o, e = -3 * r + 3 * a - 2 * o - l, n = 2 * r - 2 * a + o + l;
  }
  return { initCatmullRom: function(r, a, o, l, c) {
    s(a, o, c * (o - r), c * (l - a));
  }, initNonuniformCatmullRom: function(r, a, o, l, c, h, u) {
    let d = (a - r) / c - (o - r) / (c + h) + (o - a) / h, p = (o - a) / h - (l - a) / (h + u) + (l - o) / u;
    d *= h, p *= h, s(a, o, d, p);
  }, calc: function(r) {
    const a = r * r, o = a * r;
    return i + t * r + e * a + n * o;
  } };
}
const Es = new C(), Er = new Ia(), br = new Ia(), Tr = new Ia();
class Pm extends Qe {
  constructor(t = [], e = false, n = "centripetal", s = 0.5) {
    super(), this.isCatmullRomCurve3 = true, this.type = "CatmullRomCurve3", this.points = t, this.closed = e, this.curveType = n, this.tension = s;
  }
  getPoint(t, e = new C()) {
    const n = e, s = this.points, r = s.length, a = (r - (this.closed ? 0 : 1)) * t;
    let o = Math.floor(a), l = a - o;
    this.closed ? o += o > 0 ? 0 : (Math.floor(Math.abs(o) / r) + 1) * r : l === 0 && o === r - 1 && (o = r - 2, l = 1);
    let c, h;
    this.closed || o > 0 ? c = s[(o - 1) % r] : (Es.subVectors(s[0], s[1]).add(s[0]), c = Es);
    const u = s[o % r], d = s[(o + 1) % r];
    if (this.closed || o + 2 < r ? h = s[(o + 2) % r] : (Es.subVectors(s[r - 1], s[r - 2]).add(s[r - 1]), h = Es), this.curveType === "centripetal" || this.curveType === "chordal") {
      const p = this.curveType === "chordal" ? 0.5 : 0.25;
      let g = Math.pow(c.distanceToSquared(u), p), _ = Math.pow(u.distanceToSquared(d), p), m = Math.pow(d.distanceToSquared(h), p);
      _ < 1e-4 && (_ = 1), g < 1e-4 && (g = _), m < 1e-4 && (m = _), Er.initNonuniformCatmullRom(c.x, u.x, d.x, h.x, g, _, m), br.initNonuniformCatmullRom(c.y, u.y, d.y, h.y, g, _, m), Tr.initNonuniformCatmullRom(c.z, u.z, d.z, h.z, g, _, m);
    } else this.curveType === "catmullrom" && (Er.initCatmullRom(c.x, u.x, d.x, h.x, this.tension), br.initCatmullRom(c.y, u.y, d.y, h.y, this.tension), Tr.initCatmullRom(c.z, u.z, d.z, h.z, this.tension));
    return n.set(Er.calc(l), br.calc(l), Tr.calc(l)), n;
  }
  copy(t) {
    super.copy(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const s = t.points[e];
      this.points.push(s.clone());
    }
    return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let e = 0, n = this.points.length; e < n; e++) {
      const s = this.points[e];
      t.points.push(s.toArray());
    }
    return t.closed = this.closed, t.curveType = this.curveType, t.tension = this.tension, t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const s = t.points[e];
      this.points.push(new C().fromArray(s));
    }
    return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
  }
}
function nl(i, t, e, n, s) {
  const r = (n - t) * 0.5, a = (s - e) * 0.5, o = i * i, l = i * o;
  return (2 * e - 2 * n + r + a) * l + (-3 * e + 3 * n - 2 * r - a) * o + r * i + e;
}
function Lm(i, t) {
  const e = 1 - i;
  return e * e * t;
}
function Dm(i, t) {
  return 2 * (1 - i) * i * t;
}
function Im(i, t) {
  return i * i * t;
}
function Hi(i, t, e, n) {
  return Lm(i, t) + Dm(i, e) + Im(i, n);
}
function Um(i, t) {
  const e = 1 - i;
  return e * e * e * t;
}
function Nm(i, t) {
  const e = 1 - i;
  return 3 * e * e * i * t;
}
function Fm(i, t) {
  return 3 * (1 - i) * i * i * t;
}
function Om(i, t) {
  return i * i * i * t;
}
function Gi(i, t, e, n, s) {
  return Um(i, t) + Nm(i, e) + Fm(i, n) + Om(i, s);
}
class Ql extends Qe {
  constructor(t = new it(), e = new it(), n = new it(), s = new it()) {
    super(), this.isCubicBezierCurve = true, this.type = "CubicBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = s;
  }
  getPoint(t, e = new it()) {
    const n = e, s = this.v0, r = this.v1, a = this.v2, o = this.v3;
    return n.set(Gi(t, s.x, r.x, a.x, o.x), Gi(t, s.y, r.y, a.y, o.y)), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
  }
}
class Bm extends Qe {
  constructor(t = new C(), e = new C(), n = new C(), s = new C()) {
    super(), this.isCubicBezierCurve3 = true, this.type = "CubicBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = s;
  }
  getPoint(t, e = new C()) {
    const n = e, s = this.v0, r = this.v1, a = this.v2, o = this.v3;
    return n.set(Gi(t, s.x, r.x, a.x, o.x), Gi(t, s.y, r.y, a.y, o.y), Gi(t, s.z, r.z, a.z, o.z)), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
  }
}
class tc extends Qe {
  constructor(t = new it(), e = new it()) {
    super(), this.isLineCurve = true, this.type = "LineCurve", this.v1 = t, this.v2 = e;
  }
  getPoint(t, e = new it()) {
    const n = e;
    return t === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n;
  }
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e = new it()) {
    return e.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(t, e) {
    return this.getTangent(t, e);
  }
  copy(t) {
    return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class zm extends Qe {
  constructor(t = new C(), e = new C()) {
    super(), this.isLineCurve3 = true, this.type = "LineCurve3", this.v1 = t, this.v2 = e;
  }
  getPoint(t, e = new C()) {
    const n = e;
    return t === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n;
  }
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e = new C()) {
    return e.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(t, e) {
    return this.getTangent(t, e);
  }
  copy(t) {
    return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class ec extends Qe {
  constructor(t = new it(), e = new it(), n = new it()) {
    super(), this.isQuadraticBezierCurve = true, this.type = "QuadraticBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n;
  }
  getPoint(t, e = new it()) {
    const n = e, s = this.v0, r = this.v1, a = this.v2;
    return n.set(Hi(t, s.x, r.x, a.x), Hi(t, s.y, r.y, a.y)), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class km extends Qe {
  constructor(t = new C(), e = new C(), n = new C()) {
    super(), this.isQuadraticBezierCurve3 = true, this.type = "QuadraticBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n;
  }
  getPoint(t, e = new C()) {
    const n = e, s = this.v0, r = this.v1, a = this.v2;
    return n.set(Hi(t, s.x, r.x, a.x), Hi(t, s.y, r.y, a.y), Hi(t, s.z, r.z, a.z)), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class nc extends Qe {
  constructor(t = []) {
    super(), this.isSplineCurve = true, this.type = "SplineCurve", this.points = t;
  }
  getPoint(t, e = new it()) {
    const n = e, s = this.points, r = (s.length - 1) * t, a = Math.floor(r), o = r - a, l = s[a === 0 ? a : a - 1], c = s[a], h = s[a > s.length - 2 ? s.length - 1 : a + 1], u = s[a > s.length - 3 ? s.length - 1 : a + 2];
    return n.set(nl(o, l.x, c.x, h.x, u.x), nl(o, l.y, c.y, h.y, u.y)), n;
  }
  copy(t) {
    super.copy(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const s = t.points[e];
      this.points.push(s.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let e = 0, n = this.points.length; e < n; e++) {
      const s = this.points[e];
      t.points.push(s.toArray());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const s = t.points[e];
      this.points.push(new it().fromArray(s));
    }
    return this;
  }
}
var il = Object.freeze({ __proto__: null, ArcCurve: Rm, CatmullRomCurve3: Pm, CubicBezierCurve: Ql, CubicBezierCurve3: Bm, EllipseCurve: Da, LineCurve: tc, LineCurve3: zm, QuadraticBezierCurve: ec, QuadraticBezierCurve3: km, SplineCurve: nc });
class Hm extends Qe {
  constructor() {
    super(), this.type = "CurvePath", this.curves = [], this.autoClose = false;
  }
  add(t) {
    this.curves.push(t);
  }
  closePath() {
    const t = this.curves[0].getPoint(0), e = this.curves[this.curves.length - 1].getPoint(1);
    if (!t.equals(e)) {
      const n = t.isVector2 === true ? "LineCurve" : "LineCurve3";
      this.curves.push(new il[n](e, t));
    }
    return this;
  }
  getPoint(t, e) {
    const n = t * this.getLength(), s = this.getCurveLengths();
    let r = 0;
    for (; r < s.length; ) {
      if (s[r] >= n) {
        const a = s[r] - n, o = this.curves[r], l = o.getLength(), c = l === 0 ? 0 : 1 - a / l;
        return o.getPointAt(c, e);
      }
      r++;
    }
    return null;
  }
  getLength() {
    const t = this.getCurveLengths();
    return t[t.length - 1];
  }
  updateArcLengths() {
    this.needsUpdate = true, this.cacheLengths = null, this.getCurveLengths();
  }
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
    const t = [];
    let e = 0;
    for (let n = 0, s = this.curves.length; n < s; n++) e += this.curves[n].getLength(), t.push(e);
    return this.cacheLengths = t, t;
  }
  getSpacedPoints(t = 40) {
    const e = [];
    for (let n = 0; n <= t; n++) e.push(this.getPoint(n / t));
    return this.autoClose && e.push(e[0]), e;
  }
  getPoints(t = 12) {
    const e = [];
    let n;
    for (let s = 0, r = this.curves; s < r.length; s++) {
      const a = r[s], o = a.isEllipseCurve ? t * 2 : a.isLineCurve || a.isLineCurve3 ? 1 : a.isSplineCurve ? t * a.points.length : t, l = a.getPoints(o);
      for (let c = 0; c < l.length; c++) {
        const h = l[c];
        n && n.equals(h) || (e.push(h), n = h);
      }
    }
    return this.autoClose && e.length > 1 && !e[e.length - 1].equals(e[0]) && e.push(e[0]), e;
  }
  copy(t) {
    super.copy(t), this.curves = [];
    for (let e = 0, n = t.curves.length; e < n; e++) {
      const s = t.curves[e];
      this.curves.push(s.clone());
    }
    return this.autoClose = t.autoClose, this;
  }
  toJSON() {
    const t = super.toJSON();
    t.autoClose = this.autoClose, t.curves = [];
    for (let e = 0, n = this.curves.length; e < n; e++) {
      const s = this.curves[e];
      t.curves.push(s.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.autoClose = t.autoClose, this.curves = [];
    for (let e = 0, n = t.curves.length; e < n; e++) {
      const s = t.curves[e];
      this.curves.push(new il[s.type]().fromJSON(s));
    }
    return this;
  }
}
class Gm extends Hm {
  constructor(t) {
    super(), this.type = "Path", this.currentPoint = new it(), t && this.setFromPoints(t);
  }
  setFromPoints(t) {
    this.moveTo(t[0].x, t[0].y);
    for (let e = 1, n = t.length; e < n; e++) this.lineTo(t[e].x, t[e].y);
    return this;
  }
  moveTo(t, e) {
    return this.currentPoint.set(t, e), this;
  }
  lineTo(t, e) {
    const n = new tc(this.currentPoint.clone(), new it(t, e));
    return this.curves.push(n), this.currentPoint.set(t, e), this;
  }
  quadraticCurveTo(t, e, n, s) {
    const r = new ec(this.currentPoint.clone(), new it(t, e), new it(n, s));
    return this.curves.push(r), this.currentPoint.set(n, s), this;
  }
  bezierCurveTo(t, e, n, s, r, a) {
    const o = new Ql(this.currentPoint.clone(), new it(t, e), new it(n, s), new it(r, a));
    return this.curves.push(o), this.currentPoint.set(r, a), this;
  }
  splineThru(t) {
    const e = [this.currentPoint.clone()].concat(t), n = new nc(e);
    return this.curves.push(n), this.currentPoint.copy(t[t.length - 1]), this;
  }
  arc(t, e, n, s, r, a) {
    const o = this.currentPoint.x, l = this.currentPoint.y;
    return this.absarc(t + o, e + l, n, s, r, a), this;
  }
  absarc(t, e, n, s, r, a) {
    return this.absellipse(t, e, n, n, s, r, a), this;
  }
  ellipse(t, e, n, s, r, a, o, l) {
    const c = this.currentPoint.x, h = this.currentPoint.y;
    return this.absellipse(t + c, e + h, n, s, r, a, o, l), this;
  }
  absellipse(t, e, n, s, r, a, o, l) {
    const c = new Da(t, e, n, s, r, a, o, l);
    if (this.curves.length > 0) {
      const u = c.getPoint(0);
      u.equals(this.currentPoint) || this.lineTo(u.x, u.y);
    }
    this.curves.push(c);
    const h = c.getPoint(1);
    return this.currentPoint.copy(h), this;
  }
  copy(t) {
    return super.copy(t), this.currentPoint.copy(t.currentPoint), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.currentPoint = this.currentPoint.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.currentPoint.fromArray(t.currentPoint), this;
  }
}
class Ua extends Le {
  constructor(t = [new it(0, -0.5), new it(0.5, 0), new it(0, 0.5)], e = 12, n = 0, s = Math.PI * 2) {
    super(), this.type = "LatheGeometry", this.parameters = { points: t, segments: e, phiStart: n, phiLength: s }, e = Math.floor(e), s = le(s, 0, Math.PI * 2);
    const r = [], a = [], o = [], l = [], c = [], h = 1 / e, u = new C(), d = new it(), p = new C(), g = new C(), _ = new C();
    let m = 0, f = 0;
    for (let E = 0; E <= t.length - 1; E++) switch (E) {
      case 0:
        m = t[E + 1].x - t[E].x, f = t[E + 1].y - t[E].y, p.x = f * 1, p.y = -m, p.z = f * 0, _.copy(p), p.normalize(), l.push(p.x, p.y, p.z);
        break;
      case t.length - 1:
        l.push(_.x, _.y, _.z);
        break;
      default:
        m = t[E + 1].x - t[E].x, f = t[E + 1].y - t[E].y, p.x = f * 1, p.y = -m, p.z = f * 0, g.copy(p), p.x += _.x, p.y += _.y, p.z += _.z, p.normalize(), l.push(p.x, p.y, p.z), _.copy(g);
    }
    for (let E = 0; E <= e; E++) {
      const T = n + E * h * s, y = Math.sin(T), N = Math.cos(T);
      for (let w = 0; w <= t.length - 1; w++) {
        u.x = t[w].x * y, u.y = t[w].y, u.z = t[w].x * N, a.push(u.x, u.y, u.z), d.x = E / e, d.y = w / (t.length - 1), o.push(d.x, d.y);
        const A = l[3 * w + 0] * y, L = l[3 * w + 1], S = l[3 * w + 0] * N;
        c.push(A, L, S);
      }
    }
    for (let E = 0; E < e; E++) for (let T = 0; T < t.length - 1; T++) {
      const y = T + E * t.length, N = y, w = y + t.length, A = y + t.length + 1, L = y + 1;
      r.push(N, w, L), r.push(A, L, w);
    }
    this.setIndex(r), this.setAttribute("position", new ce(a, 3)), this.setAttribute("uv", new ce(o, 2)), this.setAttribute("normal", new ce(c, 3));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Ua(t.points, t.segments, t.phiStart, t.phiLength);
  }
}
class Na extends Ua {
  constructor(t = 1, e = 1, n = 4, s = 8) {
    const r = new Gm();
    r.absarc(0, -e / 2, t, Math.PI * 1.5, 0), r.absarc(0, e / 2, t, 0, Math.PI * 0.5), super(r.getPoints(n), s), this.type = "CapsuleGeometry", this.parameters = { radius: t, length: e, capSegments: n, radialSegments: s };
  }
  static fromJSON(t) {
    return new Na(t.radius, t.length, t.capSegments, t.radialSegments);
  }
}
class Ws extends Le {
  constructor(t = 1, e = 1, n = 1, s = 32, r = 1, a = false, o = 0, l = Math.PI * 2) {
    super(), this.type = "CylinderGeometry", this.parameters = { radiusTop: t, radiusBottom: e, height: n, radialSegments: s, heightSegments: r, openEnded: a, thetaStart: o, thetaLength: l };
    const c = this;
    s = Math.floor(s), r = Math.floor(r);
    const h = [], u = [], d = [], p = [];
    let g = 0;
    const _ = [], m = n / 2;
    let f = 0;
    E(), a === false && (t > 0 && T(true), e > 0 && T(false)), this.setIndex(h), this.setAttribute("position", new ce(u, 3)), this.setAttribute("normal", new ce(d, 3)), this.setAttribute("uv", new ce(p, 2));
    function E() {
      const y = new C(), N = new C();
      let w = 0;
      const A = (e - t) / n;
      for (let L = 0; L <= r; L++) {
        const S = [], M = L / r, R = M * (e - t) + t;
        for (let k = 0; k <= s; k++) {
          const z = k / s, W = z * l + o, Z = Math.sin(W), V = Math.cos(W);
          N.x = R * Z, N.y = -M * n + m, N.z = R * V, u.push(N.x, N.y, N.z), y.set(Z, A, V).normalize(), d.push(y.x, y.y, y.z), p.push(z, 1 - M), S.push(g++);
        }
        _.push(S);
      }
      for (let L = 0; L < s; L++) for (let S = 0; S < r; S++) {
        const M = _[S][L], R = _[S + 1][L], k = _[S + 1][L + 1], z = _[S][L + 1];
        (t > 0 || S !== 0) && (h.push(M, R, z), w += 3), (e > 0 || S !== r - 1) && (h.push(R, k, z), w += 3);
      }
      c.addGroup(f, w, 0), f += w;
    }
    function T(y) {
      const N = g, w = new it(), A = new C();
      let L = 0;
      const S = y === true ? t : e, M = y === true ? 1 : -1;
      for (let k = 1; k <= s; k++) u.push(0, m * M, 0), d.push(0, M, 0), p.push(0.5, 0.5), g++;
      const R = g;
      for (let k = 0; k <= s; k++) {
        const W = k / s * l + o, Z = Math.cos(W), V = Math.sin(W);
        A.x = S * V, A.y = m * M, A.z = S * Z, u.push(A.x, A.y, A.z), d.push(0, M, 0), w.x = Z * 0.5 + 0.5, w.y = V * 0.5 * M + 0.5, p.push(w.x, w.y), g++;
      }
      for (let k = 0; k < s; k++) {
        const z = N + k, W = R + k;
        y === true ? h.push(W, W + 1, z) : h.push(W + 1, W, z), L += 3;
      }
      c.addGroup(f, L, y === true ? 1 : 2), f += L;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Ws(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
  }
}
const bs = new C(), Ts = new C(), Ar = new C(), As = new Oe();
class Vm extends Le {
  constructor(t = null, e = 1) {
    if (super(), this.type = "EdgesGeometry", this.parameters = { geometry: t, thresholdAngle: e }, t !== null) {
      const s = Math.pow(10, 4), r = Math.cos(ki * e), a = t.getIndex(), o = t.getAttribute("position"), l = a ? a.count : o.count, c = [0, 0, 0], h = ["a", "b", "c"], u = new Array(3), d = {}, p = [];
      for (let g = 0; g < l; g += 3) {
        a ? (c[0] = a.getX(g), c[1] = a.getX(g + 1), c[2] = a.getX(g + 2)) : (c[0] = g, c[1] = g + 1, c[2] = g + 2);
        const { a: _, b: m, c: f } = As;
        if (_.fromBufferAttribute(o, c[0]), m.fromBufferAttribute(o, c[1]), f.fromBufferAttribute(o, c[2]), As.getNormal(Ar), u[0] = `${Math.round(_.x * s)},${Math.round(_.y * s)},${Math.round(_.z * s)}`, u[1] = `${Math.round(m.x * s)},${Math.round(m.y * s)},${Math.round(m.z * s)}`, u[2] = `${Math.round(f.x * s)},${Math.round(f.y * s)},${Math.round(f.z * s)}`, !(u[0] === u[1] || u[1] === u[2] || u[2] === u[0])) for (let E = 0; E < 3; E++) {
          const T = (E + 1) % 3, y = u[E], N = u[T], w = As[h[E]], A = As[h[T]], L = `${y}_${N}`, S = `${N}_${y}`;
          S in d && d[S] ? (Ar.dot(d[S].normal) <= r && (p.push(w.x, w.y, w.z), p.push(A.x, A.y, A.z)), d[S] = null) : L in d || (d[L] = { index0: c[E], index1: c[T], normal: Ar.clone() });
        }
      }
      for (const g in d) if (d[g]) {
        const { index0: _, index1: m } = d[g];
        bs.fromBufferAttribute(o, _), Ts.fromBufferAttribute(o, m), p.push(bs.x, bs.y, bs.z), p.push(Ts.x, Ts.y, Ts.z);
      }
      this.setAttribute("position", new ce(p, 3));
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
}
class Xs extends Le {
  constructor(t = 1, e = 32, n = 16, s = 0, r = Math.PI * 2, a = 0, o = Math.PI) {
    super(), this.type = "SphereGeometry", this.parameters = { radius: t, widthSegments: e, heightSegments: n, phiStart: s, phiLength: r, thetaStart: a, thetaLength: o }, e = Math.max(3, Math.floor(e)), n = Math.max(2, Math.floor(n));
    const l = Math.min(a + o, Math.PI);
    let c = 0;
    const h = [], u = new C(), d = new C(), p = [], g = [], _ = [], m = [];
    for (let f = 0; f <= n; f++) {
      const E = [], T = f / n;
      let y = 0;
      f === 0 && a === 0 ? y = 0.5 / e : f === n && l === Math.PI && (y = -0.5 / e);
      for (let N = 0; N <= e; N++) {
        const w = N / e;
        u.x = -t * Math.cos(s + w * r) * Math.sin(a + T * o), u.y = t * Math.cos(a + T * o), u.z = t * Math.sin(s + w * r) * Math.sin(a + T * o), g.push(u.x, u.y, u.z), d.copy(u).normalize(), _.push(d.x, d.y, d.z), m.push(w + y, 1 - T), E.push(c++);
      }
      h.push(E);
    }
    for (let f = 0; f < n; f++) for (let E = 0; E < e; E++) {
      const T = h[f][E + 1], y = h[f][E], N = h[f + 1][E], w = h[f + 1][E + 1];
      (f !== 0 || a > 0) && p.push(T, y, w), (f !== n - 1 || l < Math.PI) && p.push(y, N, w);
    }
    this.setIndex(p), this.setAttribute("position", new ce(g, 3)), this.setAttribute("normal", new ce(_, 3)), this.setAttribute("uv", new ce(m, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Xs(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
  }
}
class ic extends Ei {
  static get type() {
    return "MeshStandardMaterial";
  }
  constructor(t) {
    super(), this.isMeshStandardMaterial = true, this.defines = { STANDARD: "" }, this.color = new It(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new It(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = Ll, this.normalScale = new it(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Ke(), this.envMapIntensity = 1, this.wireframe = false, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = false, this.fog = true, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.defines = { STANDARD: "" }, this.color.copy(t.color), this.roughness = t.roughness, this.metalness = t.metalness, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.roughnessMap = t.roughnessMap, this.metalnessMap = t.metalnessMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.envMapIntensity = t.envMapIntensity, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this.fog = t.fog, this;
  }
}
class sl extends ic {
  static get type() {
    return "MeshPhysicalMaterial";
  }
  constructor(t) {
    super(), this.isMeshPhysicalMaterial = true, this.defines = { STANDARD: "", PHYSICAL: "" }, this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new it(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", { get: function() {
      return le(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
    }, set: function(e) {
      this.ior = (1 + 0.4 * e) / (1 - 0.4 * e);
    } }), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessRange = [100, 400], this.iridescenceThicknessMap = null, this.sheenColor = new It(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 1 / 0, this.attenuationColor = new It(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new It(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._dispersion = 0, this._iridescence = 0, this._sheen = 0, this._transmission = 0, this.setValues(t);
  }
  get anisotropy() {
    return this._anisotropy;
  }
  set anisotropy(t) {
    this._anisotropy > 0 != t > 0 && this.version++, this._anisotropy = t;
  }
  get clearcoat() {
    return this._clearcoat;
  }
  set clearcoat(t) {
    this._clearcoat > 0 != t > 0 && this.version++, this._clearcoat = t;
  }
  get iridescence() {
    return this._iridescence;
  }
  set iridescence(t) {
    this._iridescence > 0 != t > 0 && this.version++, this._iridescence = t;
  }
  get dispersion() {
    return this._dispersion;
  }
  set dispersion(t) {
    this._dispersion > 0 != t > 0 && this.version++, this._dispersion = t;
  }
  get sheen() {
    return this._sheen;
  }
  set sheen(t) {
    this._sheen > 0 != t > 0 && this.version++, this._sheen = t;
  }
  get transmission() {
    return this._transmission;
  }
  set transmission(t) {
    this._transmission > 0 != t > 0 && this.version++, this._transmission = t;
  }
  copy(t) {
    return super.copy(t), this.defines = { STANDARD: "", PHYSICAL: "" }, this.anisotropy = t.anisotropy, this.anisotropyRotation = t.anisotropyRotation, this.anisotropyMap = t.anisotropyMap, this.clearcoat = t.clearcoat, this.clearcoatMap = t.clearcoatMap, this.clearcoatRoughness = t.clearcoatRoughness, this.clearcoatRoughnessMap = t.clearcoatRoughnessMap, this.clearcoatNormalMap = t.clearcoatNormalMap, this.clearcoatNormalScale.copy(t.clearcoatNormalScale), this.dispersion = t.dispersion, this.ior = t.ior, this.iridescence = t.iridescence, this.iridescenceMap = t.iridescenceMap, this.iridescenceIOR = t.iridescenceIOR, this.iridescenceThicknessRange = [...t.iridescenceThicknessRange], this.iridescenceThicknessMap = t.iridescenceThicknessMap, this.sheen = t.sheen, this.sheenColor.copy(t.sheenColor), this.sheenColorMap = t.sheenColorMap, this.sheenRoughness = t.sheenRoughness, this.sheenRoughnessMap = t.sheenRoughnessMap, this.transmission = t.transmission, this.transmissionMap = t.transmissionMap, this.thickness = t.thickness, this.thicknessMap = t.thicknessMap, this.attenuationDistance = t.attenuationDistance, this.attenuationColor.copy(t.attenuationColor), this.specularIntensity = t.specularIntensity, this.specularIntensityMap = t.specularIntensityMap, this.specularColor.copy(t.specularColor), this.specularColorMap = t.specularColorMap, this;
  }
}
class Fa extends fe {
  constructor(t, e = 1) {
    super(), this.isLight = true, this.type = "Light", this.color = new It(t), this.intensity = e;
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
class Wm extends Fa {
  constructor(t, e, n) {
    super(t, n), this.isHemisphereLight = true, this.type = "HemisphereLight", this.position.copy(fe.DEFAULT_UP), this.updateMatrix(), this.groundColor = new It(e);
  }
  copy(t, e) {
    return super.copy(t, e), this.groundColor.copy(t.groundColor), this;
  }
}
const wr = new Xt(), rl = new C(), al = new C();
class sc {
  constructor(t) {
    this.camera = t, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new it(512, 512), this.map = null, this.mapPass = null, this.matrix = new Xt(), this.autoUpdate = true, this.needsUpdate = false, this._frustum = new Ra(), this._frameExtents = new it(1, 1), this._viewportCount = 1, this._viewports = [new Zt(0, 0, 1, 1)];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(t) {
    const e = this.camera, n = this.matrix;
    rl.setFromMatrixPosition(t.matrixWorld), e.position.copy(rl), al.setFromMatrixPosition(t.target.matrixWorld), e.lookAt(al), e.updateMatrixWorld(), wr.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), this._frustum.setFromProjectionMatrix(wr), n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1), n.multiply(wr);
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
const ol = new Xt(), Ni = new C(), Cr = new C();
class Xm extends sc {
  constructor() {
    super(new Re(90, 1, 0.5, 500)), this.isPointLightShadow = true, this._frameExtents = new it(4, 2), this._viewportCount = 6, this._viewports = [new Zt(2, 1, 1, 1), new Zt(0, 1, 1, 1), new Zt(3, 1, 1, 1), new Zt(1, 1, 1, 1), new Zt(3, 0, 1, 1), new Zt(1, 0, 1, 1)], this._cubeDirections = [new C(1, 0, 0), new C(-1, 0, 0), new C(0, 0, 1), new C(0, 0, -1), new C(0, 1, 0), new C(0, -1, 0)], this._cubeUps = [new C(0, 1, 0), new C(0, 1, 0), new C(0, 1, 0), new C(0, 1, 0), new C(0, 0, 1), new C(0, 0, -1)];
  }
  updateMatrices(t, e = 0) {
    const n = this.camera, s = this.matrix, r = t.distance || n.far;
    r !== n.far && (n.far = r, n.updateProjectionMatrix()), Ni.setFromMatrixPosition(t.matrixWorld), n.position.copy(Ni), Cr.copy(n.position), Cr.add(this._cubeDirections[e]), n.up.copy(this._cubeUps[e]), n.lookAt(Cr), n.updateMatrixWorld(), s.makeTranslation(-Ni.x, -Ni.y, -Ni.z), ol.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse), this._frustum.setFromProjectionMatrix(ol);
  }
}
class Ym extends Fa {
  constructor(t, e, n = 0, s = 2) {
    super(t, e), this.isPointLight = true, this.type = "PointLight", this.distance = n, this.decay = s, this.shadow = new Xm();
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
class qm extends sc {
  constructor() {
    super(new Xl(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = true;
  }
}
class ll extends Fa {
  constructor(t, e) {
    super(t, e), this.isDirectionalLight = true, this.type = "DirectionalLight", this.position.copy(fe.DEFAULT_UP), this.updateMatrix(), this.target = new fe(), this.shadow = new qm();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t) {
    return super.copy(t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), this;
  }
}
class cl {
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
    return this.radius = Math.sqrt(t * t + e * e + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(t, n), this.phi = Math.acos(le(e / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class $m extends Vn {
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
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: Ma } }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = Ma);
const hl = { type: "change" }, Oa = { type: "start" }, rc = { type: "end" }, ws = new Ca(), ul = new yn(), Zm = Math.cos(70 * hh.DEG2RAD), oe = new C(), be = 2 * Math.PI, $t = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_PAN: 4, TOUCH_DOLLY_PAN: 5, TOUCH_DOLLY_ROTATE: 6 }, Rr = 1e-6;
class jm extends $m {
  constructor(t, e = null) {
    super(t, e), this.state = $t.NONE, this.enabled = true, this.target = new C(), this.cursor = new C(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = false, this.dampingFactor = 0.05, this.enableZoom = true, this.zoomSpeed = 1, this.enableRotate = true, this.rotateSpeed = 1, this.enablePan = true, this.panSpeed = 1, this.screenSpacePanning = true, this.keyPanSpeed = 7, this.zoomToCursor = false, this.autoRotate = false, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: hi.ROTATE, MIDDLE: hi.DOLLY, RIGHT: hi.PAN }, this.touches = { ONE: li.ROTATE, TWO: li.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new C(), this._lastQuaternion = new Gn(), this._lastTargetPosition = new C(), this._quat = new Gn().setFromUnitVectors(t.up, new C(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new cl(), this._sphericalDelta = new cl(), this._scale = 1, this._panOffset = new C(), this._rotateStart = new it(), this._rotateEnd = new it(), this._rotateDelta = new it(), this._panStart = new it(), this._panEnd = new it(), this._panDelta = new it(), this._dollyStart = new it(), this._dollyEnd = new it(), this._dollyDelta = new it(), this._dollyDirection = new C(), this._mouse = new it(), this._performCursorZoom = false, this._pointers = [], this._pointerPositions = {}, this._controlActive = false, this._onPointerMove = Jm.bind(this), this._onPointerDown = Km.bind(this), this._onPointerUp = Qm.bind(this), this._onContextMenu = ag.bind(this), this._onMouseWheel = ng.bind(this), this._onKeyDown = ig.bind(this), this._onTouchStart = sg.bind(this), this._onTouchMove = rg.bind(this), this._onMouseDown = tg.bind(this), this._onMouseMove = eg.bind(this), this._interceptControlDown = og.bind(this), this._interceptControlUp = lg.bind(this), this.domElement !== null && this.connect(), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(hl), this.update(), this.state = $t.NONE;
  }
  update(t = null) {
    const e = this.object.position;
    oe.copy(e).sub(this.target), oe.applyQuaternion(this._quat), this._spherical.setFromVector3(oe), this.autoRotate && this.state === $t.NONE && this._rotateLeft(this._getAutoRotationAngle(t)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let n = this.minAzimuthAngle, s = this.maxAzimuthAngle;
    isFinite(n) && isFinite(s) && (n < -Math.PI ? n += be : n > Math.PI && (n -= be), s < -Math.PI ? s += be : s > Math.PI && (s -= be), n <= s ? this._spherical.theta = Math.max(n, Math.min(s, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + s) / 2 ? Math.max(n, this._spherical.theta) : Math.min(s, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === true ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let r = false;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const a = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), r = a != this._spherical.radius;
    }
    if (oe.setFromSpherical(this._spherical), oe.applyQuaternion(this._quatInverse), e.copy(this.target).add(oe), this.object.lookAt(this.target), this.enableDamping === true ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let a = null;
      if (this.object.isPerspectiveCamera) {
        const o = oe.length();
        a = this._clampDistance(o * this._scale);
        const l = o - a;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), r = !!l;
      } else if (this.object.isOrthographicCamera) {
        const o = new C(this._mouse.x, this._mouse.y, 0);
        o.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), r = l !== this.object.zoom;
        const c = new C(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object), this.object.position.sub(c).add(o), this.object.updateMatrixWorld(), a = oe.length();
      } else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = false;
      a !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position) : (ws.origin.copy(this.object.position), ws.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(ws.direction)) < Zm ? this.object.lookAt(this.target) : (ul.setFromNormalAndCoplanarPoint(this.object.up, this.target), ws.intersectPlane(ul, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const a = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), a !== this.object.zoom && (this.object.updateProjectionMatrix(), r = true);
    }
    return this._scale = 1, this._performCursorZoom = false, r || this._lastPosition.distanceToSquared(this.object.position) > Rr || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Rr || this._lastTargetPosition.distanceToSquared(this.target) > Rr ? (this.dispatchEvent(hl), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), true) : false;
  }
  _getAutoRotationAngle(t) {
    return t !== null ? be / 60 * this.autoRotateSpeed * t : be / 60 / 60 * this.autoRotateSpeed;
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
    oe.setFromMatrixColumn(e, 0), oe.multiplyScalar(-t), this._panOffset.add(oe);
  }
  _panUp(t, e) {
    this.screenSpacePanning === true ? oe.setFromMatrixColumn(e, 1) : (oe.setFromMatrixColumn(e, 0), oe.crossVectors(this.object.up, oe)), oe.multiplyScalar(t), this._panOffset.add(oe);
  }
  _pan(t, e) {
    const n = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const s = this.object.position;
      oe.copy(s).sub(this.target);
      let r = oe.length();
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
    this._rotateLeft(be * this._rotateDelta.x / e.clientHeight), this._rotateUp(be * this._rotateDelta.y / e.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateUp(be * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, this.keyPanSpeed), e = true;
        break;
      case this.keys.BOTTOM:
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateUp(-be * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, -this.keyPanSpeed), e = true;
        break;
      case this.keys.LEFT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateLeft(be * this.rotateSpeed / this.domElement.clientHeight) : this._pan(this.keyPanSpeed, 0), e = true;
        break;
      case this.keys.RIGHT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateLeft(-be * this.rotateSpeed / this.domElement.clientHeight) : this._pan(-this.keyPanSpeed, 0), e = true;
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
    this._rotateLeft(be * this._rotateDelta.x / e.clientHeight), this._rotateUp(be * this._rotateDelta.y / e.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
    e === void 0 && (e = new it(), this._pointerPositions[t.pointerId] = e), e.set(t.pageX, t.pageY);
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
function Km(i) {
  this.enabled !== false && (this._pointers.length === 0 && (this.domElement.setPointerCapture(i.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(i) && (this._addPointer(i), i.pointerType === "touch" ? this._onTouchStart(i) : this._onMouseDown(i)));
}
function Jm(i) {
  this.enabled !== false && (i.pointerType === "touch" ? this._onTouchMove(i) : this._onMouseMove(i));
}
function Qm(i) {
  switch (this._removePointer(i), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(i.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(rc), this.state = $t.NONE;
      break;
    case 1:
      const t = this._pointers[0], e = this._pointerPositions[t];
      this._onTouchStart({ pointerId: t, pageX: e.x, pageY: e.y });
      break;
  }
}
function tg(i) {
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
    case hi.DOLLY:
      if (this.enableZoom === false) return;
      this._handleMouseDownDolly(i), this.state = $t.DOLLY;
      break;
    case hi.ROTATE:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enablePan === false) return;
        this._handleMouseDownPan(i), this.state = $t.PAN;
      } else {
        if (this.enableRotate === false) return;
        this._handleMouseDownRotate(i), this.state = $t.ROTATE;
      }
      break;
    case hi.PAN:
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
  this.state !== $t.NONE && this.dispatchEvent(Oa);
}
function eg(i) {
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
function ng(i) {
  this.enabled === false || this.enableZoom === false || this.state !== $t.NONE || (i.preventDefault(), this.dispatchEvent(Oa), this._handleMouseWheel(this._customWheelEvent(i)), this.dispatchEvent(rc));
}
function ig(i) {
  this.enabled === false || this.enablePan === false || this._handleKeyDown(i);
}
function sg(i) {
  switch (this._trackPointer(i), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case li.ROTATE:
          if (this.enableRotate === false) return;
          this._handleTouchStartRotate(i), this.state = $t.TOUCH_ROTATE;
          break;
        case li.PAN:
          if (this.enablePan === false) return;
          this._handleTouchStartPan(i), this.state = $t.TOUCH_PAN;
          break;
        default:
          this.state = $t.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case li.DOLLY_PAN:
          if (this.enableZoom === false && this.enablePan === false) return;
          this._handleTouchStartDollyPan(i), this.state = $t.TOUCH_DOLLY_PAN;
          break;
        case li.DOLLY_ROTATE:
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
  this.state !== $t.NONE && this.dispatchEvent(Oa);
}
function rg(i) {
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
function ag(i) {
  this.enabled !== false && i.preventDefault();
}
function og(i) {
  i.key === "Control" && (this._controlActive = true, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: true, capture: true }));
}
function lg(i) {
  i.key === "Control" && (this._controlActive = false, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: true, capture: true }));
}
const Fi = new C();
function Ne(i, t, e, n, s, r) {
  const a = 2 * Math.PI * s / 4, o = Math.max(r - 2 * s, 0), l = Math.PI / 4;
  Fi.copy(t), Fi[n] = 0, Fi.normalize();
  const c = 0.5 * a / (a + o), h = 1 - Fi.angleTo(i) / l;
  return Math.sign(Fi[e]) === 1 ? h * c : o / (a + o) + c + c * (1 - h);
}
class cg extends Je {
  constructor(t = 1, e = 1, n = 1, s = 2, r = 0.1) {
    if (s = s * 2 + 1, r = Math.min(t / 2, e / 2, n / 2, r), super(1, 1, 1, s, s, s), s === 1) return;
    const a = this.toNonIndexed();
    this.index = null, this.attributes.position = a.attributes.position, this.attributes.normal = a.attributes.normal, this.attributes.uv = a.attributes.uv;
    const o = new C(), l = new C(), c = new C(t, e, n).divideScalar(2).subScalar(r), h = this.attributes.position.array, u = this.attributes.normal.array, d = this.attributes.uv.array, p = h.length / 6, g = new C(), _ = 0.5 / s;
    for (let m = 0, f = 0; m < h.length; m += 3, f += 2) switch (o.fromArray(h, m), l.copy(o), l.x -= Math.sign(l.x) * _, l.y -= Math.sign(l.y) * _, l.z -= Math.sign(l.z) * _, l.normalize(), h[m + 0] = c.x * Math.sign(o.x) + l.x * r, h[m + 1] = c.y * Math.sign(o.y) + l.y * r, h[m + 2] = c.z * Math.sign(o.z) + l.z * r, u[m + 0] = l.x, u[m + 1] = l.y, u[m + 2] = l.z, Math.floor(m / p)) {
      case 0:
        g.set(1, 0, 0), d[f + 0] = Ne(g, l, "z", "y", r, n), d[f + 1] = 1 - Ne(g, l, "y", "z", r, e);
        break;
      case 1:
        g.set(-1, 0, 0), d[f + 0] = 1 - Ne(g, l, "z", "y", r, n), d[f + 1] = 1 - Ne(g, l, "y", "z", r, e);
        break;
      case 2:
        g.set(0, 1, 0), d[f + 0] = 1 - Ne(g, l, "x", "z", r, t), d[f + 1] = Ne(g, l, "z", "x", r, n);
        break;
      case 3:
        g.set(0, -1, 0), d[f + 0] = 1 - Ne(g, l, "x", "z", r, t), d[f + 1] = 1 - Ne(g, l, "z", "x", r, n);
        break;
      case 4:
        g.set(0, 0, 1), d[f + 0] = 1 - Ne(g, l, "x", "y", r, t), d[f + 1] = 1 - Ne(g, l, "y", "x", r, e);
        break;
      case 5:
        g.set(0, 0, -1), d[f + 0] = Ne(g, l, "x", "y", r, t), d[f + 1] = 1 - Ne(g, l, "y", "x", r, e);
        break;
    }
  }
}
function hg(i, t = false) {
  const e = i[0].index !== null, n = new Set(Object.keys(i[0].attributes)), s = new Set(Object.keys(i[0].morphAttributes)), r = {}, a = {}, o = i[0].morphTargetsRelative, l = new Le();
  let c = 0;
  for (let h = 0; h < i.length; ++h) {
    const u = i[h];
    let d = 0;
    if (e !== (u.index !== null)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
    for (const p in u.attributes) {
      if (!n.has(p)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + '. All geometries must have compatible attributes; make sure "' + p + '" attribute exists among all geometries, or in none of them.'), null;
      r[p] === void 0 && (r[p] = []), r[p].push(u.attributes[p]), d++;
    }
    if (d !== n.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + ". Make sure all geometries have the same number of attributes."), null;
    if (o !== u.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
    for (const p in u.morphAttributes) {
      if (!s.has(p)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + ".  .morphAttributes must be consistent throughout all geometries."), null;
      a[p] === void 0 && (a[p] = []), a[p].push(u.morphAttributes[p]);
    }
    if (t) {
      let p;
      if (e) p = u.index.count;
      else if (u.attributes.position !== void 0) p = u.attributes.position.count;
      else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + ". The geometry must have either an index or a position attribute"), null;
      l.addGroup(c, p, h), c += p;
    }
  }
  if (e) {
    let h = 0;
    const u = [];
    for (let d = 0; d < i.length; ++d) {
      const p = i[d].index;
      for (let g = 0; g < p.count; ++g) u.push(p.getX(g) + h);
      h += i[d].attributes.position.count;
    }
    l.setIndex(u);
  }
  for (const h in r) {
    const u = dl(r[h]);
    if (!u) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + h + " attribute."), null;
    l.setAttribute(h, u);
  }
  for (const h in a) {
    const u = a[h][0].length;
    if (u === 0) break;
    l.morphAttributes = l.morphAttributes || {}, l.morphAttributes[h] = [];
    for (let d = 0; d < u; ++d) {
      const p = [];
      for (let _ = 0; _ < a[h].length; ++_) p.push(a[h][_][d]);
      const g = dl(p);
      if (!g) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + h + " morphAttribute."), null;
      l.morphAttributes[h].push(g);
    }
  }
  return l;
}
function dl(i) {
  let t, e, n, s = -1, r = 0;
  for (let c = 0; c < i.length; ++c) {
    const h = i[c];
    if (t === void 0 && (t = h.array.constructor), t !== h.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
    if (e === void 0 && (e = h.itemSize), e !== h.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
    if (n === void 0 && (n = h.normalized), n !== h.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
    if (s === -1 && (s = h.gpuType), s !== h.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
    r += h.count * e;
  }
  const a = new t(r), o = new Be(a, e, n);
  let l = 0;
  for (let c = 0; c < i.length; ++c) {
    const h = i[c];
    if (h.isInterleavedBufferAttribute) {
      const u = l / e;
      for (let d = 0, p = h.count; d < p; d++) for (let g = 0; g < e; g++) {
        const _ = h.getComponent(d, g);
        o.setComponent(d + u, g, _);
      }
    } else a.set(h.array, l);
    l += h.count * e;
  }
  return s !== void 0 && (o.gpuType = s), o;
}
const ug = { penny: "metal", paperclip: "metal", usb_c: "metal", sd_card: "metal", soda_can: "metal", mm_candy: "plastic", lego_brick: "plastic", billiard_ball: "plastic", rubiks_cube: "plastic", iphone: "plastic", computer_mouse: "plastic", tv_remote: "plastic", tennis_ball: "matte", ant: "matte", postage_stamp: "matte", grain_of_rice: "organic", grain_of_sand: "organic", sesame_seed: "organic", blueberry: "organic", cherry: "organic", apple: "organic", banana: "organic", watermelon: "organic", lightbulb: "glass", pill_capsule: "glossy", golf_ball: "glossy", baseball: "glossy", basketball: "glossy", coffee_mug: "glossy" };
function dg(i) {
  switch (ug[i] ?? "glossy") {
    case "metal":
      return { roughness: 0.15, metalness: 0.85, clearcoat: 0.3, clearcoatRoughness: 0.2 };
    case "plastic":
      return { roughness: 0.1, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.05 };
    case "glossy":
      return { roughness: 0.25, metalness: 0.05, clearcoat: 0.6, clearcoatRoughness: 0.15 };
    case "matte":
      return { roughness: 0.85, metalness: 0 };
    case "organic":
      return { roughness: 0.5, metalness: 0, clearcoat: 0.2, clearcoatRoughness: 0.5 };
    case "glass":
      return { roughness: 0.05, metalness: 0, clearcoat: 1, clearcoatRoughness: 0 };
  }
}
function fg(i) {
  const t = new _a(i), e = new Kl(), n = new Xs(50, 64, 32), s = new dn({ side: xe, depthWrite: false, uniforms: {}, vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = normalize((modelMatrix * vec4(position, 1.0)).xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `, fragmentShader: `
      varying vec3 vDir;
      void main() {
        float y = vDir.y * 0.5 + 0.5;

        vec3 lo = vec3(0.01, 0.01, 0.03);
        vec3 mi = vec3(0.04, 0.05, 0.15);
        vec3 hi = vec3(0.10, 0.10, 0.30);

        vec3 c = mix(lo, mi, smoothstep(0.0, 0.35, y));
        c = mix(c, hi, smoothstep(0.4, 1.0, y));

        float s1 = pow(max(0.0, dot(vDir, normalize(vec3( 1.0, 0.7, 0.5)))), 128.0);
        float s2 = pow(max(0.0, dot(vDir, normalize(vec3(-0.6, 0.4,-0.8)))),  64.0);
        float s3 = pow(max(0.0, dot(vDir, normalize(vec3( 0.0, 1.0, 0.0)))),  16.0);

        c += vec3(1.0, 0.95, 0.85) * s1 * 3.0;
        c += vec3(0.0, 0.90, 1.00) * s2 * 1.5;
        c += vec3(0.15, 0.20, 0.40) * s3 * 0.8;

        gl_FragColor = vec4(c, 1.0);
      }
    ` });
  e.add(new ve(n, s));
  const a = t.fromScene(e, 0, 0.1, 100).texture;
  return t.dispose(), n.dispose(), s.dispose(), a;
}
function pg(i, t, e) {
  const n = t * 0.78, s = t * 0.22, r = Math.min(i, e) * 0.11, a = new Je(i, n, e);
  a.translate(0, n / 2, 0);
  const o = [a], l = 4, c = 2, h = i / l, u = e / c;
  for (let g = 0; g < l; g++) for (let _ = 0; _ < c; _++) {
    const m = new Ws(r, r, s, 8);
    m.translate(-i / 2 + h * (g + 0.5), n + s / 2, -e / 2 + u * (_ + 0.5)), o.push(m);
  }
  const d = hg(o);
  if (!d) return new Je(i, t, e);
  d.computeBoundingBox();
  const p = new C();
  d.boundingBox.getCenter(p), d.translate(-p.x, -p.y, -p.z);
  for (const g of o) g.dispose();
  return d;
}
class mg {
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
    __publicField(this, "envTexture", null);
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
    this.container = t;
    const e = t.clientWidth, n = t.clientHeight;
    this.renderer = new bm({ antialias: true, alpha: true }), this.renderer.setSize(e, n), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.toneMapping = Ml, this.renderer.toneMappingExposure = 1.3, this.renderer.shadowMap.enabled = true, this.renderer.shadowMap.type = vl, t.appendChild(this.renderer.domElement), this.scene = new Kl(), this.scene.background = new It(526868), this.scene.fog = new La(526868, 0.012), this.envTexture = fg(this.renderer), this.scene.environment = this.envTexture, this.camera = new Re(45, e / n, 0.01, 500), this.camera.position.set(3, 2.5, 4), this.controls = new jm(this.camera, this.renderer.domElement), this.controls.enableDamping = true, this.controls.dampingFactor = 0.05, this.controls.autoRotate = true, this.controls.autoRotateSpeed = 0.4, this.controls.maxPolarAngle = Math.PI * 0.85, this.controls.minDistance = 1, this.controls.maxDistance = 25, this.scene.add(new Wm(8952251, 2236996, 0.5));
    const s = new ll(16777215, 1.2);
    s.position.set(5, 8, 4), s.castShadow = true, s.shadow.mapSize.set(1024, 1024), s.shadow.camera.near = 0.5, s.shadow.camera.far = 30;
    const r = 8;
    s.shadow.camera.left = -r, s.shadow.camera.right = r, s.shadow.camera.top = r, s.shadow.camera.bottom = -r, s.shadow.bias = -5e-4, s.shadow.normalBias = 0.02, this.scene.add(s);
    const a = new ll(4491468, 0.35);
    a.position.set(-4, 3, -3), this.scene.add(a);
    const o = new Ym(58879, 0.5, 20);
    o.position.set(-4, 6, -5), this.scene.add(o);
    const l = new ve(new qi(40, 40), new ic({ color: 658456, roughness: 0.6, metalness: 0.4 }));
    l.rotation.x = -Math.PI / 2, l.position.y = -5e-3, l.receiveShadow = true, this.scene.add(l), window.addEventListener("resize", this.onResize);
  }
  createContainer(t) {
    const [e, n, s] = t.large.dimensions, a = 3 / Math.max(e, n, s), o = e * a, l = n * a, c = s * a, h = new Je(o, l, c), u = new ve(h, new sl({ color: 8969727, transparent: true, opacity: 0.08, roughness: 0.05, metalness: 0, side: qe, depthWrite: false, envMapIntensity: 2 }));
    u.position.set(0, l / 2, 0), u.renderOrder = 1, this.scene.add(u);
    const d = new Vm(h), p = new el(d, new Jl({ color: 58879, transparent: true, opacity: 0.5 }));
    return p.position.copy(u.position), p.renderOrder = 2, this.scene.add(p), { sw: o, sh: l, sd: c, scale: a };
  }
  generatePositions(t, e) {
    const { sw: n, sh: s, sd: r, scale: a } = e, [o, l, c] = t.small.dimensions.map((d) => d * a), h = [], u = Math.min(t.count, 5e3);
    if (t.small.shape === "sphere") {
      const d = Math.max(o, l, c) / 2, p = d * 2.05, g = Math.floor(n / p), _ = Math.floor(s / p), m = Math.floor(r / p), f = -(g * p) / 2 + d, E = -(m * p) / 2 + d;
      for (let T = 0; T < _ && h.length < u; T++) for (let y = 0; y < g && h.length < u; y++) for (let N = 0; N < m && h.length < u; N++) {
        const w = T % 2 * p * 0.5, A = new Xt();
        A.setPosition(f + y * p + w, d + T * p, E + N * p), h.push(A);
      }
    } else {
      const d = o * 1.02, p = l * 1.02, g = c * 1.02, _ = Math.max(1, Math.floor(n / d)), m = Math.max(1, Math.floor(s / p)), f = Math.max(1, Math.floor(r / g)), E = -(_ * d) / 2 + d / 2, T = -(f * g) / 2 + g / 2;
      for (let y = 0; y < m && h.length < u; y++) for (let N = 0; N < _ && h.length < u; N++) for (let w = 0; w < f && h.length < u; w++) {
        const A = new Xt();
        A.setPosition(E + N * d, p / 2 + y * p, T + w * g), h.push(A);
      }
    }
    return h;
  }
  createInstances(t, e, n) {
    const [s, r, a] = t.small.dimensions.map((p) => p * n);
    let o;
    if (t.small.id === "lego_brick") o = pg(s, r, a);
    else if (t.small.id === "pill_capsule") {
      const p = Math.max(s, a) / 2, g = Math.max(0, r - 2 * p);
      o = new Na(p, g, 8, 16);
    } else if (t.small.shape === "sphere") {
      const p = Math.max(s, r, a) / 2;
      o = new Xs(p, 24, 16);
    } else if (t.small.shape === "cylinder") {
      const p = Math.max(s, a) / 2;
      o = new Ws(p, p, r, 24);
    } else {
      const g = Math.min(s, r, a) * 0.08;
      try {
        o = new cg(s, r, a, 2, g);
      } catch {
        o = new Je(s, r, a);
      }
    }
    const l = t.small.id === "mm_candy" || t.small.id === "lego_brick", c = new It(l ? 16777215 : t.small.color), h = dg(t.small.id), u = new sl({ color: c, ...h }), d = new wm(o, u, e);
    if (d.count = 0, d.castShadow = true, d.receiveShadow = true, l) {
      const p = [15022389, 2001125, 4431943, 16635957, 16748288, 9315498];
      for (let g = 0; g < e; g++) d.setColorAt(g, new It(p[g % p.length]));
      d.instanceColor && (d.instanceColor.needsUpdate = true);
    }
    return this.scene.add(d), d;
  }
  start(t) {
    this.result = t, this.targetCount = Math.min(t.count, 5e3), this.currentCount = 0;
    const e = this.createContainer(t);
    this.positions = this.generatePositions(t, e), this.targetCount = Math.min(this.targetCount, this.positions.length), this.instances = this.createInstances(t, this.positions.length, e.scale), this.camera.position.set(e.sw * 1.5, e.sh * 1.2, e.sd * 1.5), this.camera.lookAt(0, e.sh / 2, 0), this.controls.target.set(0, e.sh / 2, 0), this.lastTime = performance.now(), this.pourRate = Math.max(50, Math.min(500, this.targetCount / 8)), this.animate();
  }
  destroy() {
    var _a2;
    cancelAnimationFrame(this.animFrameId), window.removeEventListener("resize", this.onResize), this.controls.dispose(), this.scene.traverse((t) => {
      var _a3;
      (t instanceof ve || t instanceof el) && ((_a3 = t.geometry) == null ? void 0 : _a3.dispose(), Array.isArray(t.material) ? t.material.forEach((e) => e.dispose()) : t.material && t.material.dispose());
    }), (_a2 = this.envTexture) == null ? void 0 : _a2.dispose(), this.renderer.dispose(), this.scene.clear(), this.renderer.domElement.parentElement && this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
  }
  getProgress() {
    return this.targetCount === 0 ? 1 : this.currentCount / this.targetCount;
  }
}
class gg {
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
class _g {
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
const fl = ["#00e5ff", "#7c4dff", "#ff4081", "#ffc107", "#00e676", "#ff5722", "#448aff", "#e040fb"];
class vg {
  constructor(t) {
    __publicField(this, "canvas");
    __publicField(this, "ctx");
    __publicField(this, "particles", []);
    __publicField(this, "animId", 0);
    __publicField(this, "container");
    __publicField(this, "resize", () => {
      const t = this.container.clientWidth, e = this.container.clientHeight;
      this.canvas.width = t * devicePixelRatio, this.canvas.height = e * devicePixelRatio, this.canvas.style.width = t + "px", this.canvas.style.height = e + "px";
    });
    __publicField(this, "animate", () => {
      const t = this.canvas.width / devicePixelRatio, e = this.canvas.height / devicePixelRatio;
      this.ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0), this.ctx.clearRect(0, 0, t, e);
      for (let n = this.particles.length - 1; n >= 0; n--) {
        const s = this.particles[n];
        if (s.x += s.vx, s.y += s.vy, s.vy += s.gravity, s.vx *= 0.99, s.rotation += s.rotSpeed, s.opacity -= s.decay, s.opacity <= 0 || s.y > e + 30) {
          this.particles.splice(n, 1);
          continue;
        }
        this.ctx.save(), this.ctx.translate(s.x, s.y), this.ctx.rotate(s.rotation * Math.PI / 180), this.ctx.globalAlpha = s.opacity, this.ctx.fillStyle = s.color, this.ctx.fillRect(-s.w / 2, -s.h / 2, s.w, s.h), this.ctx.restore();
      }
      this.particles.length > 0 ? this.animId = requestAnimationFrame(this.animate) : this.animId = 0;
    });
    this.container = t, this.canvas = document.createElement("canvas"), this.canvas.className = "confetti-canvas", t.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d"), this.resize(), window.addEventListener("resize", this.resize);
  }
  burst(t = 150) {
    const e = this.canvas.width / devicePixelRatio, n = this.canvas.height / devicePixelRatio;
    for (let s = 0; s < t; s++) {
      const r = Math.random() * Math.PI * 2, a = 3 + Math.random() * 10;
      this.particles.push({ x: e / 2 + (Math.random() - 0.5) * e * 0.3, y: n * 0.3 + (Math.random() - 0.5) * 40, vx: Math.cos(r) * a, vy: Math.sin(r) * a - 4, w: 4 + Math.random() * 7, h: 3 + Math.random() * 5, color: fl[Math.floor(Math.random() * fl.length)], rotation: Math.random() * 360, rotSpeed: (Math.random() - 0.5) * 15, gravity: 0.1 + Math.random() * 0.08, opacity: 1, decay: 4e-3 + Math.random() * 6e-3 });
    }
    this.animId === 0 && this.animate();
  }
  destroy() {
    cancelAnimationFrame(this.animId), window.removeEventListener("resize", this.resize), this.canvas.remove();
  }
}
class xg {
  constructor(t) {
    __publicField(this, "container");
    __publicField(this, "el", null);
    __publicField(this, "counter", null);
    __publicField(this, "vis3d", null);
    __publicField(this, "vis2d", null);
    __publicField(this, "visCounter", null);
    __publicField(this, "confetti", null);
    __publicField(this, "pendingFrame", 0);
    __publicField(this, "celebrationTimer", 0);
    this.container = t;
  }
  show(t, e) {
    if (this.destroy(), t.tooSmall) {
      this.showTooSmall(t, e);
      return;
    }
    const n = document.createElement("div");
    n.className = "results screen-enter", this.el = n;
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
    const c = Za(t);
    if (c.length > 0) {
      const _ = document.createElement("div");
      _.className = "comparisons";
      for (const m of c) {
        const f = document.createElement("p");
        f.className = "comparison-text", f.textContent = m, _.appendChild(f);
      }
      l.appendChild(_);
    }
    const h = document.createElement("div");
    h.className = "results-actions";
    const u = document.createElement("button");
    u.className = "btn-secondary", u.textContent = "\u2190 Try Another", u.addEventListener("click", () => {
      re.click(), e.onBack();
    }), h.appendChild(u);
    const d = document.createElement("button");
    d.className = "btn-secondary", d.textContent = "\u{1F504} Flip It!", d.addEventListener("click", () => {
      re.click(), e.onFlip(t.large.id, t.small.id);
    }), h.appendChild(d);
    const p = document.createElement("button");
    p.className = "btn-secondary", p.textContent = "\u{1F517} Copy Link", p.addEventListener("click", () => {
      re.click(), this.copyLink(t, p);
    }), h.appendChild(p);
    const g = document.createElement("button");
    g.className = "btn-secondary", g.textContent = "\u{1F4E4} Share", g.addEventListener("click", () => {
      re.click(), this.shareResult(t);
    }), h.appendChild(g), l.appendChild(h), n.appendChild(l), this.container.appendChild(n), this.counter = new Ec(r, 2500), this.counter.animateTo(t.count), this.pendingFrame = requestAnimationFrame(() => {
      t.count <= 5e3 ? (this.vis3d = new mg(o), this.vis3d.start(t)) : t.count <= 5e5 ? (this.vis2d = new gg(o), this.vis2d.start(t)) : (this.visCounter = new _g(o), this.visCounter.start(t));
    }), this.celebrationTimer = window.setTimeout(() => {
      re.celebrate(), this.confetti = new vg(n), this.confetti.burst();
    }, 2600);
  }
  showTooSmall(t, e) {
    const n = document.createElement("div");
    n.className = "too-small screen-enter", this.el = n;
    const s = document.createElement("div");
    s.className = "too-small-emoji", s.textContent = "\u{1F605}", n.appendChild(s);
    const r = document.createElement("p");
    r.className = "too-small-msg", r.textContent = Sc(t), n.appendChild(r);
    const a = document.createElement("p");
    a.className = "too-small-msg", a.style.fontSize = "1rem", a.style.opacity = "0.5", a.textContent = `${t.small.icon} ${t.small.name} \u2192 ${t.large.icon} ${t.large.name}`, n.appendChild(a);
    const o = document.createElement("div");
    o.className = "results-actions", o.style.marginTop = "1rem";
    const l = document.createElement("button");
    l.className = "btn-secondary", l.textContent = "\u2190 Try Another", l.addEventListener("click", () => {
      re.click(), e.onBack();
    }), o.appendChild(l);
    const c = document.createElement("button");
    c.className = "btn-secondary", c.textContent = "\u{1F504} Flip It!", c.addEventListener("click", () => {
      re.click(), e.onFlip(t.large.id, t.small.id);
    }), o.appendChild(c), n.appendChild(o), this.container.appendChild(n);
  }
  async copyLink(t, e) {
    const n = new URL(window.location.href);
    n.searchParams.set("s", t.small.id), n.searchParams.set("l", t.large.id);
    try {
      await navigator.clipboard.writeText(n.toString());
      const s = e.textContent;
      e.textContent = "\u2713 Copied!", setTimeout(() => {
        e.textContent = s;
      }, 2e3);
    } catch {
    }
  }
  async shareResult(t) {
    const e = document.createElement("canvas");
    e.width = 1200, e.height = 630;
    const n = e.getContext("2d");
    n.fillStyle = "#0b0d17", n.fillRect(0, 0, 1200, 630);
    const s = n.createRadialGradient(600, 250, 0, 600, 250, 500);
    s.addColorStop(0, "rgba(0, 229, 255, 0.06)"), s.addColorStop(0.5, "rgba(124, 77, 255, 0.03)"), s.addColorStop(1, "transparent"), n.fillStyle = s, n.fillRect(0, 0, 1200, 630), n.strokeStyle = "rgba(0, 229, 255, 0.15)", n.lineWidth = 1, n.strokeRect(30, 30, 1140, 570), n.font = "bold 28px Inter, system-ui, sans-serif", n.fillStyle = "#00e5ff", n.textAlign = "center", n.fillText("How Many?", 600, 80), n.font = "bold 90px JetBrains Mono, monospace", n.fillStyle = "#ffffff", n.fillText(Ce(t.count), 600, 260), n.font = "32px Inter, system-ui, sans-serif", n.fillStyle = "rgba(255, 255, 255, 0.8)", n.fillText(`${t.small.icon} ${t.small.name}s  fit in  ${t.large.icon} ${t.large.name}`, 600, 340);
    const r = Za(t);
    r.length > 0 && (n.font = "20px Inter, system-ui, sans-serif", n.fillStyle = "rgba(255, 255, 255, 0.45)", n.fillText(r[0], 600, 430)), r.length > 1 && n.fillText(r[1], 600, 465), n.font = "16px Inter, system-ui, sans-serif", n.fillStyle = "rgba(255, 255, 255, 0.2)", n.fillText("williamcfrancis.github.io/games/how_many", 600, 590);
    try {
      const a = await new Promise((o) => e.toBlob(o, "image/png"));
      if (!a) return;
      if (navigator.share) {
        const o = new File([a], "how-many.png", { type: "image/png" });
        await navigator.share({ title: "How Many?", text: `${Ce(t.count)} ${t.small.name}s fit in a ${t.large.name}!`, files: [o] });
      } else {
        const o = URL.createObjectURL(a), l = document.createElement("a");
        l.href = o, l.download = "how-many.png", l.click(), URL.revokeObjectURL(o);
      }
    } catch {
    }
  }
  destroy() {
    var _a2, _b, _c2, _d2, _e2, _f2;
    cancelAnimationFrame(this.pendingFrame), clearTimeout(this.celebrationTimer), (_a2 = this.counter) == null ? void 0 : _a2.destroy(), (_b = this.vis3d) == null ? void 0 : _b.destroy(), (_c2 = this.vis2d) == null ? void 0 : _c2.destroy(), (_d2 = this.visCounter) == null ? void 0 : _d2.destroy(), (_e2 = this.confetti) == null ? void 0 : _e2.destroy(), this.counter = null, this.vis3d = null, this.vis2d = null, this.visCounter = null, this.confetti = null, ((_f2 = this.el) == null ? void 0 : _f2.parentElement) && this.el.parentElement.removeChild(this.el), this.el = null;
  }
}
const xa = document.getElementById("app");
let zs = "landing", ks = null, pi = null;
const zn = document.createElement("button");
zn.className = "sound-toggle" + (re.muted ? "" : " on");
zn.textContent = re.muted ? "\u{1F507}" : "\u{1F50A}";
zn.title = "Toggle sound";
zn.addEventListener("click", () => {
  re.muted = !re.muted, zn.className = "sound-toggle" + (re.muted ? "" : " on"), zn.textContent = re.muted ? "\u{1F507}" : "\u{1F50A}", re.muted || re.click();
});
document.body.appendChild(zn);
function Mg(i, t) {
  const e = new URL(window.location.href);
  e.searchParams.set("s", i), e.searchParams.set("l", t), window.history.pushState({}, "", e.toString());
}
function yg() {
  const i = new URL(window.location.href);
  i.searchParams.delete("s"), i.searchParams.delete("l"), window.history.pushState({}, "", i.toString());
}
function ac() {
  const i = new URLSearchParams(window.location.search), t = i.get("s"), e = i.get("l");
  if (!t || !e) return null;
  const n = Fn(t), s = Fn(e);
  return !n || !s ? null : { small: n, large: s };
}
const oc = 300;
function Ba(i = true) {
  if (zs === "landing" && ks) return;
  const t = pi ? xa.querySelector(".results, .too-small") : null;
  pi == null ? void 0 : pi.destroy(), pi = null, t && (t.classList.add("screen-exit"), setTimeout(() => t.remove(), oc)), zs = "landing", setTimeout(() => {
    ks = gc(xa, { onCalculate: Sg, onSurprise: lc });
  }, t ? 150 : 0), i && yg();
}
function Sg(i, t) {
  re.whoosh(), $i(Wi(i, t));
}
function $i(i, t = true) {
  const e = ks == null ? void 0 : ks.el;
  e && (e.classList.add("screen-exit"), setTimeout(() => e.remove(), oc)), ks = null, pi == null ? void 0 : pi.destroy(), zs = "results", setTimeout(() => {
    pi = new xg(xa), pi.show(i, { onBack: () => Ba(), onFlip: (s, r) => {
      const a = je.find((l) => l.id === s), o = je.find((l) => l.id === r);
      a && o && (re.whoosh(), $i(Wi(a, o)));
    } });
  }, e ? 150 : 0), t && Mg(i.small.id, i.large.id);
}
function lc() {
  re.click();
  const i = pl.map((c) => c.id), t = Math.floor(Math.random() * 3), e = t + 1 + Math.floor(Math.random() * (i.length - t - 1)), n = i[Math.min(t, i.length - 1)], s = i[Math.min(e, i.length - 1)], r = je.filter((c) => c.category === n), a = je.filter((c) => c.category === s);
  if (r.length === 0 || a.length === 0) return;
  const o = r[Math.floor(Math.random() * r.length)], l = a[Math.floor(Math.random() * a.length)];
  re.whoosh(), $i(Wi(o, l));
}
window.addEventListener("keydown", (i) => {
  i.code === "Space" && zs === "landing" && (i.preventDefault(), lc());
});
window.addEventListener("popstate", () => {
  const i = ac();
  i ? $i(Wi(i.small, i.large), false) : Ba(false);
});
const Pr = ac();
Pr ? $i(Wi(Pr.small, Pr.large), false) : Ba(false);
