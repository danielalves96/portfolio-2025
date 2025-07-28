'use client';

import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import {
  FileText,
  FolderOpen,
  Image,
  Layers,
  type LucideIcon,
  Plus,
  Search,
  Settings,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { cn } from '@/lib/utils';

const emptyStateVariants = cva('text-center', {
  variants: {
    size: {
      sm: 'py-8',
      default: 'py-12',
      lg: 'py-16',
    },
    variant: {
      default: '',
      card: 'rounded-lg border bg-card',
      subtle: 'bg-muted/30 rounded-lg',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});

const illustrations: Record<string, LucideIcon> = {
  projects: Layers,
  services: Settings,
  skills: Users,
  images: Image,
  files: FileText,
  folders: FolderOpen,
  search: Search,
  general: FolderOpen,
};

interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: LucideIcon | keyof typeof illustrations;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
    variant?: 'default' | 'outline' | 'secondary';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  children?: React.ReactNode;
}

function EmptyState({
  icon = 'general',
  title,
  description,
  action,
  secondaryAction,
  size,
  variant,
  className,
  children,
  ...props
}: EmptyStateProps) {
  const IconComponent = React.useMemo(() => {
    if (typeof icon === 'string') {
      return illustrations[icon] || illustrations.general;
    }
    return icon;
  }, [icon]) as LucideIcon;

  const content = (
    <div className='space-y-4'>
      <div className='flex justify-center'>
        <div className='rounded-full bg-muted p-4'>
          <IconComponent className='h-8 w-8 text-muted-foreground' />
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='text-lg font-semibold text-foreground'>{title}</h3>
        {description && (
          <p className='text-sm text-muted-foreground max-w-md mx-auto'>
            {description}
          </p>
        )}
      </div>

      {(action || secondaryAction) && (
        <div className='flex flex-col sm:flex-row items-center justify-center gap-2 pt-2'>
          {action && (
            <Button
              onClick={action.onClick}
              variant={action.variant || 'default'}
              className='w-full sm:w-auto'
            >
              {action.icon && <action.icon className='h-4 w-4 mr-2' />}
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant='outline'
              className='w-full sm:w-auto'
            >
              {secondaryAction.icon && (
                <secondaryAction.icon className='h-4 w-4 mr-2' />
              )}
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}

      {children}
    </div>
  );

  if (variant === 'card') {
    return (
      <Card
        className={cn(emptyStateVariants({ size, variant }), className)}
        {...props}
      >
        <CardContent className='p-0'>{content}</CardContent>
      </Card>
    );
  }

  return (
    <div
      className={cn(emptyStateVariants({ size, variant }), className)}
      {...props}
    >
      {content}
    </div>
  );
}

interface ProjectsEmptyStateProps
  extends Omit<EmptyStateProps, 'icon' | 'title'> {
  onCreateProject: () => void;
}

function ProjectsEmptyState({
  onCreateProject,
  description = 'Comece criando seu primeiro projeto para mostrar seu trabalho.',
  ...props
}: ProjectsEmptyStateProps) {
  return (
    <EmptyState
      icon='projects'
      title='Nenhum projeto encontrado'
      description={description}
      action={{
        label: 'Criar Primeiro Projeto',
        onClick: onCreateProject,
        icon: Plus,
      }}
      {...props}
    />
  );
}

interface ServicesEmptyStateProps
  extends Omit<EmptyStateProps, 'icon' | 'title'> {
  onCreateService: () => void;
}

function ServicesEmptyState({
  onCreateService,
  description = 'Adicione os serviços que você oferece para seus clientes.',
  ...props
}: ServicesEmptyStateProps) {
  return (
    <EmptyState
      icon='services'
      title='Nenhum serviço encontrado'
      description={description}
      action={{
        label: 'Criar Primeiro Serviço',
        onClick: onCreateService,
        icon: Plus,
      }}
      {...props}
    />
  );
}

interface SkillsEmptyStateProps
  extends Omit<EmptyStateProps, 'icon' | 'title'> {
  onCreateSkill: () => void;
}

function SkillsEmptyState({
  onCreateSkill,
  description = 'Adicione suas habilidades e competências técnicas.',
  ...props
}: SkillsEmptyStateProps) {
  return (
    <EmptyState
      icon='skills'
      title='Nenhuma habilidade encontrada'
      description={description}
      action={{
        label: 'Criar Primeira Habilidade',
        onClick: onCreateSkill,
        icon: Plus,
      }}
      {...props}
    />
  );
}

interface SearchEmptyStateProps
  extends Omit<EmptyStateProps, 'icon' | 'title'> {
  searchTerm?: string;
  onClearSearch?: () => void;
}

function SearchEmptyState({
  searchTerm,
  onClearSearch,
  description,
  ...props
}: SearchEmptyStateProps) {
  const defaultDescription = searchTerm
    ? `Nenhum resultado encontrado para "${searchTerm}". Tente usar termos diferentes.`
    : 'Nenhum resultado encontrado. Tente ajustar seus filtros de busca.';

  return (
    <EmptyState
      icon='search'
      title='Nenhum resultado encontrado'
      description={description || defaultDescription}
      action={
        onClearSearch
          ? {
              label: 'Limpar Busca',
              onClick: onClearSearch,
              variant: 'outline' as const,
            }
          : undefined
      }
      {...props}
    />
  );
}

interface LoadingEmptyStateProps
  extends Omit<EmptyStateProps, 'icon' | 'title' | 'action'> {
  message?: string;
}

function LoadingEmptyState({
  message = 'Carregando dados...',
  ...props
}: LoadingEmptyStateProps) {
  return (
    <div
      className={cn(
        emptyStateVariants({ size: 'default', variant: 'default' }),
        props.className
      )}
    >
      <div className='space-y-4'>
        <div className='flex justify-center'>
          <div className='rounded-full bg-muted p-4'>
            <div className='h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent' />
          </div>
        </div>

        <div className='space-y-2'>
          <h3 className='text-lg font-semibold text-foreground'>{message}</h3>
          <p className='text-sm text-muted-foreground'>
            Por favor, aguarde enquanto carregamos os dados.
          </p>
        </div>
      </div>
    </div>
  );
}

interface ErrorEmptyStateProps extends Omit<EmptyStateProps, 'icon' | 'title'> {
  error?: string;
  onRetry?: () => void;
}

function ErrorEmptyState({
  error = 'Ocorreu um erro inesperado',
  onRetry,
  description = 'Não foi possível carregar os dados. Tente novamente.',
  ...props
}: ErrorEmptyStateProps) {
  return (
    <EmptyState
      icon={FileText}
      title={error}
      description={description}
      action={
        onRetry
          ? {
              label: 'Tentar Novamente',
              onClick: onRetry,
              variant: 'outline' as const,
            }
          : undefined
      }
      variant='card'
      {...props}
    />
  );
}

export {
  EmptyState,
  ProjectsEmptyState,
  ServicesEmptyState,
  SkillsEmptyState,
  SearchEmptyState,
  LoadingEmptyState,
  ErrorEmptyState,
  emptyStateVariants,
};
