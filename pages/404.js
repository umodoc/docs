import { useRouter } from 'nextra/hooks';
import { useEffect } from 'react';

export default function Error404() {
	const router = useRouter();
	useEffect(() => {
		router.push(`/${router.locale}/docs/editor`);
	}, []);
	return null;
}
