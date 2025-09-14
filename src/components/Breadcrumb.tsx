import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from './ui/button';

interface BreadcrumbItem {
  label: string;
  page: string;
  icon?: React.ComponentType<any>;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (page: string) => void;
}

export function Breadcrumb({ items, onNavigate }: BreadcrumbProps) {
  if (items.length <= 1) return null;

  return (
    <nav className="bg-white border-b border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('home')}
            className="text-gray-500 hover:text-red-500 p-1 h-auto"
          >
            <Home className="h-4 w-4" />
          </Button>
          
          {items.map((item, index) => (
            <React.Fragment key={item.page}>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate(item.page)}
                className={`text-sm h-auto p-1 ${
                  index === items.length - 1
                    ? 'text-red-600 font-medium cursor-default hover:bg-transparent'
                    : 'text-gray-500 hover:text-red-500'
                }`}
                disabled={index === items.length - 1}
              >
                {item.icon && <item.icon className="h-4 w-4 mr-1" />}
                {item.label}
              </Button>
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
}