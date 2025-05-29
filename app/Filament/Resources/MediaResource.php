<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MediaResource\Pages;
use App\Filament\Resources\MediaResource\RelationManagers;
use App\Models\Media;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class MediaResource extends Resource
{
    protected static ?string $model = Media::class;

    protected static ?string $navigationIcon = 'heroicon-o-photo';
    protected static ?string $navigationGroup = 'Content Management';
    protected static ?string $label = 'Media';
    protected static ?string $pluralLabel = 'Media Items';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->maxLength(255)
                    ->default(null),
                Forms\Components\TextInput::make('caption')
                    ->maxLength(255)
                    ->default(null),
                Forms\Components\TextInput::make('type')
                    ->label('Tipe Media')
                    ->options([
                        'image' => 'Gambar',
                        'video' => 'Video',
                        'external' => 'Tautan Eksternal (YouTube, Vimeo)',
                    ])
                    ->reactive()
                    ->required(),
                Forms\Components\TextInput::make('media_path')
                    ->label('Unggah File')
                    ->disk('public')
                    ->directory('media')
                    ->preserveFilenames()
                    ->visible(fn($get) => in_array($get('type'), ['image', 'video']))
                    ->required(fn($get) => in_array($get('type'), ['image', 'video'])),
                Forms\Components\TextInput::make('media_url')
                    ->label('Tautan Eksternal')
                    ->url()
                    ->visible(fn($get) => $get('type') === 'external')
                    ->required(fn($get) => $get('type') === 'external')
                    ->default(null),
                Forms\Components\Toggle::make('is_featured')
                    ->required(),
                Forms\Components\TextInput::make('uploaded_by')
                    ->numeric()
                    ->default(null),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('caption')
                    ->searchable(),
                Tables\Columns\TextColumn::make('type'),
                Tables\Columns\TextColumn::make('media_path')
                    ->searchable(),
                Tables\Columns\TextColumn::make('media_url')
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean(),
                Tables\Columns\TextColumn::make('uploaded_by')
                    ->numeric()
                    ->sortable(),
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
                Tables\Filters\SelectFilter::make('type')
                    ->label('Tipe Media')
                    ->options([
                        'image' => 'Image',
                        'video' => 'Video',
                        'external' => 'External',
                    ])
                    ->label('Media Type')
                    ->placeholder('All Types'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\ViewAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
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
            'index' => Pages\ListMedia::route('/'),
            'create' => Pages\CreateMedia::route('/create'),
            'edit' => Pages\EditMedia::route('/{record}/edit'),
        ];
    }
}
