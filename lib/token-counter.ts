import { TokenProvider, TokenInfo } from '@/types';

export class TokenCounter {
  // Get token count for different providers
  static async getTokenCount(text: string, provider: TokenProvider): Promise<TokenInfo> {
    let count = 0;
    
    try {
      switch (provider) {
        case 'openai':
          count = await this.getOpenAITokenCount(text);
          break;
        case 'claude':
          count = await this.getClaudeTokenCount(text);
          break;
        case 'deepseek':
          count = await this.getDeepSeekTokenCount(text);
          break;
        case 'gemini':
          count = await this.getGeminiTokenCount(text);
          break;
        default:
          count = this.getFallbackTokenCount(text);
      }
    } catch (error) {
      // Fallback to character-based estimation
      count = this.getFallbackTokenCount(text);
    }
    
    return { count, provider };
  }

  // OpenAI token counting (using tiktoken approximation)
  private static async getOpenAITokenCount(text: string): Promise<number> {
    try {
      // Try to use tiktoken library if available
      // For now, we'll use a simple approximation
      return this.approximateOpenAITokens(text);
    } catch (error) {
      return this.getFallbackTokenCount(text);
    }
  }

  // Approximate OpenAI token count
  private static approximateOpenAITokens(text: string): number {
    // OpenAI's approximation: ~4 characters per token for English text
    // More sophisticated calculation considering spaces, punctuation, etc.
    
    // Count words and characters
    const words = text.trim().split(/\s+/).length;
    const chars = text.length;
    
    // OpenAI tokens are roughly:
    // - 1 token per word for common words
    // - Additional tokens for longer words, punctuation, and special characters
    
    let tokenEstimate = words;
    
    // Add tokens for punctuation and special characters
    const specialChars = text.match(/[{}[\]"':,]/g);
    if (specialChars) {
      tokenEstimate += specialChars.length * 0.5;
    }
    
    // Adjust based on character count (longer words need more tokens)
    const avgCharsPerWord = chars / words || 0;
    if (avgCharsPerWord > 5) {
      tokenEstimate *= 1.2;
    }
    
    return Math.ceil(tokenEstimate);
  }

  // Claude token counting
  private static async getClaudeTokenCount(text: string): Promise<number> {
    // Claude's tokenization is similar to OpenAI but slightly different
    // Approximation based on documented behavior
    
    const words = text.trim().split(/\s+/).length;
    const chars = text.length;
    
    // Claude tends to have slightly fewer tokens than OpenAI for the same text
    let tokenEstimate = words * 0.9;
    
    // Add for special characters
    const specialChars = text.match(/[{}[\]"':,]/g);
    if (specialChars) {
      tokenEstimate += specialChars.length * 0.4;
    }
    
    return Math.ceil(tokenEstimate);
  }

  // DeepSeek token counting
  private static async getDeepSeekTokenCount(text: string): Promise<number> {
    // DeepSeek uses similar tokenization to other models
    // Slightly more efficient for code and structured data
    
    const words = text.trim().split(/\s+/).length;
    const isStructuredData = text.includes('{') || text.includes('[');
    
    let tokenEstimate = words;
    
    if (isStructuredData) {
      // More efficient for JSON/structured data
      tokenEstimate *= 0.85;
    }
    
    return Math.ceil(tokenEstimate);
  }

  // Gemini token counting
  private static async getGeminiTokenCount(text: string): Promise<number> {
    // Gemini's tokenization
    const chars = text.length;
    
    // Gemini approximation: roughly 3.5-4.5 characters per token
    const tokenEstimate = chars / 4;
    
    return Math.ceil(tokenEstimate);
  }

  // Fallback token counting (character-based approximation)
  private static getFallbackTokenCount(text: string): number {
    // Simple approximation: ~4 characters per token
    return Math.ceil(text.length / 4);
  }

  // Get all token counts for comparison
  static async getAllTokenCounts(text: string): Promise<Record<TokenProvider, TokenInfo>> {
    const providers: TokenProvider[] = ['openai', 'claude', 'deepseek', 'gemini'];
    const results: Record<TokenProvider, TokenInfo> = {} as any;
    
    await Promise.all(
      providers.map(async (provider) => {
        results[provider] = await this.getTokenCount(text, provider);
      })
    );
    
    return results;
  }

  // Calculate token savings
  static calculateSavings(originalTokens: number, convertedTokens: number): number {
    return Math.max(0, originalTokens - convertedTokens);
  }

  // Get savings percentage
  static getSavingsPercentage(originalTokens: number, convertedTokens: number): number {
    if (originalTokens === 0) return 0;
    const savings = this.calculateSavings(originalTokens, convertedTokens);
    return Math.round((savings / originalTokens) * 100);
  }

  // Format token count for display
  static formatTokenCount(count: number): string {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  }

  // Estimate cost savings based on token savings (rough estimates)
  static estimateCostSavings(tokenSavings: number, provider: TokenProvider): number {
    // Approximate cost per 1K tokens (in USD, as of early 2024)
    const costPer1K = {
      openai: 0.002,   // GPT-4 input tokens
      claude: 0.003,   // Claude-3 input tokens
      deepseek: 0.001, // DeepSeek pricing
      gemini: 0.00125  // Gemini Pro pricing
    };
    
    return (tokenSavings / 1000) * costPer1K[provider];
  }
}
