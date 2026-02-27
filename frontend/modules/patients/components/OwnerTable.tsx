'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Owner } from '@/modules/patients/types';

interface OwnersTableProps {
  owners: Owner[];
}

export default function OwnerTable({ owners }: OwnersTableProps) {
  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefono</TableHead>
            <TableHead>Direccion</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {owners.map(owner => {
            return (
              <TableRow key={owner.id}>
                <TableCell>
                  <div>
                    <p className="font-semibold">{owner.name}</p>
                  </div>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {owner.email}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {owner.phone}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {owner.address}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
