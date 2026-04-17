import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../lib/api-Client";
import {
  GET_ABOUT_CONTENT_ADMIN,
  UPLOAD_ABOUT_IMAGE,
  UPDATE_ABOUT_CONTENT,
} from "../../Utils/Constant";

const AboutUs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    paragraphOne: "",
    paragraphTwo: "",
    imageUrl: "",
    serviceCards: [],
    splitSections: [
      {
        title: "",
        subtitle: "",
        description: "",
        image: "",
        buttonText: "",
        buttonLink: "",
      },
      {
        title: "",
        subtitle: "",
        description: "",
        image: "",
        buttonText: "",
        buttonLink: "",
      },
    ],
    stats: [],
    teamMembers: [],
  });

  const fetchAboutContent = useCallback(async () => {
    try {
      const response = await apiClient.get(GET_ABOUT_CONTENT_ADMIN, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const payload = response.data.data || {};
        const normalizedSplitSections = Array.isArray(payload.splitSections)
          ? [...payload.splitSections]
          : [];

        while (normalizedSplitSections.length < 2) {
          normalizedSplitSections.push({
            title: "",
            subtitle: "",
            description: "",
            image: "",
            buttonText: "",
            buttonLink: "",
          });
        }

        setForm({
          ...payload,
          splitSections: normalizedSplitSections,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      toast.error("Failed to fetch About section content");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchAboutContent();
  }, [fetchAboutContent]);

  const handleTeamImageUpload = async (index, event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setUploadingImage(true);
    try {
      const response = await apiClient.post(UPLOAD_ABOUT_IMAGE, formData, {
        withCredentials: true,
      });

      if (response.status === 200 && response.data?.imageUrl) {
        setForm((prev) => {
          const nextMembers = [...(prev.teamMembers || [])];
          nextMembers[index] = {
            ...(nextMembers[index] || { name: "", role: "", image: "" }),
            image: response.data.imageUrl,
          };

          return { ...prev, teamMembers: nextMembers };
        });
        toast.success("Team image uploaded successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      toast.error("Failed to upload team image");
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  };

  const handleServiceImageUpload = async (index, event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setUploadingImage(true);
    try {
      const response = await apiClient.post(UPLOAD_ABOUT_IMAGE, formData, {
        withCredentials: true,
      });

      if (response.status === 200 && response.data?.imageUrl) {
        setForm((prev) => {
          const nextCards = [...(prev.serviceCards || [])];
          nextCards[index] = {
            ...(nextCards[index] || { title: "", description: "", image: "" }),
            image: response.data.imageUrl,
          };
          return { ...prev, serviceCards: nextCards };
        });
        toast.success("Service image uploaded successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      toast.error("Failed to upload service image");
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  };

  const handleSplitImageUpload = async (index, event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setUploadingImage(true);
    try {
      const response = await apiClient.post(UPLOAD_ABOUT_IMAGE, formData, {
        withCredentials: true,
      });

      if (response.status === 200 && response.data?.imageUrl) {
        setForm((prev) => {
          const nextSections = [...(prev.splitSections || [])];
          nextSections[index] = {
            ...(nextSections[index] || {
              title: "",
              subtitle: "",
              description: "",
              image: "",
              buttonEnabled: false,
              buttonText: "",
              buttonLink: "",
            }),
            image: response.data.imageUrl,
          };
          return { ...prev, splitSections: nextSections };
        });
        toast.success("Section image uploaded successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      toast.error("Failed to upload section image");
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  };

  const handleStatChange = (index, key, value) => {
    setForm((prev) => {
      const nextStats = [...(prev.stats || [])];
      nextStats[index] = {
        ...(nextStats[index] || {
          title: "",
          value: "",
          description: "",
          icon: "",
        }),
        [key]: value,
      };
      return { ...prev, stats: nextStats };
    });
  };

  const addStatCard = () => {
    setForm((prev) => ({
      ...prev,
      stats: [
        ...(prev.stats || []),
        { title: "", value: "", description: "", icon: "" },
      ],
    }));
  };

  const removeStatCard = (index) => {
    setForm((prev) => ({
      ...prev,
      stats: (prev.stats || []).filter((_, idx) => idx !== index),
    }));
  };

  const handleTeamChange = (index, key, value) => {
    setForm((prev) => {
      const nextMembers = [...(prev.teamMembers || [])];
      nextMembers[index] = {
        ...(nextMembers[index] || { name: "", role: "", image: "" }),
        [key]: value,
      };
      return { ...prev, teamMembers: nextMembers };
    });
  };

  const addTeamMember = () => {
    setForm((prev) => ({
      ...prev,
      teamMembers: [
        ...(prev.teamMembers || []),
        { name: "", role: "", image: "" },
      ],
    }));
  };

  const removeTeamMember = (index) => {
    setForm((prev) => ({
      ...prev,
      teamMembers: (prev.teamMembers || []).filter((_, idx) => idx !== index),
    }));
  };

  const handleServiceChange = (index, key, value) => {
    setForm((prev) => {
      const nextCards = [...(prev.serviceCards || [])];
      nextCards[index] = {
        ...(nextCards[index] || { title: "", description: "", image: "" }),
        [key]: value,
      };
      return { ...prev, serviceCards: nextCards };
    });
  };

  const addServiceCard = () => {
    setForm((prev) => ({
      ...prev,
      serviceCards: [
        ...(prev.serviceCards || []),
        { title: "", description: "", image: "" },
      ],
    }));
  };

  const removeServiceCard = (index) => {
    setForm((prev) => ({
      ...prev,
      serviceCards: (prev.serviceCards || []).filter((_, idx) => idx !== index),
    }));
  };

  const handleSplitChange = (index, key, value) => {
    setForm((prev) => {
      const nextSections = [...(prev.splitSections || [])];
      nextSections[index] = {
        ...(nextSections[index] || {
          title: "",
          subtitle: "",
          description: "",
          image: "",
          buttonEnabled: false,
          buttonText: "",
          buttonLink: "",
        }),
        [key]: value,
      };
      return { ...prev, splitSections: nextSections };
    });
  };

  const addSplitSection = () => {
    setForm((prev) => ({
      ...prev,
      splitSections: [
        ...(prev.splitSections || []),
        {
          title: "",
          subtitle: "",
          description: "",
          image: "",
          buttonEnabled: false,
          buttonText: "",
          buttonLink: "",
        },
      ],
    }));
  };

  const removeSplitSection = (index) => {
    setForm((prev) => ({
      ...prev,
      splitSections: (prev.splitSections || []).filter((_, idx) => idx !== index),
    }));
  };

  const toggleSplitButton = (index, checked) => {
    setForm((prev) => {
      const nextSections = [...(prev.splitSections || [])];
      nextSections[index] = {
        ...(nextSections[index] || {
          title: "",
          subtitle: "",
          description: "",
          image: "",
          buttonEnabled: false,
          buttonText: "",
          buttonLink: "",
        }),
        buttonEnabled: checked,
      };
      return { ...prev, splitSections: nextSections };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await apiClient.put(
        UPDATE_ABOUT_CONTENT,
        { data: form },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("About section updated successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      toast.error("Failed to update About section");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-xl p-6 shadow animate-pulse">
          <div className="h-8 w-52 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-3">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">About Content Editor</h2>

        <div className="mt-2 border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Top Split Sections</h3>
            <button
              type="button"
              onClick={addSplitSection}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Add Split Section
            </button>
          </div>
          <div className="space-y-4">
            {(form.splitSections || []).map((section, index) => (
              <div key={`split-${index}`} className="border border-gray-200 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm font-medium text-gray-700">Split Section {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeSplitSection(index)}
                    className="text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <input
                      className="w-full border border-gray-300 rounded-md p-2.5"
                      placeholder="Title"
                      value={section.title || ""}
                      onChange={(event) => handleSplitChange(index, "title", event.target.value)}
                    />
                    <input
                      className="w-full border border-gray-300 rounded-md p-2.5"
                      placeholder="Subtitle"
                      value={section.subtitle || ""}
                      onChange={(event) => handleSplitChange(index, "subtitle", event.target.value)}
                    />
                    <textarea
                      className="w-full border border-gray-300 rounded-md p-2.5 min-h-[110px]"
                      placeholder="Description"
                      value={section.description || ""}
                      onChange={(event) =>
                        handleSplitChange(index, "description", event.target.value)
                      }
                    />
                    <label className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                      <input
                        type="checkbox"
                        checked={Boolean(section.buttonEnabled)}
                        onChange={(event) => toggleSplitButton(index, event.target.checked)}
                      />
                      Show Button
                    </label>
                    {section.buttonEnabled ? (
                      <>
                        <input
                          className="w-full border border-gray-300 rounded-md p-2.5"
                          placeholder="Button Text"
                          value={section.buttonText || ""}
                          onChange={(event) =>
                            handleSplitChange(index, "buttonText", event.target.value)
                          }
                        />
                        <input
                          className="w-full border border-gray-300 rounded-md p-2.5"
                          placeholder="Navigation Route"
                          value={section.buttonLink || ""}
                          onChange={(event) =>
                            handleSplitChange(index, "buttonLink", event.target.value)
                          }
                        />
                      </>
                    ) : null}
                  </div>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleSplitImageUpload(index, event)}
                      className="w-full border border-gray-300 rounded-md p-2.5 bg-white"
                    />
                    <div className="border border-dashed border-gray-300 rounded-lg p-3 min-h-[180px] bg-gray-50 flex items-center justify-center">
                      {section.image ? (
                        <img
                          src={section.image}
                          alt={section.title || "Split section"}
                          className="max-h-[160px] w-full object-cover rounded"
                        />
                      ) : (
                        <p className="text-xs text-gray-500">Section image preview</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving || uploadingImage}
              className="bg-[#DB4444] text-white px-5 py-2 rounded-md disabled:opacity-70"
            >
              {saving ? "Saving..." : uploadingImage ? "Uploading image..." : "Save Split Sections"}
            </button>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Service Highlight Cards</h3>
            <button
              type="button"
              onClick={addServiceCard}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Add Service Card
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {(form.serviceCards || []).map((card, index) => (
              <div key={`service-${index}`} className="border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-700">Service Card {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeServiceCard(index)}
                    className="text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="Title"
                  value={card.title || ""}
                  onChange={(event) => handleServiceChange(index, "title", event.target.value)}
                />
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2.5 min-h-[90px]"
                  placeholder="Description"
                  value={card.description || ""}
                  onChange={(event) =>
                    handleServiceChange(index, "description", event.target.value)
                  }
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleServiceImageUpload(index, event)}
                  className="w-full border border-gray-300 rounded-md p-2.5 bg-white"
                />
                <div className="border border-dashed border-gray-300 rounded-lg p-2 min-h-[120px] bg-gray-50 flex items-center justify-center">
                  {card.image ? (
                    <img
                      src={card.image}
                      alt={card.title || "Service card"}
                      className="h-24 w-full object-contain rounded"
                    />
                  ) : (
                    <p className="text-xs text-gray-500">Service image preview</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving || uploadingImage}
              className="bg-[#DB4444] text-white px-5 py-2 rounded-md disabled:opacity-70"
            >
              {saving ? "Saving..." : uploadingImage ? "Uploading image..." : "Save Service Cards"}
            </button>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Growth Stats Cards</h3>
            <button
              type="button"
              onClick={addStatCard}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Add Stat Card
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {(form.stats || []).map((item, index) => (
              <div key={`stat-${index}`} className="border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-700">Stat Card {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeStatCard(index)}
                    className="text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="Title"
                  value={item.title || ""}
                  onChange={(event) => handleStatChange(index, "title", event.target.value)}
                />
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="Value"
                  value={item.value || ""}
                  onChange={(event) => handleStatChange(index, "value", event.target.value)}
                />
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="Icon (emoji)"
                  value={item.icon || ""}
                  onChange={(event) => handleStatChange(index, "icon", event.target.value)}
                />
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2.5 min-h-[80px]"
                  placeholder="Description"
                  value={item.description || ""}
                  onChange={(event) =>
                    handleStatChange(index, "description", event.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving || uploadingImage}
              className="bg-[#DB4444] text-white px-5 py-2 rounded-md disabled:opacity-70"
            >
              {saving ? "Saving..." : uploadingImage ? "Uploading image..." : "Save Stats Cards"}
            </button>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Team Members</h3>
            <button
              type="button"
              onClick={addTeamMember}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Add Team Member
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {(form.teamMembers || []).map((member, index) => (
              <div key={`member-${index}`} className="border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-700">Member {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className="text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="Name"
                  value={member.name || ""}
                  onChange={(event) => handleTeamChange(index, "name", event.target.value)}
                />
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="Role"
                  value={member.role || ""}
                  onChange={(event) => handleTeamChange(index, "role", event.target.value)}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleTeamImageUpload(index, event)}
                  className="w-full border border-gray-300 rounded-md p-2.5 bg-white"
                />
                <div className="border border-dashed border-gray-300 rounded-lg p-2 min-h-[120px] bg-gray-50 flex items-center justify-center">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name || "Team member"}
                      className="h-28 w-full object-cover rounded"
                    />
                  ) : (
                    <p className="text-xs text-gray-500">Member image preview</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving || uploadingImage}
              className="bg-[#DB4444] text-white px-5 py-2 rounded-md disabled:opacity-70"
            >
              {saving ? "Saving..." : uploadingImage ? "Uploading image..." : "Save Team Members"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
