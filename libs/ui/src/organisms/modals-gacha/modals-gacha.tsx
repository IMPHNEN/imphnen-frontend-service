import { FC, ReactElement } from 'react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Button, Input } from '@imphnen-frontend-service/ui/atoms';

export const ModalsGacha: FC = (): ReactElement => {
    return (
        <div className="fixed w-[100vw] overflow-y-auto h-[100vh] z-[100] top-0 bg-black/20 margin-[auto] flex md:items-center justify-center">
            <div className='w-[256px] min-h-[797px] md:w-[692px] md:min-h-[505px] lg:w-[831px] lg:min-h-[669px] rounded-xl flex flex-col md:flex-row'>
                <div className='md:min-h-full bg-primary-500 rounded-t-xl md:rounded-l-xl md:rounded-t-none lg:w-[442px] p-[36px] gap-5 md:p-[44px] md:gap-6 lg:p-[60px] lg:gap-8 flex flex-col items-center'>
                    <div className='flex flex-col'>
                        <h4 className='text-center text-2xl md:text-4xl text-white'>Yeay</h4>
                        <h5 className='text-center text-xl md:text-3xl text-white'>Kamu Mendapatkan</h5>
                    </div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgDXJpZVMAfvzJqGiGgsc7n16iNKo9_Wmmw&s" alt="Prize" />
                    <h5 className='text-center font-semibold text-2xl md:text-3xl text-white'>Istri Anime</h5>
                    <div className='flex flex-col gap-1'>
                        <h5 className='text-center text-xl md:text-2xl text-white'>Gak mau yang ini ?</h5>
                        <Button variant='secondary'>Reroll</Button>
                        <h6 className='text-center text-lg md:text-1xl text-white'>Free spin 2 Roll Left</h6>
                    </div>
                </div>
                <div className='md:min-h-full bg-white rounded-b-xl md:rounded-b-none md:rounded-r-xl md:w-[382px] py-[36px] px-[30px] md:py-[44px] md:px-[36px] lg:w-[409px] lg:py-[60px] lg:px-[50px] flex flex-col items-center justify-center gap-6 md:gap-7 lg:gap-10'>
                    <img src="/logos/logo.svg" alt="Logos" width={149} />
                    <div className='flex flex-col'>
                        <h4 className='text-center text-3xl text-primary-500 font-semibold'>Form Order</h4>
                        <h5 className='text-center text-1xl text-primary-500'>Isi data di bawah untuk proses & pengiriman</h5>
                        <form action="#">
                            <p className='pt-4'>Nomor Transaksi</p>
                            <Input type="text" className='w-full'></Input>
                            <p className='pt-4'>Nama Lengkap</p>
                            <Input type="text" className='w-full'></Input>
                            <p className='pt-4'>Email</p>
                            <Input type="email" className='w-full'></Input>
                        </form>
                    </div>
                    <Button>Proses Pengiriman</Button>
                </div>
            </div>
        </div>
    )
}