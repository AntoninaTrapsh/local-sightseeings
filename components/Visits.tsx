import Link from 'next/link';
import { mockListing } from '@/app/sightseeings/_data';
import { MOBILE_MEDIA } from '@/components/CoverImage';

const VISITS: Array<{ id: string; className: string }> = [
    { id: 'mountain', className: 'object-[48%_52%]' },
    { id: 'villages-soul', className: 'object-[42%_50%]' },
    { id: 'predannosti', className: 'object-[50%_50%]' },
    { id: 'peschera', className: 'object-[50%_50%]' },
    { id: 'glory-square', className: 'object-[44%_48%]' },
];

// TODO: Добавить поддержку img как урл
const visitItems = VISITS.flatMap(({ id, className }) => {
    const sight = mockListing.sights.find((one) => one.id === id);
    return sight ? [{ ...sight, className, href: `/sightseeings/${sight.id}` }] : [];
});

export default function Visits() {
    return (
        <section className="w-full pb-10 md:pb-16 lg:pb-20">
            <div className="container mx-auto px-5 md:px-8 max-w-[1440px]">
                <h2 className="mb-6 text-[22px] font-semibold leading-tight text-[#171717] md:mb-10 md:text-[40px] lg:mb-12 lg:text-[42px]">
                    Посещают
                </h2>

                <div className="overflow-x-auto no-scrollbar -mx-5 md:-mx-8 lg:mx-0 px-5 md:px-8 lg:px-0 pb-1">
                    <div className="flex w-max items-stretch gap-4 md:gap-5 lg:w-full lg:gap-5">
                        {visitItems.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className="group flex w-[176px] shrink-0 flex-col sm:w-[260px] md:w-[340px] lg:w-auto lg:flex-1 lg:transition-[flex-grow] lg:duration-300 lg:ease-out lg:hover:flex-[1.55]"
                            >
                                <span
                                    className="relative block h-[236px] overflow-hidden sm:h-[320px] md:h-[420px] lg:h-[400px]">
                                    <picture className="contents">
                                        {item.imageUrlMobile && (
                                            <source media={MOBILE_MEDIA} srcSet={item.imageUrlMobile} />
                                        )}
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className={`h-full w-full object-cover lg:transition-transform lg:duration-300 lg:group-hover:scale-105 ${item.className}`}
                                        />
                                    </picture>
                                </span>
                                <span
                                    className="mt-4 text-[12px] font-semibold leading-tight text-[#171717] md:text-[18px] lg:hidden">
                                    {item.title}
                                </span>
                                <span
                                    className="mt-4 hidden h-[28px] overflow-hidden whitespace-nowrap text-[20px] font-semibold leading-tight text-[#171717] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 lg:block">
                                    {item.title}
                                </span>
                            </Link>
                        ))}

                        <Link
                            href="/sightseeings"
                            className="hidden h-[400px] w-[96px] shrink-0 items-center justify-center border-2 border-[#171717] text-[18px] font-semibold text-[#171717] lg:flex"
                        >
                            <span className="-rotate-90 whitespace-nowrap">Другие объекты</span>
                        </Link>
                    </div>
                </div>

                <Link
                    href="/sightseeings"
                    className="mt-6 flex h-[52px] w-full items-center justify-center border-2 border-[#171717] text-[14px] font-semibold text-[#171717] md:h-[64px] md:text-[18px] lg:hidden"
                >
                    Другие объекты
                </Link>
            </div>
        </section>
    );
}
