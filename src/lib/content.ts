/**
 * Content Loading Utilities
 * 
 * Provides type-safe functions for loading JSON content from the file system.
 * Includes error handling and validation support.
 */

import { promises as fs } from 'fs';
import path from 'path';
import type { ContentResult, SectionId } from '@/types/content';

/**
 * Load JSON content from a file with type safety
 * 
 * @param sectionId - The section identifier (e.g., 'hero', 'what-i-do')
 * @returns Content result with success/error status
 */
export async function loadSectionContent<T>(
  sectionId: SectionId
): Promise<ContentResult<T>> {
  try {
    const filePath = path.join(
      process.cwd(),
      'src',
      'content',
      'sections',
      `${sectionId}.json`
    );

    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent) as T;

    return { success: true, data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: `Failed to load content for ${sectionId}: ${errorMessage}`,
    };
  }
}

/**
 * Load site configuration
 */
export async function loadSiteConfig<T>(): Promise<ContentResult<T>> {
  try {
    const filePath = path.join(
      process.cwd(),
      'src',
      'content',
      'config',
      'site.json'
    );

    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent) as T;

    return { success: true, data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: `Failed to load site config: ${errorMessage}`,
    };
  }
}

/**
 * Load navigation configuration
 */
export async function loadNavigationConfig<T>(): Promise<ContentResult<T>> {
  try {
    const filePath = path.join(
      process.cwd(),
      'src',
      'content',
      'config',
      'navigation.json'
    );

    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent) as T;

    return { success: true, data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: `Failed to load navigation config: ${errorMessage}`,
    };
  }
}
