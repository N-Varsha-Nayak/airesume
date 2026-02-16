'use client';

import React, { useState } from 'react';
import { useBuild } from '@/app/contexts/BuildContext';
import { useRouter } from 'next/navigation';

interface BuildPanelProps {
  step: number;
  title: string;
  artifactContent?: string;
}

export function BuildPanel({ step, title, artifactContent = '' }: BuildPanelProps) {
  const { uploadArtifact, isStepCompleted, getArtifact } = useBuild();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);

  const artifact = getArtifact(step);
  const stepTitle = `${String(step).padStart(2, '0')}-${title.toLowerCase()}`;
  const artifactKey = `rb_step_${step}_artifact`;

  const handleCopyContent = async () => {
    const contentToCopy = artifactContent || `Step ${step}: ${title}\n\n[Your artifact content here]`;
    await navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setFileName(file.name);

    try {
      // Simulate file upload and create a mock URL
      // In production, this would upload to cloud storage
      const simulatedUrl = `https://artifacts.example.com/${artifactKey}/${file.name}`;
      
      // Store locally
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result as string;
        const storageKey = `${artifactKey}_content`;
        localStorage.setItem(storageKey, fileContent);
        localStorage.setItem(`${artifactKey}_filename`, file.name);
        
        uploadArtifact(step, simulatedUrl, file.name);
        setUploadStatus('success');
        
        setTimeout(() => {
          setUploadStatus('idle');
          setUploading(false);
        }, 2000);
      };
      reader.readAsText(file, 'UTF-8');
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('error');
      setUploading(false);
    }
  };

  const handleItWorked = () => {
    if (!isStepCompleted(step)) {
      uploadArtifact(step, `https://artifacts.example.com/${artifactKey}/approved`, 'approved.txt');
      setUploadStatus('success');
      setTimeout(() => setUploadStatus('idle'), 2000);
    }
  };

  const handleGoToLovable = () => {
    window.open('https://lovable.dev', '_blank');
  };

  const handleNextStep = () => {
    if (step < 8) {
      const nextSteps: Record<number, string> = {
        1: '02-market',
        2: '03-architecture',
        3: '04-hld',
        4: '05-lld',
        5: '06-build',
        6: '07-test',
        7: '08-ship',
      };
      const nextStep = nextSteps[step];
      if (nextStep) {
        router.push(`/rb/${nextStep}`);
      }
    } else if (step === 8) {
      router.push('/rb/proof');
    }
  };

  return (
    <div className="flex-none w-3/10 bg-white rounded-lg border border-gray-200 flex flex-col shadow-sm">
      {/* Build Header */}
      <div className="border-b border-gray-200 px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50">
        <h2 className="font-semibold text-gray-900">Build Panel</h2>
        <p className="text-xs text-gray-600 mt-1">Step {step} Artifact</p>
      </div>

      {/* Build Content */}
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Copy This Into Lovable
          </label>
          <textarea
            className="w-full h-24 p-2 text-xs border border-gray-300 rounded bg-gray-50 font-mono text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`${title} — Step ${step}`}
            defaultValue={artifactContent || `Project 3 - Step ${step}: ${title}\n\n[Your artifact content]`}
            readOnly
          />
        </div>

        <button
          onClick={handleCopyContent}
          className={`w-full py-2 px-3 rounded text-sm font-medium transition-all ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
          }`}
        >
          {copied ? '✓ Content Copied' : '📋 Copy Content'}
        </button>

        <button
          onClick={handleGoToLovable}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded text-sm font-medium"
        >
          🚀 Build in Lovable
        </button>

        <div className="border-t border-gray-200 pt-3">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Upload Artifact
          </label>
          <div className="relative">
            <input
              type="file"
              onChange={handleFileUpload}
              disabled={uploading}
              className="w-full text-xs border border-gray-300 rounded p-2 cursor-pointer file:cursor-pointer file:bg-gray-100 file:border-0 file:rounded file:p-1 file:text-xs"
              accept=".txt,.pdf,.json,.html,.jsx,.tsx,.ts,.js"
            />
          </div>
          {fileName && (
            <p className="text-xs text-gray-600 mt-1">
              {uploading ? '⏳ Uploading...' : `✓ ${fileName}`}
            </p>
          )}
        </div>

        {artifact && (
          <div className="bg-green-50 border border-green-200 rounded p-2 text-xs text-green-800">
            ✓ Artifact uploaded
            {artifact.fileName && <div className="mt-1 font-mono text-green-700">{artifact.fileName}</div>}
          </div>
        )}

        <div className="space-y-2 border-t border-gray-200 pt-3">
          <button
            onClick={handleItWorked}
            disabled={isStepCompleted(step)}
            className={`w-full py-2 px-3 rounded text-sm font-medium transition-all ${
              isStepCompleted(step)
                ? 'bg-green-600 text-white cursor-default'
                : 'bg-green-100 hover:bg-green-200 text-green-800'
            }`}
          >
            {isStepCompleted(step) ? '✓ Step Complete' : '✓ It Worked'}
          </button>
          <button className="w-full bg-red-100 hover:bg-red-200 text-red-800 py-2 px-3 rounded text-sm font-medium">
            ✗ Error
          </button>
          <button className="w-full bg-orange-100 hover:bg-orange-200 text-orange-800 py-2 px-3 rounded text-sm font-medium">
            📸 Screenshot
          </button>
        </div>
      </div>

      {/* Next Button */}
      <div className="border-t border-gray-200 p-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <button
          onClick={handleNextStep}
          disabled={!isStepCompleted(step)}
          className={`w-full py-2 px-3 rounded font-medium text-sm transition-all ${
            isStepCompleted(step)
              ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          {isStepCompleted(step) ? (step === 8 ? '🏁 To Proof' : '➜ Next Step') : '⏳ Complete Step'}
        </button>
      </div>
    </div>
  );
}
