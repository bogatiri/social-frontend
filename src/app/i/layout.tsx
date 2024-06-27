import ThemeSwitcher from '@/components/ui/custom/theme-switcher'
import Header from '@/components/ui/layout/header'
import Sidebar from '@/components/ui/layout/sidebar'

export default function Layout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div>
			<Sidebar />
			<Header>
				<ThemeSwitcher />
			</Header>
			{children}
		</div>
	)
}
