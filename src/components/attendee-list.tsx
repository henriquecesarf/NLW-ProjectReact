import { ChangeEvent, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime';
import { Search, MoreHorizontal, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { IconButton } from './icon-button';
import { Table } from './Table/table';
import { TableHeader } from './Table/table-header';
import { TableCell } from './Table/table-cell';
import { TableRow } from './Table/table-row';
import { attendees } from '../data/attendees';

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList(){
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil(attendees.length/10)

  function onSearchInputChange(event: ChangeEvent<HTMLInputElement> ){
    setSearch(event.target.value)
  }

  
  function goToFirstPage() {
    setPage(1);
  }
  function goToLastPage() {
    setPage(totalPage);
  }
  function goToNextPage() {
    setPage(page + 1);
  }
  function goToPreviousPage() {
    setPage(page - 1);
  }

  return(
    <div className='flex flex-col gap-4'>
      <div className="flex gap-3 items-center py-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 w-72 py-1.5 border-white/10 border-2 rounded-lg  text-sm flex items-center gap-3">
          <Search className='size-4 text-emerald-300'/>
          <input onChange={onSearchInputChange} type="text" className="bg-transparent flex-1 outline-none text-sm ring-0 border-0 p-0"  placeholder="Buscar participantes..."/>
        </div>
        {search}
      </div>
      
      <Table>
          <thead>
            <TableRow>
              <TableHeader style={{width: 64 }} >
                <input type='checkbox' className='size-4 bg-black/20 rounded border border-white/10'/>
              </TableHeader >
              <TableHeader>Códiogo</TableHeader>
              <TableHeader>Participante</TableHeader>
              <TableHeader>Data de inscrição</TableHeader>
              <TableHeader>Data do check-in</TableHeader >
              <TableHeader style={{width: 64 }} ></TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {attendees.slice((page - 1 ) * 10, page * 10 ).map((item) => {
              return(
                <TableRow key={item.id}>
                  <TableCell>
                    <input type='checkbox' className='size-4 bg-black/20 rounded border border-white/10'/>
                  </TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    <div className='flex flex-col gap-1'>
                      <span className='font-semibold text-white'>{item.name}</span>
                      <span>{item.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{dayjs().to(item.createdAt)}</TableCell>
                  <TableCell>{dayjs().to(item.checkInAt)}</TableCell>
                  <TableCell>
                    <IconButton transparent>
                      <MoreHorizontal className='size-4'/> 
                    </IconButton>
                  </TableCell>
                </TableRow>
              )})
            }
          </tbody>
          <tfoot>
            <tr>
              <TableCell colSpan={3}>
                Mostrando 10 de {attendees.length} itens
              </TableCell>
              <TableCell className='text-right' colSpan={3}>
                <div className='inline-flex items-center gap-8'>
                  <span>pagina {page} de {totalPage}</span>
                  <div className='flex gap-1.5'>
                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                      <ChevronsLeft className='size-4'/> 
                    </IconButton>
                    <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                      <ChevronLeft className='size-4'/> 
                    </IconButton>
                    <IconButton onClick={goToNextPage} disabled={page === totalPage}>
                      <ChevronRight className='size-4'/> 
                    </IconButton>
                    <IconButton onClick={goToLastPage} disabled={page === totalPage}>
                      <ChevronsRight className='size-4'/> 
                    </IconButton>
                  </div>
                </div>
              </TableCell>
            </tr>
          </tfoot>
        </Table>
      </div>
  )
}