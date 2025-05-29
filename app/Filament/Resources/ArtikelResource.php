<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ArtikelResource\Pages;
use App\Filament\Resources\ArtikelResource\RelationManagers;
use App\Models\Artikel;
use Filament\Facades\Filament;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use  Filament\Forms\Components\TextInput;
use  Filament\Forms\Components\Select;
use  Filament\Forms\Components\RichEditor;
use  Filament\Forms\Components\FileUpload;
use  Filament\Forms\Components\DateTimePicker;
use  Filament\Forms\Components\Toggle;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Filament\Forms\Set;
use Filament\Forms\Get;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Filters\SelectFilter;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ArtikelResource extends Resource
{
    protected static ?string $model = Artikel::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Artikel';
    protected static ?string $pluralModelLabel = 'Artikel';
    protected static ?string $navigationGroup = 'Content Management';
    protected static ?string $modelLabel = 'Tambah Artikel';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('user_id')
                    ->label('Penulis')
                    ->relationship(
                        name: 'user',
                        titleAttribute: 'name',
                        modifyQueryUsing: fn($query) => $query->whereHas('roles', function ($q) {
                            $q->where('name', 'Author');
                        })
                    )
                    ->preload()
                    ->searchable()
                    ->required(),
                Select::make('category_id')
                    ->relationship('category', 'nama')
                    ->preload()
                    ->searchable()
                    ->required(),
                TextInput::make('title')
                    ->label('Judul')
                    ->live(onBlur: true)
                    ->afterStateUpdated(function (?string $state, Get $get, Set $set) {
                        if (blank($get('slug'))) {
                            $set('slug', Str::slug($get('title')));
                        }
                    })
                    ->maxLength(255)
                    ->required(),
                TextInput::make('slug')
                    ->readOnly()
                    ->required()
                    ->unique(Artikel::class, 'slug', ignoreRecord: true),
                RichEditor::make('content')
                    ->label('Konten Artikel')
                    ->reactive()
                    ->toolbarButtons([
                        'bold',
                        'italic',
                        'underline',
                        'strike',
                        'codeBlock',
                        'blockquote',
                        'bulletedList',
                        'numberedList',
                        'link',
                        'h1',
                    ])
                    ->required(),
                Textarea::make('excerpt')
                    ->label('Ringkasan')
                    ->columnSpanFull()
                    ->disabled()
                    ->dehydrated(false)
                    ->afterStateUpdated(function ($state, callable $set) {
                        $set('excerpt', Str::words(strip_tags($state), 30));
                    }),
                FileUpload::make('image')
                    ->label('Gambar')
                    ->image()
                    ->disk('public')
                    ->preserveFilenames()
                    ->directory('artikels')
                    ->required(),
                Select::make('tags')
                    ->label('Tag')
                    ->multiple()
                    ->relationship('tags', 'nama')
                    ->preload()
                    ->saveRelationshipsUsing(function ($record, $state) {
                        $record->tags()->sync($state);
                    })
                    ->required(),
                Select::make('status')
                    ->label('Status Artikel')
                    ->options([
                        'draft' => 'Draft (Belum selesai)',
                        'review' => 'Menunggu Review',
                        'published' => 'Sudah Diterbitkan',
                        'archived' => 'Diarsipkan',
                    ])
                    ->default('draft')
                    ->visible(Auth::user()->role, (['Admin', 'Editor']))
                    ->required(),
                DateTimePicker::make('updated_at')
                    ->label('Tanggal Diperbarui')
                    ->disabled()
                    ->hiddenOn('create')
                    ->timezone('Asia/Jakarta')
                    ->default(now())
                    ->required(),
                DateTimePicker::make('published_at')
                ->label('Tanggal Publikasi')
                ->visible(Auth::user()->role, (['Admin', 'Editor']))
                ->default(now())
                ->nullable()
                ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Judul')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Penulis'),
                Tables\Columns\TextColumn::make('category.nama')
                    ->label('Kategori'),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn($state) => match ($state) {
                        'draft' => 'warning',
                        'published' => 'success',
                        'review' => 'gray',
                        'archived' => 'gray',
                    }),
                Tables\Columns\ImageColumn::make('image'),
                Tables\Columns\TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\ToggleColumn::make('is_featured')
                    ->label('Tampilkan di Beranda')
                    ->beforeStateUpdated(function ($record, $state) {
                        // Runs before the state is saved to the database.
                    })
                    ->afterStateUpdated(function ($record, $state) {
                        // Runs after the state is saved to the database.
                    }),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'review' => 'Menunggu Review',
                        'published' => 'Sudah Diterbitkan',
                        'archived' => 'Diarsipkan',
                    ]),
                SelectFilter::make('user_id')
                    ->relationship('user', 'name')
                    ->label('Filter by Author')
                    ->label('Penulis')
                    ->multiple()

                    ->relationship(
                        name: 'user',
                        titleAttribute: 'name',
                        modifyQueryUsing: fn($query) => $query->where('role', 'author')
                    )
                    ->preload(),
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\ViewAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->visible(fn ($record) => $record->trashed() === false)
                    ->requiresConfirmation(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListArtikels::route('/'),
            'create' => Pages\CreateArtikel::route('/create'),
            'edit' => Pages\EditArtikel::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
