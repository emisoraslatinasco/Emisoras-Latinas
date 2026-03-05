const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface LoginResponse {
  success: boolean;
  token: string;
  message: string;
}

export interface Station {
  id: string;
  nombre: string;
  slug: string;
  urlStream: string;
  logoUrl: string;
  descripcion: string;
  descripcionExtendida?: string;
  ciudad: string;
  frecuencia?: string;
  sitioWeb?: string;
  eslogan?: string;
  fundacion?: string;
  priority: number;
  activo: boolean;
  isVip: boolean;
  vipAssignedAt: string | null;
  country: {
    id: string;
    code: string;
    name: string;
  };
  genres: Array<{
    id: string;
    name: string;
  }>;
  socialNetworks: Array<{
    id: string;
    url: string;
    platform: string;
  }>;
}

export interface PaginatedResponse {
  data: Station[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export class AdminAPI {
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

  static async login(username: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }

    return response.json();
  }

  static async getStations(
    page = 1,
    limit = 50,
    countryCode?: string,
    search?: string
  ): Promise<PaginatedResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search && search.trim()) {
      params.append('search', search.trim());
    }

    const endpoint = countryCode
      ? `${API_BASE_URL}/countries/${countryCode}/stations?${params}`
      : `${API_BASE_URL}/admin/stations?${params}`;

    const response = await fetch(endpoint, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al obtener emisoras');
    }

    return response.json();
  }

  static async updateStation(id: string, data: Partial<Station>): Promise<Station> {
    const response = await fetch(`${API_BASE_URL}/admin/stations/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar emisora');
    }

    return response.json();
  }

  static async deleteStation(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/stations/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al eliminar emisora');
    }
  }

  static async uploadStationLogo(id: string, file: File): Promise<{ logoUrl: string }> {
    const formData = new FormData();
    formData.append('logo', file);

    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/admin/stations/${id}/upload-logo`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error al subir logo');
    }

    return response.json();
  }

  static async toggleVip(id: string, isVip: boolean): Promise<Station> {
    const response = await fetch(`${API_BASE_URL}/admin/stations/${id}/toggle-vip`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ isVip }),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar VIP');
    }

    return response.json();
  }

  static logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
  }
}
