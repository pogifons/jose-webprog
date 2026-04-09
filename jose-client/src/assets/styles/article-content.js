const pictureUrl = (fileName) =>
  new URL(`./pictures/${fileName}`, import.meta.url).href;

const articles = [
    {
      name: "react-props-and-styling", // String
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
      name: "react-functional-components",
      title: "Basic Grooming Tips for a Healthy Pet",
      imageSrc: pictureUrl("groomingcat.jpg"),
      content: [
        "Regular grooming plays a significant role in keeping pets clean and comfortable. This includes bathing, brushing their fur, trimming nails, and cleaning ears.",
        "Grooming not only improves your pet’s appearance but also helps prevent skin infections, parasites, and other health issues.",
        "Establishing a grooming routine early helps pets become more comfortable with the process. Using the right grooming tools and products ensures safety and effectiveness.",
      ]
    },
    {
      name: "react-component-lifecycle",
      title: "Why Vaccination is Important for Pets",
      imageSrc: pictureUrl("vaccine.jpg"),
      content: [
        "Vaccination is one of the most important aspects of preventive care for pets. It protects them from serious and potentially life-threatening diseases such as rabies, parvovirus, and distemper.",
        "Vaccines help strengthen your pet’s immune system and reduce the risk of infection. Keeping up with a proper vaccination schedule ensures long-term health and safety not only for pets but also for their owners.",
        "Regular veterinary check-ups are recommended to stay updated on required vaccines.",
      ]
    },
    {
      name: "react-routing-basics",
      title: "Daily Exercise and Playtime Guide",
      imageSrc: pictureUrl("playingpets.jpg"),
      content: [
        "Daily exercise is essential to keep pets physically and mentally healthy. Activities such as walking, running, or playing with toys help burn excess energy and prevent obesity.",
        "Regular playtime also reduces stress, anxiety, and destructive behavior.",
        "Different pets require different levels of activity depending on their breed and age. Providing interactive toys and spending quality time with your pet strengthens your bond while promoting a healthy lifestyle.",
      ]
    },
    {
      name: "react-state-management",
      title: "Creating a Comfortable Space for Your Pet",
      imageSrc: pictureUrl("Dogandcatsleeping.webp"),
      content: [
        "Creating a comfortable space for your pet is important to ensure their safety, relaxation, and overall well-being. Pets need a designated area where they can rest, sleep, and feel secure. This space should be clean, quiet, and free from hazards such as sharp objects or harmful materials. Providing soft bedding, proper ventilation, and a suitable temperature helps make the environment more comfortable for your pet.",
        "It is also important to include items that your pet is familiar with, such as their favorite toys or blankets, to reduce stress and anxiety. Make sure that food and water are easily accessible, and regularly clean their area to maintain hygiene. By creating a safe and cozy environment, you help your pet feel more relaxed, secure, and happy in their daily life.Learning common signals—like tail wagging, ear position, or changes in appetite—can help you respond appropriately and reduce stress for both you and your pet.",
      ]
    }
  ];
  
  export default articles;