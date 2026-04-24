const pictureUrl = (fileName) => new URL(`./styles/pictures/${fileName}`, import.meta.url).href;

const articles = [
  {
    name: "Feeding Guide", // String
    title: "Proper Feeding Guide for Pets", //String
    imageSrc: pictureUrl("dogeats.jpg"),
    // List --> String
    content: [
      "Proper feeding is essential to maintain your pet’s overall health and well-being.",
      "Pets require a balanced diet that includes the right nutrients, vitamins, and minerals based on their age, size, and breed. Overfeeding or giving the wrong type of food can lead to obesity and health complications.",
      "It is also important to follow a consistent feeding schedule and ensure access to clean drinking water at all times. Consulting a veterinarian can help determine the best diet plan for your pet.",
    ]
  },
  {
    name: "Basic Grooming",
    title: "Basic Grooming Tips for a Healthy Pet",
    imageSrc: pictureUrl("groomingcat.jpg"),
    content: [
      "Regular grooming plays a significant role in keeping pets clean and comfortable. This includes bathing, brushing their fur, trimming nails, and cleaning ears.",
      "Grooming not only improves your pet’s appearance but also helps prevent skin infections, parasites, and other health issues.",
      "Establishing a grooming routine early helps pets become more comfortable with the process. Using the right grooming tools and products ensures safety and effectiveness.",
    ]
  },
  {
    name: "Vaccination",
    title: "Why Vaccination is Important for Pets",
    imageSrc: pictureUrl("vaccine.jpg"),
    content: [
      "Vaccination is one of the most important aspects of preventive care for pets. It protects them from serious and potentially life-threatening diseases such as rabies, parvovirus, and distemper.",
      "Vaccines help strengthen your pet’s immune system and reduce the risk of infection. Keeping up with a proper vaccination schedule ensures long-term health and safety not only for pets but also for their owners.",
      "Regular veterinary check-ups are recommended to stay updated on required vaccines.",
    ]
  },
  {
    name: "Exercise and Playtime",
    title: "Daily Exercise and Playtime Guide",
    imageSrc: pictureUrl("playingpets.jpg"),
    content: [
      "Daily exercise is essential to keep pets physically and mentally healthy. Activities such as walking, running, or playing with toys help burn excess energy and prevent obesity.",
      "Regular playtime also reduces stress, anxiety, and destructive behavior.",
      "Different pets require different levels of activity depending on their breed and age. Providing interactive toys and spending quality time with your pet strengthens your bond while promoting a healthy lifestyle.",
    ]
  },
  {
    name: "Comfortable Space",
    title: "Creating a Comfortable Space for Your Pet",
    imageSrc: pictureUrl("Dogandcatsleeping.webp"),
    content: [
      "Creating a comfortable space for your pet is important to ensure their safety, relaxation, and overall well-being. Pets need a designated area where they can rest, sleep, and feel secure. This space should be clean, quiet, and free from hazards such as sharp objects or harmful materials. Providing soft bedding, proper ventilation, and a suitable temperature helps make the environment more comfortable for your pet.",
      "It is also important to include items that your pet is familiar with, such as their favorite toys or blankets, to reduce stress and anxiety. Make sure that food and water are easily accessible, and regularly clean their area to maintain hygiene. By creating a safe and cozy environment, you help your pet feel more relaxed, secure, and happy in their daily life.Learning common signals—like tail wagging, ear position, or changes in appetite—can help you respond appropriately and reduce stress for both you and your pet.",
    ]
  },
  {
    name: "Dental Care",
    title: "Pet Dental Care: Keeping Teeth and Gums Healthy",
    imageSrc:
      "https://images.unsplash.com/photo-1601758177266-bc599de87707?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Dental care is a key part of your pet’s overall health. Plaque and tartar buildup can lead to bad breath, gum disease, and painful infections that may affect the heart, liver, and kidneys.",
      "Start with gentle tooth brushing using pet-safe toothpaste and a soft brush or finger brush. For pets that don’t tolerate brushing at first, build a routine slowly and pair it with positive rewards.",
      "Dental chews, appropriate toys, and regular vet checkups (including professional cleanings when needed) help keep your pet’s mouth healthy and comfortable."
    ]
  },
  {
    name: "Training Basics",
    title: "Training Basics: Building Good Habits with Positive Reinforcement",
    imageSrc:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Basic training makes everyday life easier and safer for pets. Simple skills like “sit,” “stay,” “come,” and leash manners reduce stress and help prevent accidents.",
      "Positive reinforcement works best: reward the behaviors you want with treats, praise, or play. Keep sessions short (5–10 minutes), consistent, and end on a success.",
      "If your pet struggles, break the skill into smaller steps, remove distractions, and be patient. Consistency and kindness build trust and long-term results."
    ]
  },
  {
    name: "Healthy Hydration",
    title: "Healthy Hydration: Helping Your Pet Drink Enough Water",
    imageSrc: pictureUrl("pet-drinking-water.jpg"),
    content: [
      "Good hydration supports digestion, temperature regulation, kidney health, and energy levels. Some pets, especially cats, may not drink enough water on their own.",
      "Encourage drinking by keeping water bowls clean, placing them in quiet spots, and offering multiple stations around the home. Some pets prefer wide, shallow bowls or running water from a pet fountain.",
      "You can also add moisture through wet food or pet-safe broths. If you notice signs of dehydration or sudden changes in drinking habits, consult a veterinarian."
    ]
  }
];

export default articles;
