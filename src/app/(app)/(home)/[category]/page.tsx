interface Props {
  params: Promise<{
    category: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { category } = await params;
  <div>Category: ${category}</div>;
};

export default Page;
