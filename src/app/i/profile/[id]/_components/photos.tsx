import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@/components/ui/carousel'
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'

const Photos = () => {
	return (
		<div className='flex flex-col justify-center items-center gap-4 rounded-lg px-16 py-3 border border-border'>
			<Menubar className='self-center'>
				<MenubarMenu>
					<MenubarTrigger>Photos</MenubarTrigger>
					<MenubarTrigger>Music</MenubarTrigger>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarTrigger>File</MenubarTrigger>
				</MenubarMenu>
			</Menubar>
			<Carousel
				opts={{
					align: 'start'
					// loop: true
				}}
				className='w-full max-w-xs md:max-w-lg lg:max-w-6xl'
			>
				<CarouselContent>
					{Array.from({ length: 7 }).map((_, index) => (
						<CarouselItem
							key={index}
							className='pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5'
						>
							<div className='p-3'>
								<Card>
									<CardContent className='flex aspect-square md:aspect-square items-center justify-center p-6'>
										<span className='text-2xl font-semibold'>{index + 1}</span>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<div className='w-full grid grid-cols-2 gap-4'>
				<Button className='w-full'>Upload photo</Button>
				<Button className='w-full'>Show all</Button>
			</div>
		</div>
	)
}

export default Photos
