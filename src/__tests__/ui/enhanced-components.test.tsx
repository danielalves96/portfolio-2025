import { fireEvent, render, screen } from '@testing-library/react';
import { Edit3, Trash2 } from 'lucide-react';

import {
  EmptyState,
  ProjectsEmptyState,
  ServicesEmptyState,
  SkillsEmptyState,
} from '@/components/ui/empty-state';
import {
  ContentCard,
  ContentListItem,
  Metadata,
  Thumbnail,
} from '@/components/ui/enhanced-card';

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, fill, ...props }: any) {
    return <img src={src} alt={alt} data-fill={fill} {...props} />;
  };
});

describe('Enhanced Components', () => {
  describe('ContentCard', () => {
    const mockActions = [
      {
        label: 'Edit',
        onClick: jest.fn(),
        icon: Edit3,
      },
      {
        label: 'Delete',
        onClick: jest.fn(),
        icon: Trash2,
        variant: 'destructive' as const,
      },
    ];

    const mockMetadata = [
      {
        label: 'Year',
        value: '2024',
      },
      {
        label: 'Category',
        value: 'Web Design',
      },
    ];

    it('renders content card with all props', () => {
      render(
        <ContentCard
          title='Test Project'
          description='Test description'
          image='/test-image.jpg'
          imageAlt='Test image'
          status='published'
          tags={['React', 'TypeScript']}
          metadata={mockMetadata}
          actions={mockActions}
        />
      );

      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      expect(screen.getByText('Published')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });

    it('renders loading state', () => {
      render(<ContentCard title='Test' loading={true} />);

      // Should show skeleton elements
      expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
    });

    it('handles card click', () => {
      const onCardClick = jest.fn();
      render(<ContentCard title='Test Project' onCardClick={onCardClick} />);

      fireEvent.click(
        screen.getByText('Test Project').closest('[role="button"], div')!
      );
      expect(onCardClick).toHaveBeenCalled();
    });

    it('renders without image when image is null', () => {
      render(<ContentCard title='Test Project' image={null} />);

      expect(screen.getByText('Test Project')).toBeInTheDocument();
      // Should not have an img element
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });

  describe('ContentListItem', () => {
    const mockActions = [
      {
        label: 'Edit',
        onClick: jest.fn(),
        icon: Edit3,
      },
    ];

    it('renders list item with compact layout', () => {
      render(
        <ContentListItem
          title='Test Skill'
          description='Test description'
          actions={mockActions}
          compact={true}
        />
      );

      expect(screen.getByText('Test Skill')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('renders loading state', () => {
      render(<ContentListItem title='Test' loading={true} />);

      expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
    });
  });

  describe('Thumbnail', () => {
    it('renders image when src is provided', () => {
      render(
        <Thumbnail
          src='/test-image.jpg'
          alt='Test image'
          aspectRatio='square'
          size='md'
        />
      );

      expect(screen.getByAltText('Test image')).toBeInTheDocument();
    });

    it('renders with square aspect ratio by default', () => {
      const { container } = render(
        <Thumbnail src='/test-image.jpg' alt='Test image' />
      );

      const thumbnailDiv = container.firstChild as HTMLElement;
      expect(thumbnailDiv).toHaveClass('aspect-square');
    });

    it('applies object-cover to fill the square area', () => {
      render(<Thumbnail src='/test-image.jpg' alt='Test image' />);

      const image = screen.getByAltText('Test image');
      expect(image).toHaveClass('object-cover');
      expect(image).not.toHaveClass('p-2');
    });

    it('renders fallback icon when no src', () => {
      render(<Thumbnail alt='Test image' aspectRatio='square' size='md' />);

      // Should render fallback icon (ImageIcon by default)
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('renders loading state', () => {
      render(<Thumbnail alt='Test image' loading={true} />);

      expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
    });
  });

  describe('Metadata', () => {
    const mockItems = [
      {
        label: 'Year',
        value: '2024',
      },
      {
        label: 'Category',
        value: 'Web Design',
      },
    ];

    it('renders metadata items vertically', () => {
      render(<Metadata items={mockItems} layout='vertical' />);

      expect(screen.getByText('Year:')).toBeInTheDocument();
      expect(screen.getByText('2024')).toBeInTheDocument();
      expect(screen.getByText('Category:')).toBeInTheDocument();
      expect(screen.getByText('Web Design')).toBeInTheDocument();
    });

    it('renders metadata items horizontally', () => {
      render(<Metadata items={mockItems} layout='horizontal' />);

      expect(screen.getByText('Year:')).toBeInTheDocument();
      expect(screen.getByText('2024')).toBeInTheDocument();
    });
  });

  describe('Empty States', () => {
    it('renders generic empty state', () => {
      const onAction = jest.fn();
      render(
        <EmptyState
          title='No items found'
          description='Create your first item'
          action={{
            label: 'Create Item',
            onClick: onAction,
          }}
        />
      );

      expect(screen.getByText('No items found')).toBeInTheDocument();
      expect(screen.getByText('Create your first item')).toBeInTheDocument();

      const button = screen.getByText('Create Item');
      fireEvent.click(button);
      expect(onAction).toHaveBeenCalled();
    });

    it('renders projects empty state', () => {
      const onCreateProject = jest.fn();
      render(<ProjectsEmptyState onCreateProject={onCreateProject} />);

      expect(screen.getByText('Nenhum projeto encontrado')).toBeInTheDocument();

      const button = screen.getByText('Criar Primeiro Projeto');
      fireEvent.click(button);
      expect(onCreateProject).toHaveBeenCalled();
    });

    it('renders services empty state', () => {
      const onCreateService = jest.fn();
      render(<ServicesEmptyState onCreateService={onCreateService} />);

      expect(screen.getByText('Nenhum serviço encontrado')).toBeInTheDocument();

      const button = screen.getByText('Criar Primeiro Serviço');
      fireEvent.click(button);
      expect(onCreateService).toHaveBeenCalled();
    });

    it('renders skills empty state', () => {
      const onCreateSkill = jest.fn();
      render(<SkillsEmptyState onCreateSkill={onCreateSkill} />);

      expect(
        screen.getByText('Nenhuma habilidade encontrada')
      ).toBeInTheDocument();

      const button = screen.getByText('Criar Primeira Habilidade');
      fireEvent.click(button);
      expect(onCreateSkill).toHaveBeenCalled();
    });
  });
});
