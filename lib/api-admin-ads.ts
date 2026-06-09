const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export enum AdvertisementScope {
  GENERAL = 'GENERAL',
  STATION = 'STATION',
}

export enum AdvertisementPosition {
  HOME_TOP = 'HOME_TOP',
  HOME_RIGHT = 'HOME_RIGHT',
  HOME_BOTTOM = 'HOME_BOTTOM',
  STATION_UNDER_REPORT = 'STATION_UNDER_REPORT',
}

export interface Advertisement {
  id: string;
  name: string;
  scope: AdvertisementScope;
  position: AdvertisementPosition;
  imageUrl?: string;
  linkUrl?: string;
  width: string;
  height: string;
  isActive: boolean;
  country?: { id: string; name: string };
  station?: { id: string; nombre: string };
}

export class AdminAdsAPI {
  private static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('admin_token');
  }

  private static getHeaders(): HeadersInit {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  static async getAdvertisements(params?: Record<string, string>): Promise<Advertisement[]> {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL.replace(/\/api$/, '')}/advertisements${query ? `?${query}` : ''}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al obtener los banners');
    }

    return response.json();
  }

  static async createAdvertisement(data: Partial<Advertisement>): Promise<Advertisement> {
    const response = await fetch(`${API_BASE_URL.replace(/\/api$/, '')}/advertisements`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al crear banner');
    }

    return response.json();
  }

  static async updateAdvertisement(id: string, data: Partial<Advertisement>): Promise<Advertisement> {
    const response = await fetch(`${API_BASE_URL.replace(/\/api$/, '')}/advertisements/${id}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar banner');
    }

    return response.json();
  }

  static async deleteAdvertisement(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL.replace(/\/api$/, '')}/advertisements/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al eliminar banner');
    }
  }

  static async uploadAdvertisementImage(id: string, file: File): Promise<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL.replace(/\/api$/, '')}/advertisements/${id}/image`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error al subir imagen del banner');
    }

    return response.json();
  }
}
