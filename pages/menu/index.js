import MenuLayout from '../../components/menupage/MenuLayout';
import { getMenuItems } from '@/lib/db';

export default function Menu() {
  const data = getMenuItems();
  return <MenuLayout data={data} />;
}