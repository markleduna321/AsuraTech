import { Link, usePage } from '@inertiajs/react';

// Link to a home page section ('/#demos'). On the page that owns the section it stays a plain fragment
// link (no Inertia visit, so 3D scenes aren't remounted); from any other page it's an Inertia <Link>,
// which visits the page and then scrolls to the anchor.
export default function SectionLink({ href, ...props }) {
    const { url } = usePage();
    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return <Link href={href} {...props} />;

    const targetPath = href.slice(0, hashIndex);
    const currentPath = url.split(/[?#]/)[0];
    if (targetPath === '' || targetPath === currentPath) return <a href={href.slice(hashIndex)} {...props} />;

    return <Link href={href} {...props} />;
}
