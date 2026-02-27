'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface WeeklyCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const mockAppointments = [
  {
    date: new Date(2024, 0, 15),
    time: '09:00',
    patient: 'Max',
    type: 'consulta',
  },
  {
    date: new Date(2024, 0, 15),
    time: '10:30',
    patient: 'Luna',
    type: 'vacuna',
  },
  {
    date: new Date(2024, 0, 16),
    time: '14:00',
    patient: 'Rocky',
    type: 'revision',
  },
  {
    date: new Date(2024, 0, 17),
    time: '11:00',
    patient: 'Bella',
    type: 'cirugia',
  },
  {
    date: new Date(2024, 0, 18),
    time: '15:30',
    patient: 'Charlie',
    type: 'consulta',
  },
];

const getStatusColor = (type: string) => {
  const colors: Record<string, string> = {
    consulta: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    revision: 'bg-green-500/10 text-green-700 dark:text-green-400',
    vacuna: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
    cirugia: 'bg-red-500/10 text-red-700 dark:text-red-400',
  };
  return colors[type] || 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
};

function getWeekDates(date: Date) {
  const curr = new Date(date);
  const first = curr.getDate() - curr.getDay();
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(curr.setDate(first + i));
    weekDates.push(new Date(d));
  }

  return weekDates;
}

function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function WeeklyCalendar({
  selectedDate,
  onDateSelect,
}: WeeklyCalendarProps) {
  const weekDates = getWeekDates(new Date(selectedDate));
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];

  const goToPreviousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    onDateSelect(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    onDateSelect(newDate);
  };

  return (
    <Card className="p-4 border border-border">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Semana</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousWeek}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextWeek}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {weekDates.map((date, index) => {
            const isSelected = isSameDay(date, selectedDate);
            const dayAppointments = mockAppointments.filter(apt =>
              isSameDay(apt.date, date)
            );

            return (
              <button
                key={index}
                onClick={() => onDateSelect(date)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-border/80 hover:bg-muted/50'
                }`}
              >
                <div className="text-sm font-medium text-foreground">
                  {dayNames[date.getDay()]} {date.getDate()}
                </div>
                <div className="mt-2 space-y-1">
                  {dayAppointments.length > 0 ? (
                    dayAppointments.map((apt, i) => (
                      <div
                        key={i}
                        className="text-xs px-2 py-1 bg-muted rounded flex items-center justify-between"
                      >
                        <span className="text-muted-foreground">
                          {apt.time}
                        </span>
                        <span className="text-foreground font-medium truncate">
                          {apt.patient}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-muted-foreground py-1">
                      Sin citas
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
