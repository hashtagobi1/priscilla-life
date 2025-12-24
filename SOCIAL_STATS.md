# Social Media Stats Setup

## Current Social Handles
- **Instagram**: @priscilladinatoko
- **TikTok**: @priscilladinatoko

## How to Update Follower Counts

Since real-time API access to Instagram and TikTok requires complex authentication and approval processes, follower counts should be **manually updated in Sanity Studio**.

### Steps:
1. Open Sanity Studio: `pnpm studio`
2. Navigate to "Social Media" section
3. Click on the platform you want to update (Instagram or TikTok)
4. Update the "Followers" field with the current count
5. Save the document

### Frequency
- Update follower counts monthly or as needed
- This keeps the stats relatively current without requiring API integration

## Footer Social Icons

The footer automatically displays Instagram and TikTok icons based on the Global Settings in Sanity. These are pulled from the `socialLinks` array in the Global Settings document.

## Future: Real-Time Stats (Optional)

If you want to implement real-time follower counts in the future, you would need to:
1. Set up Instagram Basic Display API or Instagram Graph API
2. Set up TikTok API (requires approval)
3. Create API routes in Next.js to fetch stats
4. Set up a cron job or scheduled function to update Sanity periodically

For now, manual updates in Sanity Studio are the simplest and most reliable approach.

