'use client';

import { Tab } from '@headlessui/react';
import clsx from 'clsx';

export default function Tabs({ tabs, panels, className = '' }) {
  return (
    <Tab.Group>
      <div className={clsx('w-full', className)}>
        <Tab.List className="flex space-x-2 rounded-xl bg-slate-800/50 p-1 mb-6 backdrop-blur-sm border border-purple-500/30">
          {tabs.map((tab, idx) => (
            <Tab
              key={tab}
              className="main-tab-title"
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {panels.map((panel, idx) => (
            <Tab.Panel key={idx} className="focus:outline-none">
              {panel}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
} 