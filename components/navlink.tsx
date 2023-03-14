import Link, {LinkProps} from "next/link";
import { useRouter } from "next/router";

export default function NavLink(props: LinkProps & {children?: React.ReactNode}) {
    const router = useRouter();
    const currentRoute = router.asPath;
    const isActive = currentRoute === props.href;
    return <Link {...props} className={`underline hover:text-gray-300 ${isActive ? 'font-bold': ''}`} />
  }