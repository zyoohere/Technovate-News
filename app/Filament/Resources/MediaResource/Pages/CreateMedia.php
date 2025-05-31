<?php

namespace App\Filament\Resources\MediaResource\Pages;

use App\Filament\Resources\MediaResource;
use App\Models\Media;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;

class CreateMedia extends CreateRecord
{
    protected static string $resource = MediaResource::class;
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['uploader_id'] = Auth::id();
        return $data;
    }
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
