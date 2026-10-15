

type CardPops = {
  title: string;
  description: string;
  imageUrl: string;
  image?: string;
  link: string;
}; 


    function ActionCard({
        title,
        description,
        imageUrl,
        image,
        link
    }: CardPops) {
  return <h1>Product: {title}</h1>;
}