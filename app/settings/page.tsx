'use client';

import { useUser } from '@/hooks/use-user';
import { useAsync } from '@/hooks/use-async';
import { updateUserProfile } from '@/lib/firebase/user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import PageLoader from '@/components/loading/PageLoader';

export default function SettingsPage() {
  const { profile, loading: profileLoading } = useUser();
  const { toast } = useToast();
  const { execute: updateProfile, loading: updating } = useAsync(updateUserProfile);

  if (profileLoading) return <PageLoader />;
  if (!profile) return null;

  const handleUpdatePreferences = async (key: string, value: any) => {
    try {
      await updateProfile(profile.id, {
        preferences: {
          ...profile.preferences,
          [key]: value,
        },
      });
      toast({
        title: 'Settings updated',
        description: 'Your preferences have been saved.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update settings.',
      });
    }
  };

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email notifications</Label>
            <Switch
              id="email-notifications"
              checked={profile.preferences.emailNotifications}
              onCheckedChange={(checked) =>
                handleUpdatePreferences('emailNotifications', checked)
              }
              disabled={updating}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}