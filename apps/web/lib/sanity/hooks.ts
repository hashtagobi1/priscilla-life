'use client'

import { useQuery } from '@tanstack/react-query'
import {
  fetchMusic,
  fetchMusicById,
  fetchFood,
  fetchFoodById,
  fetchHost,
  fetchHostById,
  fetchShowreel,
  fetchSocial,
  fetchSocialByPlatform,
  fetchGlobalSettings,
} from './queries'
import type { Music, Food, Host, Social, GlobalSettings } from './types'

// Music Hooks
export function useMusic() {
  return useQuery<Music[]>({
    queryKey: ['music'],
    queryFn: fetchMusic,
  })
}

export function useMusicById(id: string) {
  return useQuery<Music>({
    queryKey: ['music', id],
    queryFn: () => fetchMusicById(id),
    enabled: !!id,
  })
}

// Food Hooks
export function useFood() {
  return useQuery<Food[]>({
    queryKey: ['food'],
    queryFn: fetchFood,
  })
}

export function useFoodById(id: string) {
  return useQuery<Food>({
    queryKey: ['food', id],
    queryFn: () => fetchFoodById(id),
    enabled: !!id,
  })
}

// Host Hooks
export function useHost() {
  return useQuery<Host[]>({
    queryKey: ['host'],
    queryFn: fetchHost,
  })
}

export function useHostById(id: string) {
  return useQuery<Host>({
    queryKey: ['host', id],
    queryFn: () => fetchHostById(id),
    enabled: !!id,
  })
}

export function useShowreel() {
  return useQuery<Host>({
    queryKey: ['showreel'],
    queryFn: fetchShowreel,
  })
}

// Social Hooks
export function useSocial() {
  return useQuery<Social[]>({
    queryKey: ['social'],
    queryFn: fetchSocial,
  })
}

export function useSocialByPlatform(platform: string) {
  return useQuery<Social>({
    queryKey: ['social', platform],
    queryFn: () => fetchSocialByPlatform(platform),
    enabled: !!platform,
  })
}

// Global Hooks
export function useGlobalSettings() {
  return useQuery<GlobalSettings>({
    queryKey: ['globalSettings'],
    queryFn: fetchGlobalSettings,
  })
}

