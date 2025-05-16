import MenuLayout from "../../components/menupage/MenuLayout";

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menuapi`);
    const data = await res.json();

    if (!data.success) {
      throw new Error("Failed to fetch menu items");
    }

    return {
      props: {
        menuItems: data.data,
      },
    };
  } catch (error) {
    console.error("Error fetching menu items:", error.message);
    return {
      props: {
        menuItems: [],
      },
    };
  }
}

export default function Menu({ menuItems }) {
  return <MenuLayout menuItems={menuItems} />;
}
